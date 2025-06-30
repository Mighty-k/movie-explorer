import { useState } from 'react'
import { useMovieSearch } from '../hooks/useMovies'
import { MovieList } from './MovieList'
import { Link } from 'react-router-dom'

export const Search = () => {
  const [query, setQuery] = useState('')
  const { results, loading, error } = useMovieSearch(query)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 relative">
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-900 text-white placeholder-gray-400"
        />
      </div>

      {!query && (
        <div className="flex flex-col items-center justify-center py-24">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-secondary mb-6 animate-float"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <p className="text-xl text-gray-400 mb-4 text-center">
            Start typing to search for movies.
          </p>
          <Link
            to="/"
            className="btn-primary px-6 py-3 text-lg rounded-full shadow-lg hover:bg-accent transition-all"
          >
            Browse Movies
          </Link>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <svg
            className="animate-spin h-10 w-10 text-secondary mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <p className="text-lg text-gray-400">Searching for movies...</p>
        </div>
      )}
      {error && (
        <div className="flex flex-col items-center justify-center py-16">
          <svg
            className="h-10 w-10 text-red-500 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
          <p className="text-center text-red-500">{error}</p>
        </div>
      )}

      {query && !loading && results.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <svg
            className="h-12 w-12 text-secondary mb-4 animate-float"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <p className="text-xl text-gray-400 mb-2 text-center">
            No movies found for{' '}
            <span className="text-secondary font-semibold">"{query}"</span>.
          </p>
        </div>
      )}

      {query && results.length > 0 && (
        <MovieList
          movies={results}
          title={`Search Results for "${query}"`}
        />
      )}
    </div>
  )
}