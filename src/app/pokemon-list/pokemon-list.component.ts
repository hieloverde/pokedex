import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../common/services/pokemon.service';
import { Pokemon } from '../../common/interfaces/pokemon';
import { PokemonResult } from '../../common/interfaces/pokemon-result';
import { PaginatedList } from '../../common/interfaces/paginated-list';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  paginatedList: PaginatedList = { count: 0, next: '', previous: '', results: [] };  // Hold the list of pokemon
  pages: number[] = [];
  currentPage = 1;
  option: string | null = '';   // option can be 'all' or 'fav-only'

  // Expose font awesome icons to be used
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  constructor(private pokemonService: PokemonService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      this.option = params.get('option');
    });

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

  goToPageByOffset(pageNumber: number, pageOffset: number): void {
    this.pokemonService.getPokemonListByOffset(pageOffset)
      .subscribe((paginatedList) => {
        this.paginatedList = paginatedList;
        this.currentPage = pageNumber;
      });
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
