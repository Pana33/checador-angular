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

  initMap(lat:number,lng:number,idDivToLoadMap:string){
    return new Promise<google.maps.Map|null>((res,rej)=>{
      this.loader.load().then(() => {
        let map:google.maps.Map = new google.maps.Map(document.getElementById(idDivToLoadMap) as HTMLElement, {
          center: { lat: lat, lng: lng },
          zoom: 13,
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
  }

}
