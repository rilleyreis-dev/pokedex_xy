
export type SupportedLanguage = 'pt-BR' | 'en';

export type Theme = 'light' | 'dark';

export interface PokemonRouteInfo {
  route: string;
  probability: string;
  location: string;
}

export interface BasePokemon {
  name: string; // English name from API, used as key
  id: number;
  routes?: PokemonRouteInfo[]; 
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
    name: string; // English type name, e.g., "grass", "fire"
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string; // English ability name
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string; // English stat name, e.g., "hp", "attack"
    url: string;
  };
}

export interface NameUrlPair {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string; // English name from API
  height: number; // decimetres
  weight: number; // hectograms
  sprites: PokemonSprites;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  species: NameUrlPair; 
  routes?: PokemonRouteInfo[];
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
  id: string; 
  gym_leader_key: string; 
  city_key: string; 
  specialty_key: string; 
  specialty_display_key: string; 
  badge_name_key: string; 
  leader_image: string; 
  tips_key: string; 
  advantages: string[]; 
  disadvantages: string[]; 
  pokemon_ids: number[]; 
}

export interface GymLeaderModalProps {
  gymInfo: GymLeaderInfo | null;
  isOpen: boolean;
  onClose: () => void;
  onPokemonClick: (pokemonId: number) => void;
  detailsCache: Map<number, PokemonDetail | null>;
  currentLanguage: SupportedLanguage;
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
    time_of_day: string; 
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
    evolvesTo: EvolutionStep[];
}

export type TranslationMap = {
  [key: string]: string;
};

export type AllTranslations = {
  [lang in SupportedLanguage]: {
    types: TranslationMap;
    stats: TranslationMap;
    ui: TranslationMap;
    pokemon_names?: TranslationMap; 
    gym_leader_details?: TranslationMap; 
  };
};

export interface PokemonModalProps {
  pokemon: PokemonDetail | null;
  onClose: () => void;
  currentLanguage: SupportedLanguage;
  isCaptured: boolean; 
}

export interface PokemonTypeColorStyle {
  background: string; 
  text: string;       
  border?: string;    
  backgroundHex?: string; 
  cardBackgroundHex?: string; 
}
