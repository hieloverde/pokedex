import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {PokemonImpl} from '../models/pokemon';
import {PokemonService} from '../services/pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonResolver implements Resolve<PokemonImpl> {
  constructor(private pokemonService: PokemonService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PokemonImpl> {
    const pokemonId: number = Number(route.paramMap.get('id'));
    if (isNaN(pokemonId)) {
      return this.pokemonService.findPokemonByName(route.paramMap.get('id') || '');
    } else {
      return this.pokemonService.findPokemonById(pokemonId);
    }
  }
}
