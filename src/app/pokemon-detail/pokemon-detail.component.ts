import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonImpl} from '../../common/models/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  constructor(private activatedroute: ActivatedRoute) { }

  pokemon: PokemonImpl = new PokemonImpl(0, '', 0, 0, '');

  ngOnInit(): void {
    // This Pokemon was loaded by a route resolver
    this.pokemon = this.activatedroute.snapshot.data.pokemon;
    // console.log('this.pokemon', this.pokemon);
  }

}
