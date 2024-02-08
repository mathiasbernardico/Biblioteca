export interface Digimon {
  img: string;
  level: string;
  name: string;
}
export interface Pokemon {
    name: string
    img: string
}

export interface ResponsePokemonApi {
  abilities: Array<Object>;
  base_experience: Number;
  forms: Array<Object>;
  game_indices: Array<Object>;
  height: Number;
  held_items: Array<Object>;
  id: Number;
  is_default: Boolean;
  location_area_encounters: string;
  moves: Array<Object>;
  name: string;
  order: Number;
  past_abilities: Array<Object>;
  past_types: Array<Object>;
  species: Object;
  sprites: Object;
  stats: Array<Object>;
  types: Array<Object>;
  weight: Number;
}
export type ResponseDigimonApi = Array<{
  img: string;
  level: string;
  name: string;
}>