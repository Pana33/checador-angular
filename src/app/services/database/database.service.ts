import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore:Firestore) { }

  getOneDocumentSubscribable(table:string,idDocument:string){
    let documentReference = doc(this.firestore,table,idDocument)
    return docData(documentReference)
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
