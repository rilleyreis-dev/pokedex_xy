
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

      // PokemonModal (some might be reused or become specific to PokemonDetailView)
      "Abilities": "Habilidades",
      "Base Stats": "Atributos Base",
      "Found on Routes": "Encontrado nas Rotas", 
      "Found on Routes / How to obtain": "Encontrado em / Como obter",
      "Method/Location": "Método/Local",
      "Probability": "Probabilidade",
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
      
      // GymLeaderCard & GymLeaderDetailView
      "Mark as defeated": "Marcar como derrotado",
      "Unmark as defeated": "Desmarcar como derrotado",
      "Battle Tips": "Dicas de Batalha",
      "Weak to:": "Fraco contra:",
      "Strong against:": "Forte contra:",
      "Pokémon Team": "Equipe Pokémon",
      "Info": "Info", // For GymLeaderDetailView tab

      // App & LanguageSwitcher
      "Kalos Pokédex": "Pokédex de Kalos",
      "Explore Pokémon from a curated list.": "Explore Pokémon de uma lista selecionada.",
      "Meet the Gym Leaders of the Kalos region.": "Conheça os Líderes de Ginásio da região de Kalos.",
      "Pokédex": "Pokédex",
      "Gym Leaders": "Líderes de Ginásio",
      "Loading Pokédex data...": "Carregando dados da Pokédex...",
      "Loading Gym Leader data...": "Carregando dados dos Líderes de Ginásio...",
      "Loading Pokémon details...": "Carregando detalhes do Pokémon...",
      "Loading details...": "Carregando detalhes...", // Generic loading for detail views
      "Could not load details.": "Não foi possível carregar os detalhes.", // Generic error for detail views
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
      "Unknown Pokémon": "Pokémon Desconhecido",

      // ThemeSwitcher
      "Toggle theme": "Alternar tema",
      "Light mode": "Modo claro",
      "Dark mode": "Modo escuro",

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
      "Genderless": "Sem Gênero",
      "during Overworld Rain": "durante Chuva no Mapa",
      "Turn 3DS Upside Down": "Virar o 3DS de Cabeça para Baixo",
      "Attack > Defense": "Ataque > Defesa",
      "Attack < Defense": "Ataque < Defesa",
      "Attack = Defense": "Ataque = Defesa",
      "Level up": "Subir de nível",
      "Special": "Especial",
      "day": "Dia",
      "night": "Noite",

      // Gym Leader Details (Names, Cities, Badges)
      "viola_name": "Viola",
      "santalune_city_name": "Santalune City",
      "bug_badge_name": "Insígnia do Inseto",
      "viola_tips": "Use ataques do tipo Fogo, Voador ou Pedra para vencer Viola rapidamente.",
      "grant_name": "Grant",
      "cyllage_city_name": "Cyllage City",
      "cliff_badge_name": "Insígnia da Penha",
      "grant_tips": "Pokémon do tipo Água ou Planta são super eficazes contra a equipe de Grant.",
      "korrina_name": "Korrina",
      "shalour_city_name": "Shalour City",
      "rumble_badge_name": "Insígnia do Estrondo",
      "korrina_tips": "Ataques Voadores, Psíquicos ou Fada causarão dano pesado.",
      "ramos_name": "Ramos",
      "coumarine_city_name": "Coumarine City",
      "plant_badge_name": "Insígnia da Folhagem",
      "ramos_tips": "Tipos Fogo e Gelo são suas melhores apostas contra Ramos.",
      "clemont_name": "Clemont",
      "lumiose_city_name": "Lumiose City",
      "voltage_badge_name": "Insígnia da Voltagem",
      "clemont_tips": "Um forte Pokémon do tipo Terra anulará os ataques elétricos de Clemont.",
      "valerie_name": "Valerie",
      "laverre_city_name": "Laverre City",
      "fairy_badge_name": "Insígnia da Fada",
      "valerie_tips": "Pokémon do tipo Veneno ou Metálico terão vantagem contra Valerie.",
      "olympia_name": "Olympia",
      "anistar_city_name": "Anistar City",
      "psychic_badge_name": "Insígnia Psíquica",
      "olympia_tips": "Use Pokémon do tipo Inseto, Fantasma ou Sombrio para superar Olympia.",
      "wulfric_name": "Wulfric",
      "snowbelle_city_name": "Snowbelle City",
      "iceberg_badge_name": "Insígnia do Iceberg",
      "wulfric_tips": "Ataques do tipo Fogo ou Lutador derreterão a equipe de Wulfric.",

      // PokemonDetailView
      "Back to list": "Voltar para a lista",
      "About": "Sobre",
      // "Base Stats" already exists
      // "Evolution" already exists
      "Moves": "Golpes",
      "Species": "Espécie",
      // "Height" already exists
      // "Weight" already exists
      // "Abilities" already exists
      "Breeding": "Criação",
      "Gender": "Gênero",
      "Egg Groups": "Grupos de Ovos",
      "Egg Cycle": "Ciclo de Ovos",
      "Moves information coming soon.": "Informações sobre golpes em breve.",
      "N/A": "N/D",
      "Could not load details for this Pokémon.": "Não foi possível carregar os detalhes para este Pokémon.",
      "Go back": "Voltar",

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
      "Found on Routes / How to obtain": "Found on Routes / How to obtain",
      "Method/Location": "Method/Location",
      "Probability": "Probability",
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
      
      // GymLeaderCard & GymLeaderDetailView
      "Mark as defeated": "Mark as defeated",
      "Unmark as defeated": "Unmark as defeated",
      "Battle Tips": "Battle Tips",
      "Weak to:": "Weak to:",
      "Strong against:": "Strong against:",
      "Pokémon Team": "Pokémon Team", 
      "Info": "Info", // For GymLeaderDetailView tab

      // App & LanguageSwitcher
      "Kalos Pokédex": "Kalos Pokédex",
      "Explore Pokémon from a curated list.": "Explore Pokémon from a curated list.",
      "Meet the Gym Leaders of the Kalos region.": "Meet the Gym Leaders of the Kalos region.",
      "Pokédex": "Pokédex",
      "Gym Leaders": "Gym Leaders",
      "Loading Pokédex data...": "Loading Pokédex data...",
      "Loading Gym Leader data...": "Loading Gym Leader data...",
      "Loading Pokémon details...": "Loading Pokémon details...",
      "Loading details...": "Loading details...", // Generic loading for detail views
      "Could not load details.": "Could not load details.", // Generic error for detail views
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
      "Unknown Pokémon": "Unknown Pokémon",

      // ThemeSwitcher
      "Toggle theme": "Toggle theme",
      "Light mode": "Light mode",
      "Dark mode": "Dark mode",
      
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
      "Genderless": "Genderless",
      "during Overworld Rain": "during Overworld Rain",
      "Turn 3DS Upside Down": "Turn 3DS Upside Down",
      "Attack > Defense": "Attack > Defense",
      "Attack < Defense": "Attack < Defense",
      "Attack = Defense": "Attack = Defense",
      "Level up": "Level up",
      "Special": "Special",
      "day": "Day",
      "night": "Night",


      // Gym Leader Details (Names, Cities, Badges, Tips)
      "viola_name": "Viola",
      "santalune_city_name": "Santalune City",
      "bug_badge_name": "Bug Badge",
      "viola_tips": "Use Fire, Flying, or Rock-type attacks to defeat Viola quickly.",
      "grant_name": "Grant",
      "cyllage_city_name": "Cyllage City",
      "cliff_badge_name": "Cliff Badge",
      "grant_tips": "Water or Grass-type Pokémon are super effective against Grant's team.",
      "korrina_name": "Korrina",
      "shalour_city_name": "Shalour City",
      "rumble_badge_name": "Rumble Badge",
      "korrina_tips": "Flying, Psychic, or Fairy attacks will deal heavy damage.",
      "ramos_name": "Ramos",
      "coumarine_city_name": "Coumarine City",
      "plant_badge_name": "Plant Badge",
      "ramos_tips": "Fire and Ice types are your best bets against Ramos.",
      "clemont_name": "Clemont",
      "lumiose_city_name": "Lumiose City",
      "voltage_badge_name": "Voltage Badge",
      "clemont_tips": "A strong Ground-type Pokémon will nullify Clemont's electric attacks.",
      "valerie_name": "Valerie",
      "laverre_city_name": "Laverre City",
      "fairy_badge_name": "Fairy Badge",
      "valerie_tips": "Poison or Steel-type Pokémon will have an advantage against Valerie.",
      "olympia_name": "Olympia",
      "anistar_city_name": "Anistar City",
      "psychic_badge_name": "Psychic Badge",
      "olympia_tips": "Use Bug, Ghost, or Dark-type Pokémon to overcome Olympia.",
      "wulfric_name": "Wulfric",
      "snowbelle_city_name": "Snowbelle City",
      "iceberg_badge_name": "Iceberg Badge",
      "wulfric_tips": "Fire or Fighting-type attacks will melt Wulfric's team.",
      
      // PokemonDetailView
      "Back to list": "Back to list",
      "About": "About",
      // "Base Stats" already exists
      // "Evolution" already exists
      "Moves": "Moves",
      "Species": "Species",
      // "Height" already exists
      // "Weight" already exists
      // "Abilities" already exists
      "Breeding": "Breeding",
      "Gender": "Gender",
      "Egg Groups": "Egg Groups",
      "Egg Cycle": "Egg Cycle",
      "Moves information coming soon.": "Moves information coming soon.",
      "N/A": "N/A",
      "Could not load details for this Pokémon.": "Could not load details for this Pokémon.",
      "Go back": "Go back",
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

export const getTranslatedPokemonName = (name: string, lang: SupportedLanguage): string => {
  const translations = translationsData[lang].pokemon_names;
  if (translations && translations[name.toLowerCase()]) {
    return translations[name.toLowerCase()];
  }
  // For names with hyphens that are not special cases like "mr-mime", "ho-oh"
  // e.g. "nidoran-m", "nidoran-f", "porygon-z"
  if (name.includes('-') && !["mr-mime", "mime-jr", "ho-oh", "porygon-z", "porygon2", "jangmo-o", "hakamo-o", "kommo-o", "type-null", "tapu-koko", "tapu-lele", "tapu-bulu", "tapu-fini"].includes(name.toLowerCase())) {
     const parts = name.split('-');
     if (parts.length === 2 && (parts[1] === 'm' || parts[1] === 'f')) { // nidoran-m, nidoran-f
        return `${baseCapitalize(parts[0])} ${parts[1].toUpperCase()}`;
     }
     return name.split('-').map(part => baseCapitalize(part)).join('-');
  }
  return baseCapitalize(name); 
};
