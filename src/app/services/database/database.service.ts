import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';

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

}
