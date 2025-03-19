import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ErrorPageProps {
  error: string
}

const ErrorPage = ({ error }: ErrorPageProps) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
      <p className="text-gray-700 mb-6">{error}</p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la Pokédex
      </Link>
    </div>
  )
}
export default ErrorPage
