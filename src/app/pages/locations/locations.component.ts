import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GoogleMapsApiService } from 'src/app/services/google-maps-api/google-maps-api.service';
import { FilterParam } from 'src/app/shared/models/filter-param/filter-param';
import { TablesDb } from 'src/app/shared/models/tables-db/tables-db';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy{

  constructor(private db:DatabaseService,private mapService:GoogleMapsApiService,private alert:AlertsService){}

  headerTable:string[] = ["Nombre","Direccion"]
  keyEmployees:string[] = ["name","address"]
  locationsData:any
  locationsDataComplet:any
  subLocationsData!:Subscription
  paramsToFilter:FilterParam | null = null
  map!:google.maps.Map
  mapLoaded:boolean = false

  ngOnInit(): void {//revisar que pasa si aun no hay direcciones guardadas
    this.subLocationsData = this.db.getAllDocumentsWhitIdSubscribable(TablesDb.LOCATIONS).subscribe(resLoc=>{
      this.locationsData = resLoc
      this.locationsDataComplet = resLoc
      if (this.paramsToFilter != null) {
        this.filterData(this.paramsToFilter)
      }
      console.log(this.locationsData)
    })
  }

  filterData(paramsObject: FilterParam) {
    this.paramsToFilter = paramsObject
    this.locationsData = this.locationsDataComplet
    if (paramsObject.filterBy != "" && paramsObject.column != "none") {
      let arrowFunctionToFilter
      if (paramsObject.exactMatch) {
        arrowFunctionToFilter = (location:any) => String(location[paramsObject.column])== paramsObject.filterBy
      } else {
        arrowFunctionToFilter = (location: any) => String(location[paramsObject.column]).includes(paramsObject.filterBy)
      }
      this.locationsData = this.locationsData.filter(arrowFunctionToFilter)
    }
  }

  centerOrInitMap(lat:number,lng:number){
    if(this.mapLoaded){
      this.mapService.centerMap(lat,lng,this.map)
    }else{
      this.mapService.initMap(lat,lng,"map").then((resMap)=>{
        this.map = resMap!
        this.mapLoaded = true
      }).catch(errMap=>{
        this.alert.showErrorOperation("Carga de mapa","No se pudo cargar el mapa, por favor intenta nuevamente","error")
      })
    }
  }

  updateLocation(event:MouseEvent,idDocument:string){
    event.stopPropagation()
    console.log(idDocument)
  }

  deletLocation(event:MouseEvent,idDocument:string){
    event.stopPropagation()
    console.log(idDocument)
  }

  ngOnDestroy(): void {
    this.subLocationsData?.unsubscribe()
  }

}
