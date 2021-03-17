import firebase from 'firebase/app';
import 'firebase/firestore';

type converter<T> = {
  toFirestore: (doc: T) => T;
  fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot) => T;
};

export function firebaseConverter<T>(): converter<T> {
  return {
    toFirestore: (doc: T): T => doc,
    fromFirestore: (snap: firebase.firestore.QueryDocumentSnapshot): T =>
      snap.data() as T,
  };
}