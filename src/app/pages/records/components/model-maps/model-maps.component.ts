import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { RecordEmployee } from 'src/app/shared/models/record-employee/record-employee';

@Component({
  selector: 'app-model-maps',
  templateUrl: './model-maps.component.html',
  styleUrls: ['./model-maps.component.scss']
})
export class ModelMapsComponent implements OnInit, OnDestroy{

  constructor(private emitter:EmittersService){}

  docToShow!:RecordEmployee
  subDocToShow!:Subscription

  ngOnInit(): void {
    this.subDocToShow = this.emitter.showRecordOnMap.subscribe(resRecord=>{
      this.docToShow = resRecord as RecordEmployee
      console.log(this.docToShow)
    })
  }

  ngOnDestroy(): void {
    this.subDocToShow?.unsubscribe()
  }

}
