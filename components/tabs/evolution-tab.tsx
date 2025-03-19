import Image from 'next/image'
import Link from 'next/link'

interface EvolutionTabProps {
  pokemon: Pokemon
}

const EvolutionTab = ({ pokemon }: EvolutionTabProps) => {
  return (
    <div>
      {pokemon.evolutionChain && pokemon.evolutionChain.length > 0 ? (
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center items-center gap-4">
            {pokemon.evolutionChain.map((evo: any, index: number) => (
              <div key={evo.id} className="flex flex-col items-center">
                <Link href={`/pokemon/${evo.id}`} className="group">
                  <div
                    className={`relative w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full p-3 md:p-4 transition-transform group-hover:scale-110 ${
                      evo.id === pokemon.id ? 'ring-4 ring-blue-500' : ''
                    }`}
                  >
                    <Image
                      src={evo.image || '/placeholder.svg?height=128&width=128'}
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
  )
}
export default EvolutionTab
