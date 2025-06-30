import { Link } from 'react-router-dom'
import { IMAGE_BASE_URL } from '../constants'
import type { Movie, WatchlistMovie } from '../types'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface MovieCardProps {
  movie: Movie;
  index?: number;
  onToggleWatchlist: (movie: WatchlistMovie) => void;
  isInWatchlist: boolean;
}

export const MovieCard = ({ 
  movie, 
  index = 0, 
  onToggleWatchlist,
  isInWatchlist
}: MovieCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(isInWatchlist);

  const handleToggle = () => {
    const newState = !isBookmarked;
    setIsBookmarked(newState);
    onToggleWatchlist({
      ...movie,
      priority: newState ? 2 : undefined // Remove priority when unbookmarking
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gray-800/20 backdrop-blur-lg border border-gray-700/50 shadow-2xl transition-all duration-500 hover:border-secondary/50 group h-full"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Movie Poster Image */}
      <Link to={`/movie/${movie.id}`} className="block h-full">
        <img
          src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.jpg'
          }}
        />
      </Link>

      {/* Movie Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <Link to={`/movie/${movie.id}`} className="block">
          <h3 className="text-lg font-bold text-white group-hover:text-secondary transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center mt-1 space-x-2">
            <div className="flex items-center bg-black/30 px-2 py-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-xs">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <span className="text-xs bg-black/30 px-2 py-1 rounded-full">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
        </Link>
      </div>

      {/* Watchlist toggle button */}
      <motion.button 
        onClick={handleToggle}
        className="absolute top-3 right-3 z-20 bg-gray-900/80 p-2 rounded-full transition-all duration-300 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isBookmarked ? "Remove from watchlist" : "Add to watchlist"}
      >
        {isBookmarked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-accent"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white group-hover:text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
        <span className="sr-only">
          {isBookmarked ? "Remove from watchlist" : "Add to watchlist"}
        </span>
      </motion.button>
    </motion.div>
  )
}