import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageRoutes } from './shared/models/page-routes/page-routes';
import { UserActiveGuard } from './shared/guards/user-active/user-active.guard';

const routes: Routes = [
  {
    path:'',redirectTo:PageRoutes.LOGIN,pathMatch:'full'
  },
  {
    path:PageRoutes.LOGIN,component:LoginComponent
  },
  {
    path:PageRoutes.RESTORE_PW,loadChildren: () => import('./pages/restore-pw/module/restore-pw.module').then(m => m.RestorePwModule)
  },
  {
    path:PageRoutes.MENU,canMatch:[UserActiveGuard],loadChildren: () => import('./pages/main-menu/module/main-menu.module').then(m => m.MainMenuModule)
  },
  {
    path:'**',redirectTo:PageRoutes.LOGIN
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
