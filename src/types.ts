export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
}

export interface MovieDetails extends Movie {
  runtime: number
  genres: { id: number; name: string }[]
  credits: {
    cast: {
      id: number
      name: string
      character: string
      profile_path: string | null
    }[]
  }
  videos: {
    results: {
      id: string
      key: string
      name: string
      site: string
      type: string
    }[]
  }
}

export interface ApiResponse<T> {
  results: T[]
  page: number
  total_pages: number
  total_results: number
}

export interface Genre {
  id: number
  name: string
}
// Add this to your existing types
export interface WatchlistMovie extends Movie {
  priority?: number; // Make it optional since not all movies will have it
}