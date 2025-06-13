
import { BasePokemon, GymLeaderInfo, EvolutionDetailFromApi, SupportedLanguage } from './types';
import { t as translate, getTranslatedPokemonName } from './translations'; // Import for formatEvolutionTrigger

export const INITIAL_POKEMON_LIST: BasePokemon[] = [
  { "name": "chespin", "id": 650, "routes": [] },
  { "name": "quilladin", "id": 651, "routes": [] },
  { "name": "chesnaught", "id": 652, "routes": [] },
  { "name": "fennekin", "id": 653, "routes": [] },
  { "name": "braixen", "id": 654, "routes": [] },
  { "name": "delphox", "id": 655, "routes": [] },
  { "name": "froakie", "id": 656, "routes": [] },
  { "name": "frogadier", "id": 657, "routes": [] },
  { "name": "greninja", "id": 658, "routes": [] },
  { "name": "bunnelby", "id": 659, "routes": ["Rota 2", "Rota 3", "Rota 22"] },
  { "name": "diggersby", "id": 660, "routes": ["Rota 22"] },
  { "name": "zigzagoon", "id": 263, "routes": [] }, 
  { "name": "linoone", "id": 264, "routes": [] }, 
  { "name": "fletchling", "id": 661, "routes": ["Rota 2"] },
  { "name": "fletchinder", "id": 662, "routes": [] },
  { "name": "talonflame", "id": 663, "routes": [] },
  { "name": "pidgey", "id": 16, "routes": ["Rota 2", "Rota 3"] }, 
  { "name": "pidgeotto", "id": 17, "routes": [] },
  { "name": "pidgeot", "id": 18, "routes": [] },
  { "name": "scatterbug", "id": 664, "routes": ["Rota 2", "Santalune Forest"] }, 
  { "name": "spewpa", "id": 665, "routes": ["Santalune Forest"] },
  { "name": "vivillon", "id": 666, "routes": [] },
  { "name": "caterpie", "id": 10, "routes": ["Rota 2", "Santalune Forest"] },
  { "name": "metapod", "id": 11, "routes": ["Santalune Forest", "Rota 22"] }, 
  { "name": "butterfree", "id": 12, "routes": [] }, 
  { "name": "weedle", "id": 13, "routes": ["Rota 2", "Santalune Forest"] },
  { "name": "kakuna", "id": 14, "routes": ["Santalune Forest", "Rota 22"] }, 
  { "name": "beedrill", "id": 15, "routes": [] },
  { "name": "pansage", "id": 511, "routes": ["Santalune Forest"] }, 
  { "name": "simisage", "id": 512, "routes": [] },
  { "name": "pansear", "id": 513, "routes": ["Santalune Forest"] },
  { "name": "simisear", "id": 514, "routes": [] },
  { "name": "panpour", "id": 515, "routes": ["Santalune Forest"] },
  { "name": "simipour", "id": 516, "routes": [] },
  { "name": "pichu", "id": 172, "routes": [] }, 
  { "name": "pikachu", "id": 25, "routes": ["Rota 3", "Santalune Forest"] },
  { "name": "raichu", "id": 26, "routes": [] },
  { "name": "bidoof", "id": 399, "routes": ["Rota 3", "Rota 22"] }, 
  { "name": "bibarel", "id": 400, "routes": ["Rota 22"] },
  { "name": "dunsparce", "id": 206, "routes": ["Rota 3", "Rota 22"] },
  { "name": "azurill", "id": 298, "routes": ["Rota 3", "Rota 22"] },
  { "name": "marill", "id": 183, "routes": ["Rota 3", "Rota 22"] },
  { "name": "azumarill", "id": 184, "routes": ["Rota 22"] }, 
  { "name": "burmy", "id": 412, "routes": ["Rota 3"] }, 
  { "name": "wormadam", "id": 413, "routes": [] },
  { "name": "mothim", "id": 414, "routes": [] },
  { "name": "surskit", "id": 283, "routes": ["Rota 3"] }, 
  { "name": "masquerain", "id": 284, "routes": ["Rota 14", "Rota 15", "Rota 16", "Rota 19", "Rota 21"] }, 
  { "name": "magikarp", "id": 129, "routes": ["Rota 3", "Rota 22"] }, 
  { "name": "gyarados", "id": 130, "routes": ["Rota 3", "Rota 22"] }, 
  { "name": "corphish", "id": 341, "routes": ["Rota 3", "Parfum Palace"] }, 
  { "name": "crawdaunt", "id": 342, "routes": ["Rota 3", "Parfum Palace"] }, 
  { "name": "goldeen", "id": 118, "routes": ["Rota 3", "Rota 22", "Parfum Palace"] }, 
  { "name": "seaking", "id": 119, "routes": ["Rota 3", "Rota 22", "Parfum Palace"] }, 
  { "name": "carvanha", "id": 318, "routes": ["Rota 22"] }, 
  { "name": "sharpedo", "id": 319, "routes": ["Rota 22"] }, 
  { "name": "litleo", "id": 667, "routes": ["Rota 22"] },
  { "name": "pyroar", "id": 668, "routes": ["Rota 22"] }, 
  { "name": "psyduck", "id": 54, "routes": ["Rota 7", "Rota 22"] }, 
  { "name": "golduck", "id": 55, "routes": ["Rota 7", "Rota 22"] }, 
  { "name": "farfetchd", "id": 83, "routes": ["Rota 22"] }, 
  { "name": "riolu", "id": 447, "routes": ["Rota 22"] }, 
  { "name": "lucario", "id": 448, "routes": [] },
  { "name": "ralts", "id": 280, "routes": ["Rota 4"] },
  { "name": "kirlia", "id": 281, "routes": [] },
  { "name": "gardevoir", "id": 282, "routes": [] },
  { "name": "gallade", "id": 475, "routes": [] },
  { "name": "flabebe", "id": 669, "routes": ["Rota 4", "Rota 7"] }, 
  { "name": "floette", "id": 670, "routes": ["Rota 7"] }, 
  { "name": "florges", "id": 671, "routes": [] },
  { "name": "budew", "id": 406, "routes": ["Rota 4"] },
  { "name": "roselia", "id": 315, "routes": ["Rota 7"] },
  { "name": "roserade", "id": 407, "routes": [] },
  { "name": "ledyba", "id": 165, "routes": ["Rota 4"] }, 
  { "name": "ledian", "id": 166, "routes": [] },
  { "name": "combee", "id": 415, "routes": ["Rota 4"] }, 
  { "name": "vespiquen", "id": 416, "routes": [] },
  { "name": "skitty", "id": 300, "routes": ["Rota 4"] },
  { "name": "delcatty", "id": 301, "routes": [] },
  { "name": "bulbasaur", "id": 1, "routes": ["Lumiose City"] }, 
  { "name": "ivysaur", "id": 2, "routes": [] },
  { "name": "venusaur", "id": 3, "routes": [] },
  { "name": "charmander", "id": 4, "routes": ["Lumiose City"] }, 
  { "name": "charmeleon", "id": 5, "routes": [] },
  { "name": "charizard", "id": 6, "routes": [] },
  { "name": "squirtle", "id": 7, "routes": ["Lumiose City"] }, 
  { "name": "wartortle", "id": 8, "routes": [] },
  { "name": "blastoise", "id": 9, "routes": [] },
  { "name": "skiddo", "id": 672, "routes": ["Rota 5"] },
  { "name": "gogoat", "id": 673, "routes": [] },
  { "name": "pancham", "id": 674, "routes": ["Rota 5"] },
  { "name": "pangoro", "id": 675, "routes": [] },
  { "name": "furfrou", "id": 676, "routes": ["Rota 5"] },
  { "name": "doduo", "id": 84, "routes": ["Rota 5"] },
  { "name": "dodrio", "id": 85, "routes": [] },
  { "name": "plusle", "id": 311, "routes": ["Rota 5"] }, 
  { "name": "minun", "id": 312, "routes": ["Rota 5"] }, 
  { "name": "gulpin", "id": 316, "routes": ["Rota 5"] }, 
  { "name": "swalot", "id": 317, "routes": [] },
  { "name": "scraggy", "id": 559, "routes": ["Rota 5"] }, 
  { "name": "scrafty", "id": 560, "routes": [] },
  { "name": "abra", "id": 63, "routes": ["Rota 5"] },
  { "name": "kadabra", "id": 64, "routes": [] },
  { "name": "alakazam", "id": 65, "routes": [] },
  { "name": "oddish", "id": 43, "routes": ["Rota 6"] },
  { "name": "gloom", "id": 44, "routes": ["Rota 6"] }, 
  { "name": "vileplume", "id": 45, "routes": [] },
  { "name": "bellossom", "id": 182, "routes": [] },
  { "name": "sentret", "id": 161, "routes": ["Rota 6"] },
  { "name": "furret", "id": 162, "routes": [] },
  { "name": "nincada", "id": 290, "routes": ["Rota 6"] }, 
  { "name": "ninjask", "id": 291, "routes": [] },
  { "name": "shedinja", "id": 292, "routes": [] },
  { "name": "espurr", "id": 677, "routes": ["Rota 6"] },
  { "name": "meowstic", "id": 678, "routes": [] }, 
  { "name": "kecleon", "id": 352, "routes": ["Rota 6"] }, 
  { "name": "honedge", "id": 679, "routes": ["Rota 6"] },
  { "name": "doublade", "id": 680, "routes": [] },
  { "name": "aegislash", "id": 681, "routes": [] },
  { "name": "venipede", "id": 543, "routes": ["Rota 6"] }, 
  { "name": "whirlipede", "id": 544, "routes": [] },
  { "name": "scolipede", "id": 545, "routes": [] },
  { "name": "audino", "id": 531, "routes": ["Rota 6"] }, 
  { "name": "smeargle", "id": 235, "routes": ["Rota 7"] },
  { "name": "croagunk", "id": 453, "routes": ["Rota 7"] },
  { "name": "toxicroak", "id": 454, "routes": [] },
  { "name": "ducklett", "id": 580, "routes": ["Rota 7"] }, 
  { "name": "swanna", "id": 581, "routes": [] },
  { "name": "spritzee", "id": 682, "routes": ["Rota 7"] }, 
  { "name": "aromatisse", "id": 683, "routes": [] },
  { "name": "swirlix", "id": 684, "routes": ["Rota 7"] }, 
  { "name": "slurpuff", "id": 685, "routes": [] },
  { "name": "volbeat", "id": 313, "routes": ["Rota 7"] }, 
  { "name": "illumise", "id": 314, "routes": ["Rota 7"] }, 
  { "name": "hoppip", "id": 187, "routes": ["Rota 7"] },
  { "name": "skiploom", "id": 188, "routes": [] },
  { "name": "jumpluff", "id": 189, "routes": [] },
  { "name": "munchlax", "id": 446, "routes": [] }, 
  { "name": "snorlax", "id": 143, "routes": ["Rota 7"] }, 
  { "name": "whismur", "id": 293, "routes": ["Connecting Cave - Rota 7 side"] }, 
  { "name": "loudred", "id": 294, "routes": ["Connecting Cave - Rota 7 side"] },
  { "name": "exploud", "id": 295, "routes": [] },
  { "name": "meditite", "id": 307, "routes": ["Connecting Cave - Rota 8 side"] },
  { "name": "medicham", "id": 308, "routes": [] },
  { "name": "zubat", "id": 41, "routes": ["Connecting Cave"] },
  { "name": "golbat", "id": 42, "routes": ["Connecting Cave"] },
  { "name": "crobat", "id": 169, "routes": [] },
  { "name": "axew", "id": 610, "routes": ["Connecting Cave - Rota 8 side"] },
  { "name": "fraxure", "id": 611, "routes": [] },
  { "name": "haxorus", "id": 612, "routes": [] },
  { "name": "diancie", "id": 719, "routes": [] }, 
  { "name": "hoopa", "id": 720, "routes": [] }, 
  { "name": "volcanion", "id": 721, "routes": [] }, 
  { "name": "drifloon", "id": 425, "routes": ["Rota 8"] }, 
  { "name": "drifblim", "id": 426, "routes": [] },
  { "name": "mienfoo", "id": 619, "routes": ["Rota 8"] },
  { "name": "mienshao", "id": 620, "routes": [] },
  { "name": "zangoose", "id": 335, "routes": ["Rota 8"] }, 
  { "name": "seviper", "id": 336, "routes": ["Rota 8"] }, 
  { "name": "spoink", "id": 325, "routes": ["Rota 8"] },
  { "name": "grumpig", "id": 326, "routes": [] },
  { "name": "absol", "id": 359, "routes": ["Rota 8"] },
  { "name": "inkay", "id": 686, "routes": ["Rota 8"] },
  { "name": "malamar", "id": 687, "routes": [] },
  { "name": "lunatone", "id": 337, "routes": ["Glittering Cave"] }, 
  { "name": "solrock", "id": 338, "routes": ["Glittering Cave"] }, 
  { "name": "bagon", "id": 371, "routes": ["Rota 8"] }, 
  { "name": "shelgon", "id": 372, "routes": [] },
  { "name": "salamence", "id": 373, "routes": [] },
  { "name": "wingull", "id": 278, "routes": ["Rota 8", "Rota 12", "Azure Bay"] }, 
  { "name": "pelipper", "id": 279, "routes": ["Rota 8", "Rota 12", "Azure Bay"] }, 
  { "name": "taillow", "id": 276, "routes": ["Rota 8"] }, 
  { "name": "swellow", "id": 277, "routes": [] },
  { "name": "binacle", "id": 688, "routes": ["Rota 8", "Rota 12", "Azure Bay"] }, 
  { "name": "barbaracle", "id": 689, "routes": [] },
  { "name": "dwebble", "id": 557, "routes": ["Rota 8", "Rota 12", "Azure Bay", "Glittering Cave"] }, 
  { "name": "crustle", "id": 558, "routes": ["Glittering Cave"] }, 
  { "name": "tentacool", "id": 72, "routes": ["Rota 8", "Rota 12", "Azure Bay"] }, 
  { "name": "tentacruel", "id": 73, "routes": ["Rota 8", "Rota 12", "Azure Bay"] }, 
  { "name": "wailmer", "id": 320, "routes": ["Rota 8", "Rota 12", "Azure Bay"] }, 
  { "name": "wailord", "id": 321, "routes": [] },
  { "name": "luvdisc", "id": 370, "routes": ["Rota 8", "Rota 12", "Azure Bay", "Cyllage City", "Ambrette Town"] }, 
  { "name": "skrelp", "id": 690, "routes": ["Rota 8", "Ambrette Town", "Cyllage City"] }, 
  { "name": "dragalge", "id": 691, "routes": [] },
  { "name": "clauncher", "id": 692, "routes": ["Rota 8", "Ambrette Town", "Cyllage City"] }, 
  { "name": "clawitzer", "id": 693, "routes": [] },
  { "name": "staryu", "id": 120, "routes": ["Rota 8"] }, 
  { "name": "starmie", "id": 121, "routes": [] },
  { "name": "shellder", "id": 90, "routes": ["Rota 8"] }, 
  { "name": "cloyster", "id": 91, "routes": [] },
  { "name": "qwilfish", "id": 211, "routes": ["Rota 8"] }, 
  { "name": "horsea", "id": 116, "routes": ["Ambrette Town", "Cyllage City"] }, 
  { "name": "seadra", "id": 117, "routes": ["Azure Bay"] }, 
  { "name": "kingdra", "id": 230, "routes": [] },
  { "name": "relicanth", "id": 369, "routes": ["Ambrette Town", "Cyllage City", "Azure Bay"] }, 
  { "name": "sandile", "id": 551, "routes": ["Rota 9"] },
  { "name": "krokorok", "id": 552, "routes": [] },
  { "name": "krookodile", "id": 553, "routes": [] },
  { "name": "helioptile", "id": 694, "routes": ["Rota 9"] },
  { "name": "heliolisk", "id": 695, "routes": [] },
  { "name": "hippopotas", "id": 449, "routes": ["Rota 9"] },
  { "name": "hippowdon", "id": 450, "routes": [] },
  { "name": "rhyhorn", "id": 111, "routes": ["Glittering Cave"] }, 
  { "name": "rhydon", "id": 112, "routes": [] },
  { "name": "rhyperior", "id": 464, "routes": [] },
  { "name": "onix", "id": 95, "routes": ["Glittering Cave"] },
  { "name": "steelix", "id": 208, "routes": [] },
  { "name": "woobat", "id": 527, "routes": ["Glittering Cave", "Reflection Cave"] },
  { "name": "swoobat", "id": 528, "routes": ["Reflection Cave"] }, 
  { "name": "machop", "id": 66, "routes": ["Glittering Cave"] },
  { "name": "machoke", "id": 67, "routes": ["Glittering Cave"] }, 
  { "name": "machamp", "id": 68, "routes": [] },
  { "name": "cubone", "id": 104, "routes": ["Glittering Cave"] },
  { "name": "marowak", "id": 105, "routes": [] },
  { "name": "kangaskhan", "id": 115, "routes": ["Glittering Cave"] }, 
  { "name": "mawile", "id": 303, "routes": ["Glittering Cave"] }, 
  { "name": "tyrunt", "id": 696, "routes": ["Ambrette Town"] }, 
  { "name": "tyrantrum", "id": 697, "routes": [] },
  { "name": "amaura", "id": 698, "routes": ["Ambrette Town"] }, 
  { "name": "aurorus", "id": 699, "routes": [] },
  { "name": "aerodactyl", "id": 142, "routes": ["Ambrette Town"] }, 
  { "name": "ferroseed", "id": 597, "routes": ["Glittering Cave", "Reflection Cave"] }, 
  { "name": "ferrothorn", "id": 598, "routes": [] },
  { "name": "snubbull", "id": 209, "routes": ["Rota 10"] }, 
  { "name": "granbull", "id": 210, "routes": [] },
  { "name": "electrike", "id": 309, "routes": ["Rota 10"] }, 
  { "name": "manectric", "id": 310, "routes": [] },
  { "name": "houndour", "id": 228, "routes": ["Rota 10"] }, 
  { "name": "houndoom", "id": 229, "routes": [] },
  { "name": "eevee", "id": 133, "routes": ["Rota 10"] },
  { "name": "vaporeon", "id": 134, "routes": [] },
  { "name": "jolteon", "id": 135, "routes": [] },
  { "name": "flareon", "id": 136, "routes": [] },
  { "name": "espeon", "id": 196, "routes": [] },
  { "name": "umbreon", "id": 197, "routes": [] },
  { "name": "leafeon", "id": 470, "routes": [] }, 
  { "name": "glaceon", "id": 471, "routes": [] }, 
  { "name": "sylveon", "id": 700, "routes": [] }, 
  { "name": "emolga", "id": 587, "routes": ["Rota 10"] }, 
  { "name": "yanma", "id": 193, "routes": ["Rota 10"] },
  { "name": "yanmega", "id": 469, "routes": [] },
  { "name": "hawlucha", "id": 701, "routes": ["Rota 10"] },
  { "name": "sigilyph", "id": 561, "routes": ["Rota 10"] },
  { "name": "golett", "id": 622, "routes": ["Rota 10"] },
  { "name": "golurk", "id": 623, "routes": [] },
  { "name": "nosepass", "id": 299, "routes": ["Rota 10"] }, 
  { "name": "probopass", "id": 476, "routes": [] }, 
  { "name": "makuhita", "id": 296, "routes": ["Rota 11"] },
  { "name": "hariyama", "id": 297, "routes": ["Rota 11"] },
  { "name": "throh", "id": 538, "routes": ["Rota 11"] }, 
  { "name": "sawk", "id": 539, "routes": ["Rota 11"] }, 
  { "name": "starly", "id": 396, "routes": ["Rota 11"] }, 
  { "name": "staravia", "id": 397, "routes": ["Rota 11"] },
  { "name": "staraptor", "id": 398, "routes": [] },
  { "name": "stunky", "id": 434, "routes": ["Rota 11"] }, 
  { "name": "skuntank", "id": 435, "routes": [] },
  { "name": "nidoran-f", "id": 29, "routes": ["Rota 11"] },
  { "name": "nidorina", "id": 30, "routes": ["Rota 11"] },
  { "name": "nidoqueen", "id": 31, "routes": [] },
  { "name": "nidoran-m", "id": 32, "routes": ["Rota 11"] },
  { "name": "nidorino", "id": 33, "routes": ["Rota 11"] },
  { "name": "nidoking", "id": 34, "routes": [] },
  { "name": "dedenne", "id": 702, "routes": ["Rota 11"] },
  { "name": "chingling", "id": 433, "routes": ["Rota 11", "Reflection Cave"] }, 
  { "name": "chimecho", "id": 358, "routes": [] },
  { "name": "mime-jr", "id": 439, "routes": ["Reflection Cave"] },
  { "name": "mr-mime", "id": 122, "routes": ["Reflection Cave"] },
  { "name": "solosis", "id": 577, "routes": ["Reflection Cave"] }, 
  { "name": "duosion", "id": 578, "routes": ["Reflection Cave"] }, 
  { "name": "reuniclus", "id": 579, "routes": [] },
  { "name": "wynaut", "id": 360, "routes": ["Reflection Cave"] }, 
  { "name": "wobbuffet", "id": 202, "routes": ["Reflection Cave"] },
  { "name": "roggenrola", "id": 524, "routes": ["Reflection Cave"] },
  { "name": "boldore", "id": 525, "routes": ["Reflection Cave"] },
  { "name": "gigalith", "id": 526, "routes": [] },
  { "name": "sableye", "id": 302, "routes": ["Reflection Cave"] }, 
  { "name": "carbink", "id": 703, "routes": ["Reflection Cave"] },
  { "name": "tauros", "id": 128, "routes": ["Rota 12"] },
  { "name": "miltank", "id": 241, "routes": ["Rota 12"] },
  { "name": "mareep", "id": 179, "routes": ["Rota 12"] }, 
  { "name": "flaaffy", "id": 180, "routes": [] },
  { "name": "ampharos", "id": 181, "routes": [] },
  { "name": "pinsir", "id": 127, "routes": ["Rota 12"] }, 
  { "name": "heracross", "id": 214, "routes": ["Rota 12"] }, 
  { "name": "pachirisu", "id": 417, "routes": ["Rota 12"] },
  { "name": "slowpoke", "id": 79, "routes": ["Rota 12", "Azure Bay"] }, 
  { "name": "slowbro", "id": 80, "routes": ["Azure Bay"] }, 
  { "name": "slowking", "id": 199, "routes": [] },
  { "name": "exeggcute", "id": 102, "routes": ["Rota 12", "Azure Bay"] }, 
  { "name": "exeggutor", "id": 103, "routes": [] },
  { "name": "chatot", "id": 441, "routes": ["Rota 12"] },
  { "name": "mantyke", "id": 458, "routes": ["Rota 12", "Azure Bay"] }, 
  { "name": "mantine", "id": 226, "routes": ["Azure Bay"] }, 
  { "name": "clamperl", "id": 366, "routes": ["Rota 12", "Azure Bay"] }, 
  { "name": "huntail", "id": 367, "routes": [] }, 
  { "name": "gorebyss", "id": 368, "routes": [] }, 
  { "name": "remoraid", "id": 223, "routes": ["Rota 12", "Azure Bay"] }, 
  { "name": "octillery", "id": 224, "routes": ["Azure Bay"] }, 
  { "name": "corsola", "id": 222, "routes": ["Rota 12", "Ambrette Town", "Cyllage City"] }, 
  { "name": "chinchou", "id": 170, "routes": ["Azure Bay"] }, 
  { "name": "lanturn", "id": 171, "routes": ["Azure Bay"] }, 
  { "name": "alomomola", "id": 594, "routes": ["Rota 12", "Azure Bay"] }, 
  { "name": "lapras", "id": 131, "routes": ["Rota 12", "Azure Bay"] }, 
  { "name": "articuno", "id": 144, "routes": ["Sea Spirit's Den"] }, 
  { "name": "zapdos", "id": 145, "routes": ["Sea Spirit's Den"] }, 
  { "name": "moltres", "id": 146, "routes": ["Sea Spirit's Den"] }, 
  { "name": "diglett", "id": 50, "routes": ["Rota 13"] }, 
  { "name": "dugtrio", "id": 51, "routes": ["Rota 13"] },
  { "name": "trapinch", "id": 328, "routes": ["Rota 13"] },
  { "name": "vibrava", "id": 329, "routes": [] },
  { "name": "flygon", "id": 330, "routes": [] },
  { "name": "gible", "id": 443, "routes": ["Rota 13"] },
  { "name": "gabite", "id": 444, "routes": [] },
  { "name": "garchomp", "id": 445, "routes": [] },
  { "name": "geodude", "id": 74, "routes": ["Rota 18", "Terminus Cave", "Victory Road"] },
  { "name": "graveler", "id": 75, "routes": ["Rota 18", "Terminus Cave", "Victory Road"] },
  { "name": "golem", "id": 76, "routes": [] },
  { "name": "slugma", "id": 218, "routes": ["Rota 13"] }, 
  { "name": "magcargo", "id": 219, "routes": [] },
  { "name": "shuckle", "id": 213, "routes": ["Rota 18", "Terminus Cave", "Victory Road"] }, 
  { "name": "skorupi", "id": 451, "routes": ["Rota 14", "Rota 15", "Rota 16"] },
  { "name": "drapion", "id": 452, "routes": [] },
  { "name": "wooper", "id": 194, "routes": ["Rota 14"] },
  { "name": "quagsire", "id": 195, "routes": ["Rota 14", "Rota 19"] },
  { "name": "goomy", "id": 704, "routes": ["Rota 14"] },
  { "name": "sliggoo", "id": 705, "routes": ["Rota 19"] },
  { "name": "goodra", "id": 706, "routes": [] }, 
  { "name": "karrablast", "id": 588, "routes": ["Rota 14", "Rota 19"] },
  { "name": "escavalier", "id": 589, "routes": [] },
  { "name": "shelmet", "id": 616, "routes": ["Rota 14", "Rota 19"] },
  { "name": "accelgor", "id": 617, "routes": [] },
  { "name": "bellsprout", "id": 69, "routes": ["Rota 14"] },
  { "name": "weepinbell", "id": 70, "routes": ["Rota 14", "Rota 19", "Victory Road"] },
  { "name": "victreebel", "id": 71, "routes": [] },
  { "name": "carnivine", "id": 455, "routes": ["Rota 14", "Rota 19"] },
  { "name": "gastly", "id": 92, "routes": ["Lost Hotel", "Frost Cavern"] },
  { "name": "haunter", "id": 93, "routes": ["Lost Hotel", "Frost Cavern", "Victory Road"] },
  { "name": "gengar", "id": 94, "routes": [] },
  { "name": "poliwag", "id": 60, "routes": ["Rota 14", "Rota 15", "Rota 16", "Rota 19", "Rota 21", "Victory Road"] }, 
  { "name": "poliwhirl", "id": 61, "routes": ["Rota 14", "Rota 15", "Rota 16", "Rota 19", "Rota 21", "Victory Road"] }, 
  { "name": "poliwrath", "id": 62, "routes": [] },
  { "name": "politoed", "id": 186, "routes": [] },
  { "name": "ekans", "id": 23, "routes": ["Rota 14"] }, 
  { "name": "arbok", "id": 24, "routes": [] },
  { "name": "stunfisk", "id": 618, "routes": ["Rota 14", "Rota 19"] }, 
  { "name": "barboach", "id": 339, "routes": ["Rota 14", "Rota 19"] }, 
  { "name": "whiscash", "id": 340, "routes": ["Rota 14", "Rota 19", "Victory Road"] }, 
  { "name": "purrloin", "id": 509, "routes": ["Lost Hotel"] },
  { "name": "liepard", "id": 510, "routes": ["Rota 15", "Lost Hotel"] },
  { "name": "poochyena", "id": 261, "routes": ["Rota 15"] }, 
  { "name": "mightyena", "id": 262, "routes": ["Rota 15"] }, 
  { "name": "patrat", "id": 504, "routes": ["Lost Hotel"] },
  { "name": "watchog", "id": 505, "routes": ["Lost Hotel"] },
  { "name": "pawniard", "id": 624, "routes": ["Rota 15", "Lost Hotel"] },
  { "name": "bisharp", "id": 625, "routes": [] },
  { "name": "klefki", "id": 707, "routes": ["Rota 15", "Rota 16", "Lost Hotel"] },
  { "name": "murkrow", "id": 198, "routes": ["Rota 15", "Rota 16"] }, 
  { "name": "honchkrow", "id": 430, "routes": [] },
  { "name": "foongus", "id": 590, "routes": ["Rota 15", "Rota 16", "Rota 20", "Victory Road"] }, 
  { "name": "amoonguss", "id": 591, "routes": ["Rota 20", "Victory Road"] },
  { "name": "lotad", "id": 270, "routes": ["Rota 15", "Rota 16", "Rota 21"] }, 
  { "name": "lombre", "id": 271, "routes": ["Rota 15", "Rota 16", "Rota 21", "Victory Road"] }, 
  { "name": "ludicolo", "id": 272, "routes": [] },
  { "name": "buizel", "id": 418, "routes": ["Rota 15", "Rota 16", "Rota 21"] }, 
  { "name": "floatzel", "id": 419, "routes": ["Rota 15", "Rota 16", "Rota 21", "Victory Road"] }, 
  { "name": "basculin", "id": 550, "routes": ["Rota 15", "Rota 16", "Rota 21", "Victory Road"] }, 
  { "name": "phantump", "id": 708, "routes": ["Rota 16"] },
  { "name": "trevenant", "id": 709, "routes": ["Rota 20"] },
  { "name": "pumpkaboo", "id": 710, "routes": ["Rota 16"] },
  { "name": "gourgeist", "id": 711, "routes": [] },
  { "name": "litwick", "id": 607, "routes": ["Lost Hotel"] },
  { "name": "lampent", "id": 608, "routes": ["Lost Hotel"] },
  { "name": "chandelure", "id": 609, "routes": [] },
  { "name": "rotom", "id": 479, "routes": ["Lost Hotel"] }, 
  { "name": "magnemite", "id": 81, "routes": ["Lost Hotel"] }, 
  { "name": "magneton", "id": 82, "routes": ["Lost Hotel"] },
  { "name": "magnezone", "id": 462, "routes": [] }, 
  { "name": "voltorb", "id": 100, "routes": ["Lost Hotel"] }, 
  { "name": "electrode", "id": 101, "routes": ["Lost Hotel"] },
  { "name": "trubbish", "id": 568, "routes": ["Lost Hotel"] }, 
  { "name": "garbodor", "id": 569, "routes": ["Lost Hotel"] }, 
  { "name": "swinub", "id": 220, "routes": ["Frost Cavern"] },
  { "name": "piloswine", "id": 221, "routes": ["Frost Cavern"] },
  { "name": "mamoswine", "id": 473, "routes": [] }, 
  { "name": "bergmite", "id": 712, "routes": ["Frost Cavern"] },
  { "name": "avalugg", "id": 713, "routes": ["Frost Cavern"] },
  { "name": "cubchoo", "id": 613, "routes": ["Frost Cavern"] },
  { "name": "beartic", "id": 614, "routes": ["Frost Cavern"] },
  { "name": "smoochum", "id": 238, "routes": ["Frost Cavern"] },
  { "name": "jynx", "id": 124, "routes": ["Frost Cavern"] },
  { "name": "vanillite", "id": 582, "routes": ["Frost Cavern"] }, 
  { "name": "vanillish", "id": 583, "routes": ["Frost Cavern"] },
  { "name": "vanilluxe", "id": 584, "routes": [] },
  { "name": "snover", "id": 459, "routes": ["Rota 17"] },
  { "name": "abomasnow", "id": 460, "routes": ["Rota 17"] },
  { "name": "delibird", "id": 225, "routes": ["Rota 17"] }, 
  { "name": "sneasel", "id": 215, "routes": ["Rota 17"] },
  { "name": "weavile", "id": 461, "routes": [] },
  { "name": "timburr", "id": 532, "routes": ["Connecting Cave - Rota 7 side"] }, 
  { "name": "gurdurr", "id": 533, "routes": ["Rota 18", "Terminus Cave", "Victory Road"] },
  { "name": "conkeldurr", "id": 534, "routes": [] },
  { "name": "torkoal", "id": 324, "routes": ["Rota 18"] },
  { "name": "sandshrew", "id": 27, "routes": ["Terminus Cave"] },
  { "name": "sandslash", "id": 28, "routes": ["Terminus Cave"] },
  { "name": "aron", "id": 304, "routes": ["Terminus Cave"] }, 
  { "name": "lairon", "id": 305, "routes": ["Terminus Cave"] }, 
  { "name": "aggron", "id": 306, "routes": [] },
  { "name": "larvitar", "id": 246, "routes": ["Terminus Cave"] }, 
  { "name": "pupitar", "id": 247, "routes": ["Terminus Cave"] }, 
  { "name": "tyranitar", "id": 248, "routes": [] },
  { "name": "heatmor", "id": 631, "routes": ["Rota 18", "Terminus Cave", "Victory Road"] },
  { "name": "durant", "id": 632, "routes": ["Rota 18", "Terminus Cave", "Victory Road"] },
  { "name": "spinarak", "id": 167, "routes": ["Rota 18", "Terminus Cave", "Victory Road"] }, 
  { "name": "ariados", "id": 168, "routes": ["Rota 18", "Terminus Cave", "Victory Road"] }, 
  { "name": "spearow", "id": 21, "routes": ["Rota 18", "Victory Road"] },
  { "name": "fearow", "id": 22, "routes": ["Rota 18", "Victory Road"] },
  { "name": "cryogonal", "id": 615, "routes": ["Frost Cavern"] }, 
  { "name": "skarmory", "id": 227, "routes": ["Rota 18", "Victory Road"] }, 
  { "name": "noibat", "id": 714, "routes": ["Terminus Cave", "Victory Road"] },
  { "name": "noivern", "id": 715, "routes": [] },
  { "name": "gligar", "id": 207, "routes": ["Rota 19"] }, 
  { "name": "gliscor", "id": 472, "routes": [] },
  { "name": "hoothoot", "id": 163, "routes": ["Rota 20", "Pokémon Village"] }, 
  { "name": "noctowl", "id": 164, "routes": ["Rota 20", "Pokémon Village", "Victory Road"] }, 
  { "name": "igglybuff", "id": 174, "routes": ["Rota 20", "Pokémon Village"] }, 
  { "name": "jigglypuff", "id": 39, "routes": ["Rota 20", "Pokémon Village"] },
  { "name": "wigglytuff", "id": 40, "routes": [] },
  { "name": "shuppet", "id": 353, "routes": ["Pokémon Village"] },
  { "name": "banette", "id": 354, "routes": ["Pokémon Village"] },
  { "name": "zorua", "id": 570, "routes": ["Pokémon Village"] },
  { "name": "zoroark", "id": 571, "routes": ["Rota 20", "Pokémon Village"] },
  { "name": "gothita", "id": 574, "routes": ["Rota 20", "Pokémon Village"] }, 
  { "name": "gothorita", "id": 575, "routes": ["Rota 20", "Pokémon Village", "Victory Road"] }, 
  { "name": "gothitelle", "id": 576, "routes": [] },
  { "name": "bonsly", "id": 438, "routes": ["Rota 20", "Pokémon Village"] }, 
  { "name": "sudowoodo", "id": 185, "routes": ["Rota 20", "Pokémon Village"] },
  { "name": "spinda", "id": 327, "routes": ["Rota 21"] }, 
  { "name": "teddiursa", "id": 216, "routes": ["Rota 21", "Victory Road"] }, 
  { "name": "ursaring", "id": 217, "routes": ["Rota 21", "Victory Road"] }, 
  { "name": "lickitung", "id": 108, "routes": ["Rota 21", "Victory Road"] },
  { "name": "lickilicky", "id": 463, "routes": [] },
  { "name": "scyther", "id": 123, "routes": ["Rota 21"] }, 
  { "name": "scizor", "id": 212, "routes": [] },
  { "name": "ditto", "id": 132, "routes": ["Pokémon Village"] },
  { "name": "swablu", "id": 333, "routes": ["Rota 21"] },
  { "name": "altaria", "id": 334, "routes": ["Rota 21"] }, 
  { "name": "druddigon", "id": 621, "routes": ["Victory Road"] },
  { "name": "deino", "id": 633, "routes": ["Victory Road"] }, 
  { "name": "zweilous", "id": 634, "routes": ["Victory Road"] }, 
  { "name": "hydreigon", "id": 635, "routes": [] },
  { "name": "dratini", "id": 147, "routes": ["Rota 21"] }, 
  { "name": "dragonair", "id": 148, "routes": ["Rota 21", "Victory Road"] }, 
  { "name": "dragonite", "id": 149, "routes": [] },
  { "name": "xerneas", "id": 716, "routes": ["Team Flare Secret HQ"] }, 
  { "name": "yveltal", "id": 717, "routes": ["Team Flare Secret HQ"] }, 
  { "name": "zygarde", "id": 718, "routes": ["Terminus Cave - Zygarde's Chamber"] }, 
  { "name": "mewtwo", "id": 150, "routes": ["Pokémon Village - Unknown Dungeon"] } 
];

export const POKEMON_TYPE_COLORS: { [key: string]: { background: string; text: string; border?: string } } = {
  normal: { background: 'bg-gray-400', text: 'text-black' },
  fire: { background: 'bg-red-500', text: 'text-white' },
  water: { background: 'bg-blue-500', text: 'text-white' },
  electric: { background: 'bg-yellow-400', text: 'text-black' },
  grass: { background: 'bg-green-500', text: 'text-white' },
  ice: { background: 'bg-sky-300', text: 'text-black' },
  fighting: { background: 'bg-orange-700', text: 'text-white' },
  poison: { background: 'bg-purple-500', text: 'text-white' },
  ground: { background: 'bg-yellow-600', text: 'text-white', border: 'border-yellow-700' },
  flying: { background: 'bg-indigo-300', text: 'text-black' },
  psychic: { background: 'bg-pink-500', text: 'text-white' },
  bug: { background: 'bg-lime-500', text: 'text-black' },
  rock: { background: 'bg-yellow-700', text: 'text-white', border: 'border-yellow-800' },
  ghost: { background: 'bg-purple-700', text: 'text-white' },
  dragon: { background: 'bg-indigo-700', text: 'text-white' },
  dark: { background: 'bg-gray-700', text: 'text-white' },
  steel: { background: 'bg-slate-500', text: 'text-white' },
  fairy: { background: 'bg-pink-300', text: 'text-black' },
};

export const POKEMON_STAT_COLORS: { [key: string]: string } = {
  hp: 'bg-red-500',
  attack: 'bg-orange-500',
  defense: 'bg-yellow-500',
  'special-attack': 'bg-blue-500',
  'special-defense': 'bg-green-500',
  speed: 'bg-pink-500',
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

// Routes are Kalos-specific and kept in Portuguese for this app's data consistency.
export const getUniqueRoutes = (pokemonList: BasePokemon[]): string[] => {
  const allRoutes = new Set<string>();
  pokemonList.forEach(pokemon => {
    pokemon.routes?.forEach(route => {
      allRoutes.add(route);
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
  { id: "viola", gym_leader_key: "viola_name", city_key: "santalune_city_name", specialty_key: "bug", specialty_display_key: "type_bug", badge_name_key: "bug_badge_name", badge_image: "https://archives.bulbagarden.net/media/upload/thumb/7/75/Bug_Badge.png/50px-Bug_Badge.png" },
  { id: "grant", gym_leader_key: "grant_name", city_key: "cyllage_city_name", specialty_key: "rock", specialty_display_key: "type_rock", badge_name_key: "cliff_badge_name", badge_image: "https://archives.bulbagarden.net/media/upload/thumb/a/a6/Cliff_Badge.png/50px-Cliff_Badge.png" },
  { id: "korrina", gym_leader_key: "korrina_name", city_key: "shalour_city_name", specialty_key: "fighting", specialty_display_key: "type_fighting", badge_name_key: "rumble_badge_name", badge_image: "https://archives.bulbagarden.net/media/upload/thumb/6/64/Rumble_Badge.png/50px-Rumble_Badge.png" },
  { id: "ramos", gym_leader_key: "ramos_name", city_key: "coumarine_city_name", specialty_key: "grass", specialty_display_key: "type_grass", badge_name_key: "plant_badge_name", badge_image: "https://archives.bulbagarden.net/media/upload/thumb/1/13/Plant_Badge.png/50px-Plant_Badge.png" },
  { id: "clemont", gym_leader_key: "clemont_name", city_key: "lumiose_city_name", specialty_key: "electric", specialty_display_key: "type_electric", badge_name_key: "voltage_badge_name", badge_image: "https://archives.bulbagarden.net/media/upload/thumb/3/34/Voltage_Badge.png/50px-Voltage_Badge.png" },
  { id: "valerie", gym_leader_key: "valerie_name", city_key: "laverre_city_name", specialty_key: "fairy", specialty_display_key: "type_fairy", badge_name_key: "fairy_badge_name", badge_image: "https://archives.bulbagarden.net/media/upload/thumb/9/93/Fairy_Badge.png/50px-Fairy_Badge.png" },
  { id: "olympia", gym_leader_key: "olympia_name", city_key: "anistar_city_name", specialty_key: "psychic", specialty_display_key: "type_psychic", badge_name_key: "psychic_badge_name", badge_image: "https://archives.bulbagarden.net/media/upload/thumb/3/33/Psychic_Badge.png/50px-Psychic_Badge.png" },
  { id: "wulfric", gym_leader_key: "wulfric_name", city_key: "snowbelle_city_name", specialty_key: "ice", specialty_display_key: "type_ice", badge_name_key: "iceberg_badge_name", badge_image: "https://archives.bulbagarden.net/media/upload/thumb/5/53/Iceberg_Badge.png/50px-Iceberg_Badge.png" }
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
    const trigger = detail.trigger.name; // English trigger name from API
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
    
    if (trigger === 'use-item' && detail.item) { // Already handled by detail.item, this is a fallback if item is missing for some reason
        // This specific case might be redundant if detail.item always exists for 'use-item'
    } else if (trigger === 'use-item' && !detail.item) {
         return `${translate("Use", lang)} item`; // Generic item
    }


    if (detail.known_move) conditions.push(translate("Know", lang, { moveName: capitalizeForDisplay(detail.known_move.name, lang) }));
    if (detail.known_move_type) conditions.push(translate("Know type move", lang, { typeName: capitalizeForDisplay(detail.known_move_type.name, lang) }));
    if (detail.location) conditions.push(translate("at", lang, { locationName: capitalizeForDisplay(detail.location.name, lang) }));
    if (detail.party_species) conditions.push(translate("with in party", lang, { pokemonName: getPokemonNameForEvo(detail.party_species.name) }));
    if (detail.party_type) conditions.push(translate("with type in party", lang, { typeName: capitalizeForDisplay(detail.party_type.name, lang) }));

    if (detail.time_of_day && (detail.time_of_day === 'day' || detail.time_of_day === 'night')) {
        const timeOfDayKey = detail.time_of_day === 'day' ? 'day' : 'night'; // Could add 'day'/'night' to UI_TRANSLATIONS
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
            if (combinedCondition) combinedCondition += ` / ${affectionCondition}`; // Or some other conjunction
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
        // For other triggers like 'shed', 'push-block' etc. not explicitly covered by conditions
        return capitalizeForDisplay(trigger.replace(/-/g, ' '), lang);
    }
    
    return conditions.join(', ');
};
