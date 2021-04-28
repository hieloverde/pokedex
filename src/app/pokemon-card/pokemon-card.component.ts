import {Component, Input, OnInit} from '@angular/core';
import {PokemonResult} from '../../common/interfaces/pokemon-result';
import {PokemonService} from '../../common/services/pokemon.service';
import {PokemonImpl} from '../../common/models/pokemon';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {PokemonListComponent} from '../pokemon-list/pokemon-list.component';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemonResult: any;
  @Input() listType = '';

  constructor(private pokemonService: PokemonService, private pokemonListComponent: PokemonListComponent) { }

  pokemon: any;
  ready = false;
  faStar = faStar;

  ngOnInit(): void {
    this.loadPokemon(this.pokemonResult);
  }

  loadPokemon(pokemonObj: PokemonResult): void {
    this.pokemonService.loadPokemon(pokemonObj)
      .subscribe((pokemon: PokemonImpl) => {
        this.pokemon = pokemon;
        this.ready = true;
        // console.log('this.pokemon', this.pokemon);
      });
  }

  addToFavorites(id: number): void {
    this.pokemonService.addToFavorites(id);
    this.pokemon.isFavorite = true;
  }

  removeFromFavorites(id: number): void {
    this.pokemonService.removeFromFavorites(id);
    this.pokemon.isFavorite = false;
    if (this.listType === 'fav-only') {
      this.pokemonListComponent.loadFavorites();
    }
  }

  shouldShow(isFavorite: boolean): boolean {
    return (isFavorite || this.listType === 'all');
  }
}
