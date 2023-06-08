import { Timestamp } from "firebase/firestore"

export interface RecordEmployee {
  	curp:string,
	dateTime:Timestamp,
	emailEmployee:string,
	fullName:string,
	lat:number,
	lng:number,
	type:string,
	idDocument:string,
	namePlace:string,
}
