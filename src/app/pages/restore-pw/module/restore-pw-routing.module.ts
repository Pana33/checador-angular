import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestorePwComponent } from '../restore-pw.component';

const routes: Routes = [
  {
    path:'',component:RestorePwComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestorePwRoutingModule { }
