import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {PokemonService} from '../common/services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pokédex';
  searchValue = '';

  constructor(private router: Router, public pokemonService: PokemonService) {
  }

  search(): void {
    console.log('this.searchValue', this.searchValue);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/pokemon-detail', this.searchValue]);
  }
}
