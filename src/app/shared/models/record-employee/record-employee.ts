import { Timestamp } from "firebase/firestore"

interface Location {
	lat:number,
	lng:number,
}

export interface RecordEmployee {
  	curp:string,
	dateTime:Timestamp,
	emailEmployee:string,
	fullName:string,
	location:Location,
	type:string,
	idDocument:string,
}
