import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buttons-table',
  templateUrl: './buttons-table.component.html',
  styleUrls: ['./buttons-table.component.scss']
})
export class ButtonsTableComponent {
  @Input() status!:boolean | null
  @Input() idDoc!:string

  pressed(){
    console.log(this.idDoc)
  }
}
