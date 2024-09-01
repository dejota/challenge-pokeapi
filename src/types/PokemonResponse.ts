export interface PokemonData {
  name: string;
  url: string;
}

export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonData[];
}

export interface SinglePokemon {
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: PokemonData;
  }[];
}

export interface SinglePokemonExtended extends SinglePokemon {
  favorite: boolean;
  url: string;
}
