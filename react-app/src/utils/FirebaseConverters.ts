import firebase from 'firebase/app';
import 'firebase/firestore';

type converter<T> = {
  toFirestore: (doc: T) => T;
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => T;
};

/**
 * Converter for typing data from firestore.
 * Firebase method withConverter can't work with separate functions, and only can get object with toFirestore and fromFirestore methods.
 *  The firebase documentation uses the same syntax.
 *
 * https://firebase.google.com/docs/reference/js/firebase.firestore.FirestoreDataConverter
 */
export function firebaseConverter<T>(): converter<T> {
  return {
    toFirestore: (doc: T): T => doc,
    fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot): T => snap.data() as T,
  };
}

export const fromFirestore = <T>(snap: firebase.firestore.QueryDocumentSnapshot): T => snap.data() as T;
