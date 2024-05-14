import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './hero-layout-page.component.html',
  styles: ``
})

export class HeroLayoutPageComponent {

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ]


}

