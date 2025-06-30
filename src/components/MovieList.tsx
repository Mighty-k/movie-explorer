import type { Movie } from '../types'
import { MovieCard } from './MovieCard'

interface MovieListProps {
  movies: Movie[]
  title: string
  addToWatchLater?: (movie: Movie) => void
}

export const MovieList = ({ movies, title, addToWatchLater }: MovieListProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-primary">{title}</h2>
      {movies.length === 0 ? (
        <p className="text-gray-500">No movies found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} addToWatchLater={addToWatchLater} />
          ))}
        </div>
      )}
    </div>
  )
}