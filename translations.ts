
import { AllTranslations, SupportedLanguage, TranslationMap } from './types';

// Helper, as the original capitalize might not be imported here directly or behave as needed for keys
const baseCapitalize = (s: string): string => {
  if (!s) return '';
  // Special case for names like Ho-Oh, Porygon-Z, etc.
  if (s.includes('-')) {
    return s.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('-');
  }
  // General capitalization
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

const translationsData: AllTranslations = {
  'pt-BR': {
    types: {
      normal: 'Normal',
      fire: 'Fogo',
      water: 'Água',
      electric: 'Elétrico',
      grass: 'Planta',
      ice: 'Gelo',
      fighting: 'Lutador',
      poison: 'Veneno',
      ground: 'Terra',
      flying: 'Voador',
      psychic: 'Psíquico',
      bug: 'Inseto',
      rock: 'Pedra',
      ghost: 'Fantasma',
      dragon: 'Dragão',
      dark: 'Sombrio',
      steel: 'Metálico',
      fairy: 'Fada',
    },
    stats: {
      hp: 'HP',
      attack: 'Ataque',
      defense: 'Defesa',
      'special-attack': 'Ataque Especial',
      'special-defense': 'Defesa Especial',
      speed: 'Velocidade',
    },
    ui: {
      // PokemonCard
      "Failed to load data.": "Falha ao carregar dados.",
      "Data unavailable": "Dados indisponíveis",
      "Retry": "Tentar Novamente",
      "View details for": "Ver detalhes de",
      "Mark as captured": "Marcar como capturado",
      "Unmark as captured": "Desmarcar como capturado",

      // PokemonModal
      "Abilities": "Habilidades",
      "Base Stats": "Atributos Base",
      "Found on Routes": "Encontrado nas Rotas",
      "Evolutions": "Evoluções",
      "Height": "Altura",
      "Weight": "Peso",
      "Hidden": "Oculta",
      "Close modal": "Fechar modal",
      "Species data URL missing.": "URL de dados da espécie ausente.",
      "Evolution chain URL missing.": "URL da cadeia de evolução ausente.",
      "Failed to load evolution data.": "Falha ao carregar dados de evolução.",
      "Evolved from via:": "Evoluiu de via:",
      "Evolves to:": "Evolui para:",
      "This Pokémon does not evolve.": "Este Pokémon não evolui.",
      "This is the final evolution.": "Esta é a evolução final.",
      "No evolution data available or does not evolve.": "Nenhum dado de evolução disponível ou não evolui.",
      
      // SearchBar
      "Search Pokémon by name or ID...": "Buscar Pokémon por nome ou ID...",
      "Search Pokémon": "Buscar Pokémon",

      // RouteFilter
      "All Routes": "Todas as Rotas",
      "Filter by route": "Filtrar por rota",

      // TypeFilter
      "Filter by Type(s):": "Filtrar por Tipo(s):",
      "Filter by Pokémon type": "Filtrar por tipo de Pokémon",
      
      // GymLeaderCard
      "Mark as defeated": "Marcar como derrotado",
      "Unmark as defeated": "Desmarcar como derrotado",

      // App & LanguageSwitcher
      "Kalos Pokédex": "Pokédex de Kalos",
      "Explore Pokémon from a curated list.": "Explore Pokémon de uma lista selecionada.",
      "Meet the Gym Leaders of the Kalos region.": "Conheça os Líderes de Ginásio da região de Kalos.",
      "Pokédex": "Pokédex",
      "Gym Leaders": "Líderes de Ginásio",
      "Loading Pokédex data...": "Carregando dados da Pokédex...",
      "No Pokémon found": "Nenhum Pokémon encontrado",
      "for": "para", 
      "on": "em", 
      "of type": "do tipo",
      "of types": "dos tipos",
      "Try adjusting your search or filters.": "Tente ajustar sua busca ou filtros.",
      "Pokédex data from": "Dados da Pokédex de",
      "This is a fan-made application. Pokémon and Pokémon character names are trademarks of Nintendo.": "Este é um aplicativo feito por fãs. Pokémon e os nomes dos personagens Pokémon são marcas registradas da Nintendo.",
      "Language": "Idioma", 
      "Change language": "Mudar idioma",
      "Switch to English": "Mudar para Inglês", 
      "Switch to Portuguese (Brazil)": "Mudar para Português (Brasil)", 

      // formatEvolutionTrigger
      "Level": "Nível",
      "High Friendship": "Amizade Elevada",
      "High Affection": "Afeição Elevada",
      "High Beauty": "Beleza Elevada",
      "Use": "Usar",
      "Hold": "Segurar",
      "Trade": "Trocar",
      "Trade for": "Trocar por",
      "Know": "Saber movimento",
      "Know type move": "Saber movimento do tipo",
      "at": "em", 
      "with in party": "com {pokemonName} na equipe", 
      "with type in party": "com tipo {typeName} na equipe",
      "during": "durante", 
      "Female": "Fêmea",
      "Male": "Macho",
      "during Overworld Rain": "durante Chuva no Mapa",
      "Turn 3DS Upside Down": "Virar o 3DS de Cabeça para Baixo",
      "Attack > Defense": "Ataque > Defesa",
      "Attack < Defense": "Ataque < Defesa",
      "Attack = Defense": "Ataque = Defesa",
      "Level up": "Subir de nível",
      "Special": "Especial",

      // Gym Leader Details (Names, Cities, Badges)
      "viola_name": "Viola",
      "santalune_city_name": "Santalune City",
      "bug_badge_name": "Insígnia do Inseto",
      "grant_name": "Grant",
      "cyllage_city_name": "Cyllage City",
      "cliff_badge_name": "Insígnia da Penha",
      "korrina_name": "Korrina",
      "shalour_city_name": "Shalour City",
      "rumble_badge_name": "Insígnia do Estrondo",
      "ramos_name": "Ramos",
      "coumarine_city_name": "Coumarine City",
      "plant_badge_name": "Insígnia da Folhagem",
      "clemont_name": "Clemont",
      "lumiose_city_name": "Lumiose City",
      "voltage_badge_name": "Insígnia da Voltagem",
      "valerie_name": "Valerie",
      "laverre_city_name": "Laverre City",
      "fairy_badge_name": "Insígnia da Fada",
      "olympia_name": "Olympia",
      "anistar_city_name": "Anistar City",
      "psychic_badge_name": "Insígnia Psíquica",
      "wulfric_name": "Wulfric",
      "snowbelle_city_name": "Snowbelle City",
      "iceberg_badge_name": "Insígnia do Iceberg",
    },
    pokemon_names: { 
        // "mr-mime": "Mr. Mime", 
    }
  },
  'en': {
    types: {
      normal: 'Normal',
      fire: 'Fire',
      water: 'Water',
      electric: 'Electric',
      grass: 'Grass',
      ice: 'Ice',
      fighting: 'Fighting',
      poison: 'Poison',
      ground: 'Ground',
      flying: 'Flying',
      psychic: 'Psychic',
      bug: 'Bug',
      rock: 'Rock',
      ghost: 'Ghost',
      dragon: 'Dragon',
      dark: 'Dark',
      steel: 'Steel',
      fairy: 'Fairy',
    },
    stats: {
      hp: 'HP',
      attack: 'Attack',
      defense: 'Defense',
      'special-attack': 'Special Attack',
      'special-defense': 'Special Defense',
      speed: 'Speed',
    },
    ui: {
      // PokemonCard
      "Failed to load data.": "Failed to load data.",
      "Data unavailable": "Data unavailable",
      "Retry": "Retry",
      "View details for": "View details for",
      "Mark as captured": "Mark as captured",
      "Unmark as captured": "Unmark as captured",

      // PokemonModal
      "Abilities": "Abilities",
      "Base Stats": "Base Stats",
      "Found on Routes": "Found on Routes",
      "Evolutions": "Evolutions",
      "Height": "Height",
      "Weight": "Weight",
      "Hidden": "Hidden",
      "Close modal": "Close modal",
      "Species data URL missing.": "Species data URL missing.",
      "Evolution chain URL missing.": "Evolution chain URL missing.",
      "Failed to load evolution data.": "Failed to load evolution data.",
      "Evolved from via:": "Evolved from via:",
      "Evolves to:": "Evolves to:",
      "This Pokémon does not evolve.": "This Pokémon does not evolve.",
      "This is the final evolution.": "This is the final evolution.",
      "No evolution data available or does not evolve.": "No evolution data available or does not evolve.",
      
      // SearchBar
      "Search Pokémon by name or ID...": "Search Pokémon by name or ID...",
      "Search Pokémon": "Search Pokémon",

      // RouteFilter
      "All Routes": "All Routes",
      "Filter by route": "Filter by route",

      // TypeFilter
      "Filter by Type(s):": "Filter by Type(s):",
      "Filter by Pokémon type": "Filter by Pokémon type",
      
      // GymLeaderCard
      "Mark as defeated": "Mark as defeated",
      "Unmark as defeated": "Unmark as defeated",

      // App & LanguageSwitcher
      "Kalos Pokédex": "Kalos Pokédex",
      "Explore Pokémon from a curated list.": "Explore Pokémon from a curated list.",
      "Meet the Gym Leaders of the Kalos region.": "Meet the Gym Leaders of the Kalos region.",
      "Pokédex": "Pokédex",
      "Gym Leaders": "Gym Leaders",
      "Loading Pokédex data...": "Loading Pokédex data...",
      "No Pokémon found": "No Pokémon found",
      "for": "for", 
      "on": "on", 
      "of type": "of type",
      "of types": "of types",
      "Try adjusting your search or filters.": "Try adjusting your search or filters.",
      "Pokédex data from": "Pokédex data from",
      "This is a fan-made application. Pokémon and Pokémon character names are trademarks of Nintendo.": "This is a fan-made application. Pokémon and Pokémon character names are trademarks of Nintendo.",
      "Language": "Language",
      "Change language": "Change language",
      "Switch to English": "Switch to English",
      "Switch to Portuguese (Brazil)": "Switch to Portuguese (Brazil)",
      
      // formatEvolutionTrigger
      "Level": "Level",
      "High Friendship": "High Friendship",
      "High Affection": "High Affection",
      "High Beauty": "High Beauty",
      "Use": "Use",
      "Hold": "Hold",
      "Trade": "Trade",
      "Trade for": "Trade for",
      "Know": "Know move",
      "Know type move": "Know move of type",
      "at": "at", 
      "with in party": "with {pokemonName} in party",
      "with type in party": "with type {typeName} in party",
      "during": "during", 
      "Female": "Female",
      "Male": "Male",
      "during Overworld Rain": "during Overworld Rain",
      "Turn 3DS Upside Down": "Turn 3DS Upside Down",
      "Attack > Defense": "Attack > Defense",
      "Attack < Defense": "Attack < Defense",
      "Attack = Defense": "Attack = Defense",
      "Level up": "Level up",
      "Special": "Special",

      // Gym Leader Details (Names, Cities, Badges)
      "viola_name": "Viola",
      "santalune_city_name": "Santalune City",
      "bug_badge_name": "Bug Badge",
      "grant_name": "Grant",
      "cyllage_city_name": "Cyllage City",
      "cliff_badge_name": "Cliff Badge",
      "korrina_name": "Korrina",
      "shalour_city_name": "Shalour City",
      "rumble_badge_name": "Rumble Badge",
      "ramos_name": "Ramos",
      "coumarine_city_name": "Coumarine City",
      "plant_badge_name": "Plant Badge",
      "clemont_name": "Clemont",
      "lumiose_city_name": "Lumiose City",
      "voltage_badge_name": "Voltage Badge",
      "valerie_name": "Valerie",
      "laverre_city_name": "Laverre City",
      "fairy_badge_name": "Fairy Badge",
      "olympia_name": "Olympia",
      "anistar_city_name": "Anistar City",
      "psychic_badge_name": "Psychic Badge",
      "wulfric_name": "Wulfric",
      "snowbelle_city_name": "Snowbelle City",
      "iceberg_badge_name": "Iceberg Badge",
    },
     pokemon_names: {
        // "mr-mime": "Mr. Mime", 
    }
  }
};

export const getTranslatedType = (type: string, lang: SupportedLanguage): string => {
  return translationsData[lang].types[type.toLowerCase()] || baseCapitalize(type);
};

export const getTranslatedStat = (stat: string, lang: SupportedLanguage): string => {
  return translationsData[lang].stats[stat.toLowerCase()] || baseCapitalize(stat);
};

export const t = (key: string, lang: SupportedLanguage, replacements?: {[placeholder: string]: string}): string => {
  let translation = translationsData[lang].ui[key] || translationsData[lang].gym_leader_details?.[key] || key;
  if (replacements) {
    Object.keys(replacements).forEach(placeholder => {
      translation = translation.replace(new RegExp(`{${placeholder}}`, 'g'), replacements[placeholder]);
    });
  }
  return translation;
};

// Function to get a translated Pokémon name if specific overrides are needed, otherwise use a base capitalization.
// The API provides names, this is mainly for display consistency if API names are e.g. all lowercase.
export const getTranslatedPokemonName = (name: string, lang: SupportedLanguage): string => {
  const translations = translationsData[lang].pokemon_names;
  if (translations && translations[name.toLowerCase()]) {
    return translations[name.toLowerCase()];
  }
  return baseCapitalize(name); // Default to capitalized English name if no specific translation or override
};