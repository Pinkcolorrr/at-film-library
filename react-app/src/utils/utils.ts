import firebase from 'firebase/app';
import 'firebase/firestore';
import { Maybe } from 'yup/lib/types';

export function getStringSecondPart(str: string, splitBy: string): string {
  return str.split(splitBy)[1];
}

/**
 * Divide big array into chunks
 */
export function getChunkedArray<T>(array: Array<T>, chunkSize: number): T[][] {
  const chunkedArr: T[][] = [];
  const copied: T[] = [...array];
  const numOfChild: number = Math.ceil(copied.length / chunkSize);
  for (let i = 0; i < numOfChild; i++) {
    chunkedArr.push(copied.splice(0, chunkSize));
  }
  return chunkedArr;
}

export class PaginationControl {
  private doc: Maybe<firebase.firestore.QueryDocumentSnapshot> = null;

  public setLastDoc(doc: firebase.firestore.QueryDocumentSnapshot): void {
    this.doc = doc;
  }

  public getLastDoc(): Maybe<firebase.firestore.QueryDocumentSnapshot> {
    return this.doc;
  }
}
