import { EventEmitter, Injectable, Output } from '@angular/core';
import { EmployeeDb, UserDb } from 'src/app/shared/models/type-person/type-person';

@Injectable({
  providedIn: 'root'
})
export class EmittersService {
  @Output() activeModal:EventEmitter<UserDb | EmployeeDb | string> = new EventEmitter()
}
