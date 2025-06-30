import axios from 'axios'

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
})

export const endpoints = {
  movies: {
    popular: '/movie/popular',
    nowPlaying: '/movie/now_playing',
    topRated: '/movie/top_rated',
    upcoming: '/movie/upcoming',
    details: (id: number) => `/movie/${id}`,
    credits: (id: number) => `/movie/${id}/credits`,
    videos: (id: number) => `/movie/${id}/videos`,
    search: '/search/movie',
    recommendations: (id: number) => `/movie/${id}/recommendations`,
  },
  genres: '/genre/movie/list',
}