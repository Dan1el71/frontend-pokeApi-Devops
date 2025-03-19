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
