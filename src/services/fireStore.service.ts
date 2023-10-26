import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  Firestore,
  getDoc,
  doc,
  updateDoc
} from 'firebase/firestore/lite';
import { app } from "../config/firebaseConfig";
import type { FirebaseApp } from 'firebase/app';
import type { DocumentData, WithFieldValue } from 'firebase/firestore';

class FireStoreService {
  private db: Firestore;

  constructor(app: FirebaseApp) {
    this.db = getFirestore(app);
  }

  addDocument(entity: string, row: WithFieldValue<DocumentData>) {
    const entityCollection = collection(this.db, entity);
    return addDoc(entityCollection, row);
  }

  async getDocuments(entity: string) {
    const entityCollection = collection(this.db, entity);
    const entitySnapshot = await getDocs(entityCollection);

    return entitySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data()}
    });
  }
  
  async getDocument(collection: string, document: string) {
    const docRef = doc(this.db, collection, document);
    return getDoc(docRef);
  }
  
  async updateDocument(collection: string, document: string, row: WithFieldValue<DocumentData>) {
    const docRef = doc(this.db, collection, document);
    return updateDoc(docRef, row);
  }
}

export const fireStoreService = new FireStoreService(app);