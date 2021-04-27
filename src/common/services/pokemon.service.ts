import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonResult } from '../interfaces/pokemon-result';
import { PaginatedList } from '../interfaces/paginated-list';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokeAPIUrl = 'https://pokeapi.co/api/v2/pokemon';  // URL to web api

  public resultLimit = 27;

  constructor(private http: HttpClient) { }

  /** GET list of pokemon using the provided offset value */
  getPokemonListByURL(url: string): Observable<any> {
    return this.http.get<PaginatedList>(url).pipe(
      catchError(this.handleError<PaginatedList>( `getPokemonListByURL url=${url}`))
    );
  }

  /** GET list of pokemon using the provided offset value */
  getPokemonListByOffset(offset: number): Observable<any> {
    const url = `${this.pokeAPIUrl}?limit=${this.resultLimit}&offset=${offset}`;
    return this.http.get<PaginatedList>(url).pipe(
      catchError(this.handleError<PaginatedList>(`getPokemonListByURL offset=${offset}`))
    );
  }

  loadPokemon(pokemon: PokemonResult): Observable<Pokemon> {
    return this.http.get<Pokemon>(pokemon.url).pipe(
      catchError(this.handleError<Pokemon>(`loadPokemon url=${pokemon.url}`))
    );
  }

  /** GET pokemon by id */
  findPokemonById(id: number): Observable<Pokemon> {
    const url = `${this.pokeAPIUrl}/${id}`;
    return this.http.get<Pokemon>(url).pipe(
      catchError(this.handleError<Pokemon>(`getPokemonById id=${id}`))
    );
  }

  /** GET pokemon by name */
  findPokemonByName(term: string): Observable<Pokemon[]> {
    if (!term.trim()) {
      // if not search term, return empty pokemon array.
      return of([]);
    }
    return this.http.get<Pokemon[]>(`${this.pokeAPIUrl}/${term}`).pipe(
      catchError(this.handleError<Pokemon[]>('findPokemonByName', []))
    );
  }

  calculatePokemonPages(total: number): number[] {
    const pages = Math.floor(total / this.resultLimit);
    const result: number[] = [];
    for (let i = 0; i < pages; i++) {
      result[i] = (i + 1) * this.resultLimit;
    }
    return result;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
