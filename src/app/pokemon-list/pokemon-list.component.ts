import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../common/services/pokemon.service';
import { Pokemon } from '../../common/interfaces/pokemon';
import { PokemonResult } from '../../common/interfaces/pokemon-result';
import { PaginatedList } from '../../common/interfaces/paginated-list';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  paginatedList: PaginatedList = { count: 0, next: '', previous: '', results: [] };  // Hold the list of pokemon
  pages: number[] = [];
  currentPage = 1;
  hola = 'algo bueno';

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonListByOffset(0)
      .subscribe((paginatedList) => {
        this.paginatedList = paginatedList;
        this.pages = this.pokemonService.calculatePokemonPages(paginatedList.count);
      });
  }

  // Load a list of pokemon from service
  getPokemonList(url: string): void {
    this.pokemonService.getPokemonListByURL(url)
      .subscribe(paginatedList => this.paginatedList = paginatedList);
  }

  loadPokemon(pokemonObj: PokemonResult): void {
        this.pokemonService.loadPokemon(pokemonObj)
      .subscribe(pokemon => console.log(`Pokemon loaded: `, pokemon));
  }

  testMethod(url: string): void {
    console.log('executed!!', url);
  }

  // Paginator
  goPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.getPokemonList(this.paginatedList.previous);
    }
  }

  goNextPage(): void {
    if (this.currentPage < this.pages.length) {
      console.log('this.paginatedList', this.paginatedList);
      this.currentPage = this.currentPage + 1;
      this.getPokemonList(this.paginatedList.next);
    }
  }
}
