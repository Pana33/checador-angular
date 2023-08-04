import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, getDoc, updateDoc } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { TablesDb } from 'src/app/shared/models/tables-db/tables-db';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore:Firestore) { }

  getUserData(email:string){
    let documentReference = doc(this.firestore,TablesDb.USERS,email)
    return docData(documentReference)
  }

  getOneDocumentSubscribable(table:string,idDocument:string){
    let documentReference = doc(this.firestore,table,idDocument)
    return docData(documentReference)
  }

  getOneDocumentOneTime(table:string,idDocument:string){
    let documentReference = doc(this.firestore,table,idDocument)
    return getDoc(documentReference)
  }

  getAllDocumentsWhitoutIdSubscribable(table:string){
    let collectionReference = collection(this.firestore,table)
    return collectionData(collectionReference)
  }

  getAllDocumentsWhitIdSubscribable(table:string){
    let collectionReference = collection(this.firestore,table)
    return collectionData(collectionReference,{idField:'idDocument'})
  }

  updateDocument(table:string,idDocument:string,data:any){
    let documentReference = doc(this.firestore,table,idDocument)
    return updateDoc(documentReference,data)
  }

  createDocument(data:FormGroup,table:string){
    let collectionReference = collection(this.firestore,table)
    return addDoc(collectionReference,data)
  }

  deleteDocument(table:string,idDocument:string){
    let documentReference = doc(this.firestore,table,idDocument)
    return deleteDoc(documentReference)
  }

}
