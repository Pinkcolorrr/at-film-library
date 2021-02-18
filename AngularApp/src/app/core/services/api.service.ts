import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QueryDocumentSnapshot,
  DocumentChangeAction,
  CollectionReference,
  DocumentData,
  Query,
} from '@angular/fire/firestore';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getChunkedArray } from '../../shared/utils';
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
   * Get observable with array of item or items
   */
  public getItemsByKey<T>(requestTarget: string, id: number | number[]): Observable<T[]> {
    if (Array.isArray(id) && id.length > 10) {
      return this.generateSource<T>(requestTarget, id);
    } else {
      return this.angularFire
        .collection<T>(requestTarget, ref => ref.where('pk', Array.isArray(id) ? 'in' : '==', id))
        .valueChanges();
    }
  }

  /**
   * In firebase using "in" operator it is possible to request a maximum of 10 documents
   * So this function is used in case, when we need request more than 10 documents
   */
  private generateSource<T>(requestTarget: string, idArr: number[]): Observable<T[]> {
    const chunkedArr = getChunkedArray(idArr, 10);
    const sources: Observable<T[]>[] = [];

    chunkedArr.forEach(arr => {
      sources.push(
        this.angularFire
          .collection<T>(requestTarget, ref => ref.where('pk', 'in', arr))
          .valueChanges(),
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
      .collection<T>(filters.target, ref => ref.limit(filters.limit).orderBy(filters.sortTarget, filters.sortDirection).startAt(startAt))
      .snapshotChanges();
  }

  /**
   * Add new object in filter$ source, that trigger new server request
   */
  public nextPageRequest<T>(filters: QueryFilterParams, startAfter: QueryDocumentSnapshot<T>): Observable<DocumentChangeAction<T>[]> {
    return this.angularFire
      .collection<T>(filters.target, ref =>
        ref.limit(filters.limit).orderBy(filters.sortTarget, filters.sortDirection).startAfter(startAfter),
      )
      .snapshotChanges();
  }

  /**
   * Add new object in filter$ source, that trigger new server request
   */
  public initialPageRequest<T>(filters: QueryFilterParams): Observable<DocumentChangeAction<T>[]> {
    return this.angularFire
      .collection<T>(filters.target, ref => this.getRef(ref, filters))
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
