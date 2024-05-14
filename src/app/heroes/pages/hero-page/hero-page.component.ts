import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';


@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  /*Uso del getHeroById de heroes.service para la correcta navegación entre
  rutas del list-page y el hero-page, tramitando los posibles errores.*/
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(1000),
        switchMap(({ id }) => this.heroesService.getHeroById(id)),
      ).subscribe(hero => {
        if (!hero) return this.router.navigate(['/heroes/list']);

        this.hero = hero;
        return;
      })
  }

  //Metodo para el boton regresar en el hero-page
  goBack():void {
    this.router.navigateByUrl('heroes/list');
  }
}
