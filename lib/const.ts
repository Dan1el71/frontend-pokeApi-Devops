export const navigationPaths = [
  {
    name: '',
    url: '',
  },
  {
    name: '',
    url: '',
  },
  {
    name: '',
    url: '',
  },
]

export const pokemonSprites = [
  { type: 'front_default', label: 'Frontal' },
  { type: 'back_default', label: 'Trasero' },
  { type: 'front_shiny', label: 'Shiny Frontal' },
  { type: 'back_shiny', label: 'Shiny Trasero' },
]

export const pokemonInfoTabs = [
  { id: 'about', label: 'Información' },
  { id: 'stats', label: 'Estadísticas' },
  { id: 'evolution', label: 'Evolución' },
  { id: 'moves', label: 'Movimientos' },
]

// Map of Pokemon types to their background colors
export const getTypeBackground = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  }

  return typeColors[type] || '#777777'
}

export const pokemonLimit = 12
