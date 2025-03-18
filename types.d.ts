interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  habitat: string
  baseExperience: number
  description: string
  abilities: PokemonHability[] // y
  types: PokemonTypes[] // y
  stats: PokemonStat[] // y
  sprites: PokemonSprite[] // y
  species: PokemonSpecies
  //evolution_chain: PokemonEvolutionChain
  moves: PokemonMove[] //y
}

interface PokemonHability {
  isHidden: boolean
  name: string
}

interface Pokemontypes {
  name: string
}

interface PokemonStat {
  name: string
  value: number
}

interface PokemonSprite {
  name: string
  url: string
}

interface PokemonMoves {
  name: string
}

interface PokemonSpecies {
  flavor_text_entries: FlavorTextEntry[]
  habitat?: {
    name: string
  }
}

interface FlavorTextEntry {
  flavor_text: string
  language: {
    name: string
  }
}

interface PaginationParams {
  limit?: number
  offset?: number
}
