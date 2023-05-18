import { Component, Input } from '@angular/core';
import { EmployeeDb, UserDb } from '../../models/type-person/type-person';
import { EmittersService } from 'src/app/services/emitters/emitters.service';

@Component({
  selector: 'app-buttons-table',
  templateUrl: './buttons-table.component.html',
  styleUrls: ['./buttons-table.component.scss']
})
export class ButtonsTableComponent {
  @Input() status!:boolean | null
  @Input() idDoc!:string
  @Input() doc!:EmployeeDb | UserDb

  constructor(private emitter:EmittersService){}

  pressed(){
    console.log(this.idDoc)
  }

  updateDocument(){
    this.emitter.activeModal.emit(this.doc)
  }

}
