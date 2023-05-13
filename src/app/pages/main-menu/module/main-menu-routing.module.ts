import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from '../main-menu.component';

const routes: Routes = [
  {
    path:'',component:MainMenuComponent,children:[
      {
        path:'registros',loadChildren: () => import('../../records/module/records.module').then(m => m.RecordsModule)
      },
      {
        path:'usuarios',loadChildren: () => import('../../users/module/users.module').then(m => m.UsersModule)
      },
      {
        path:'**',redirectTo:'registros',pathMatch:'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainMenuRoutingModule { }
