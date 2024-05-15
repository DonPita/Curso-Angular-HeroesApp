import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';


@Injectable({
  providedIn: 'root'
})

export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private hhtpClient: HttpClient) { }

  //list.page.component OnInit para conseguir los heroes de la BD
  getHeroes(): Observable<Hero[]> {

    return this.hhtpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  /*Para usar en el hero.page.component OnInit
  Undefined porque puede pasar un id que no exista*/
  getHeroById(id: string): Observable<Hero | undefined> {

    return this.hhtpClient.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      //manejar el error de conseguir un id erroneo
      .pipe(
        catchError(error => of(undefined))
      );
  }

  //Autocomplete para usar en search-page.component
  getSuggestions(query: string): Observable<Hero[]> {
    return this.hhtpClient.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }

  //Servicios para añadir, modificar o borrar heroes
  addHero(hero: Hero): Observable<Hero> {
    //Añadir heroe, 1 argumento: la url y segundo el heroe.
    return this.hhtpClient.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Hero is required');
    //Actualizar heroe, 1 argumento: la url y segundo el heroe.
    return this.hhtpClient.patch<Hero>(`${this.baseUrl}/heroes(${hero.id})`, hero);
  }

  deleteHeroById(id: string): Observable<boolean> {

    return this.hhtpClient.delete<Hero>(`${this.baseUrl}/heroes(${id})`)
      .pipe(
        catchError(error => of(false)),
        map(resp => true)
      );
    /**/
  }
}
