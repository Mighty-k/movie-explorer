import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { Search } from './components/Search'
import { MovieDetails } from './components/MovieDetails'
import { WatchLater } from './components/WatchLater'
import { HeroCarousel } from './components/HeroCarousel'
import { GenreFilter } from './components/GenreFilter'
// import { UserProfile } from './components/UserProfile'
import { usePopularMovies } from './hooks/useMovies'

function App() {
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
  const { movies: popularMovies } = usePopularMovies()

  return (
    <Router>
      <div className="min-h-screen relative">
        {/* Cosmic background */}
        <div className="fixed inset-0 -z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" />
          <div 
            className="absolute inset-0 bg-[url('https://assets.codepen.io/13471/sparkles.gif')] opacity-5"
            style={{ backgroundSize: '200px 200px' }} 
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(1,180,228,0.1)_0%,_rgba(1,180,228,0)_70%)] animate-pulse" />
        </div>

        {/* Responsive content wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6">
            <Routes>
              <Route path="/" element={
                <>
                  <HeroCarousel movies={popularMovies.slice(0, 5).filter(m => m.backdrop_path)} />
                  <GenreFilter onSelectGenre={setSelectedGenre} />
                  <Home selectedGenre={selectedGenre} />
                </>
              } />
              <Route path="/search" element={<Search />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/watch-later" element={<WatchLater />} />
            </Routes>
            {/* <UserProfile /> */}
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App