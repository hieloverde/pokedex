import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {PokemonDetailComponent} from './pokemon-detail/pokemon-detail.component';
import {PokemonResolver} from '../common/resolvers/pokemon.resolver';

const routes: Routes = [
  {path: 'pokemon-list/:option', component: PokemonListComponent},
  {path: 'pokemon-detail/:id', component: PokemonDetailComponent, resolve: { pokemon: PokemonResolver }},
  {path: '', redirectTo: '/pokemon-list/all', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
