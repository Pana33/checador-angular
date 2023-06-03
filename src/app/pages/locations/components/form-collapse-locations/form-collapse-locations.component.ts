import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-collapse-locations',
  templateUrl: './form-collapse-locations.component.html',
  styleUrls: ['./form-collapse-locations.component.scss']
})
export class FormCollapseLocationsComponent implements OnInit{

  constructor(private fb:FormBuilder){}

  formLocation!:FormGroup
  showSpinner:boolean = false

  ngOnInit(): void {
    this.formLocation = this.fb.group({
      name:['',Validators.required],
      address:['',Validators.required],
    })
  }

}
