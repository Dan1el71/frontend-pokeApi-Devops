'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Heart,
  Shield,
  Zap,
  Swords,
  Target,
  Gauge,
} from 'lucide-react'
import { getTypeBackground } from '@/lib/pokemon-colors'
import { formatStatName, processEvolutionChain } from '@/lib/utils'

export default function PokemonDetail({ params }: { params: { id: string } }) {
  const [pokemon, setPokemon] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>('about')

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.id}`
        )
        const data = await response.json()

        // Fetch species data
        const speciesRes = await fetch(data.species.url)
        const speciesData = await speciesRes.json()

        // Get flavor text (description)
        const spanishFlavorText =
          speciesData.flavor_text_entries.find(
            (entry: any) => entry.language.name === 'es'
          ) ||
          speciesData.flavor_text_entries.find(
            (entry: any) => entry.language.name === 'en'
          )
        const description = spanishFlavorText
          ? spanishFlavorText.flavor_text.replace(/\f/g, ' ')
          : 'Descripción no disponible.'

        // Get evolution chain
        let evolutionData: any = []
        if (speciesData.evolution_chain) {
          const evolutionRes = await fetch(speciesData.evolution_chain.url)
          const evolutionChain = await evolutionRes.json()

          // Process evolution chain (simplified)
          evolutionData = await processEvolutionChain(evolutionChain.chain)
        }

        // Get abilities
        const abilities = data.abilities.map((ability: any) => ({
          name: ability.ability.name,
          isHidden: ability.is_hidden,
        }))

        // Get moves (limit to 10 for simplicity)
        const moves = data.moves.slice(0, 10).map((move: any) => move.move.name)

        setPokemon({
          id: data.id,
          name: data.name,
          image: data.sprites.other['official-artwork'].front_default,
          height: data.height / 10,
          weight: data.weight / 10,
          types: data.types.map((type: any) => type.type.name),
          habitat: speciesData.habitat?.name || 'Desconocido',
          stats: data.stats.map((stat: any) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })),
          description,
          species: speciesData,
          evolutionChain: evolutionData,
          abilities,
          moves,
          baseExperience: data.base_experience,
          sprites: {
            front: data.sprites.front_default,
            back: data.sprites.back_default,
            frontShiny: data.sprites.front_shiny,
            backShiny: data.sprites.back_shiny,
          },
        })
      } catch (error) {
        console.error('Error fetching Pokemon details:', error)
        setError(
          'No se pudieron cargar los detalles del Pokémon. Por favor, intenta de nuevo más tarde.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchPokemonDetail()
  }, [params.id])

  // Get stat icon
  const getStatIcon = (statName: string) => {
    switch (statName) {
      case 'hp':
        return <Heart className="w-4 h-4" />
      case 'attack':
        return <Swords className="w-4 h-4" />
      case 'defense':
        return <Shield className="w-4 h-4" />
      case 'special-attack':
        return <Zap className="w-4 h-4" />
      case 'special-defense':
        return <Target className="w-4 h-4" />
      case 'speed':
        return <Gauge className="w-4 h-4" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="animate-bounce">
          <div className="w-16 h-16 bg-red-500 rounded-full border-4 border-white flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-gray-700 mb-6">{error}</p>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la Pokédex
        </Link>
      </div>
    )
  }

  if (!pokemon) {
    return null
  }

  const mainType = pokemon.types[0]
  const bgColor = getTypeBackground(mainType)

  return (
    <div className="min-h-screen bg-gray-100">
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
              {pokemon.types.map((type: string) => (
                <span
                  key={type}
                  className="capitalize px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm bg-white/20"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto md:mr-8 z-10 mt-4 md:mt-16">
            <Image
              src={pokemon.image || '/placeholder.svg?height=192&width=192'}
              alt={pokemon.name}
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8 -mt-4 md:-mt-8">
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
          <div className="flex overflow-x-auto scrollbar-hide border-b mb-4 md:mb-6 pb-1">
            <button
              className={`px-2 md:px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'about'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('about')}
            >
              Información
            </button>
            <button
              className={`px-2 md:px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'stats'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('stats')}
            >
              Estadísticas
            </button>
            <button
              className={`px-2 md:px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'evolution'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('evolution')}
            >
              Evolución
            </button>
            <button
              className={`px-2 md:px-4 py-2 font-medium whitespace-nowrap ${
                activeTab === 'moves'
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('moves')}
            >
              Movimientos
            </button>
          </div>

          {activeTab === 'about' && (
            <div className="space-y-4 md:space-y-6">
              <p className="text-sm md:text-base text-gray-700">
                {pokemon.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2 md:mb-3">
                    Perfil
                  </h3>
                  <div className="grid grid-cols-2 gap-y-2 text-sm md:text-base">
                    <div className="text-gray-500">Altura</div>
                    <div>{pokemon.height} m</div>
                    <div className="text-gray-500">Peso</div>
                    <div>{pokemon.weight} kg</div>
                    <div className="text-gray-500">Hábitat</div>
                    <div className="capitalize">{pokemon.habitat}</div>
                    <div className="text-gray-500">Experiencia Base</div>
                    <div>{pokemon.baseExperience}</div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2 md:mb-3">
                    Habilidades
                  </h3>
                  <ul className="space-y-2 text-sm md:text-base">
                    {pokemon.abilities.map((ability: any, index: number) => (
                      <li key={index} className="flex items-center">
                        <span className="capitalize">
                          {ability.name.replace('-', ' ')}
                        </span>
                        {ability.isHidden && (
                          <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                            Oculta
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2 md:mb-3">
                  Sprites
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {pokemon.sprites.front && (
                    <div className="flex flex-col items-center">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg shadow-sm">
                        <Image
                          src={pokemon.sprites.front || '/placeholder.svg'}
                          alt={`${pokemon.name} sprite frontal`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs md:text-sm text-gray-500 mt-1">
                        Frontal
                      </span>
                    </div>
                  )}

                  {pokemon.sprites.back && (
                    <div className="flex flex-col items-center">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg shadow-sm">
                        <Image
                          src={pokemon.sprites.back || '/placeholder.svg'}
                          alt={`${pokemon.name} sprite trasero`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs md:text-sm text-gray-500 mt-1">
                        Trasero
                      </span>
                    </div>
                  )}

                  {pokemon.sprites.frontShiny && (
                    <div className="flex flex-col items-center">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg shadow-sm">
                        <Image
                          src={pokemon.sprites.frontShiny || '/placeholder.svg'}
                          alt={`${pokemon.name} sprite frontal shiny`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs md:text-sm text-gray-500 mt-1">
                        Shiny Frontal
                      </span>
                    </div>
                  )}

                  {pokemon.sprites.backShiny && (
                    <div className="flex flex-col items-center">
                      <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg shadow-sm">
                        <Image
                          src={pokemon.sprites.backShiny || '/placeholder.svg'}
                          alt={`${pokemon.name} sprite trasero shiny`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-xs md:text-sm text-gray-500 mt-1">
                        Shiny Trasero
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {pokemon.stats.map((stat: any) => (
                  <div
                    key={stat.name}
                    className="bg-gray-50 p-3 md:p-4 rounded-lg"
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        {getStatIcon(stat.name)}
                      </div>
                      <h3 className="text-sm md:text-base font-medium">
                        {formatStatName(stat.name)}
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-3 md:h-4 mr-2">
                        <div
                          className="h-3 md:h-4 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              (stat.value / 255) * 100
                            )}%`,
                            backgroundColor: bgColor,
                          }}
                        ></div>
                      </div>
                      <span className="font-medium text-sm md:text-base">
                        {stat.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2 md:mb-3">
                  Total de Estadísticas
                </h3>
                <div className="text-xl md:text-2xl font-bold">
                  {pokemon.stats.reduce(
                    (total: number, stat: any) => total + stat.value,
                    0
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'evolution' && (
            <div>
              {pokemon.evolutionChain && pokemon.evolutionChain.length > 0 ? (
                <div className="flex flex-col items-center">
                  <div className="flex flex-wrap justify-center items-center gap-4">
                    {pokemon.evolutionChain.map((evo: any, index: number) => (
                      <div key={evo.id} className="flex flex-col items-center">
                        <Link href={`/pokemon/${evo.id}`} className="group">
                          <div
                            className={`relative w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full p-3 md:p-4 transition-transform group-hover:scale-110 ${
                              evo.id === pokemon.id
                                ? 'ring-4 ring-blue-500'
                                : ''
                            }`}
                          >
                            <Image
                              src={
                                evo.image ||
                                '/placeholder.svg?height=128&width=128'
                              }
                              alt={evo.name}
                              fill
                              className="object-contain p-2"
                            />
                          </div>
                          <span className="mt-2 capitalize text-center text-sm md:text-base font-medium group-hover:text-blue-500">
                            {evo.name}
                          </span>
                        </Link>
                        {index < pokemon.evolutionChain.length - 1 && (
                          <div className="text-gray-400 text-xl md:text-2xl my-1 md:my-2">
                            ↓
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 md:py-8 text-gray-500">
                  No hay datos de evolución disponibles para este Pokémon.
                </div>
              )}
            </div>
          )}

          {activeTab === 'moves' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {pokemon.moves.map((move: string, index: number) => (
                <div key={index} className="bg-gray-50 p-2 md:p-3 rounded-lg">
                  <span className="capitalize text-sm md:text-base">
                    {move.replace('-', ' ')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
