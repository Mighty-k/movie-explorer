import { usePopularMovies, useNowPlayingMovies, useTopRatedMovies } from '../hooks/useMovies'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Movie } from '../types'
import { MovieList } from '../components/MovieList'

interface HomeProps {
  selectedGenre: number | null
}

export const Home = ({ selectedGenre }: HomeProps) => {
  const { movies: popularMovies, loading: loadingPopular } = usePopularMovies()
  const { movies: nowPlayingMovies, loading: loadingNowPlaying } = useNowPlayingMovies()
  const { movies: topRatedMovies, loading: loadingTopRated } = useTopRatedMovies()
  const [watchLater, setWatchLater] = useLocalStorage<Movie[]>('watchLater', [])

  // Filter movies by selected genre
  const filterByGenre = (movies: Movie[]) => {
    if (!selectedGenre) return movies
    return movies.filter(movie => movie.genre_ids.includes(selectedGenre))
  }

  const addToWatchLater = (movie: Movie) => {
    if (!watchLater.some((m) => m.id === movie.id)) {
      setWatchLater([...watchLater, movie])
    }
  }

  return (
    <div className="container px-6 mt-12 space-y-16">
      <MovieList
        movies={filterByGenre(popularMovies)}
        title="Popular Movies"
        addToWatchLater={addToWatchLater}
        isLoading={loadingPopular}
      />
      <MovieList
        movies={filterByGenre(nowPlayingMovies)}
        title="Now Playing"
        addToWatchLater={addToWatchLater}
        isLoading={loadingNowPlaying}
      />
      <MovieList
        movies={filterByGenre(topRatedMovies)}
        title="Top Rated"
        addToWatchLater={addToWatchLater}
        isLoading={loadingTopRated}
      />
    </div>
  )
}