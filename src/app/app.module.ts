import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InViewDirective } from '../common/directives/in-view.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PageNotFoundComponent,
    InViewDirective,
    PokemonCardComponent,
    PokemonDetailComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
