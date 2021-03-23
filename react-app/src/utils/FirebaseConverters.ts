import firebase from 'firebase/app';
import 'firebase/firestore';

type converter<T> = {
  toFirestore: (doc: T) => firebase.firestore.DocumentData;
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => T;
};

/**
 * Converter for typing data from firestore.
 *
 * Firebase method withConverter can't work with separate functions, and only can get object with toFirestore and fromFirestore methods.
 *
 * https://firebase.google.com/docs/reference/js/firebase.firestore.FirestoreDataConverter
 */
export function firebaseConverter<T>(): converter<T> {
  return {
    toFirestore: (doc: T): firebase.firestore.DocumentData => doc,
    fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot): T => snap.data() as T,
  };
}
