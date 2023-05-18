import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterParam } from '../../models/filter-param/filter-param';
import { EmittersService } from 'src/app/services/emitters/emitters.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() headers!:string[]
  @Input() keys!:string[]
  @Output() objectToFilter = new EventEmitter<FilterParam>()

  constructor(private fb:FormBuilder,private emitter:EmittersService){}

  formFilterData!:FormGroup

  ngOnInit(): void {
    this.formFilterData = this.fb.group({
      filterBy:[""],
      exactMatch:[false],
      column:["none"],
    })
  }

  showModalForm(){
    this.emitter.activeModal.emit("add")
  }

  sendParamsToFilter(){
    this.objectToFilter.emit(this.formFilterData.value)
  }

}
