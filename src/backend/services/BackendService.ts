import { FirebaseApp } from 'firebase/app'
import { collection, CollectionReference, DocumentData, Firestore, getFirestore } from 'firebase/firestore'
import app from '../../configs/firebase/firebase'

class BackendService {
  private app: FirebaseApp
  private firestore: Firestore

  constructor() {
    this.app = app
    this.firestore = getFirestore(this.app)
  }

  getApp() {
    return this.app
  }
  getFirestore() {
    return this.firestore
  }

  createCollection<T = DocumentData>(collectionName: string) {
    return collection(this.firestore, collectionName) as CollectionReference<T>
  }
}

const DB = new BackendService()
export default DB
