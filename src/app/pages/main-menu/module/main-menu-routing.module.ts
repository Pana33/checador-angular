import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from '../main-menu.component';
import { PageRoutes } from 'src/app/shared/models/page-routes/page-routes';
import { AdminUserGuard } from 'src/app/shared/guards/admin-user/admin-user.guard';

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
        path:PageRoutes.USUARIOS,canActivate:[AdminUserGuard],loadChildren: () => import('../../users/module/users.module').then(m => m.UsersModule)
      },
      {
        path:PageRoutes.LOCATIONS,canActivate:[AdminUserGuard],loadChildren: () => import('../../locations/module/locations.module').then(m => m.LocationsModule)
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
