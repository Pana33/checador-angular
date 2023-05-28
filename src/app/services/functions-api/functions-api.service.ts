import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { RouteFunctionsApi } from 'src/app/shared/models/route-functions-api/route-functions-api';
import { FormGroup } from '@angular/forms';

interface ResponseFunctions {
  estatus:string
}

@Injectable({
  providedIn: 'root'
})
export class FunctionsApiService {

  constructor(private http:HttpClient) { }

  private pathApi = "https://us-central1-checador-empresarial.cloudfunctions.net/managePeople"

  addUser(data:FormGroup){
    return this.http.post<ResponseFunctions>(this.pathApi + RouteFunctionsApi.ADD_USER,data)
  }

  disableEnableUser(data:FormGroup){
    return this.http.put<ResponseFunctions>(this.pathApi + RouteFunctionsApi.UPDATE_USER,data)
  }

  deleteUser(data:FormGroup){
    return this.http.put<ResponseFunctions>(this.pathApi + RouteFunctionsApi.DELETE_USER,data)
  }

  addEmployee(data:FormGroup){
    return this.http.post<ResponseFunctions>(this.pathApi + RouteFunctionsApi.ADD_EMPLOYEE,data)
  }

  disableEnableEmployee(data:FormGroup){
    return this.http.put<ResponseFunctions>(this.pathApi + RouteFunctionsApi.UPDATE_EMPLOYEE,data)
  }

  deleteEmployee(data:FormGroup){
    return this.http.put<ResponseFunctions>(this.pathApi + RouteFunctionsApi.DELETE_EMPLOYEE,data)
  }

}
