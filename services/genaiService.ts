
import { GoogleGenAI } from "@google/genai"; 
import { GymLeaderStrategy, SupportedLanguage } from '../types';
import { t } from '../translations'; 

// API key is automatically sourced from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const TEXT_MODEL = 'gemini-2.5-flash-preview-04-17';

export const getPokemonEncounterNotes = async (pokemonName: string, language: SupportedLanguage): Promise<string> => {
  let prompt = "";
  // The pokemonName is the English name from PokeAPI, used as an identifier.
  // The prompt instructs GenAI about the context and desired output language.

  if (language === 'pt-BR') {
    prompt = `Você é um especialista em Pokémon fornecendo detalhes adicionais de encontro para uma Pokédex. Para o Pokémon "${pokemonName}" (nome em inglês) encontrado na região de Kalos (dos jogos Pokémon X e Y): Descreva brevemente sua raridade geral (ex: comum, incomum, raro) e qualquer história interessante ou condições relacionadas ao seu encontro em Kalos. Mantenha a resposta em 1-2 frases concisas em Português do Brasil. Não liste rotas específicas, pois elas são mostradas separadamente. Foque no sabor narrativo. Exemplo para Snorlax: "Extremamente raro e frequentemente encontrado bloqueando caminhos, exigindo uma Poké Flauta para despertá-lo."`;
  } else { // 'en'
    prompt = `You are a Pokémon expert providing additional encounter details for a Pokédex. For the Pokémon "${pokemonName}" (English name) found in the Kalos region (from Pokémon X and Y games): Briefly describe its general rarity (e.g., common, uncommon, rare) and any interesting lore or conditions related to encountering it in Kalos. Keep the response to 1-2 concise sentences in English. Do not list specific routes as those are shown separately. Focus on narrative flavor. Example for Snorlax: "Extremely rare and often found blocking pathways, requiring a Poké Flute to awaken it."`;
  }
  
  try {
    const response = await ai.models.generateContent({ 
      model: TEXT_MODEL,
      contents: prompt,
      config: {
        // Omitting thinkingConfig to default to enabled for higher quality.
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error(`Error fetching encounter notes for ${pokemonName} in ${language}:`, error);
    const errorMsg = language === 'pt-BR' 
      ? `Falha ao obter notas de encontro para ${pokemonName}.`
      : `Failed to get encounter notes for ${pokemonName}.`;
    throw new Error(errorMsg);
  }
};

export const getGymLeaderCounterStrategy = async (
    gymLeaderDisplayName: string, // Name already translated to target language by App.tsx
    specialtyTypeDisplayName: string, // Specialty type name already translated by App.tsx
    language: SupportedLanguage
  ): Promise<GymLeaderStrategy> => {
  
  let prompt = "";

  if (language === 'pt-BR') {
    prompt = `Você é um estrategista de batalha Pokémon. O Líder de Ginásio ${gymLeaderDisplayName} de Kalos é especialista em Pokémon do tipo ${specialtyTypeDisplayName}. Forneça uma estratégia de contra-ataque em Português do Brasil. Retorne um objeto JSON com duas chaves: "recommendedTypes" (uma array de 2-3 strings de tipos de Pokémon em INGLÊS que são super eficazes contra Pokémon do tipo ${specialtyTypeDisplayName}) e "tacticalTip" (uma breve dica tática acionável para a batalha, em Português do Brasil). Exemplo de entrada: gymLeaderName="Viola", specialtyTypeDisplayName="Inseto". Exemplo de saída JSON: {"recommendedTypes": ["Fire", "Flying", "Rock"], "tacticalTip": "Tipos Voadores podem evitar movimentos comuns do tipo Inseto no chão."}`;
  } else { // 'en'
    prompt = `You are a Pokémon battle strategist. Gym Leader ${gymLeaderDisplayName} from Kalos specializes in ${specialtyTypeDisplayName}-type Pokémon. Provide a counter-strategy in English. Return a JSON object with two keys: "recommendedTypes" (an array of 2-3 Pokémon type strings IN ENGLISH that are super-effective against ${specialtyTypeDisplayName}-type Pokémon) and "tacticalTip" (a brief, actionable battle tip, in English). Example input: gymLeaderName="Viola", specialtyTypeDisplayName="Bug". Example JSON output: {"recommendedTypes": ["Fire", "Flying", "Rock"], "tacticalTip": "Flying-types can avoid common Bug-type ground moves."}`;
  }

  try {
    const response = await ai.models.generateContent({ 
      model: TEXT_MODEL,
      contents: prompt,
      // config: {
      //   responseMimeType: "application/json", // Removed this line
      // }
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }

    try {
      const parsedData = JSON.parse(jsonStr) as GymLeaderStrategy;
      if (Array.isArray(parsedData.recommendedTypes) && 
          parsedData.recommendedTypes.every(rt => typeof rt === 'string') &&
          typeof parsedData.tacticalTip === 'string') {
        return parsedData;
      } else {
        console.error("Parsed JSON data does not match GymLeaderStrategy structure:", parsedData);
        throw new Error( language === 'pt-BR' ? "JSON parseado não corresponde à estrutura GymLeaderStrategy." : "Parsed JSON does not match GymLeaderStrategy structure.");
      }
    } catch (e) {
      console.error(`Failed to parse JSON response for gym leader strategy (${language}):`, e, "\nOriginal string:", jsonStr);
      const errorMsg = language === 'pt-BR'
        ? `Falha ao parsear estratégia de contra-ataque para ${gymLeaderDisplayName}. JSON inválido recebido.`
        : `Failed to parse counter strategy for ${gymLeaderDisplayName}. Invalid JSON received.`;
      throw new Error(errorMsg);
    }

  } catch (error) {
    console.error(`Error fetching counter strategy for ${gymLeaderDisplayName} in ${language}:`, error);
    if (error instanceof Error && (error.message.includes("parse") || error.message.includes("JSON"))) {
        throw error; // Re-throw parsing errors to be more specific
    }
    const errorMsg = language === 'pt-BR'
        ? `Falha ao obter estratégia de contra-ataque para ${gymLeaderDisplayName}.`
        : `Failed to get counter strategy for ${gymLeaderDisplayName}.`;
    throw new Error(errorMsg);
  }
};
