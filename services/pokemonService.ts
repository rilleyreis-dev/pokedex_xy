
import { PokemonDetail, PokemonSpecies, EvolutionChainResponse } from '../types';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonDetailsById = async (id: number): Promise<PokemonDetail> => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);
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

export const getPokemonSpeciesByUrl = async (url: string): Promise<PokemonSpecies> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon species data from ${url}. Status: ${response.status}`);
    }
    const data = await response.json();
    return data as PokemonSpecies;
  } catch (error) {
    console.error(`Error fetching Pokemon species from ${url}:`, error);
    throw error;
  }
};

export const getEvolutionChainByUrl = async (url: string): Promise<EvolutionChainResponse> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch evolution chain data from ${url}. Status: ${response.status}`);
    }
    const data = await response.json();
    return data as EvolutionChainResponse;
  } catch (error) {
    console.error(`Error fetching evolution chain from ${url}:`, error);
    throw error;
  }
};
