'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = []

    pages.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md ${
          currentPage === 1
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        1
      </button>
    )

    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(totalPages - 1, currentPage + 1)

    if (startPage > 2) {
      pages.push(
        <span key="ellipsis-1" className="px-1 sm:px-2">
          ...
        </span>
      )
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md ${
            currentPage === i
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      )
    }

    if (endPage < totalPages - 1) {
      pages.push(
        <span key="ellipsis-2" className="px-1 sm:px-2">
          ...
        </span>
      )
    }

    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md ${
            currentPage === totalPages
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {totalPages}
        </button>
      )
    }

    return pages
  }

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  )
}
