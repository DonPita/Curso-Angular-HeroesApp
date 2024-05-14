import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
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

  //Autocomplete
  getSuggestions(query: string): Observable<Hero[]> {
    return this.hhtpClient.get<Hero[]>(`/heroes?q=${ query }&_limit=6`);
  }

}
