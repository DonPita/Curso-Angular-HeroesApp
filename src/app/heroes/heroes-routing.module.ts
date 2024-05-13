import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroLayoutPageComponent } from './pages/hero-layout-page/hero-layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';


//localhost:4200/heroes
const routes: Routes = [
  {
    path: '',
    component: HeroLayoutPageComponent,
    //Rutas hijas porque van despues del //localhost:4200/heroes/.....
    children: [
      { path: 'new-hero', component: NewPageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'edit/:id', component: NewPageComponent },
      { path: 'list', component: ListPageComponent },
      /*:id es un comodin, tiene que ir al final, si va al principio el resto
      no entrarian, porque entrarian por :id*/
      { path: ':id', component: HeroPageComponent },
      { path: '**', redirectTo: 'list' },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
