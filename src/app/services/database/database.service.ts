import { Injectable } from '@angular/core';
import { Firestore, doc, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore:Firestore) { }

  getOneDocumentSubscribable(table:string,idDocument:string){
    let collectionReference = doc(this.firestore,table,idDocument)
    return docData(collectionReference)
  }

}
