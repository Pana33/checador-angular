import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Loader } from "@googlemaps/js-api-loader"
import { LocationsMaps } from 'src/app/shared/models/locations-maps/locations-maps';
import { RecordEmployee } from 'src/app/shared/models/record-employee/record-employee';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsApiService {

  constructor() { }

  private loader = new Loader({
    apiKey: environment.googleMapsApi,
    version: "weekly",
    libraries:["places"],
  });

  initMap(lat:number,lng:number,idDivToLoadMap:string,zoom:number=11){
    return new Promise<google.maps.Map|null>((res,rej)=>{
      this.loader.load().then(() => {
        let map:google.maps.Map = new google.maps.Map(document.getElementById(idDivToLoadMap) as HTMLElement, {
          center: { lat: lat, lng: lng },
          zoom: zoom,
          disableDefaultUI: true,
        })
        res(map)
      }).catch(err=>{
        rej(null)
      })
    })
  }

  centerMap(lat:number,lng:number,map:google.maps.Map){
    map.setCenter({lat:lat,lng:lng})
    map.setZoom(14)
  }

  putMarkersLocations(locations:LocationsMaps[],map:google.maps.Map){
    let markersToReturn:google.maps.Marker[] = []
    for(let location of locations){
      let contentString =
      '<div id="content">' +
      '<h4 id="firstHeading" class="firstHeading">' + location.name + '</h4>' +
      '<div id="bodyContent">' +
      '<p>' + location.address + '</p>' +
      '</div>' +
      '</div>'
      let infowindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: location.name,
      });
      let marker = new google.maps.Marker({
        position: {lat:location.lat,lng:location.lng},
        map,
        title: location.name,
      });
      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
      });
      markersToReturn.push(marker)
    }
    return markersToReturn
  }

  putMarkersRecords(records:RecordEmployee[],map:google.maps.Map){
    let markersToReturn:google.maps.Marker[] = []
    for(let record of records){
      let currentDate = new Date(record.dateTime.seconds*1000)
      let contentString =
      '<div id="content">' +
      '<h6>' + record.type + '</h6>' +
      '<div>' +
      '<p class="fw-bold"><b>' + record.namePlace + '</b></p>' +
      '<p>' + record.fullName + '</p>' +
      '<p>' + currentDate.toLocaleString("es-mx") + '</p>' +
      '</div>' +
      '</div>'
      let infowindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: record.fullName,
      });
      let marker = new google.maps.Marker({
        position: {lat:record.lat,lng:record.lng},
        map,
        title: record.fullName,
      });
      infowindow.open({
        anchor: marker,
        map,
      })
      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
      });
      markersToReturn.push(marker)
    }
    return markersToReturn
  }

  removeMarkers(markers:google.maps.Marker[]){
    for(let marker of markers){
      marker.setMap(null)
    }
  }

  //TRABAJO CON EL AUTOCOMPLETAR
  setAutocomplete(map:google.maps.Map){
    return new Promise<google.maps.places.Autocomplete>((res,rej)=>{
      let inputAutocomplet = document.getElementById("autocomplet") as HTMLInputElement
      let optionsAutocomplet = {
        fields: ["formatted_address", "geometry"],
        strictBounds: true,
        componentRestrictions: { country: "mx" },
        types: ["address"],
      }
      let autocomplet = new google.maps.places.Autocomplete(inputAutocomplet, optionsAutocomplet)
      autocomplet.bindTo("bounds",map)
      res(autocomplet)
    })
  }

  putMarkerAutocomplete(lat:number,lng:number,map:google.maps.Map){
    let marker = new google.maps.Marker({
      position: {lat:lat,lng:lng},
      map,
      draggable:true,
      title:"Puedes arrastrar el marcador"
    })
    return marker
  }

  removeMarkerAutocomplete(marker:google.maps.Marker){
    marker.setMap(null)
  }

}
