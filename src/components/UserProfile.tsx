import { useLocalStorage } from '../hooks/useLocalStorage'
import { motion } from 'framer-motion'

const avatars = [
  { id: 1, emoji: '🎬', color: 'bg-purple-500' },
  { id: 2, emoji: '🍿', color: 'bg-yellow-500' },
  { id: 3, emoji: '📽️', color: 'bg-red-500' },
  { id: 4, emoji: '🎥', color: 'bg-blue-500' },
]

export const UserProfile = () => {
  const [selectedAvatar, setSelectedAvatar] = useLocalStorage<number>('userAvatar', 1)

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="flex flex-col items-end space-y-3">
        {avatars.map((avatar) => (
          <motion.button
            key={avatar.id}
            layout
            initial={{ x: 50, opacity: 0 }}
            animate={{ 
              x: selectedAvatar === avatar.id ? 0 : 30,
              opacity: selectedAvatar === avatar.id ? 1 : 0.7
            }}
            whileHover={{ x: 0, opacity: 1 }}
            onClick={() => setSelectedAvatar(avatar.id)}
            className={`${avatar.color} w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg transition-transform hover:scale-110 ${
              selectedAvatar === avatar.id ? 'ring-4 ring-secondary scale-110' : ''
            }`}
          >
            {avatar.emoji}
          </motion.button>
        ))}
      </div>
    </div>
  )
}