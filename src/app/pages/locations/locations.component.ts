import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database/database.service';
import { FilterParam } from 'src/app/shared/models/filter-param/filter-param';
import { TablesDb } from 'src/app/shared/models/tables-db/tables-db';
import { Loader } from "@googlemaps/js-api-loader"

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy{

  loader = new Loader({
    apiKey: "AIzaSyDVvgBLXFMRnBb5P34zi3G2Chzg_sOhzwQ",
    version: "weekly",
  });

  constructor(private db:DatabaseService){}

  headerTable:string[] = ["Nombre","Direccion"]
  keyEmployees:string[] = ["name","address"]
  locationsData:any
  locationsDataComplet:any
  subLocationsData!:Subscription
  paramsToFilter:FilterParam | null = null

  ngOnInit(): void {
    this.subLocationsData = this.db.getAllDocumentsWhitIdSubscribable(TablesDb.LOCATIONS).subscribe(resLoc=>{
      this.locationsData = resLoc
      this.locationsDataComplet = resLoc
      if (this.paramsToFilter != null) {
        this.filterData(this.paramsToFilter)
      }
      console.log(this.locationsData)
    })
  
    this.loader.load().then(() => {
      let map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    });
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

  centerMap(lat:number,lng:number){
    console.log(lat,lng)
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
