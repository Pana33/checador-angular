import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { DatabaseService } from 'src/app/services/database/database.service';
import { GoogleMapsApiService } from 'src/app/services/google-maps-api/google-maps-api.service';
import { FilterParam } from 'src/app/shared/models/filter-param/filter-param';
import { LocationsMaps } from 'src/app/shared/models/locations-maps/locations-maps';
import { TablesDb } from 'src/app/shared/models/tables-db/tables-db';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy{

  constructor(private db:DatabaseService,private mapService:GoogleMapsApiService,private alert:AlertsService,private fb:FormBuilder){}

  headerTable:string[] = ["Nombre","Direccion"]
  keyEmployees:string[] = ["name","address"]
  locationsData!:LocationsMaps[]
  locationsDataComplet!:LocationsMaps[]
  subLocationsData!:Subscription
  paramsToFilter:FilterParam | null = null
  map!:google.maps.Map
  mapLoaded:boolean = false
  markersOnMap:google.maps.Marker[] | null = null
  formLocation!:FormGroup
  updateDocument:string | null = null
  showSpinner:boolean = false
  inputAutocomplete!:google.maps.places.Autocomplete
  markerAutocomplete:google.maps.Marker | null = null
  resultsAutocomplet!:google.maps.places.PlaceResult

  ngOnInit(): void {//revisar que pasa si aun no hay direcciones guardadas
    this.subLocationsData = this.db.getAllDocumentsWhitIdSubscribable(TablesDb.LOCATIONS).subscribe(resLoc=>{
      this.locationsData = resLoc as LocationsMaps[]
      this.locationsDataComplet = resLoc as LocationsMaps[]
      if (this.paramsToFilter != null) {
        this.filterData(this.paramsToFilter)
      }
      if(this.mapLoaded){
        if(this.markersOnMap != null){
          this.mapService.removeMarkers(this.markersOnMap)
          this.markersOnMap = null  
        }
        this.markersOnMap = this.mapService.putMarkersLocations(this.locationsDataComplet,this.map)
      }else{
        this.initMap(this.locationsData[0].lat,this.locationsData[0].lng)
      }
      console.log(this.locationsData)
    })
    this.formLocation = this.fb.group({
      name:['',Validators.required],
      address:['',Validators.required],
      lat:[0],
      lng:[0],
    })
  }

  filterData(paramsObject: FilterParam) {
    this.paramsToFilter = paramsObject
    this.locationsData = this.locationsDataComplet
    if (paramsObject.filterBy != "" && paramsObject.column != "none") {
      let arrowFunctionToFilter
      if (paramsObject.exactMatch) {
        arrowFunctionToFilter = (location:LocationsMaps) => String(location[paramsObject.column as keyof LocationsMaps])== paramsObject.filterBy
      } else {
        arrowFunctionToFilter = (location: LocationsMaps) => String(location[paramsObject.column as keyof LocationsMaps]).includes(paramsObject.filterBy)
      }
      this.locationsData = this.locationsData.filter(arrowFunctionToFilter)
    }
  }

  setNewAddresValueOnForm(text:string){
    this.formLocation.patchValue({"address":text})
  }

  addLocation(){
    this.formLocation.patchValue({"lat":this.markerAutocomplete?.getPosition()?.lat()})
    this.formLocation.patchValue({"lng":this.markerAutocomplete?.getPosition()?.lng()})
    if(this.updateDocument == null){
      this.db.createDocument(this.formLocation.value,TablesDb.LOCATIONS).then(resCreate=>{
        this.formLocation.reset()
        this.alert.showSuccessfulOperation()
      }).catch(err=>{
        this.alert.showErrorOperation()
      })
    }else{
      this.db.updateDocument(TablesDb.LOCATIONS,this.updateDocument,this.formLocation.value).then(resUpd=>{
        this.alert.showSuccessfulOperation()
        this.updateDocument = null
        this.formLocation.reset()
      }).catch(errUpd=>{
        this.alert.showErrorOperation()
        this.updateDocument = null
        this.formLocation.reset()
      })
    }
  }

  updateLocation(location:LocationsMaps){
    this.formLocation.patchValue({"name":location.name})
    this.formLocation.patchValue({"address":location.address})
    this.formLocation.patchValue({"lat":location.lat})
    this.formLocation.patchValue({"lng":location.lng})
    this.updateDocument = location.idDocument
    this.showMarkerOnMap(location.lat,location.lng,this.map)
  }

  deletLocation(event:MouseEvent,idDocument:string){
    event.stopPropagation()
    this.alert.showYesNoQuestionAlert("Eliminar ubicacion",
    "Ya no se podran realizar chacadas desde la app cerca de esta ubicacion, ¿Quieres continuar?",
    "info").then(resQuest=>{
      this.db.deleteDocument(TablesDb.LOCATIONS,idDocument).then(resDel=>{
        this.alert.showSuccessfulOperation("Ubicacion eliminada")
      })
    })
  }

  ngOnDestroy(): void {
    this.subLocationsData?.unsubscribe()
  }

  //INTERACCION CON EL MAPA
  initMap(lat:number,lng:number){
    this.mapService.initMap(lat,lng,"map",11).then((resMap)=>{
      this.map = resMap!
      this.addListenerAutocomplet(this.map)
      this.markersOnMap = this.mapService.putMarkersLocations(this.locationsDataComplet,this.map)
      this.mapLoaded = true
    }).catch(errMap=>{
      this.alert.showErrorOperation("Carga de mapa","No se pudo cargar el mapa, por favor intenta nuevamente","error")
    })
  }

  centerMap(lat:number,lng:number){
    this.mapService.centerMap(lat,lng,this.map)
  }

  addListenerAutocomplet(map:google.maps.Map){
    this.mapService.setAutocomplete(map).then(resAuto=>{
      this.inputAutocomplete = resAuto
      this.inputAutocomplete.addListener("place_changed", () => {
        let place = this.inputAutocomplete.getPlace()
        if (!place.geometry || !place.geometry.location) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No se encontro la direccion: '" + place.name + "'")
          return;
        }
        this.resultsAutocomplet = place
        this.setNewAddresValueOnForm(place.formatted_address!)
        this.showMarkerOnMap(place.geometry.location.lat(),place.geometry.location.lng(),map)
      })
    })
  }

  showMarkerOnMap(lat:number,lng:number,map:google.maps.Map){
    if(this.markerAutocomplete != null){
      this.mapService.removeMarkerAutocomplete(this.markerAutocomplete)
      this.markerAutocomplete = null
    }
    this.markerAutocomplete = this.mapService.putMarkerAutocomplete(lat,lng,map)
    this.markerAutocomplete!.addListener("dragend",()=>{
      console.log(this.markerAutocomplete?.getPosition())
      if(typeof this.markerAutocomplete?.getPosition()?.lat() != "undefined" && typeof this.markerAutocomplete?.getPosition()?.lng() != "undefined"){
        this.findNewPositionMarker(this.markerAutocomplete.getPosition()!.lat(),this.markerAutocomplete.getPosition()!.lng())
      }else{
        this.setNewAddresValueOnForm("Ubicacion no disponible")
      }
    })
    this.centerMap(lat,lng)
  }

  findNewPositionMarker(lat:number,lng:number){
    let geocoder = new google.maps.Geocoder
    geocoder.geocode({ location: { lat:lat,lng:lng } }).then(response => {
      if (response.results[0]) {
        this.setNewAddresValueOnForm(response.results[0].formatted_address)
      } else {
        this.setNewAddresValueOnForm("Ubicacion no disponible")
      }
    }).catch((e) => window.alert("Geocoder failed due to: " + e))
  }

}
