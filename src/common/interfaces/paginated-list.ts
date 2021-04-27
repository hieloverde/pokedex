import { PokemonResult } from './pokemon-result';

export interface PaginatedList {
  count: number;
  next: string;
  previous: string;
  results: PokemonResult[];
}
