import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {Pokemon} from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokeAPIUrl = 'https://pokeapi.co/api/v2/pokemon';  // URL to web api

  constructor(private http: HttpClient) { }

  /** GET list of pokemon */
  getPokemonList(): Observable<any> {
    const url = `${this.pokeAPIUrl}?limit=25&offset=0`;
    return this.http.get<any>(url).pipe(
      map(response => response.results),
      catchError(this.handleError<any>('getPokemonList', []))
    );
  }

  /** GET pokemon by id */
  findPokemonById(id: number): Observable<Pokemon> {
    const url = `${this.pokeAPIUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(this.handleError<Pokemon>(`getPokemonById id=${id}`))
    );
  }

  /* GET pokemon by name */
  findPokemonByName(term: string): Observable<Pokemon[]> {
    if (!term.trim()) {
      // if not search term, return empty pokemon array.
      return of([]);
    }
    return this.http.get<Pokemon[]>(`${this.pokeAPIUrl}/${term}`).pipe(
      catchError(this.handleError<Pokemon[]>('findPokemonByName', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
