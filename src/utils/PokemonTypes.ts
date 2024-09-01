import { PokemonData } from "@/types/PokemonResponse"

interface Types {
  slot: number,
  type: PokemonData,
}

export const PokemonTypes = (types: Types[]) => {
  return types.map((t) => t.type.name).join(", ")
}