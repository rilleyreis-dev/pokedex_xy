
export interface BasePokemon {
  name: string;
  id: number;
  routes?: string[];
}

export interface PokemonSprites {
  front_default: string;
  other?: {
    'official-artwork': {
      front_default: string | null;
    };
    dream_world: {
      front_default: string | null;
    }
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number; // decimetres
  weight: number; // hectograms
  sprites: PokemonSprites;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  routes?: string[]; // Added to ensure detailed Pokemon can also hold route info if needed
}

export enum PokemonStatName {
  HP = "hp",
  Attack = "attack",
  Defense = "defense",
  SpecialAttack = "special-attack",
  SpecialDefense = "special-defense",
  Speed = "speed",
}

export const MAX_STAT_VALUE = 255;

export interface GymLeaderInfo {
  gym_leader: string;
  city: string;
  specialty: string; // Specialty type in Portuguese
  badge_name: string;
  badge_image: string;
}
