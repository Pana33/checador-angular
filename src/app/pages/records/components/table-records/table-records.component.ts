import { Component, Input } from '@angular/core';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { RecordEmployee } from 'src/app/shared/models/record-employee/record-employee';

@Component({
  selector: 'app-table-records',
  templateUrl: './table-records.component.html',
  styleUrls: ['./table-records.component.scss']
})
export class TableRecordsComponent {
  @Input() headers!:string[]
  @Input() keys!:string[]
  @Input() data!:any
  
  constructor(private emitter:EmittersService){}

  sendDocToSeeOnMap(doc:RecordEmployee){
    let arrayOfDoc:RecordEmployee[] = []
    arrayOfDoc.push(doc)
    this.emitter.showRecordOnMap.emit(arrayOfDoc)
  }

}
