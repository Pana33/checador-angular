import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { EmittersService } from 'src/app/services/emitters/emitters.service';
import { GoogleMapsApiService } from 'src/app/services/google-maps-api/google-maps-api.service';
import { RecordEmployee } from 'src/app/shared/models/record-employee/record-employee';

@Component({
  selector: 'app-model-maps',
  templateUrl: './model-maps.component.html',
  styleUrls: ['./model-maps.component.scss']
})
export class ModelMapsComponent implements OnInit, OnDestroy{

  constructor(private emitter:EmittersService,private mapService:GoogleMapsApiService,private alert:AlertsService){}

  modalTittle:string = ""
  docToShow!:RecordEmployee[]
  subDocToShow!:Subscription
  map!:google.maps.Map
  mapLoaded:boolean = false
  markersOnMap:google.maps.Marker[] | null = null

  ngOnInit(): void {
    this.subDocToShow = this.emitter.showRecordOnMap.subscribe(resRecord=>{
      this.docToShow = resRecord as RecordEmployee[]
      if(this.docToShow.length > 0){
        if(this.mapLoaded){
          this.updateMarkers(this.docToShow)
        }else{
          this.initMap()
        }
      }
      if(this.docToShow.length > 1){
        this.modalTittle = "Conjunto de checadas"
      }else{
        this.modalTittle = this.docToShow[0].fullName
      }
    })
  }

  initMap(){
    this.mapService.initMap(this.docToShow[0].lat,this.docToShow[0].lng,"map").then(resMap=>{
      this.map = resMap!
      this.mapLoaded = true
      this.markersOnMap = this.mapService.putMarkersRecords(this.docToShow,this.map)
    }).catch(errMap =>{
      this.alert.showErrorOperation("Carga de mapa","No se pudo cargar el mapa, por favor intenta nuevamente","error")
    })
  }

  updateMarkers(documents:RecordEmployee[]){
    if(this.markersOnMap != null){
      this.mapService.removeMarkers(this.markersOnMap)
      this.markersOnMap = null
    }
    this.markersOnMap = this.mapService.putMarkersRecords(documents,this.map)
  }

  ngOnDestroy(): void {
    this.subDocToShow?.unsubscribe()
  }

}
