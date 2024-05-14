import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';


@Injectable({
  providedIn: 'root'
})

export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private hhtpClient: HttpClient) { }

  getHeroes(): Observable<Hero[]> {

    return this.hhtpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

}