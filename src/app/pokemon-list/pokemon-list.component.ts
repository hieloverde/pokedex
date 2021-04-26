import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../common/services/pokemon.service';
import {Pokemon} from '../../common/interfaces/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemonList: any = [];  // Hold the list of pokemon

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemonList();
  }

  // Load a list of pokemon from service
  getPokemonList(): void {
    this.pokemonService.getPokemonList()
      .subscribe(pokemonList => this.pokemonList = pokemonList);
    console.log(this.pokemonList);
  }

}
