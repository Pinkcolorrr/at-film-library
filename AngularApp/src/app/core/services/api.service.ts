import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QueryDocumentSnapshot,
  DocumentChangeAction,
  CollectionReference,
  DocumentData,
  Query,
  DocumentReference,
} from '@angular/fire/firestore';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getChunkedArray } from '../../shared/utils';
import { FirebaseDTO } from '../DTOs/firebase-dto';
import { QueryFilterParams } from '../models/query-filter-params';

/**
 * Connection to firebase API
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private angularFire: AngularFirestore) {}

  /**
   * Remove item from db
   */
  public removeItem(collectionName: string, id: string): Promise<void> {
    return this.angularFire.collection(collectionName).doc(id).delete();
  }

  /**
   * Add new item in database
   */
  public editItem(collectionName: string, item: FirebaseDTO, id: string): Promise<void> {
    return this.angularFire.collection(collectionName).doc(id).set(item);
  }

  /**
   * Add new item in database
   */
  public addNewItem<T>(collectionName: string, options: T): Promise<DocumentReference<unknown>> {
    return this.angularFire.collection(collectionName).add(options);
  }

  /**
   * Get all items by collectionName from database
   */
  public getAllData<T>(collectionName: string): Observable<T[]> {
    return this.angularFire
      .collection<T>(collectionName, ref => ref.orderBy('pk'))
      .valueChanges();
  }

  /**
   * Get observable with array of item or items
   */
  public getItemsByKey<T>(collectionName: string, pk: (number | string)[] | string | number): Observable<DocumentChangeAction<T>[]> {
    if (Array.isArray(pk) && pk.length > 10) {
      return this.generateSource<T>(collectionName, pk);
    } else {
      return this.angularFire
        .collection<T>(collectionName, ref => ref.where('pk', Array.isArray(pk) && pk.length ? 'in' : '==', pk))
        .snapshotChanges();
    }
  }

  /**
   * In firebase using "in" operator it is possible to request a maximum of 10 documents
   * So this function is used in case, when we need request more than 10 documents
   */
  private generateSource<T>(collectionName: string, idArr: (number | string)[]): Observable<DocumentChangeAction<T>[]> {
    const chunkedArr = getChunkedArray<string | number>(idArr, 10);
    const sources: Observable<DocumentChangeAction<T>[]>[] = [];

    chunkedArr.forEach(arr => {
      sources.push(
        this.angularFire
          .collection<T>(collectionName, ref => ref.where('pk', 'in', arr))
          .snapshotChanges(),
      );
    });

    return combineLatest(sources).pipe(
      map(item => {
        return [].concat.apply([], item);
      }),
    );
  }

  /**
   * Add new object in filter$ source, that trigger new server request
   */
  public prevPageRequest<T>(filters: QueryFilterParams, startAt: QueryDocumentSnapshot<T>): Observable<DocumentChangeAction<T>[]> {
    return this.angularFire
      .collection<T>(filters.collectionName, ref =>
        ref.limit(filters.limit).orderBy(filters.sortTarget, filters.sortDirection).startAt(startAt),
      )
      .snapshotChanges();
  }

  /**
   * Add new object in filter$ source, that trigger new server request
   */
  public nextPageRequest<T>(filters: QueryFilterParams, startAfter: QueryDocumentSnapshot<T>): Observable<DocumentChangeAction<T>[]> {
    return this.angularFire
      .collection<T>(filters.collectionName, ref =>
        ref.limit(filters.limit).orderBy(filters.sortTarget, filters.sortDirection).startAfter(startAfter),
      )
      .snapshotChanges();
  }

  /**
   * Add new object in filter$ source, that trigger new server request
   */
  public initialPageRequest<T>(filters: QueryFilterParams): Observable<DocumentChangeAction<T>[]> {
    return this.angularFire
      .collection<T>(filters.collectionName, ref => this.getRef(ref, filters))
      .snapshotChanges();
  }

  private getRef(ref: CollectionReference<DocumentData>, filters: QueryFilterParams): Query<DocumentData> {
    if (filters.searchValues) {
      return ref.where(filters.searchTarget, '==', filters.searchValues).limit(filters.limit);
    } else {
      return ref.orderBy(filters.sortTarget, filters.sortDirection).limit(filters.limit);
    }
  }
}
