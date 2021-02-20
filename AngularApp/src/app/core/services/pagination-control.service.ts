import { Injectable } from '@angular/core';
import { DocumentChangeAction, QueryDocumentSnapshot } from '@angular/fire/firestore';

/**
 * Control over documents from which pages start and finish
 */
@Injectable({
  providedIn: 'root',
})
export class PaginationControlService<T> {
  constructor() {}

  /**
   * First document on current page
   */
  public firstDocOnPage: QueryDocumentSnapshot<T>;

  /**
   * Last document on current page
   */
  public lastDocOnPage: QueryDocumentSnapshot<T>;

  /**
   * Array with all first docs
   * Pop last, when switch on prev page
   */
  public firstDocsOnAllPages: QueryDocumentSnapshot<T>[] = [];

  /**
   * Get last item in prev page
   */
  public get prevPageStartAt(): QueryDocumentSnapshot<T> {
    return this.firstDocsOnAllPages[this.firstDocsOnAllPages.length - 1];
  }

  /**
   * Set actual state for first and last documents on page
   */
  public setFirstAndLast(films: DocumentChangeAction<T>[]): void {
    this.firstDocOnPage = films[0].payload.doc;
    this.lastDocOnPage = films[films.length - 1].payload.doc;
  }
}
