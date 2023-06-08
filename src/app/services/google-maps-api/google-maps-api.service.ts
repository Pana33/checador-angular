import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Loader } from "@googlemaps/js-api-loader"

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsApiService {

  constructor() { }

  private loader = new Loader({
    apiKey: environment.googleMapsApi,
    version: "weekly",
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

  putMarkers(locations:any,map:google.maps.Map){
    let markersToReturn:google.maps.Marker[] = []
    for(let location of locations){
      let contentString =
      '<div id="content">' +
      '<h4 id="firstHeading" class="firstHeading">' + location.name + '</h4>' +
      '<div id="bodyContent">' +
      '<p>' + location.address + '</p>' +
      '</div>' +
      '</div>';

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

}
