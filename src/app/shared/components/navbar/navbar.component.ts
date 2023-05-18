import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterParam } from '../../models/filter-param/filter-param';
import { EmittersService } from 'src/app/services/emitters/emitters.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() headers!:string[]
  @Input() keys!:string[]
  @Output() reSendObjectToFilter = new EventEmitter<FilterParam>()

  constructor(private emitter:EmittersService){}

  showModalForm(){
    this.emitter.activeModal.emit("add")
  }

  sendFilterToParent(params:FilterParam){
    this.reSendObjectToFilter.emit(params)
  }

}
