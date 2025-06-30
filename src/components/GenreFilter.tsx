import { useEffect, useState } from 'react'
import { tmdbApi, endpoints } from '../api/tmdb'
import type { Genre } from '../types'
import { motion } from 'framer-motion'

export const GenreFilter = ({ onSelectGenre }: { onSelectGenre: (genreId: number) => void }) => {
  const [genres, setGenres] = useState<Genre[]>([])
  const [activeGenre, setActiveGenre] = useState<number | null>(null)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await tmdbApi.get<{ genres: Genre[] }>(endpoints.genres)
        setGenres(response.data.genres)
      } catch (error) {
        console.error('Failed to fetch genres:', error)
      }
    }
    fetchGenres()
  }, [])

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Browse by Genre</h2>
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <motion.button
            key={genre.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setActiveGenre(genre.id)
              onSelectGenre(genre.id)
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeGenre === genre.id
                ? 'bg-secondary text-white'
                : 'bg-white/10 text-gray-200 hover:bg-white/20'
            }`}
          >
            {genre.name}
          </motion.button>
        ))}
      </div>
    </div>
  )
}