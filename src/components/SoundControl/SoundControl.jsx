import React from 'react'
import { useSoundContext } from '../../contexts/SoundContext'
import './SoundControl.css'

const SoundControl = () => {
  const { soundsEnabled, toggleSounds, playSound, audioLoaded } = useSoundContext()

  const handleToggle = () => {
    // Reproducir un sonido de ejemplo cuando se activen los sonidos
    if (!soundsEnabled) {
      setTimeout(() => {
        playSound('hover')
      }, 200)
    }
    toggleSounds()
  }

  return (
    <button 
      className={`sound-control ${soundsEnabled ? 'enabled' : 'disabled'}`}
      onClick={handleToggle}
      title={soundsEnabled ? 'Desactivar sonidos' : 'Activar sonidos'}
      aria-label={soundsEnabled ? 'Desactivar sonidos' : 'Activar sonidos'}
      style={!audioLoaded ? {opacity: 0.5} : {}}
    >
      {audioLoaded ? (soundsEnabled ? '🔊' : '🔇') : '⏳'}
    </button>
  )
}

export default SoundControl
