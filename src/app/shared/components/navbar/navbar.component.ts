import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterParam } from '../../models/filter-param/filter-param';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() headers!:string[]
  @Input() keys!:string[]
  @Output() objectToFilter = new EventEmitter<FilterParam>()

  constructor(private fb:FormBuilder){}

  formFilterData!:FormGroup

  ngOnInit(): void {
    this.formFilterData = this.fb.group({
      filterBy:[""],
      exactMatch:[false],
      column:["none"],
    })
  }

  sendParamsToFilter(){
    this.objectToFilter.emit(this.formFilterData.value)
  }

}
