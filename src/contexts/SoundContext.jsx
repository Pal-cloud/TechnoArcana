import React, { createContext, useContext } from 'react'
import useSoundEffectsSimple from '../hooks/useSoundEffectsSimple'

const SoundContext = createContext()

export const SoundProvider = ({ children }) => {
  const soundEffects = useSoundEffectsSimple()
  
  return (
    <SoundContext.Provider value={soundEffects}>
      {children}
    </SoundContext.Provider>
  )
}

export const useSoundContext = () => {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSoundContext debe usarse dentro de SoundProvider')
  }
  return context
}

export default SoundContext
