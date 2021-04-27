import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonResult } from '../interfaces/pokemon-result';
import { PaginatedList } from '../interfaces/paginated-list';
import { PokemonImpl } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokeAPIUrl = 'https://pokeapi.co/api/v2/pokemon';  // URL to web api

  public resultLimit = 12;

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

  loadPokemon(pokemonResult: PokemonResult): Observable<PokemonImpl> {
    return this.http.get(pokemonResult.url).pipe(
      map((pokemon: any) => new PokemonImpl(pokemon.id, pokemon.name, pokemon.height, pokemon.weight, pokemon.sprites.front_default)),
      catchError(this.handleError<PokemonImpl>(`loadPokemon url=${pokemonResult.url}`))
    );
  }

  /** GET pokemon by id */
  findPokemonById(id: number): Observable<PokemonImpl> {
    const url = `${this.pokeAPIUrl}/${id}`;
    return this.http.get<PokemonImpl>(url).pipe(
      map((pokemon: any) => new PokemonImpl(pokemon.id, pokemon.name, pokemon.height, pokemon.weight, pokemon.sprites.front_default)),
      catchError(this.handleError<PokemonImpl>(`getPokemonById id=${id}`))
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
      result[i] = i * this.resultLimit;
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
