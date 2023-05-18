import { Component } from '@angular/core';
import { EmittersService } from 'src/app/services/emitters/emitters.service';

@Component({
  selector: 'app-button-modal-add',
  templateUrl: './button-modal-add.component.html',
  styleUrls: ['./button-modal-add.component.scss']
})
export class ButtonModalAddComponent {

  constructor(private emitter:EmittersService){}

  showModalForm(){
    this.emitter.activeModal.emit("add")
  }
  
}
