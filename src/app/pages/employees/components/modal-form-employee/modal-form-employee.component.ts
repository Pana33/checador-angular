import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-form-employee',
  templateUrl: './modal-form-employee.component.html',
  styleUrls: ['./modal-form-employee.component.scss']
})
export class ModalFormEmployeeComponent implements OnInit {

  constructor(private fb:FormBuilder){}

  formAddEmployee!:FormGroup

  ngOnInit(): void {
    this.formAddEmployee = this.fb.group({
      firstName:["",[Validators.required]],
      lastName:["",[Validators.required]],
      emailEmployee:["",[Validators.required]],
      curp:["",[Validators.required]],
    })
  }

  addEmploye(){
    console.log(this.formAddEmployee.value)
  }

}
