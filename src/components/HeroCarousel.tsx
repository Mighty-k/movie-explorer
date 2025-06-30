import { useEffect, useState } from 'react'
import type { Movie } from '../types'
import { motion, AnimatePresence } from 'framer-motion'
import { IMAGE_BASE_URL } from '../constants'
import { Link } from 'react-router-dom'

interface HeroCarouselProps {
  movies: Movie[]
}

export const HeroCarousel = ({ movies = [] }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (movies.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [movies.length])

  // Return null if no movies
  if (movies.length === 0) return null

  const currentMovie = movies[currentIndex]
  if (!currentMovie?.backdrop_path) return null

  return (
    <div className="relative h-[60vw] max-h-[80vh] min-h-[300px] w-full overflow-hidden rounded-b-3xl shadow-2xl sm:h-[80vh]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent z-10" />

          <img
            src={`${IMAGE_BASE_URL}/original${currentMovie.backdrop_path}`}
            alt={currentMovie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-backdrop.jpg'
            }}
          />

          <div className="absolute bottom-0 left-0 z-20 p-4 sm:p-12 w-full max-w-full sm:max-w-4xl">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-5xl font-bold text-white mb-2 sm:mb-4 drop-shadow-2xl"
            >
              <Link to={`/movie/${currentMovie.id}`} className="hover:text-secondary transition-colors">
                {currentMovie.title}
              </Link>
            </motion.h1>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center space-x-2 sm:space-x-4 mb-4 sm:mb-6"
            >
              {currentMovie.release_date && (
                <span className="bg-secondary px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {new Date(currentMovie.release_date).getFullYear()}
                </span>
              )}
              <span className="bg-white/10 backdrop-blur-md px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {currentMovie.vote_average?.toFixed(1) || 'N/A'} ★
              </span>
            </motion.div>

            {currentMovie.overview && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-gray-300 text-sm sm:text-lg mb-4 sm:mb-8 line-clamp-4 sm:line-clamp-3 drop-shadow-lg"
              >
                {currentMovie.overview}
              </motion.p>
            )}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex space-x-2 sm:space-x-4"
            >
              <Link
                to={`/movie/${currentMovie.id}`}
                className="btn-primary flex items-center text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Details
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination dots */}
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-20 flex space-x-2">
        {movies.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-secondary sm:w-6' : 'bg-white/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}