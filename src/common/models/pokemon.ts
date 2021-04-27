import { Pokemon } from '../interfaces/pokemon';
import { Deserializable } from '../interfaces/deserializable';

export class PokemonImpl implements Pokemon, Deserializable {

  constructor(public id: number,
              public name: string,
              public height: number,
              public weight: number,
              public imageUrl: string) {}

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
