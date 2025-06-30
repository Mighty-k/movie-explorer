import type { WatchlistMovie } from '../types'
// import { MovieList } from './MovieList'
import { MovieCard } from './MovieCard'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const WatchLater = () => {
   const [watchLater, setWatchLater] = useLocalStorage<WatchlistMovie[]>('watchLater', [])
  
//   const handleToggleWatchlist = (movie: WatchlistMovie) => {
//     setWatchLater(prev => {
//       const exists = prev.some(m => m.id === movie.id)
//       return exists
//         ? prev.filter(m => m.id !== movie.id)
//         : [...prev, movie]
//     })
//   }

  const removeFromWatchLater = (movieId: number) => {
    setWatchLater(watchLater.filter((movie) => movie.id !== movieId))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">Watch Later</h1>
      {watchLater.length === 0 ? (
        <p className="text-gray-500">Your watch later list is empty</p>
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
              {/* <button
                onClick={() => removeFromWatchLater(movie.id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                aria-label="Remove from watch later"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}