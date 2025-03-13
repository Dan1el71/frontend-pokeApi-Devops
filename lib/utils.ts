import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format stat name
export const formatStatName = (name: string) => {
  switch (name) {
    case 'hp':
      return 'PS'
    case 'attack':
      return 'Ataque'
    case 'defense':
      return 'Defensa'
    case 'special-attack':
      return 'Atq. Esp.'
    case 'special-defense':
      return 'Def. Esp.'
    case 'speed':
      return 'Velocidad'
    default:
      return name
  }
}

export const processEvolutionChain = async (chain: any) => {
  const evolutions = []

  // Función auxiliar para obtener la información del Pokémon a partir de la URL de la especie
  const getPokemonFromSpeciesUrl = async (speciesUrl: string) => {
    const speciesRes = await fetch(speciesUrl)
    const speciesData = await speciesRes.json()
    const pokemonRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${speciesData.id}`
    )
    const pokemonData = await pokemonRes.json()
    return {
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.sprites.other['official-artwork'].front_default,
    }
  }

  // Obtener la forma base
  evolutions.push(await getPokemonFromSpeciesUrl(chain.species.url))

  // Procesar la primera evolución, si existe
  if (chain.evolves_to.length > 0) {
    const evolution1 = chain.evolves_to[0]
    evolutions.push(await getPokemonFromSpeciesUrl(evolution1.species.url))

    // Procesar la siguiente evolución, si existe
    if (evolution1.evolves_to.length > 0) {
      const evolution2 = evolution1.evolves_to[0]
      evolutions.push(await getPokemonFromSpeciesUrl(evolution2.species.url))
    }
  }

  return evolutions
}
