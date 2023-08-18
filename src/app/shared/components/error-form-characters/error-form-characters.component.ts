import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-form-characters',
  templateUrl: './error-form-characters.component.html',
  styleUrls: ['./error-form-characters.component.scss']
})
export class ErrorFormCharactersComponent {
  @Input() touched:boolean = false
  @Input() errorPattern:boolean = false
  @Input() validCharacters:string = ""
}
