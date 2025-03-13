"use client"

import type React from "react"
import { useState } from "react"
import { SearchIcon, X } from "lucide-react"

interface SearchProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  onSearch: (term: string) => void
  onClear: () => void
}

export function Search({ searchTerm, setSearchTerm, onSearch, onClear }: SearchProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleClear = () => {
    setSearchTerm("")
    onClear()
  }

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`flex items-center overflow-hidden rounded-full transition-all duration-300 ${isFocused ? "ring-2 ring-blue-400" : ""}`}
        >
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition-colors text-white p-3 flex items-center justify-center"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Buscar Pokémon por nombre o ID..."
            className="flex-1 py-2 px-4 outline-none border-0 h-12"
          />
          {searchTerm && (
            <button type="button" onClick={handleClear} className="p-3 text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

