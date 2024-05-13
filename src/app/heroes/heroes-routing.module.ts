import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroLayoutPageComponent } from './pages/hero-layout-page/hero-layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';


//localhost:4200/heroes
const routes: Routes = [
  {
    path: '',
    component: HeroLayoutPageComponent,
    //Rutas hijas porque van despues del //localhost:4200/heroes/.....
    children: [
      {
       path: 'new-hero', component: NewPageComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
