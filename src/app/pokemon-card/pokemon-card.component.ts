import {Component, Input, OnInit} from '@angular/core';
import {PokemonResult} from '../../common/interfaces/pokemon-result';
import {PokemonService} from '../../common/services/pokemon.service';
import {PokemonImpl} from '../../common/models/pokemon';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

  @Input() pokemonResult: any;

  constructor(private pokemonService: PokemonService) { }

  pokemon: any;
  ready = false;

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

}
