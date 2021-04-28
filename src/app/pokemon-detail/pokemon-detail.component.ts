import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PokemonImpl} from '../../common/models/pokemon';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {PokemonService} from '../../common/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  constructor(private router: Router, private activatedroute: ActivatedRoute, private pokemonService: PokemonService) { }

  faStar = faStar;

  pokemon: PokemonImpl = new PokemonImpl(0, '', 0, 0, '', false, '');

  ngOnInit(): void {
    // This Pokemon was loaded by a route resolver
    this.pokemon = this.activatedroute.snapshot.data.pokemon;
    if (typeof this.pokemon === 'undefined') {
      console.log('redirecting...');
      this.router.navigate(['/pokemon-list', 'all']);
    }
    console.log('this.pokemon', this.pokemon);
  }

  addToFavorites(id: number): void {
    this.pokemonService.addToFavorites(id);
    this.pokemon.isFavorite = true;
  }

  removeFromFavorites(id: number): void {
    this.pokemonService.removeFromFavorites(id);
    this.pokemon.isFavorite = false;
  }

}
