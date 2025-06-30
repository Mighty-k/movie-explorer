import type { WatchlistMovie } from '../types'
// import { MovieList } from './MovieList'
import { MovieCard } from './MovieCard'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Link } from 'react-router-dom'

export const WatchLater = () => {
  const [watchLater, setWatchLater] = useLocalStorage<WatchlistMovie[]>('watchLater', [])

  const removeFromWatchLater = (movieId: number) => {
    setWatchLater(watchLater.filter((movie) => movie.id !== movieId))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gradient">
        Watch <span className="font-light bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Later</span>
      </h1>
      {watchLater.length === 0 ? (
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
            Your <span className="text-secondary font-semibold">Watch Later</span> list is empty.
          </p>
          <Link
            to="/"
            className="btn-primary px-6 py-3 text-lg rounded-full shadow-lg hover:bg-accent transition-all"
          >
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchLater.map((movie) => (
            <div key={movie.id} className="relative">
              <MovieCard
                key={movie.id}
                movie={movie}
                isInWatchlist={watchLater.some(m => m.id === movie.id)}
                onToggleWatchlist={() => removeFromWatchLater(movie.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}