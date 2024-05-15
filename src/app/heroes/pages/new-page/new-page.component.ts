import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { filter, switchMap, tap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})

export class NewPageComponent implements OnInit {

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }


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


  ngOnInit(): void {
    /*Si no incluye edit en el URL el formulario queda vacio
      Si incluye el edit, estamos editando, por tanto hay que agregar de
      inicio los valores del superheroe a editar*/
    if (!this.router.url.includes('edit')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id)),
      ).subscribe(hero => {
        if (!hero) {
          return this.router.navigateByUrl('/');
        }

        this.heroForm.reset(hero);
        return;
      })
  }

  onDeleteHero() {
    if (!this.currentHero.id) {
      throw Error('Hero is required')
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.heroesService.deleteHeroById(this.currentHero.id)),
        filter((wasDeleted: boolean) => wasDeleted),
      )
      .subscribe(() => {
        this.router.navigate(['/heroes'])
      })


    // dialogRef.afterClosed().subscribe(result => {
    //   if (!result) {
    //     return;
    //   }

    //   this.heroesService.deleteHeroById(this.currentHero.id)
    //     .subscribe(wasDeleted => {
    //       if (wasDeleted) {
    //         this.router.navigate(['/heroes'])
    //       }
    //     })
    // });
  }

  //Método para insertar el SnackBar
  showSnackBar(message: string): void {
    this.snackbar.open(message, 'done', { duration: 2500 });
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
          this.showSnackBar(`${hero.superhero} updated!`)
        });

      return;
    }

    //Si no tenemos un ID
    this.heroesService.addHero(this.currentHero)
      .subscribe(hero => {
        this.router.navigate(['heroes/edit/', hero.id]);
        this.showSnackBar(`${hero.superhero} created!`);
      })

  }

}
