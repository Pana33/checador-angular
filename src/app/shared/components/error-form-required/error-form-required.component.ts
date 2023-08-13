import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-form-required',
  templateUrl: './error-form-required.component.html',
  styleUrls: ['./error-form-required.component.scss']
})
export class ErrorFormRequiredComponent {
  @Input() touched:boolean = false
  @Input() errorRequired:boolean = false
}
