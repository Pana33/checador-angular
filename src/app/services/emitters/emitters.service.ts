import { EventEmitter, Injectable, Output } from '@angular/core';
import { RecordEmployee } from 'src/app/shared/models/record-employee/record-employee';
import { EmployeeDb, UserDb } from 'src/app/shared/models/type-person/type-person';

@Injectable({
  providedIn: 'root'
})
export class EmittersService {
  @Output() activeModal:EventEmitter<UserDb | EmployeeDb | string> = new EventEmitter<UserDb | EmployeeDb | string>()
  @Output() showRecordOnMap:EventEmitter<RecordEmployee[]> = new EventEmitter<RecordEmployee[]>()
  @Output() togglerSidenav:EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() userDataEmitter:EventEmitter<UserDb | undefined> = new EventEmitter<UserDb | undefined>()
}
