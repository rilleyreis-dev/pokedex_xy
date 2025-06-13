
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

export interface NameUrlPair {
  name: string;
  url: string;
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
  species: NameUrlPair; // Added for evolution chain
  routes?: string[]; 
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

// --- Evolution Related Types ---

export interface EvolutionChainReference {
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: NameUrlPair;
  version: NameUrlPair;
}

export interface Genus {
  genus: string;
  language: NameUrlPair;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  evolution_chain: EvolutionChainReference;
  evolves_from_species: NameUrlPair | null;
  flavor_text_entries: FlavorTextEntry[];
  genera: Genus[];
  // Add other fields from species data as needed
}

export interface PokemonSpeciesReference {
    name: string;
    url: string;
}

export interface EvolutionDetailFromApi {
    item: NameUrlPair | null;
    trigger: NameUrlPair;
    gender: number | null;
    held_item: NameUrlPair | null;
    known_move: NameUrlPair | null;
    known_move_type: NameUrlPair | null;
    location: NameUrlPair | null;
    min_affection: number | null;
    min_beauty: number | null;
    min_happiness: number | null;
    min_level: number | null;
    needs_overworld_rain: boolean;
    party_species: NameUrlPair | null;
    party_type: NameUrlPair | null;
    relative_physical_stats: number | null;
    time_of_day: string; // "day", "night", ""
    trade_species: NameUrlPair | null;
    turn_upside_down: boolean;
}

export interface EvolutionChainLink {
    is_baby: boolean;
    species: PokemonSpeciesReference;
    evolution_details: EvolutionDetailFromApi[];
    evolves_to: EvolutionChainLink[];
}

export interface EvolutionChainResponse {
    id: number;
    baby_trigger_item: NameUrlPair | null;
    chain: EvolutionChainLink;
}

// Types for processed evolution data for display
export interface EvolutionStageInfo {
    name: string;
    id: number;
    imageUrl: string;
}

export interface EvolutionStep {
    from: EvolutionStageInfo;
    to: EvolutionStageInfo;
    method: string;
}

export interface ProcessedEvolutionDisplayInfo {
    evolvesFrom?: EvolutionStep;
    currentStage: EvolutionStageInfo;
    evolvesTo: EvolutionStep[]; // Can evolve into multiple Pokemon (e.g., Eevee)
}
