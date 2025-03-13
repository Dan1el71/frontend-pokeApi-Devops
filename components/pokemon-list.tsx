import { PokemonCard } from "./pokemon-card"

interface PokemonListProps {
  pokemons: any[]
}

export function PokemonList({ pokemons }: PokemonListProps) {
  if (pokemons.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  )
}

