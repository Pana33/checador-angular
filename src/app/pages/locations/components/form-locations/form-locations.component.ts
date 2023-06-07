import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-locations',
  templateUrl: './form-locations.component.html',
  styleUrls: ['./form-locations.component.scss']
})
export class FormLocationsComponent  implements OnInit{

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
