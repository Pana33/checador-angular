import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from '../main-menu.component';
import { PageRoutes } from 'src/app/models/page-routes/page-routes';

const routes: Routes = [
  {
    path:'',component:MainMenuComponent,children:[
      {
        path:PageRoutes.REGISTROS,loadChildren: () => import('../../records/module/records.module').then(m => m.RecordsModule)
      },
      {
        path:PageRoutes.EMPLOYEES,loadChildren: () => import('../../employees/module/employees.module').then(m => m.EmployeesModule)
      },
      {
        path:PageRoutes.USUARIOS,loadChildren: () => import('../../users/module/users.module').then(m => m.UsersModule)
      },
      {
        path:PageRoutes.SETTINGS,loadChildren: () => import('../../settings/module/settings.module').then(m => m.SettingsModule)
      },
      {
        path:'**',redirectTo:PageRoutes.REGISTROS,pathMatch:'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainMenuRoutingModule { }
