import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RouteFunctionsApi } from 'src/app/shared/models/route-functions-api/route-functions-api';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FunctionsApiService {

  constructor(private http:HttpClient) { }

  private pathApi = "https://us-central1-checador-empresarial.cloudfunctions.net/managePeople"

  addUser(data:FormGroup){
    return this.http.post(this.pathApi + RouteFunctionsApi.ADD_USER,data)
  }
}
