import { useEffect, useState } from 'react'
import { tmdbApi, endpoints } from '../api/tmdb'
import type { Movie, MovieDetails, ApiResponse, Genre } from '../types'

export const usePopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await tmdbApi.get<ApiResponse<Movie>>(endpoints.movies.popular)
        setMovies(response.data.results)
      } catch (err) {
        setError('Failed to fetch popular movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return { movies, loading, error }
}

export const useNowPlayingMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await tmdbApi.get<ApiResponse<Movie>>(endpoints.movies.nowPlaying)
        setMovies(response.data.results)
      } catch (err) {
        setError('Failed to fetch now playing movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return { movies, loading, error }
}

export const useTopRatedMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await tmdbApi.get<ApiResponse<Movie>>(endpoints.movies.topRated)
        setMovies(response.data.results)
      } catch (err) {
        setError('Failed to fetch top rated movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return { movies, loading, error }
}

export const useMovieDetails = (id: number) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [detailsResponse, creditsResponse, videosResponse] = await Promise.all([
          tmdbApi.get<MovieDetails>(endpoints.movies.details(id)),
          tmdbApi.get(endpoints.movies.credits(id)),
          tmdbApi.get(endpoints.movies.videos(id)),
        ])

        setMovie({
          ...detailsResponse.data,
          credits: creditsResponse.data,
          videos: videosResponse.data,
        })
      } catch (err) {
        setError('Failed to fetch movie details')
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id])

  return { movie, loading, error }
}

export const useMovieSearch = (query: string) => {
  const [results, setResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query) {
      setResults([])
      return
    }

    const searchMovies = async () => {
      setLoading(true)
      try {
        const response = await tmdbApi.get<ApiResponse<Movie>>(endpoints.movies.search, {
          params: { query },
        })
        setResults(response.data.results)
      } catch (err) {
        setError('Failed to search movies')
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(() => {
      searchMovies()
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [query])

  return { results, loading, error }
}

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await tmdbApi.get<{ genres: Genre[] }>(endpoints.genres)
        setGenres(response.data.genres)
      } catch (err) {
        setError('Failed to fetch genres')
      } finally {
        setLoading(false)
      }
    }

    fetchGenres()
  }, [])

  return { genres, loading, error }
}