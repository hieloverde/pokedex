import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pokédex';
  searchValue = '';

  constructor(private router: Router) {
  }

  search(): void {
    console.log('this.searchValue', this.searchValue);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/pokemon-detail', this.searchValue]);
  }
}
