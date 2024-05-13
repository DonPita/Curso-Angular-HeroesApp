import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutPageComponent } from './pages/auth-layout-page/auth-layout-page.component';


//localhost:4200/auth
const routes: Routes = [
  {
    path: '',
    component: AuthLayoutPageComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
