import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonResult } from '../interfaces/pokemon-result';
import { PaginatedList } from '../interfaces/paginated-list';
import { PokemonImpl } from '../models/pokemon';
import {LocalStorageService} from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private pokeAPIUrl = 'https://pokeapi.co/api/v2/pokemon';  // URL to web api

  public resultLimit = 12;
  private favoritesKey = 'PokeDexFavorites';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  /** GET list of pokemon using the provided offset value */
  getPokemonListByURL(url: string): Observable<PaginatedList> {
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
      map((pokemon: any) => new PokemonImpl(
        pokemon.id,
        pokemon.name,
        pokemon.height,
        pokemon.weight,
        pokemon.sprites.front_default,
        this.isPokemonInFavorite(pokemon.id),
        pokemon.types.map((type: any) => type.type.name).join(', '))),
      catchError(this.handleError<PokemonImpl>(`loadPokemon url=${pokemonResult.url}`))
    );
  }

  /** GET pokemon by id */
  findPokemonById(id: number): Observable<PokemonImpl> {
    const url = `${this.pokeAPIUrl}/${id}`;
    return this.http.get<PokemonImpl>(url).pipe(
      map((pokemon: any) => new PokemonImpl(
        pokemon.id,
        pokemon.name,
        pokemon.height,
        pokemon.weight,
        pokemon.sprites.front_default,
        this.isPokemonInFavorite(pokemon.id),
        pokemon.types.map((type: any) => type.type.name).join(', '))),
      catchError(this.handleError<PokemonImpl>(`getPokemonById id=${id}`))
    );
  }

  /** GET pokemon by name */
  findPokemonByName(term: string): Observable<PokemonImpl> {
    return this.http.get<PokemonImpl>(`${this.pokeAPIUrl}/${term}`).pipe(
      map((pokemon: any) => new PokemonImpl(
        pokemon.id,
        pokemon.name,
        pokemon.height,
        pokemon.weight,
        pokemon.sprites.front_default,
        this.isPokemonInFavorite(pokemon.id),
        pokemon.types.map((type: any) => type.type.name).join(', '))),
      catchError(this.handleError<PokemonImpl>('findPokemonByName term=' + term))
    );
  }

  /** GET pokemon favorites */
  isPokemonInFavorite(id: number): boolean {
    let currentFavorites = this.localStorageService.get(this.favoritesKey);
    currentFavorites = (currentFavorites != null) ? currentFavorites : [];
    return (currentFavorites.indexOf(id) !== -1);
  }

  /** GET pokemon favorites */
  getFavorites(): any[] {
    const currentFavorites = this.localStorageService.get(this.favoritesKey);
    if (currentFavorites != null) {
      return currentFavorites;
    } else {
      return [];
    }
  }

  /** INSERT pokemon to favorites */
  addToFavorites(id: number): void {
    let currentFavorites = this.localStorageService.get(this.favoritesKey);
    currentFavorites = (currentFavorites != null) ? currentFavorites : [];
    if (!this.isPokemonInFavorite(id)) { currentFavorites.push(id); }
    this.localStorageService.set(this.favoritesKey, currentFavorites);
  }

  /** REMOVE pokemon from favorites */
  removeFromFavorites(id: number): void {
    const currentFavorites = this.localStorageService.get(this.favoritesKey);
    const pokemonIndex = currentFavorites.indexOf(id);
    if (this.isPokemonInFavorite(id)) { currentFavorites.splice(pokemonIndex, 1); }
    this.localStorageService.set(this.favoritesKey, currentFavorites);
  }

  calculatePokemonPages(total: number): number[] {
    const pages = Math.floor(total / this.resultLimit);
    const result: number[] = [];
    for (let i = 0; i < pages; i++) {
      result[i] = i * this.resultLimit;
    }
    return result;
  }

  /** GET array of results from pokemon ids */
  generateResultListFromIds(ids: number[]): Observable<PokemonResult[]> {
    const results: PokemonResult[] = [];
    for (const pokemonId of ids) {
      results.push({
        name: '', url: `${this.pokeAPIUrl}/${pokemonId}`
      });
    }
    return of(results);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
