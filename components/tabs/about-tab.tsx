import { pokemonSprites } from '@/lib/const'
import SpriteContainer from '../sprite-container'
import Image from 'next/image'

interface AboutTabProps {
  pokemon: Pokemon
}

const AboutTab = ({ pokemon }: AboutTabProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <p className="text-sm md:text-base text-gray-700">
        {pokemon.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2 md:mb-3">Perfil</h3>
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
        <h3 className="font-medium text-gray-900 mb-2 md:mb-3">Sprites</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {pokemonSprites.map(({ type, label }) => {
            const spriteUrl = pokemon.sprites[type]
            if (!spriteUrl) return null

            return (
              <SpriteContainer key={type} label={label}>
                <Image
                  src={spriteUrl}
                  alt={`${pokemon.name} sprite ${label.toLowerCase()}`}
                  fill
                  className="object-contain"
                />
              </SpriteContainer>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default AboutTab
