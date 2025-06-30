import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useMovieDetails } from '../hooks/useMovies'
import { IMAGE_BASE_URL } from '../constants'

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { movie, loading, error } = useMovieDetails(Number(id))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (loading) return <div className="text-center py-8">Loading...</div>
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>
  if (!movie) return <div className="text-center py-8">Movie not found</div>

  const trailer = movie.videos.results.find(
    (video) => video.site === 'YouTube' && video.type === 'Trailer'
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-lg w-full"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.jpg'
            }}
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2 text-primary">{movie.title}</h1>
          <div className="flex items-center mb-4">
            <span className="bg-secondary text-white px-2 py-1 rounded mr-2">
              {new Date(movie.release_date).getFullYear()}
            </span>
            <span className="bg-gray-200 px-2 py-1 rounded mr-2">
              {movie.runtime} min
            </span>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1">
                {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
              </span>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-700">{movie.overview}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-primary text-white px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          {trailer && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Trailer</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-96"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {movie.credits.cast.slice(0, 6).map((person) => (
                <div key={person.id} className="text-center">
                  <img
                    src={
                      person.profile_path
                        ? `${IMAGE_BASE_URL}/w200${person.profile_path}`
                        : '/placeholder-person.jpg'
                    }
                    alt={person.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-person.jpg'
                    }}
                  />
                  <p className="font-medium">{person.name}</p>
                  <p className="text-sm text-gray-600">{person.character}</p>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/"
            className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}