import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterParam } from '../../models/filter-param/filter-param';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-filter',
  templateUrl: './form-filter.component.html',
  styleUrls: ['./form-filter.component.scss']
})
export class FormFilterComponent {
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
