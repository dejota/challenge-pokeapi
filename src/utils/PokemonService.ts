import axios, { AxiosInstance } from 'axios';
import type { PokemonResponse, SinglePokemon } from '../types/PokemonResponse';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const getPokemonList = async () => {
  try {
    return (await apiClient.get<PokemonResponse>('')).data;
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
  }
};

export const getPokemon = async (pokemonName: string) => {
  try {
    return (await apiClient.get<SinglePokemon>(pokemonName)).data;
  } catch (error) {
    console.error(`Error fetching "${pokemonName}":`, error);
  }
};