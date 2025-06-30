import { useState } from 'react'
import { useMovieSearch } from '../hooks/useMovies'
import { MovieList } from './MovieList'

export const Search = () => {
  const [query, setQuery] = useState('')
  const { results, loading, error } = useMovieSearch(query)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {query && (
        <MovieList
          movies={results}
          title={`Search Results for "${query}"`}
        />
      )}
    </div>
  )
}