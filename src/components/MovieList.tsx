import { useLocalStorage } from '../hooks/useLocalStorage'
import { MovieCard } from './MovieCard'
import type { Movie, WatchlistMovie } from '../types'

interface MovieListProps {
  movies: Movie[]
  title: string
  addToWatchLater?: (movie: WatchlistMovie) => void
}

export const MovieList = ({ movies, title }: MovieListProps) => {
//   const [watchLater] = useLocalStorage<WatchlistMovie[]>('watchLater', [])
  const [watchLater, setWatchLater] = useLocalStorage<WatchlistMovie[]>('watchLater', []);
  const handleToggleWatchlist = (movie: WatchlistMovie) => {
  setWatchLater(prev => {
    const exists = prev.some(m => m.id === movie.id);
    return exists
      ? prev.filter(m => m.id !== movie.id)
      : [...prev, movie];
  });
};

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-primary">{title}</h2>

      {movies.length === 0 ? (
        <p className="text-gray-500">No movies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => {
            const isInWatchlist = watchLater.some((m) => m.id === movie.id)

            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                onToggleWatchlist={handleToggleWatchlist}
                isInWatchlist={isInWatchlist}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}
