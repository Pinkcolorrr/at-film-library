import { DocumentChangeAction, QueryDocumentSnapshot } from '@angular/fire/firestore';

/**
 * Divide big array into chunks
 */
export function getChunkedArray<T>(array: Array<T>, chunkSize: number): Array<T> {
  const chunkedArr = [];
  const copied = [...array];
  const numOfChild = Math.ceil(copied.length / chunkSize);
  for (let i = 0; i < numOfChild; i++) {
    chunkedArr.push(copied.splice(0, chunkSize));
  }
  return chunkedArr;
}

/**
 * Control over documents from which pages start and finish
 */
export class PaginationControl<T> {
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
  public setFirstAndLast(document: DocumentChangeAction<T>[]): void {
    this.firstDocOnPage = document[0].payload.doc;
    this.lastDocOnPage = document[document.length - 1].payload.doc;
  }
}
