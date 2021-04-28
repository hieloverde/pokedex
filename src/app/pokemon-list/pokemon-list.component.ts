import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../common/services/pokemon.service';
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
  option = 'all';   // option can be 'all' or 'fav-only'

  // Expose font awesome icons to be used
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  constructor(private pokemonService: PokemonService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    setInterval(() => {
      this.pokemonService.errors = [];
    }, 10000);

    this.activatedroute.paramMap.subscribe(params => {
      this.option = params.get('option') || 'all';

      switch (this.option) {
        case 'all':
          this.loadAll();
          break;
        case 'fav-only':
          this.loadFavorites();
          break;
      }
    });
  }

  // Load list of pokemon result based on an initial offset and page limit from service
  loadAll(): void {
    this.pokemonService.getPokemonListByOffset(0)
      .subscribe((paginatedList) => {
        this.paginatedList = paginatedList;
        this.pages = this.pokemonService.calculatePokemonPages(paginatedList.count);
      });
  }

  // Creates a result list based on the pokemon marked as favorites
  loadFavorites(): void {
    this.pokemonService.generateResultListFromIds(this.pokemonService.getFavorites().sort())
      .subscribe((pokemonResult: PokemonResult[]) => {
        this.paginatedList = {
          results: pokemonResult,
          previous: '',
          next: '',
          count: pokemonResult.length
        };
      });
  }

  // Load a list of pokemon from service
  getPokemonList(url: string): void {
    this.pokemonService.getPokemonListByURL(url)
      .subscribe(paginatedList => this.paginatedList = paginatedList);
  }

  // Jumps to a pokemon page based on given offset
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
      this.currentPage = this.currentPage + 1;
      this.getPokemonList(this.paginatedList.next);
    }
  }
}
