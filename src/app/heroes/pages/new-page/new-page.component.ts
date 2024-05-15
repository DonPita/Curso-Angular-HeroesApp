import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})

export class NewPageComponent {

  constructor(private heroesService: HeroesService) { }

  //Creando el Formulario Reactivo, propiedades son la de la interface
  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  //Para en ngFor del creador en el html
  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ]


  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }


  onSubmit(): void {
    //Si no hay nada
    if (this.heroForm.invalid) {
      return;
    }
    //Si tenemos actualmente un id
    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero)
        .subscribe(hero => {
          //TODO mostrar snackbar
        });

      return;
    }

    //Si no tenemos un ID
    this.heroesService.addHero(this.currentHero)
      .subscribe( hero => {
        //TODO mostrar snackbar, y navegar a /heroes/edit hero.id
      })

  }

}
