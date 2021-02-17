import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  QueryDocumentSnapshot,
  DocumentChangeAction,
  CollectionReference,
  DocumentData,
  Query,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
      return ref.where('fields.title', '==', filters.searchValues).limit(filters.limit);
    } else {
      return ref.orderBy(filters.sortTarget, filters.sortDirection).limit(filters.limit);
    }
  }
}
