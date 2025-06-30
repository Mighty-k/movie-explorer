import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiSearch, FiClock } from 'react-icons/fi'

export const Navbar = () => {
  const location = useLocation()
  
  const links = [
    { path: '/', name: 'Home', icon: <FiHome className="inline mr-2 mb-1" /> },
    { path: '/search', name: 'Search', icon: <FiSearch className="inline mr-2 mb-1" /> },
    { path: '/watch-later', name: 'Watch Later', icon: <FiClock className="inline mr-2 mb-1" /> }
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50"
    >
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <Link to="/" className="flex items-center space-x-2 mb-2 sm:mb-0">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-secondary to-accent"
            />
            <span className="text-xl sm:text-2xl font-bold text-gradient">
              Movi
              <span className="font-light bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                e
              </span>
              Explorer
            </span>
          </Link>
          
          <div className="flex flex-wrap justify-center sm:justify-end space-x-0 sm:space-x-1 bg-gray-800/50 p-1 rounded-full w-full sm:w-auto">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative flex-1 sm:flex-none text-center px-3 py-2 rounded-full smooth-tab ${
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
                <span className="relative z-10 flex items-center justify-center">
                  {link.icon}
                  <span className="max-md:hidden xs:inline">{link.name}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}