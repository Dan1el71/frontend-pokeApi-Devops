'use client'

import type React from 'react'
import { useState } from 'react'
import { SearchIcon, X } from 'lucide-react'

interface SearchProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  onSearch: (term: string) => void
  onClear: () => void
}

export function Search({
  searchTerm,
  setSearchTerm,
  onSearch,
  onClear,
}: SearchProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleClear = () => {
    setSearchTerm('')
    onClear()
  }

  return (
    <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-xl px-4">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg transition-all duration-300 ${
            isFocused ? 'ring-2 ring-blue-400/30' : ''
          }`}
        >
          <div className="flex items-center px-2">
            <button
              type="submit"
              className="p-3 text-blue-600 hover:text-blue-700 transition-all transform hover:scale-105"
            >
              <SearchIcon className="h-5 w-5" />
            </button>

            <input
              autoFocus
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Buscar Pokémon por nombre o ID..."
              className="flex-1 py-3 bg-transparent outline-none border-0 text-gray-600 placeholder-gray-400 text-sm font-medium"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors mr-2"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
