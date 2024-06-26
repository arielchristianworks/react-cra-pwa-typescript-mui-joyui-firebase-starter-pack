import { FirestoreError, QuerySnapshot } from "firebase/firestore";

export interface IOnSnapshotObserver<T> {
  next?: ((snapshot: QuerySnapshot<T>) => void) | undefined;
  error?: ((error: FirestoreError) => void) | undefined;
  complete?: (() => void) | undefined;
}