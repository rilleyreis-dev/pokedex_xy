
import { BasePokemon, GymLeaderInfo, EvolutionDetailFromApi, SupportedLanguage, PokemonRouteInfo, PokemonTypeColorStyle } from './types';
import { t as translate, getTranslatedPokemonName } from './translations'; // Import for formatEvolutionTrigger

export const INITIAL_POKEMON_LIST: BasePokemon[] = [
  // ===================================
  // CENTRAL KALOS POKEDEX
  // ===================================
  { "name": "chespin", "id": 650, "routes": [{ "route": "Lumiose City", "probability": "Presente (Gift)", "location": "Escolha do Professor Sycamore" }] },
  { "name": "quilladin", "id": 651, "routes": [] },
  { "name": "chesnaught", "id": 652, "routes": [] },
  { "name": "fennekin", "id": 653, "routes": [{ "route": "Lumiose City", "probability": "Presente (Gift)", "location": "Escolha do Professor Sycamore" }] },
  { "name": "braixen", "id": 654, "routes": [] },
  { "name": "delphox", "id": 655, "routes": [] },
  { "name": "froakie", "id": 656, "routes": [{ "route": "Lumiose City", "probability": "Presente (Gift)", "location": "Escolha do Professor Sycamore" }] },
  { "name": "frogadier", "id": 657, "routes": [] },
  { "name": "greninja", "id": 658, "routes": [] },
  { "name": "bunnelby", "id": 659, "routes": [
      { "route": "Rota 2", "probability": "40%", "location": "Grama Alta" },
      { "route": "Rota 3", "probability": "30%", "location": "Grama Alta" },
      { "route": "Rota 22", "probability": "20%", "location": "Grama Alta" }
  ]},
  { "name": "diggersby", "id": 660, "routes": [{ "route": "Rota 22", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "zigzagoon", "id": 263, "routes": [{ "route": "Rota 2", "probability": "10%", "location": "Horda" }] },
  { "name": "linoone", "id": 264, "routes": [] },
  { "name": "fletchling", "id": 661, "routes": [
      { "route": "Rota 2", "probability": "20%", "location": "Grama Alta" },
      { "route": "Santalune Forest", "probability": "10%", "location": "Grama Alta" }
  ]},
  { "name": "fletchinder", "id": 662, "routes": [] },
  { "name": "talonflame", "id": 663, "routes": [] },
  { "name": "pidgey", "id": 16, "routes": [
      { "route": "Rota 2", "probability": "30%", "location": "Grama Alta" },
      { "route": "Rota 3", "probability": "20%", "location": "Grama Alta" }
  ]},
  { "name": "pidgeotto", "id": 17, "routes": [] },
  { "name": "pidgeot", "id": 18, "routes": [] },
  { "name": "scatterbug", "id": 664, "routes": [
      { "route": "Rota 2", "probability": "5%", "location": "Grama Alta" },
      { "route": "Santalune Forest", "probability": "25%", "location": "Grama Alta" }
  ]},
  { "name": "spewpa", "id": 665, "routes": [{ "route": "Rota 7", "probability": "5%", "location": "Horda" }] },
  { "name": "vivillon", "id": 666, "routes": [] },
  { "name": "caterpie", "id": 10, "routes": [
      { "route": "Rota 2", "probability": "4%", "location": "Grama Alta (Exclusivo Pokémon X)" },
      { "route": "Santalune Forest", "probability": "25%", "location": "Grama Alta (Exclusivo Pokémon X)" }
  ]},
  { "name": "metapod", "id": 11, "routes": [{ "route": "Santalune Forest", "probability": "10%", "location": "Grama Alta (Exclusivo Pokémon X)" }] },
  { "name": "butterfree", "id": 12, "routes": [] },
  { "name": "weedle", "id": 13, "routes": [
      { "route": "Rota 2", "probability": "4%", "location": "Grama Alta (Exclusivo Pokémon Y)" },
      { "route": "Santalune Forest", "probability": "25%", "location": "Grama Alta (Exclusivo Pokémon Y)" }
  ]},
  { "name": "kakuna", "id": 14, "routes": [{ "route": "Santalune Forest", "probability": "10%", "location": "Grama Alta (Exclusivo Pokémon Y)" }] },
  { "name": "beedrill", "id": 15, "routes": [] },
  { "name": "pansage", "id": 511, "routes": [{ "route": "Santalune Forest", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "simisage", "id": 512, "routes": [] },
  { "name": "pansear", "id": 513, "routes": [{ "route": "Santalune Forest", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "simisear", "id": 514, "routes": [] },
  { "name": "panpour", "id": 515, "routes": [{ "route": "Santalune Forest", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "simipour", "id": 516, "routes": [] },
  { "name": "pichu", "id": 172, "routes": [] },
  { "name": "pikachu", "id": 25, "routes": [
      { "route": "Rota 3", "probability": "5%", "location": "Grama Alta" },
      { "route": "Santalune Forest", "probability": "5%", "location": "Grama Alta" }
  ]},
  { "name": "raichu", "id": 26, "routes": [] },
  { "name": "bidoof", "id": 399, "routes": [
      { "route": "Rota 3", "probability": "10%", "location": "Grama Alta" },
      { "route": "Rota 22", "probability": "30%", "location": "Grama Alta" }
  ]},
  { "name": "bibarel", "id": 400, "routes": [{ "route": "Rota 22", "probability": "20%", "location": "Grama Alta" }] },
  { "name": "dunsparce", "id": 206, "routes": [
      { "route": "Rota 3", "probability": "5%", "location": "Grama Alta" },
      { "route": "Rota 22", "probability": "5%", "location": "Grama Alta" }
  ]},
  { "name": "azurill", "id": 298, "routes": [
      { "route": "Rota 3", "probability": "30%", "location": "Surfando" },
      { "route": "Rota 22", "probability": "30%", "location": "Surfando" }
  ]},
  { "name": "marill", "id": 183, "routes": [{ "route": "Rota 3", "probability": "70%", "location": "Surfando" }] },
  { "name": "azumarill", "id": 184, "routes": [{ "route": "Rota 22", "probability": "5%", "location": "Surfando" }] },
  { "name": "burmy", "id": 412, "routes": [{ "route": "Rota 3", "probability": "10%", "location": "Árvores (Honey)" }] },
  { "name": "wormadam", "id": 413, "routes": [] },
  { "name": "mothim", "id": 414, "routes": [] },
  { "name": "surskit", "id": 283, "routes": [{ "route": "Rota 3", "probability": "1%", "location": "Surfando" }] },
  { "name": "masquerain", "id": 284, "routes": [{ "route": "Rota 3", "probability": "4%", "location": "Surfando" }] },
  { "name": "magikarp", "id": 129, "routes": [
      { "route": "Rota 3", "probability": "100%", "location": "Pescando com Old Rod" },
      { "route": "Parfum Palace", "probability": "100%", "location": "Pescando com Old Rod" }
  ]},
  { "name": "gyarados", "id": 130, "routes": [{ "route": "Rota 3", "probability": "35%", "location": "Pescando com Super Rod" }] },
  { "name": "corphish", "id": 341, "routes": [
      { "route": "Rota 3", "probability": "30%", "location": "Pescando com Good Rod" },
      { "route": "Parfum Palace", "probability": "65%", "location": "Pescando com Good Rod" }
  ]},
  { "name": "crawdaunt", "id": 342, "routes": [{ "route": "Rota 3", "probability": "30%", "location": "Pescando com Super Rod" }] },
  { "name": "goldeen", "id": 118, "routes": [
      { "route": "Rota 3", "probability": "70%", "location": "Pescando com Good Rod" },
      { "route": "Parfum Palace", "probability": "35%", "location": "Pescando com Good Rod" }
  ]},
  { "name": "seaking", "id": 119, "routes": [{ "route": "Rota 22", "probability": "5%", "location": "Pescando com Super Rod" }] },
  { "name": "carvanha", "id": 318, "routes": [{ "route": "Rota 22", "probability": "65%", "location": "Pescando com Good Rod" }] },
  { "name": "sharpedo", "id": 319, "routes": [{ "route": "Rota 22", "probability": "30%", "location": "Pescando com Super Rod" }] },
  { "name": "litleo", "id": 667, "routes": [{ "route": "Rota 22", "probability": "30%", "location": "Grama Alta" }] },
  { "name": "pyroar", "id": 668, "routes": [] },
  { "name": "psyduck", "id": 54, "routes": [
      { "route": "Rota 7", "probability": "30%", "location": "Surfando" },
      { "route": "Rota 22", "probability": "65%", "location": "Surfando" }
  ]},
  { "name": "golduck", "id": 55, "routes": [{ "route": "Rota 7", "probability": "5%", "location": "Surfando" }] },
  { "name": "farfetchd", "id": 83, "routes": [{ "route": "Rota 22", "probability": "5%", "location": "Grama Alta" }] },
  { "name": "riolu", "id": 447, "routes": [{ "route": "Rota 22", "probability": "5%", "location": "Grama Alta" }] },
  { "name": "lucario", "id": 448, "routes": [{ "route": "Shalour City", "probability": "Presente (Gift)", "location": "Recebido de Korrina" }] },
  { "name": "ralts", "id": 280, "routes": [{ "route": "Rota 4", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "kirlia", "id": 281, "routes": [] },
  { "name": "gardevoir", "id": 282, "routes": [{ "route": "Lumiose City", "probability": "Troca (Trade)", "location": "Troca por um Bunnelby com Diantha" }] },
  { "name": "gallade", "id": 475, "routes": [] },
  { "name": "flabebe", "id": 669, "routes": [
      { "route": "Rota 4", "probability": "34%", "location": "Grama (Amarela) / Flores (Vermelhas)" },
      { "route": "Rota 7", "probability": "40%", "location": "Flores (Laranja e Roxa)" }
  ]},
  { "name": "floette", "id": 670, "routes": [{ "route": "Rota 7", "probability": "10%", "location": "Horda" }] },
  { "name": "florges", "id": 671, "routes": [] },
  { "name": "budew", "id": 406, "routes": [{ "route": "Rota 4", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "roselia", "id": 315, "routes": [{ "route": "Rota 7", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "roserade", "id": 407, "routes": [] },
  { "name": "ledyba", "id": 165, "routes": [{ "route": "Rota 4", "probability": "10%", "location": "Grama Alta (Exclusivo Pokémon Y)" }] },
  { "name": "ledian", "id": 166, "routes": [] },
  { "name": "combee", "id": 415, "routes": [
      { "route": "Rota 4", "probability": "5%", "location": "Flores Vermelhas" },
      { "route": "Rota 7", "probability": "5%", "location": "Árvores (Honey)" }
  ]},
  { "name": "vespiquen", "id": 416, "routes": [] },
  { "name": "skitty", "id": 300, "routes": [{ "route": "Rota 4", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "delcatty", "id": 301, "routes": [] },
  { "name": "bulbasaur", "id": 1, "routes": [{ "route": "Lumiose City", "probability": "Presente (Gift)", "location": "Escolha do Professor Sycamore" }] },
  { "name": "ivysaur", "id": 2, "routes": [] },
  { "name": "venusaur", "id": 3, "routes": [] },
  { "name": "charmander", "id": 4, "routes": [{ "route": "Lumiose City", "probability": "Presente (Gift)", "location": "Escolha do Professor Sycamore" }] },
  { "name": "charmeleon", "id": 5, "routes": [] },
  { "name": "charizard", "id": 6, "routes": [] },
  { "name": "squirtle", "id": 7, "routes": [{ "route": "Lumiose City", "probability": "Presente (Gift)", "location": "Escolha do Professor Sycamore" }] },
  { "name": "wartortle", "id": 8, "routes": [] },
  { "name": "blastoise", "id": 9, "routes": [] },
  { "name": "skiddo", "id": 672, "routes": [{ "route": "Rota 5", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "gogoat", "id": 673, "routes": [] },
  { "name": "pancham", "id": 674, "routes": [{ "route": "Rota 5", "probability": "20%", "location": "Grama Alta" }] },
  { "name": "pangoro", "id": 675, "routes": [] },
  { "name": "furfrou", "id": 676, "routes": [{ "route": "Rota 5", "probability": "20%", "location": "Grama Alta" }] },
  { "name": "doduo", "id": 84, "routes": [{ "route": "Rota 5", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "dodrio", "id": 85, "routes": [] },
  { "name": "plusle", "id": 311, "routes": [{ "route": "Rota 5", "probability": "5%", "location": "Horda" }] },
  { "name": "minun", "id": 312, "routes": [{ "route": "Rota 5", "probability": "5%", "location": "Horda" }] },
  { "name": "gulpin", "id": 316, "routes": [{ "route": "Rota 5", "probability": "30%", "location": "Grama Alta (Exclusivo Pokémon Y)" }] },
  { "name": "swalot", "id": 317, "routes": [] },
  { "name": "scraggy", "id": 559, "routes": [{ "route": "Rota 5", "probability": "30%", "location": "Grama Alta (Exclusivo Pokémon X)" }] },
  { "name": "scrafty", "id": 560, "routes": [] },
  { "name": "abra", "id": 63, "routes": [{ "route": "Rota 5", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "kadabra", "id": 64, "routes": [] },
  { "name": "alakazam", "id": 65, "routes": [] },
  { "name": "oddish", "id": 43, "routes": [{ "route": "Rota 6", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "gloom", "id": 44, "routes": [] },
  { "name": "vileplume", "id": 45, "routes": [] },
  { "name": "bellossom", "id": 182, "routes": [] },
  { "name": "sentret", "id": 161, "routes": [{ "route": "Rota 6", "probability": "Raro", "location": "Grama Alta" }] },
  { "name": "furret", "id": 162, "routes": [] },
  { "name": "nincada", "id": 290, "routes": [{ "route": "Rota 6", "probability": "5%", "location": "Horda" }] },
  { "name": "ninjask", "id": 291, "routes": [] },
  { "name": "shedinja", "id": 292, "routes": [] },
  { "name": "espurr", "id": 677, "routes": [{ "route": "Rota 6", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "meowstic", "id": 678, "routes": [] },
  { "name": "kecleon", "id": 352, "routes": [{ "route": "Rota 6", "probability": "Raro", "location": "Grama Alta" }] },
  { "name": "honedge", "id": 679, "routes": [{ "route": "Rota 6", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "doublade", "id": 680, "routes": [] },
  { "name": "aegislash", "id": 681, "routes": [] },
  { "name": "venipede", "id": 543, "routes": [{ "route": "Rota 6", "probability": "Raro", "location": "Grama Alta" }] },
  { "name": "whirlipede", "id": 544, "routes": [] },
  { "name": "scolipede", "id": 545, "routes": [] },
  { "name": "audino", "id": 531, "routes": [{ "route": "Rota 6", "probability": "Raro", "location": "Grama Alta (Agitada)" }] },
  { "name": "smeargle", "id": 235, "routes": [{ "route": "Rota 7", "probability": "Raro", "location": "Grama Alta" }] },
  { "name": "croagunk", "id": 453, "routes": [{ "route": "Rota 7", "probability": "Raro", "location": "Grama Alta" }] },
  { "name": "toxicroak", "id": 454, "routes": [] },
  { "name": "ducklett", "id": 580, "routes": [{ "route": "Rota 7", "probability": "Comum", "location": "Horda" }] },
  { "name": "swanna", "id": 581, "routes": [] },
  { "name": "spritzee", "id": 682, "routes": [{ "route": "Rota 7", "probability": "Comum (Exclusivo Pokémon Y)", "location": "Grama Alta" }] },
  { "name": "aromatisse", "id": 683, "routes": [] },
  { "name": "swirlix", "id": 684, "routes": [{ "route": "Rota 7", "probability": "Comum (Exclusivo Pokémon X)", "location": "Grama Alta" }] },
  { "name": "slurpuff", "id": 685, "routes": [] },
  { "name": "volbeat", "id": 313, "routes": [{ "route": "Rota 7", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "illumise", "id": 314, "routes": [{ "route": "Rota 7", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "hoppip", "id": 187, "routes": [{ "route": "Rota 7", "probability": "Comum", "location": "Horda" }] },
  { "name": "skiploom", "id": 188, "routes": [] },
  { "name": "jumpluff", "id": 189, "routes": [] },
  { "name": "munchlax", "id": 446, "routes": [] },
  { "name": "snorlax", "id": 143, "routes": [{ "route": "Rota 7", "probability": "100% (Encontro Estático)", "location": "Ponte" }] },
  { "name": "whismur", "id": 293, "routes": [{ "route": "Connecting Cave", "probability": "Comum", "location": "Andando" }] },
  { "name": "loudred", "id": 294, "routes": [] },
  { "name": "exploud", "id": 295, "routes": [] },
  { "name": "meditite", "id": 307, "routes": [{ "route": "Connecting Cave", "probability": "Comum", "location": "Andando" }] },
  { "name": "medicham", "id": 308, "routes": [] },
  { "name": "zubat", "id": 41, "routes": [{ "route": "Connecting Cave", "probability": "Comum", "location": "Andando" }] },
  { "name": "golbat", "id": 42, "routes": [] },
  { "name": "crobat", "id": 169, "routes": [] },
  { "name": "axew", "id": 610, "routes": [{ "route": "Connecting Cave", "probability": "Raro", "location": "Andando" }] },
  { "name": "fraxure", "id": 611, "routes": [] },
  { "name": "haxorus", "id": 612, "routes": [] },
  { "name": "diancie", "id": 719, "routes": [] },
  { "name": "hoopa", "id": 720, "routes": [] },
  { "name": "volcanion", "id": 721, "routes": [] },

  // ===================================
  // COASTAL KALOS POKEDEX
  // ===================================
  { "name": "drifloon", "id": 425, "routes": [{ "route": "Rota 8", "probability": "20%", "location": "Grama Alta" }] },
  { "name": "drifblim", "id": 426, "routes": [] },
  { "name": "mienfoo", "id": 619, "routes": [{ "route": "Rota 8", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "mienshao", "id": 620, "routes": [] },
  { "name": "zangoose", "id": 335, "routes": [{ "route": "Rota 8", "probability": "5%", "location": "Horda" }] },
  { "name": "seviper", "id": 336, "routes": [{ "route": "Rota 8", "probability": "5%", "location": "Horda" }] },
  { "name": "spoink", "id": 325, "routes": [{ "route": "Rota 8", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "grumpig", "id": 326, "routes": [] },
  { "name": "absol", "id": 359, "routes": [{ "route": "Rota 8", "probability": "5%", "location": "Grama Alta" }] },
  { "name": "inkay", "id": 686, "routes": [{ "route": "Rota 8", "probability": "20%", "location": "Grama Alta" }] },
  { "name": "malamar", "id": 687, "routes": [] },
  { "name": "lunatone", "id": 337, "routes": [{ "route": "Glittering Cave", "probability": "Raro", "location": "Dentro da caverna (Exclusivo Pokémon Y)" }] },
  { "name": "solrock", "id": 338, "routes": [{ "route": "Glittering Cave", "probability": "Raro", "location": "Dentro da caverna (Exclusivo Pokémon X)" }] },
  { "name": "bagon", "id": 371, "routes": [{ "route": "Rota 8", "probability": "5%", "location": "Grama Alta" }] },
  { "name": "shelgon", "id": 372, "routes": [] },
  { "name": "salamence", "id": 373, "routes": [] },
  { "name": "wingull", "id": 278, "routes": [
      { "route": "Rota 8", "probability": "Comum", "location": "Grama Alta" },
      { "route": "Rota 12", "probability": "Comum", "location": "Horda" },
      { "route": "Azure Bay", "probability": "Comum", "location": "Surfando" }
  ]},
  { "name": "pelipper", "id": 279, "routes": [] },
  { "name": "taillow", "id": 276, "routes": [{ "route": "Rota 8", "probability": "10%", "location": "Horda" }] },
  { "name": "swellow", "id": 277, "routes": [] },
  { "name": "binacle", "id": 688, "routes": [
      { "route": "Rota 8", "probability": "66%", "location": "Quebrando Rochas" },
      { "route": "Rota 12", "probability": "66%", "location": "Quebrando Rochas" },
      { "route": "Azure Bay", "probability": "66%", "location": "Quebrando Rochas" }
  ]},
  { "name": "barbaracle", "id": 689, "routes": [] },
  { "name": "dwebble", "id": 557, "routes": [
      { "route": "Rota 8", "probability": "34%", "location": "Quebrando Rochas" },
      { "route": "Glittering Cave", "probability": "Comum", "location": "Quebrando Rochas" }
  ]},
  { "name": "crustle", "id": 558, "routes": [] },
  { "name": "tentacool", "id": 72, "routes": [
      { "route": "Rota 8", "probability": "Comum", "location": "Surfando" },
      { "route": "Azure Bay", "probability": "Comum", "location": "Surfando" }
  ]},
  { "name": "tentacruel", "id": 73, "routes": [] },
  { "name": "wailmer", "id": 320, "routes": [
      { "route": "Rota 8", "probability": "Comum", "location": "Pescando com Good Rod" },
      { "route": "Azure Bay", "probability": "Comum", "location": "Pescando com Good Rod" }
  ]},
  { "name": "wailord", "id": 321, "routes": [] },
  { "name": "luvdisc", "id": 370, "routes": [
      { "route": "Rota 8", "probability": "100%", "location": "Pescando com Old Rod" },
      { "route": "Rota 12", "probability": "100%", "location": "Pescando com Old Rod" },
      { "route": "Azure Bay", "probability": "100%", "location": "Pescando com Old Rod" }
  ]},
  { "name": "skrelp", "id": 690, "routes": [{ "route": "Rota 8", "probability": "35%", "location": "Pescando com Good Rod (Exclusivo Pokémon Y)" }] },
  { "name": "dragalge", "id": 691, "routes": [] },
  { "name": "clauncher", "id": 692, "routes": [{ "route": "Rota 8", "probability": "35%", "location": "Pescando com Good Rod (Exclusivo Pokémon X)" }] },
  { "name": "clawitzer", "id": 693, "routes": [] },
  { "name": "staryu", "id": 120, "routes": [{ "route": "Rota 8", "probability": "35%", "location": "Pescando com Super Rod" }] },
  { "name": "starmie", "id": 121, "routes": [] },
  { "name": "shellder", "id": 90, "routes": [{ "route": "Rota 8", "probability": "30%", "location": "Pescando com Good Rod" }] },
  { "name": "cloyster", "id": 91, "routes": [] },
  { "name": "qwilfish", "id": 211, "routes": [{ "route": "Rota 8", "probability": "5%", "location": "Pescando com Super Rod" }] },
  { "name": "horsea", "id": 116, "routes": [{ "route": "Ambrette Town", "probability": "Comum", "location": "Pescando com Good Rod" }] },
  { "name": "seadra", "id": 117, "routes": [{ "route": "Azure Bay", "probability": "5%", "location": "Pescando com Super Rod" }] },
  { "name": "kingdra", "id": 230, "routes": [] },
  { "name": "relicanth", "id": 369, "routes": [
      { "route": "Cyllage City", "probability": "5%", "location": "Pescando com Super Rod" },
      { "route": "Ambrette Town", "probability": "5%", "location": "Pescando com Super Rod" }
  ]},
  { "name": "sandile", "id": 551, "routes": [{ "route": "Rota 9", "probability": "Comum", "location": "Andando na areia" }] },
  { "name": "krokorok", "id": 552, "routes": [] },
  { "name": "krookodile", "id": 553, "routes": [] },
  { "name": "helioptile", "id": 694, "routes": [{ "route": "Rota 9", "probability": "Comum", "location": "Andando na areia" }] },
  { "name": "heliolisk", "id": 695, "routes": [] },
  { "name": "hippopotas", "id": 449, "routes": [{ "route": "Rota 9", "probability": "Comum", "location": "Andando na areia" }] },
  { "name": "hippowdon", "id": 450, "routes": [] },
  { "name": "rhyhorn", "id": 111, "routes": [{ "route": "Glittering Cave", "probability": "Comum", "location": "Andando" }] },
  { "name": "rhydon", "id": 112, "routes": [] },
  { "name": "rhyperior", "id": 464, "routes": [] },
  { "name": "onix", "id": 95, "routes": [{ "route": "Glittering Cave", "probability": "Comum", "location": "Andando" }] },
  { "name": "steelix", "id": 208, "routes": [] },
  { "name": "woobat", "id": 527, "routes": [
      { "route": "Glittering Cave", "probability": "Comum", "location": "Andando / Teto" },
      { "route": "Reflection Cave", "probability": "Comum", "location": "Andando / Teto" }
  ]},
  { "name": "swoobat", "id": 528, "routes": [] },
  { "name": "machop", "id": 66, "routes": [{ "route": "Glittering Cave", "probability": "Comum", "location": "Andando" }] },
  { "name": "machoke", "id": 67, "routes": [] },
  { "name": "machamp", "id": 68, "routes": [] },
  { "name": "cubone", "id": 104, "routes": [{ "route": "Glittering Cave", "probability": "Comum", "location": "Andando" }] },
  { "name": "marowak", "id": 105, "routes": [] },
  { "name": "kangaskhan", "id": 115, "routes": [{ "route": "Glittering Cave", "probability": "Raro", "location": "Andando" }] },
  { "name": "mawile", "id": 303, "routes": [{ "route": "Glittering Cave", "probability": "Raro", "location": "Andando" }] },
  { "name": "tyrunt", "id": 696, "routes": [{ "route": "Ambrette Town", "probability": "Fóssil", "location": "Laboratório de Fósseis (Jaw Fossil)" }] },
  { "name": "tyrantrum", "id": 697, "routes": [] },
  { "name": "amaura", "id": 698, "routes": [{ "route": "Ambrette Town", "probability": "Fóssil", "location": "Laboratório de Fósseis (Sail Fossil)" }] },
  { "name": "aurorus", "id": 699, "routes": [] },
  { "name": "aerodactyl", "id": 142, "routes": [{ "route": "Ambrette Town", "probability": "Fóssil", "location": "Laboratório de Fósseis (Old Amber)" }] },
  { "name": "ferroseed", "id": 597, "routes": [
      { "route": "Glittering Cave", "probability": "Raro", "location": "Andando" },
      { "route": "Reflection Cave", "probability": "Raro", "location": "Andando" }
  ]},
  { "name": "ferrothorn", "id": 598, "routes": [] },
  { "name": "snubbull", "id": 209, "routes": [{ "route": "Rota 10", "probability": "5%", "location": "Horda" }] },
  { "name": "granbull", "id": 210, "routes": [] },
  { "name": "electrike", "id": 309, "routes": [{ "route": "Rota 10", "probability": "20%", "location": "Grama Alta (Exclusivo Pokémon Y)" }] },
  { "name": "manectric", "id": 310, "routes": [] },
  { "name": "houndour", "id": 228, "routes": [{ "route": "Rota 10", "probability": "20%", "location": "Grama Alta (Exclusivo Pokémon X)" }] },
  { "name": "houndoom", "id": 229, "routes": [] },
  { "name": "eevee", "id": 133, "routes": [{ "route": "Rota 10", "probability": "5%", "location": "Grama Alta" }] },
  { "name": "vaporeon", "id": 134, "routes": [] }, { "name": "jolteon", "id": 135, "routes": [] }, { "name": "flareon", "id": 136, "routes": [] },
  { "name": "espeon", "id": 196, "routes": [] }, { "name": "umbreon", "id": 197, "routes": [] }, { "name": "leafeon", "id": 470, "routes": [] },
  { "name": "glaceon", "id": 471, "routes": [] }, { "name": "sylveon", "id": 700, "routes": [] },
  { "name": "emolga", "id": 587, "routes": [{ "route": "Rota 10", "probability": "10%", "location": "Horda" }] },
  { "name": "yanma", "id": 193, "routes": [{ "route": "Rota 10", "probability": "5%", "location": "Horda" }] },
  { "name": "yanmega", "id": 469, "routes": [] },
  { "name": "hawlucha", "id": 701, "routes": [{ "route": "Rota 10", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "sigilyph", "id": 561, "routes": [{ "route": "Rota 10", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "golett", "id": 622, "routes": [{ "route": "Rota 10", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "golurk", "id": 623, "routes": [] },
  { "name": "nosepass", "id": 299, "routes": [{ "route": "Rota 10", "probability": "5%", "location": "Horda" }] },
  { "name": "probopass", "id": 476, "routes": [] },
  { "name": "makuhita", "id": 296, "routes": [{ "route": "Rota 11", "probability": "10%", "location": "Horda" }] },
  { "name": "hariyama", "id": 297, "routes": [] },
  { "name": "throh", "id": 538, "routes": [{ "route": "Rota 11", "probability": "5%", "location": "Grama Alta (Exclusivo Pokémon Y)" }] },
  { "name": "sawk", "id": 539, "routes": [{ "route": "Rota 11", "probability": "5%", "location": "Grama Alta (Exclusivo Pokémon X)" }] },
  { "name": "starly", "id": 396, "routes": [{ "route": "Rota 11", "probability": "10%", "location": "Horda" }] },
  { "name": "staravia", "id": 397, "routes": [] },
  { "name": "staraptor", "id": 398, "routes": [] },
  { "name": "stunky", "id": 434, "routes": [{ "route": "Rota 11", "probability": "30%", "location": "Grama Alta (Exclusivo Pokémon Y)" }] },
  { "name": "skuntank", "id": 435, "routes": [] },
  { "name": "nidoran-f", "id": 29, "routes": [{ "route": "Rota 11", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "nidorina", "id": 30, "routes": [] },
  { "name": "nidoqueen", "id": 31, "routes": [] },
  { "name": "nidoran-m", "id": 32, "routes": [{ "route": "Rota 11", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "nidorino", "id": 33, "routes": [] },
  { "name": "nidoking", "id": 34, "routes": [] },
  { "name": "dedenne", "id": 702, "routes": [{ "route": "Rota 11", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "chingling", "id": 433, "routes": [{ "route": "Rota 11", "probability": "5%", "location": "Grama Alta" }] },
  { "name": "chimecho", "id": 358, "routes": [] },
  { "name": "mime-jr", "id": 439, "routes": [{ "route": "Reflection Cave", "probability": "Comum", "location": "Andando" }] },
  { "name": "mr-mime", "id": 122, "routes": [] },
  { "name": "solosis", "id": 577, "routes": [{ "route": "Reflection Cave", "probability": "10%", "location": "Andando (Exclusivo Pokémon Y)" }] },
  { "name": "duosion", "id": 578, "routes": [] },
  { "name": "reuniclus", "id": 579, "routes": [] },
  { "name": "wynaut", "id": 360, "routes": [{ "route": "Reflection Cave", "probability": "10%", "location": "Horda" }] },
  { "name": "wobbuffet", "id": 202, "routes": [{ "route": "Reflection Cave", "probability": "20%", "location": "Andando" }] },
  { "name": "roggenrola", "id": 524, "routes": [{ "route": "Reflection Cave", "probability": "20%", "location": "Andando" }] },
  { "name": "boldore", "id": 525, "routes": [] },
  { "name": "gigalith", "id": 526, "routes": [] },
  { "name": "sableye", "id": 302, "routes": [{ "route": "Reflection Cave", "probability": "10%", "location": "Andando (Exclusivo Pokémon Y)" }] },
  { "name": "carbink", "id": 703, "routes": [{ "route": "Reflection Cave", "probability": "5%", "location": "Andando" }] },
  { "name": "tauros", "id": 128, "routes": [{ "route": "Rota 12", "probability": "5%", "location": "Grama Alta" }] },
  { "name": "miltank", "id": 241, "routes": [{ "route": "Rota 12", "probability": "5%", "location": "Grama Alta" }] },
  { "name": "mareep", "id": 179, "routes": [{ "route": "Rota 12", "probability": "10%", "location": "Horda" }] },
  { "name": "flaaffy", "id": 180, "routes": [] },
  { "name": "ampharos", "id": 181, "routes": [] },
  { "name": "pinsir", "id": 127, "routes": [{ "route": "Rota 12", "probability": "5%", "location": "Grama Alta (Exclusivo Pokémon Y)" }] },
  { "name": "heracross", "id": 214, "routes": [{ "route": "Rota 12", "probability": "5%", "location": "Grama Alta (Exclusivo Pokémon X)" }] },
  { "name": "pachirisu", "id": 417, "routes": [{ "route": "Rota 12", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "slowpoke", "id": 79, "routes": [{ "route": "Rota 12", "probability": "30%", "location": "Surfando" }] },
  { "name": "slowbro", "id": 80, "routes": [{ "route": "Azure Bay", "probability": "5%", "location": "Surfando" }] },
  { "name": "slowking", "id": 199, "routes": [] },
  { "name": "exeggcute", "id": 102, "routes": [{ "route": "Rota 12", "probability": "10%", "location": "Horda" }] },
  { "name": "exeggutor", "id": 103, "routes": [] },
  { "name": "chatot", "id": 441, "routes": [{ "route": "Rota 12", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "mantyke", "id": 458, "routes": [{ "route": "Rota 12", "probability": "Comum", "location": "Surfando" }] },
  { "name": "mantine", "id": 226, "routes": [] },
  { "name": "clamperl", "id": 366, "routes": [{ "route": "Rota 12", "probability": "65%", "location": "Pescando com Good Rod" }] },
  { "name": "huntail", "id": 367, "routes": [] },
  { "name": "gorebyss", "id": 368, "routes": [] },
  { "name": "remoraid", "id": 223, "routes": [{ "route": "Rota 12", "probability": "35%", "location": "Pescando com Good Rod" }] },
  { "name": "octillery", "id": 224, "routes": [{ "route": "Azure Bay", "probability": "35%", "location": "Pescando com Super Rod" }] },
  { "name": "corsola", "id": 222, "routes": [{ "route": "Rota 12", "probability": "5%", "location": "Pescando com Super Rod" }] },
  { "name": "chinchou", "id": 170, "routes": [{ "route": "Azure Bay", "probability": "65%", "location": "Pescando com Good Rod" }] },
  { "name": "lanturn", "id": 171, "routes": [{ "route": "Azure Bay", "probability": "35%", "location": "Pescando com Super Rod" }] },
  { "name": "alomomola", "id": 594, "routes": [{ "route": "Rota 12", "probability": "5%", "location": "Pescando com Super Rod" }] },
  { "name": "lapras", "id": 131, "routes": [{ "route": "Rota 12", "probability": "Presente (Gift)", "location": "Recebido de um NPC" }] },
  { "name": "articuno", "id": 144, "routes": [{ "route": "Sea Spirit's Den", "probability": "100% (Após 11 encontros)", "location": "Encontro Estático (se escolheu Chespin)" }] },
  { "name": "zapdos", "id": 145, "routes": [{ "route": "Sea Spirit's Den", "probability": "100% (Após 11 encontros)", "location": "Encontro Estático (se escolheu Fennekin)" }] },
  { "name": "moltres", "id": 146, "routes": [{ "route": "Sea Spirit's Den", "probability": "100% (Após 11 encontros)", "location": "Encontro Estático (se escolheu Froakie)" }] },

  // ===================================
  // MOUNTAIN KALOS POKEDEX
  // ===================================
  { "name": "diglett", "id": 50, "routes": [{ "route": "Rota 13", "probability": "Comum", "location": "Andando na Areia" }] },
  { "name": "dugtrio", "id": 51, "routes": [{ "route": "Rota 13", "probability": "Raro", "location": "Andando na Areia" }] },
  { "name": "trapinch", "id": 328, "routes": [{ "route": "Rota 13", "probability": "Comum", "location": "Andando na Areia" }] },
  { "name": "vibrava", "id": 329, "routes": [] },
  { "name": "flygon", "id": 330, "routes": [] },
  { "name": "gible", "id": 443, "routes": [{ "route": "Rota 13", "probability": "Raro", "location": "Andando na Areia" }] },
  { "name": "gabite", "id": 444, "routes": [] },
  { "name": "garchomp", "id": 445, "routes": [] },
  { "name": "geodude", "id": 74, "routes": [
      { "route": "Rota 18", "probability": "10%", "location": "Horda" },
      { "route": "Terminus Cave", "probability": "10%", "location": "Horda" },
      { "route": "Victory Road", "probability": "Comum", "location": "Andando" }
  ]},
  { "name": "graveler", "id": 75, "routes": [{ "route": "Victory Road", "probability": "Comum", "location": "Andando" }] },
  { "name": "golem", "id": 76, "routes": [] },
  { "name": "slugma", "id": 218, "routes": [{ "route": "Rota 13", "probability": "Comum", "location": "Quebrando Rochas" }] },
  { "name": "magcargo", "id": 219, "routes": [] },
  { "name": "shuckle", "id": 213, "routes": [{ "route": "Rota 18", "probability": "Comum", "location": "Quebrando Rochas" }] },
  { "name": "skorupi", "id": 451, "routes": [{ "route": "Rota 14", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "drapion", "id": 452, "routes": [] },
  { "name": "wooper", "id": 194, "routes": [{ "route": "Rota 14", "probability": "Comum", "location": "Surfando" }] },
  { "name": "quagsire", "id": 195, "routes": [{ "route": "Rota 14", "probability": "Comum", "location": "Surfando" }] },
  { "name": "goomy", "id": 704, "routes": [{ "route": "Rota 14", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "sliggoo", "id": 705, "routes": [{ "route": "Rota 19", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "goodra", "id": 706, "routes": [] },
  { "name": "karrablast", "id": 588, "routes": [
      { "route": "Rota 14", "probability": "5%", "location": "Grama Alta" },
      { "route": "Rota 19", "probability": "5%", "location": "Grama Alta" }
  ]},
  { "name": "escavalier", "id": 589, "routes": [] },
  { "name": "shelmet", "id": 616, "routes": [
      { "route": "Rota 14", "probability": "5%", "location": "Grama Alta" },
      { "route": "Rota 19", "probability": "5%", "location": "Grama Alta" }
  ]},
  { "name": "accelgor", "id": 617, "routes": [] },
  { "name": "bellsprout", "id": 69, "routes": [{ "route": "Rota 14", "probability": "20%", "location": "Grama Alta" }] },
  { "name": "weepinbell", "id": 70, "routes": [{ "route": "Rota 14", "probability": "5%", "location": "Grama Alta" }] },
  { "name": "victreebel", "id": 71, "routes": [] },
  { "name": "carnivine", "id": 455, "routes": [{ "route": "Rota 14", "probability": "Comum", "location": "Pântano" }] },
  { "name": "gastly", "id": 92, "routes": [{ "route": "Frost Cavern", "probability": "Comum", "location": "Andando" }] },
  { "name": "haunter", "id": 93, "routes": [{ "route": "Frost Cavern", "probability": "Comum", "location": "Andando" }] },
  { "name": "gengar", "id": 94, "routes": [] },
  { "name": "poliwag", "id": 60, "routes": [{ "route": "Rota 14", "probability": "Comum", "location": "Pescando com Old Rod" }] },
  { "name": "poliwhirl", "id": 61, "routes": [{ "route": "Rota 14", "probability": "Comum", "location": "Pescando com Good Rod" }] },
  { "name": "poliwrath", "id": 62, "routes": [] },
  { "name": "politoed", "id": 186, "routes": [] },
  { "name": "ekans", "id": 23, "routes": [{ "route": "Rota 14", "probability": "10%", "location": "Horda" }] },
  { "name": "arbok", "id": 24, "routes": [] },
  { "name": "stunfisk", "id": 618, "routes": [
      { "route": "Rota 14", "probability": "Comum", "location": "Pescando com Super Rod" },
      { "route": "Rota 19", "probability": "Comum", "location": "Pescando com Super Rod" }
  ]},
  { "name": "barboach", "id": 339, "routes": [{ "route": "Rota 14", "probability": "Comum", "location": "Pescando com Good Rod" }] },
  { "name": "whiscash", "id": 340, "routes": [{ "route": "Rota 14", "probability": "Comum", "location": "Pescando com Super Rod" }] },
  { "name": "purrloin", "id": 509, "routes": [] }, { "name": "liepard", "id": 510, "routes": [] }, { "name": "poochyena", "id": 261, "routes": [] },
  { "name": "mightyena", "id": 262, "routes": [] }, { "name": "patrat", "id": 504, "routes": [] }, { "name": "watchog", "id": 505, "routes": [] },
  { "name": "pawniard", "id": 624, "routes": [{ "route": "Rota 15", "probability": "Raro", "location": "Grama Alta" }] },
  { "name": "bisharp", "id": 625, "routes": [] },
  { "name": "klefki", "id": 707, "routes": [{ "route": "Rota 15", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "murkrow", "id": 198, "routes": [{ "route": "Rota 15", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "honchkrow", "id": 430, "routes": [] },
  { "name": "foongus", "id": 590, "routes": [{ "route": "Rota 15", "probability": "Comum (falso item)", "location": "Grama Alta" }] },
  { "name": "amoonguss", "id": 591, "routes": [{ "route": "Rota 20", "probability": "Comum (falso item)", "location": "Grama Alta" }] },
  { "name": "lotad", "id": 270, "routes": [{ "route": "Rota 15", "probability": "10%", "location": "Horda (Exclusivo Pokémon Y)" }] },
  { "name": "lombre", "id": 271, "routes": [] }, { "name": "ludicolo", "id": 272, "routes": [] },
  { "name": "buizel", "id": 418, "routes": [{ "route": "Rota 15", "probability": "Comum", "location": "Surfando" }] },
  { "name": "floatzel", "id": 419, "routes": [] },
  { "name": "basculin", "id": 550, "routes": [{ "route": "Rota 15", "probability": "Comum", "location": "Pescando com Super Rod" }] },
  { "name": "phantump", "id": 708, "routes": [{ "route": "Rota 16", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "trevenant", "id": 709, "routes": [] },
  { "name": "pumpkaboo", "id": 710, "routes": [{ "route": "Rota 16", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "gourgeist", "id": 711, "routes": [] },
  { "name": "litwick", "id": 607, "routes": [{ "route": "Lost Hotel", "probability": "Comum", "location": "Andando" }] },
  { "name": "lampent", "id": 608, "routes": [] }, { "name": "chandelure", "id": 609, "routes": [] },
  { "name": "rotom", "id": 479, "routes": [{ "route": "Lost Hotel", "probability": "Raro", "location": "Lixeiras (Terça-feira)" }] },
  { "name": "magnemite", "id": 81, "routes": [{ "route": "Lost Hotel", "probability": "Comum", "location": "Horda" }] },
  { "name": "magneton", "id": 82, "routes": [] }, { "name": "magnezone", "id": 462, "routes": [] },
  { "name": "voltorb", "id": 100, "routes": [{ "route": "Lost Hotel", "probability": "Comum (falso item)", "location": "Andando" }] },
  { "name": "electrode", "id": 101, "routes": [] },
  { "name": "trubbish", "id": 568, "routes": [{ "route": "Lost Hotel", "probability": "Comum", "location": "Lixeiras" }] },
  { "name": "garbodor", "id": 569, "routes": [] },
  { "name": "swinub", "id": 220, "routes": [{ "route": "Frost Cavern", "probability": "Comum", "location": "Andando" }] },
  { "name": "piloswine", "id": 221, "routes": [] }, { "name": "mamoswine", "id": 473, "routes": [] },
  { "name": "bergmite", "id": 712, "routes": [{ "route": "Frost Cavern", "probability": "Comum", "location": "Andando" }] },
  { "name": "avalugg", "id": 713, "routes": [] },
  { "name": "cubchoo", "id": 613, "routes": [{ "route": "Frost Cavern", "probability": "Comum", "location": "Andando" }] },
  { "name": "beartic", "id": 614, "routes": [] },
  { "name": "smoochum", "id": 238, "routes": [{ "route": "Frost Cavern", "probability": "5%", "location": "Horda" }] },
  { "name": "jynx", "id": 124, "routes": [{ "route": "Frost Cavern", "probability": "Raro", "location": "Andando" }] },
  { "name": "vanillite", "id": 582, "routes": [{ "route": "Frost Cavern", "probability": "5%", "location": "Horda" }] },
  { "name": "vanillish", "id": 583, "routes": [] }, { "name": "vanilluxe", "id": 584, "routes": [] },
  { "name": "snover", "id": 459, "routes": [{ "route": "Rota 17", "probability": "Comum", "location": "Andando na Neve" }] },
  { "name": "abomasnow", "id": 460, "routes": [] },
  { "name": "delibird", "id": 225, "routes": [{ "route": "Rota 17", "probability": "Comum", "location": "Andando na Neve" }] },
  { "name": "sneasel", "id": 215, "routes": [{ "route": "Rota 17", "probability": "Comum", "location": "Andando na Neve" }] },
  { "name": "weavile", "id": 461, "routes": [] },
  { "name": "timburr", "id": 532, "routes": [] },
  { "name": "gurdurr", "id": 533, "routes": [{ "route": "Terminus Cave", "probability": "Comum", "location": "Andando" }] },
  { "name": "conkeldurr", "id": 534, "routes": [] },
  { "name": "torkoal", "id": 324, "routes": [{ "route": "Rota 18", "probability": "Raro", "location": "Grama Alta" }] },
  { "name": "sandshrew", "id": 27, "routes": [] }, { "name": "sandslash", "id": 28, "routes": [] },
  { "name": "aron", "id": 304, "routes": [{ "route": "Terminus Cave", "probability": "Comum (Exclusivo Pokémon X)", "location": "Andando" }] },
  { "name": "lairon", "id": 305, "routes": [] }, { "name": "aggron", "id": 306, "routes": [] },
  { "name": "larvitar", "id": 246, "routes": [{ "route": "Terminus Cave", "probability": "Comum (Exclusivo Pokémon Y)", "location": "Andando" }] },
  { "name": "pupitar", "id": 247, "routes": [] }, { "name": "tyranitar", "id": 248, "routes": [] },
  { "name": "heatmor", "id": 631, "routes": [{ "route": "Rota 18", "probability": "5%", "location": "Grama Alta" }] },
  { "name": "durant", "id": 632, "routes": [{ "route": "Rota 18", "probability": "10%", "location": "Grama Alta" }] },
  { "name": "spinarak", "id": 167, "routes": [] }, { "name": "ariados", "id": 168, "routes": [] },
  { "name": "spearow", "id": 21, "routes": [] }, { "name": "fearow", "id": 22, "routes": [] },
  { "name": "cryogonal", "id": 615, "routes": [{ "route": "Frost Cavern", "probability": "Raro", "location": "Andando" }] },
  { "name": "skarmory", "id": 227, "routes": [{ "route": "Rota 18", "probability": "Raro", "location": "Grama Alta" }] },
  { "name": "noibat", "id": 714, "routes": [{ "route": "Terminus Cave", "probability": "Comum", "location": "Andando / Teto" }] },
  { "name": "noivern", "id": 715, "routes": [] },
  { "name": "gligar", "id": 207, "routes": [{ "route": "Rota 19", "probability": "Comum", "location": "Horda" }] },
  { "name": "gliscor", "id": 472, "routes": [] },
  { "name": "hoothoot", "id": 163, "routes": [{ "route": "Rota 20", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "noctowl", "id": 164, "routes": [] },
  { "name": "igglybuff", "id": 174, "routes": [] },
  { "name": "jigglypuff", "id": 39, "routes": [{ "route": "Rota 20", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "wigglytuff", "id": 40, "routes": [] },
  { "name": "shuppet", "id": 353, "routes": [{ "route": "Pokémon Village", "probability": "Raro", "location": "Grama Alta" }] },
  { "name": "banette", "id": 354, "routes": [] },
  { "name": "zorua", "id": 570, "routes": [{ "route": "Pokémon Village", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "zoroark", "id": 571, "routes": [] },
  { "name": "gothita", "id": 574, "routes": [{ "route": "Rota 20", "probability": "Comum (Exclusivo Pokémon X)", "location": "Grama Alta" }] },
  { "name": "gothorita", "id": 575, "routes": [] }, { "name": "gothitelle", "id": 576, "routes": [] },
  { "name": "bonsly", "id": 438, "routes": [] },
  { "name": "sudowoodo", "id": 185, "routes": [{ "route": "Rota 20", "probability": "Comum", "location": "Horda" }] },
  { "name": "spinda", "id": 327, "routes": [{ "route": "Rota 21", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "teddiursa", "id": 216, "routes": [{ "route": "Rota 21", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "ursaring", "id": 217, "routes": [] },
  { "name": "lickitung", "id": 108, "routes": [{ "route": "Victory Road", "probability": "Comum", "location": "Andando" }] },
  { "name": "lickilicky", "id": 463, "routes": [] },
  { "name": "scyther", "id": 123, "routes": [{ "route": "Rota 21", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "scizor", "id": 212, "routes": [] },
  { "name": "ditto", "id": 132, "routes": [{ "route": "Pokémon Village", "probability": "Comum", "location": "Grama Alta" }] },
  { "name": "swablu", "id": 333, "routes": [{ "route": "Rota 21", "probability": "Comum", "location": "Horda" }] },
  { "name": "altaria", "id": 334, "routes": [] },
  { "name": "druddigon", "id": 621, "routes": [{ "route": "Victory Road", "probability": "Raro", "location": "Andando" }] },
  { "name": "deino", "id": 633, "routes": [] }, { "name": "zweilous", "id": 634, "routes": [{ "route": "Victory Road", "probability": "Comum", "location": "Andando" }] },
  { "name": "hydreigon", "id": 635, "routes": [] },
  { "name": "dratini", "id": 147, "routes": [{ "route": "Rota 21", "probability": "Comum", "location": "Pescando com Good Rod" }] },
  { "name": "dragonair", "id": 148, "routes": [{ "route": "Rota 21", "probability": "Comum", "location": "Pescando com Super Rod" }] },
  { "name": "dragonite", "id": 149, "routes": [] },
  { "name": "xerneas", "id": 716, "routes": [{ "route": "Team Flare Secret HQ", "probability": "100% (Encontro Estático)", "location": "História Principal (Exclusivo Pokémon X)" }] },
  { "name": "yveltal", "id": 717, "routes": [{ "route": "Team Flare Secret HQ", "probability": "100% (Encontro Estático)", "location": "História Principal (Exclusivo Pokémon Y)" }] },
  { "name": "zygarde", "id": 718, "routes": [{ "route": "Terminus Cave", "probability": "100% (Encontro Estático)", "location": "Câmara final da caverna" }] },
  { "name": "mewtwo", "id": 150, "routes": [{ "route": "Pokémon Village", "probability": "100% (Encontro Estático)", "location": "Caverna (após a Elite Four)" }] }
];


export const POKEMON_TYPE_COLORS: { [key: string]: PokemonTypeColorStyle } = {
  normal:   { background: 'bg-gray-400',   text: 'text-neutral-700', border: 'border-gray-500', backgroundHex: '#CACBAB', cardBackgroundHex: '#A7A877', saturatedColorHex: '#9CA3AF' },
  fire:     { background: 'bg-red-500',     text: 'text-red-700',  border: 'border-red-600',   backgroundHex: '#FFADAD', cardBackgroundHex: '#FF8A8A', saturatedColorHex: '#EF4444'},
  water:    { background: 'bg-blue-500',    text: 'text-blue-700', border: 'border-blue-600',  backgroundHex: '#A0C4FF', cardBackgroundHex: '#8CB5F9', saturatedColorHex: '#3B82F6'},
  electric: { background: 'bg-yellow-400',  text: 'text-yellow-700',border: 'border-yellow-500',backgroundHex: '#FDFFB6', cardBackgroundHex: '#FAFFAC', saturatedColorHex: '#FACC15'},
  grass:    { background: 'bg-green-500',   text: 'text-green-700',border: 'border-green-600', backgroundHex: '#CAFFBF', cardBackgroundHex: '#B8FFA7', saturatedColorHex: '#22C55E'},
  ice:      { background: 'bg-sky-300',     text: 'text-sky-700',  border: 'border-sky-400',   backgroundHex: '#BDE0FE', cardBackgroundHex: '#A9D3FD', saturatedColorHex: '#7DD3FC'},
  fighting: { background: 'bg-orange-500',  text: 'text-orange-700',border: 'border-orange-600',backgroundHex: '#FFD6A5', cardBackgroundHex: '#FFC88D', saturatedColorHex: '#F97316'},
  poison:   { background: 'bg-purple-500',  text: 'text-purple-700',border: 'border-purple-600',backgroundHex: '#CDB4DB', cardBackgroundHex: '#C0A2D0', saturatedColorHex: '#A855F7'},
  ground:   { background: 'bg-yellow-600',  text: 'text-yellow-800',border: 'border-yellow-700',backgroundHex: '#E6CCB2', cardBackgroundHex: '#DDC0A0', saturatedColorHex: '#EAB308'},
  flying:   { background: 'bg-indigo-400',  text: 'text-indigo-700',border: 'border-indigo-500',backgroundHex: '#BDB2FF', cardBackgroundHex: '#ADA0FF', saturatedColorHex: '#818CF8'},
  psychic:  { background: 'bg-pink-500',    text: 'text-pink-700', border: 'border-pink-600',  backgroundHex: '#FFC8DD', cardBackgroundHex: '#FFB6D0', saturatedColorHex: '#EC4899'},
  bug:      { background: 'bg-lime-500',    text: 'text-lime-700', border: 'border-lime-600',  backgroundHex: '#D1FFBD', cardBackgroundHex: '#C0FFA9', saturatedColorHex: '#84CC16'},
  rock:     { background: 'bg-stone-500',   text: 'text-stone-700',border: 'border-stone-600', backgroundHex: '#D6CCC2', cardBackgroundHex: '#C9BEB6', saturatedColorHex: '#78716C'},
  ghost:    { background: 'bg-purple-600',  text: 'text-purple-700',border: 'border-purple-700',backgroundHex: '#D8BFD8', cardBackgroundHex: '#CAACCB', saturatedColorHex: '#9333EA'},
  dragon:   { background: 'bg-indigo-600',  text: 'text-indigo-700',border: 'border-indigo-700',backgroundHex: '#A2D2FF', cardBackgroundHex: '#8DC6FF', saturatedColorHex: '#4F46E5'},
  dark:     { background: 'bg-gray-700',    text: 'text-neutral-700', border: 'border-gray-800',  backgroundHex: '#B0A8A0', cardBackgroundHex: '#A29A92', saturatedColorHex: '#374151'},
  steel:    { background: 'bg-slate-500',   text: 'text-slate-700',border: 'border-slate-600', backgroundHex: '#D9D9D9', cardBackgroundHex: '#CCCCCC', saturatedColorHex: '#64748B'},
  fairy:    { background: 'bg-pink-400',    text: 'text-pink-700', border: 'border-pink-500',  backgroundHex: '#FFDAF5', cardBackgroundHex: '#FFC7ED', saturatedColorHex: '#F472B6'}
};


export const POKEMON_STAT_COLORS: { [key: string]: string } = {
  hp: 'bg-red-500 dark:bg-red-600',
  attack: 'bg-orange-500 dark:bg-orange-600',
  defense: 'bg-yellow-500 dark:bg-yellow-600',
  'special-attack': 'bg-blue-500 dark:bg-blue-600',
  'special-defense': 'bg-green-500 dark:bg-green-600',
  speed: 'bg-pink-500 dark:bg-pink-600',
};

// Internal type names remain in English for consistency with API and POKEMON_TYPE_COLORS keys
export const STANDARD_POKEMON_TYPES: string[] = [
  "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison",
  "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark",
  "steel", "fairy"
].sort();


export const OFFICIAL_ARTWORK_URL = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
export const SPRITE_URL = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

// Base capitalization for internal use or when no translation is available.
export const capitalize = (s: string): string => {
  if (!s) return '';
  if (s.includes('-')) {
    return s.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('-');
  }
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

// Capitalizes for display, taking into account language for Pokémon names.
// For other strings like "special-attack", it makes it "Special Attack".
export const capitalizeForDisplay = (s: string, lang: SupportedLanguage, isPokemonName: boolean = false): string => {
  if (!s) return '';
  if (isPokemonName) {
    return getTranslatedPokemonName(s, lang); // Uses specific Pokémon name translation/capitalization
  }
  let result = s.replace(/-/g, ' ');
  return result.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};


export const formatId = (id: number): string => `#${id.toString().padStart(3, '0')}`;

export const getUniqueRoutes = (pokemonList: BasePokemon[]): string[] => {
  const allRoutes = new Set<string>();
  pokemonList.forEach(pokemon => {
    pokemon.routes?.forEach(routeInfo => { 
      allRoutes.add(routeInfo.route);    
    });
  });
  return Array.from(allRoutes).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, ''), 10);
    const numB = parseInt(b.replace(/\D/g, ''), 10);
    if (!isNaN(numA) && !isNaN(numB)) {
      if (numA !== numB) return numA - numB;
      return a.localeCompare(b);
    }
    return a.localeCompare(b); 
  });
};


export const KALOS_GYM_LEADERS: GymLeaderInfo[] = [
  {
    id: "viola",
    gym_leader_key: "viola_name",
    city_key: "santalune_city_name",
    specialty_key: "bug",
    specialty_display_key: "type_bug",
    badge_name_key: "bug_badge_name",
    leader_image: "https://img.pokemondb.net/sprites/trainers/x-y/viola.jpg",
    tips_key: "viola_tips",
    advantages: ["fire", "flying", "rock"],
    disadvantages: ["grass", "fighting", "ground"],
    pokemon_ids: [283, 666] 
  },
  {
    id: "grant",
    gym_leader_key: "grant_name",
    city_key: "cyllage_city_name",
    specialty_key: "rock",
    specialty_display_key: "type_rock",
    badge_name_key: "cliff_badge_name",
    leader_image: "https://img.pokemondb.net/sprites/trainers/x-y/grant.jpg",
    tips_key: "grant_tips",
    advantages: ["water", "grass", "fighting", "ground", "steel"],
    disadvantages: ["normal", "fire", "poison", "flying"],
    pokemon_ids: [698, 696] 
  },
  {
    id: "korrina",
    gym_leader_key: "korrina_name",
    city_key: "shalour_city_name",
    specialty_key: "fighting",
    specialty_display_key: "type_fighting",
    badge_name_key: "rumble_badge_name",
    leader_image: "https://img.pokemondb.net/sprites/trainers/x-y/korrina.jpg",
    tips_key: "korrina_tips",
    advantages: ["flying", "psychic", "fairy"],
    disadvantages: ["rock", "bug", "dark"],
    pokemon_ids: [619, 67, 701] 
  },
  {
    id: "ramos",
    gym_leader_key: "ramos_name",
    city_key: "coumarine_city_name",
    specialty_key: "grass",
    specialty_display_key: "type_grass",
    badge_name_key: "plant_badge_name",
    leader_image: "https://img.pokemondb.net/sprites/trainers/x-y/ramos.jpg",
    tips_key: "ramos_tips",
    advantages: ["fire", "ice", "poison", "flying", "bug"],
    disadvantages: ["water", "electric", "grass", "ground"],
    pokemon_ids: [189, 70, 673] 
  },
  {
    id: "clemont",
    gym_leader_key: "clemont_name",
    city_key: "lumiose_city_name",
    specialty_key: "electric",
    specialty_display_key: "type_electric",
    badge_name_key: "voltage_badge_name",
    leader_image: "https://img.pokemondb.net/sprites/trainers/x-y/clemont.jpg",
    tips_key: "clemont_tips",
    advantages: ["ground"],
    disadvantages: ["electric", "flying", "steel"],
    pokemon_ids: [587, 82, 695] 
  },
  {
    id: "valerie",
    gym_leader_key: "valerie_name",
    city_key: "laverre_city_name",
    specialty_key: "fairy",
    specialty_display_key: "type_fairy",
    badge_name_key: "fairy_badge_name",
    leader_image: "https://img.pokemondb.net/sprites/trainers/x-y/valerie.jpg",
    tips_key: "valerie_tips",
    advantages: ["poison", "steel"],
    disadvantages: ["fighting", "bug", "dark"],
    pokemon_ids: [303, 122, 700] 
  },
  {
    id: "olympia",
    gym_leader_key: "olympia_name",
    city_key: "anistar_city_name",
    specialty_key: "psychic",
    specialty_display_key: "type_psychic",
    badge_name_key: "psychic_badge_name",
    leader_image: "https://img.pokemondb.net/sprites/trainers/x-y/olympia.jpg",
    tips_key: "olympia_tips",
    advantages: ["bug", "ghost", "dark"],
    disadvantages: ["fighting", "psychic"],
    pokemon_ids: [561, 199, 678] 
  },
  {
    id: "wulfric",
    gym_leader_key: "wulfric_name",
    city_key: "snowbelle_city_name",
    specialty_key: "ice",
    specialty_display_key: "type_ice",
    badge_name_key: "iceberg_badge_name",
    leader_image: "https://img.pokemondb.net/sprites/trainers/x-y/wulfric.jpg",
    tips_key: "wulfric_tips",
    advantages: ["fire", "fighting", "rock", "steel"],
    disadvantages: ["ice"],
    pokemon_ids: [460, 615, 713] 
  }
];


export const extractIdFromUrl = (url: string): number | null => {
    if (!url) return null;
    const parts = url.split('/');
    const idString = parts[parts.length - 2];
    const id = parseInt(idString, 10);
    return isNaN(id) ? null : id;
};

export const formatEvolutionTrigger = (details: EvolutionDetailFromApi[], lang: SupportedLanguage): string => {
    if (!details || details.length === 0) return translate("Special", lang);

    const detail = details[0]; 
    const trigger = detail.trigger.name; 
    const conditions: string[] = [];

    const getItemName = (item: {name: string} | null) => item ? capitalizeForDisplay(item.name, lang) : '';
    const getPokemonNameForEvo = (name: string) => capitalizeForDisplay(name, lang, true);


    if (detail.min_level !== null) conditions.push(`${translate("Level", lang)} ${detail.min_level}`);
    if (detail.min_happiness !== null) conditions.push(translate("High Friendship", lang));
    if (detail.min_affection !== null) conditions.push(translate("High Affection", lang));
    if (detail.min_beauty !== null) conditions.push(translate("High Beauty", lang));
    
    if (detail.item) conditions.push(`${translate("Use", lang)} ${getItemName(detail.item)}`);
    if (detail.held_item) conditions.push(`${translate("Hold", lang)} ${getItemName(detail.held_item)}`);
    
    if (trigger === 'trade') {
        if (detail.trade_species) return translate("Trade for", lang, { pokemonName: getPokemonNameForEvo(detail.trade_species.name) });
        return translate("Trade", lang);
    }
    
    if (trigger === 'use-item' && !detail.item) {
         return `${translate("Use", lang)} item`; 
    }


    if (detail.known_move) conditions.push(translate("Know", lang, { moveName: capitalizeForDisplay(detail.known_move.name, lang) }));
    if (detail.known_move_type) conditions.push(translate("Know type move", lang, { typeName: capitalizeForDisplay(detail.known_move_type.name, lang) }));
    if (detail.location) conditions.push(translate("at", lang, { locationName: capitalizeForDisplay(detail.location.name, lang) }));
    if (detail.party_species) conditions.push(translate("with in party", lang, { pokemonName: getPokemonNameForEvo(detail.party_species.name) }));
    if (detail.party_type) conditions.push(translate("with type in party", lang, { typeName: capitalizeForDisplay(detail.party_type.name, lang) }));

    if (detail.time_of_day && (detail.time_of_day === 'day' || detail.time_of_day === 'night')) {
        const timeOfDayKey = detail.time_of_day === 'day' ? 'day' : 'night'; 
        const timeOfDayDisplay = translate(timeOfDayKey, lang) || timeOfDayKey;
        
        const friendshipCondition = translate("High Friendship", lang);
        const affectionCondition = translate("High Affection", lang);

        let combinedCondition = "";

        if (conditions.includes(friendshipCondition)) {
            conditions.splice(conditions.indexOf(friendshipCondition), 1);
            combinedCondition = friendshipCondition;
        }
        if (conditions.includes(affectionCondition)) {
            conditions.splice(conditions.indexOf(affectionCondition), 1);
            if (combinedCondition) combinedCondition += ` / ${affectionCondition}`; 
            else combinedCondition = affectionCondition;
        }

        if (combinedCondition) {
            conditions.push(`${combinedCondition} ${translate("during", lang)} ${timeOfDayDisplay}`);
        } else {
            conditions.push(`${translate("during", lang)} ${timeOfDayDisplay}`);
        }
    }


    if (detail.gender === 1) conditions.push(translate("Female", lang));
    if (detail.gender === 2) conditions.push(translate("Male", lang));

    if (detail.needs_overworld_rain) conditions.push(translate("during Overworld Rain", lang));
    if (detail.turn_upside_down) conditions.push(translate("Turn 3DS Upside Down", lang));

    if (detail.relative_physical_stats !== null) {
        if (detail.relative_physical_stats > 0) conditions.push(translate("Attack > Defense", lang));
        else if (detail.relative_physical_stats < 0) conditions.push(translate("Attack < Defense", lang));
        else conditions.push(translate("Attack = Defense", lang));
    }

    if (conditions.length === 0) {
        if (trigger === 'level-up') return translate("Level up", lang);
        return capitalizeForDisplay(trigger.replace(/-/g, ' '), lang);
    }
    
    return conditions.join(', ');
};
