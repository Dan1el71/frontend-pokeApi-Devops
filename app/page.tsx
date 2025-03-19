'use client'

import { useState, useEffect } from 'react'
import { Search } from '@/components/search'
import { PokemonList } from '@/components/pokemon-list'
import { Pagination } from '@/components/pagination'
import { navigationPaths, pokemonLimit } from '@/lib/const'
import {
  getPokemon,
  paginatedPokemons,
  searchPokemon,
} from '@/services/pokemon.service'

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Pokemon[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const offset = (currentPage - 1) * pokemonLimit

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true)

      try {
        const response = await paginatedPokemons(pokemonLimit, offset)

        setTotalPages(Math.ceil(response.count / pokemonLimit))

        const pokemonDetails = await Promise.all(
          response.results.map(async ({ id }) => {
            return await getPokemon(id)
          })
        )

        setPokemons(pokemonDetails)
      } catch (error) {
        console.error('Error fetching Pokemon data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (!isSearching) {
      fetchPokemons()
    }
  }, [currentPage, isSearching, offset])

  const handleSearch = async (term: string) => {
    const trimmedTerm = term.trim()
    if (!trimmedTerm) {
      setIsSearching(false)
      return
    }

    setIsSearching(true)
    setLoading(true)
    const searchTerm = trimmedTerm.toLowerCase()
    let results: any[] = []

    try {
      results = [await getPokemon(searchTerm)]
    } catch {
      try {
        const pokeSearch = await searchPokemon(searchTerm)
        results = await Promise.all(
          pokeSearch.map(({ id }: { id: number }) => getPokemon(id))
        )
      } catch (error) {
        console.error('Error buscando Pokémon:', error)
        results = []
      }
    } finally {
      setSearchResults(results)
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const clearSearch = () => {
    setSearchTerm('')
    setIsSearching(false)
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <header className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg p-2">
            <nav>
              <ul className="flex space-x-4">
                {navigationPaths.slice(0, 3).map((nav, index) => (
                  <li key={index}>
                    <a
                      href={nav.url}
                      className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors
                         relative before:content-[''] before:absolute before:bottom-0 before:left-1/2 
                         before:w-0 before:h-px before:bg-blue-600 before:transition-all before:duration-300
                         hover:before:w-full hover:before:left-0"
                    >
                      {nav.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>
        <div className="flex flex-col items-center md:mb-8 py-6 md:py-8 my-4">
          <div className="w-full max-w-xl flex flex-col items-center">
            <Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
              onClear={clearSearch}
            />
          </div>
        </div>

        {!loading ? (
          <>
            <PokemonList pokemons={isSearching ? searchResults : pokemons} />

            {!isSearching && (
              <div className="mt-6 md:mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {isSearching && searchResults.length === 0 && (
              <div className="text-center mt-8">
                <p className="text-xl font-semibold">
                  No se encontraron Pokémon
                </p>
                <button
                  onClick={clearSearch}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Mostrar todos los Pokémon
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="animate-bounce">
              <div className="w-16 h-16 bg-red-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
