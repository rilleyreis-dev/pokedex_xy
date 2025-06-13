
import { PokemonDetail } from '../types';

const API_BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemonDetailsById = async (id: number): Promise<PokemonDetail> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status} for Pokemon ID: ${id}`);
      throw new Error(`Failed to fetch Pokemon data for ID: ${id}. Status: ${response.status}`);
    }
    const data = await response.json();
    return data as PokemonDetail;
  } catch (error) {
    console.error(`Error fetching Pokemon details for ID ${id}:`, error);
    throw error; // Re-throw to be caught by the calling component
  }
};
