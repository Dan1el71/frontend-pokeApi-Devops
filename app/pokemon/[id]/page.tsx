'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPokemon } from '@/services/pokemon.service'
import { useParams } from 'next/navigation'
import { getTypeBackground, pokemonInfoTabs } from '@/lib/const'
import LoadingSpinner from '@/components/loading-spinner'
import ErrorPage from '@/components/error-page'
import AboutTab from '@/components/tabs/about-tab'
import StatsTab from '@/components/tabs/stats-tab'
import MovesTab from '@/components/tabs/moves-tab'
import EvolutionTab from '@/components/tabs/evolution-tab'

const PokemonDetail = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>('about')
  const { id: pokemonId } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const pokemon = await getPokemon(pokemonId)

        setPokemon(pokemon)
      } catch (error) {
        console.error('Error al obtener los detalles del Pokémon:', error)
        setError(
          'No se pudieron cargar los detalles del Pokémon. Por favor, intenta de nuevo más tarde.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchPokemonDetail()
  }, [pokemonId])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorPage error={error} />
  }

  if (!pokemon) {
    return null
  }

  const mainType = pokemon.types[0].name
  const bgColor = getTypeBackground(mainType)

  return (
    <div>
      <div
        className="min-h-[12rem] md:h-64 w-full relative"
        style={{ backgroundColor: bgColor }}
      >
        <div className="container mx-auto px-4 h-full flex flex-col md:flex-row md:items-center justify-between relative py-4 md:py-0">
          <Link
            href="/"
            className="absolute top-4 left-4 z-10 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 md:h-6 md:w-6 text-white" />
          </Link>

          <div className="text-white ml-12 md:ml-16 mt-2 md:mt-0">
            <div className="text-sm font-medium mb-1">#{pokemon.id}</div>
            <h1 className="text-2xl md:text-4xl font-bold capitalize">
              {pokemon.name}
            </h1>
            <div className="flex flex-wrap gap-1 md:gap-2 mt-2">
              {pokemon.types.map(({ name }, index) => (
                <span
                  key={index}
                  className="capitalize px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm bg-white/20"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto md:mr-8 z-10 mt-4 md:mt-16">
            <Image
              src={pokemon.image || '/placeholder.svg?height=192&width=192'}
              alt={pokemon.name}
              fill
              loading="eager"
              priority={true}
              className="object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-4 md:py-8 -mt-4 md:-mt-8">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <div className="flex overflow-x-auto scrollbar-hide border-b mb-4 md:mb-6 pb-1">
            {pokemonInfoTabs.map(({ id, label }) => (
              <button
                key={id}
                className={`px-2 md:px-4 py-2 font-medium whitespace-nowrap ${
                  activeTab === id
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === 'about' && <AboutTab pokemon={pokemon} />}

          {activeTab === 'stats' && (
            <StatsTab stats={pokemon.stats} bgColor={bgColor} />
          )}

          {activeTab === 'evolution' && <EvolutionTab pokemon={pokemon} />}

          {activeTab === 'moves' && <MovesTab moves={pokemon.moves} />}
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail
