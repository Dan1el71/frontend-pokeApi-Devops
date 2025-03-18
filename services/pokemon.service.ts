import axios from '../lib/axios'

export const getPokemon = async (id: string | number): Promise<Pokemon> => {
  const { data } = await axios.get<Pokemon>('/pokemon/' + id)

  return data
}
