'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getTypeBackground } from '@/lib/const'

interface PokemonCardProps {
  pokemon: Pokemon
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const mainType = pokemon.types[0].name
  const bgColor = getTypeBackground(mainType)

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ${
        isHovered ? 'transform scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor: bgColor }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="text-white font-bold">
            <div className="text-sm bg-black/20 px-2 py-1 rounded-full mb-1">
              #{pokemon.id}
            </div>
            <Link href={`/pokemon/${pokemon.id}`}>
              <h2 className="text-xl capitalize hover:underline cursor-pointer">
                {pokemon.name}
              </h2>
            </Link>
          </div>
          <div className="relative w-20 h-20 sm:w-24 sm:h-24">
            <Image
              src={pokemon.image || '/placeholder.svg?height=96&width=96'}
              alt={pokemon.name}
              fill
              className="object-contain drop-shadow-md"
            />
          </div>
        </div>

        <div className="text-white text-xs sm:text-sm mb-3 md:mb-4">
          <div>Altura: {pokemon.height} m</div>
          <div>Peso: {pokemon.weight} kg</div>
          <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
            Tipo:
            {pokemon.types.map(({ name }, index) => (
              <span
                key={index}
                className="capitalize px-2 py-0.5 rounded-full text-xs bg-white/20"
              >
                {name}
              </span>
            ))}
          </div>
          <div>Hábitat: {pokemon.habitat}</div>
        </div>

        <div className="space-y-1.5">
          {pokemon.stats.map((stat: any, index) => (
            <div key={index} className="text-xs text-white">
              <div className="flex justify-between mb-1">
                <span>{stat.name}</span>
                <span>{stat.value}</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-2">
                <div
                  className="bg-white/80 h-2 rounded-full"
                  style={{
                    width: `${Math.min(100, (stat.value / 255) * 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
