import { Component } from '@angular/core';
import { EmittersService } from 'src/app/services/emitters/emitters.service';

@Component({
  selector: 'app-button-side-menu',
  templateUrl: './button-side-menu.component.html',
  styleUrls: ['./button-side-menu.component.scss']
})
export class ButtonSideMenuComponent {

  constructor(private emitter:EmittersService){}

  showSideNavMenu(){
    this.emitter.togglerSidenav.emit(true)
  }

}
