import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-restore-pw',
  templateUrl: './restore-pw.component.html',
  styleUrls: ['./restore-pw.component.scss']
})
export class RestorePwComponent implements OnInit{

  constructor(private fb:FormBuilder){}

  formRestorePw!:FormGroup
  showSpinner:boolean = false
  validLinkToRestorePw!:boolean

  ngOnInit(): void {
    this.formRestorePw = this.fb.group({
      pass1:["",Validators.required],
      pass2:["",Validators.required]
    })
    this.validLinkToRestorePw = true
  }

  changePw(){

  }
  
}
