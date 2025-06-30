import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export const Navbar = () => {
  const location = useLocation()
  
  const links = [
    { path: '/', name: 'Home' },
    { path: '/search', name: 'Search' },
    { path: '/watch-later', name: 'Watch Later' }
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-secondary to-accent"
            />
            <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-secondary to-accent">
              Movie<span className="font-light">Explorer</span>
            </span>
          </Link>
          
          <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-full">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-full smooth-tab ${
                  location.pathname === link.path ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.path === location.pathname && (
                  <motion.span 
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-gray-700/50 rounded-full"
                    transition={{ type: 'spring', bounce: 0.25 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}