import { AxiosResponse } from 'axios'
import axios from '../lib/axios'

export const getPokemon = async (id: string | number): Promise<Pokemon> => {
  try {
    const { data: response } = await axios.get<AxiosResponse<Pokemon>>(
      `/pokemon/${id}`
    )
    return response.data
  } catch (error) {
    console.error('Error al obtener el Pokémon:', error)
    throw error
  }
}

export const paginatedPokemons = async (
  limit: number,
  offset: number
): Promise<PaginationResponse> => {
  try {
    const { data: response } = await axios.get('/pokemon', {
      params: {
        limit,
        offset,
      },
    })

    const { next, previous, results, count } = response

    return {
      count,
      next,
      previous,
      results,
    }
  } catch (error) {
    console.log('Error fetching paginated pokemons:', error)
    throw error
  }
}

export const searchPokemon = async (searchTerm: string) => {
  try {
    const { data: response } = await axios.get('/pokemon/search', {
      params: {
        searchTerm,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error fetching search results:', error)
    throw error
  }
}
