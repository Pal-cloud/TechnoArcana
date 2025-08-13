import { useCallback, useRef, useState, useEffect } from 'react'

const useSoundEffectsSimple = () => {
  const audioRefs = useRef({})
  const [soundsEnabled, setSoundsEnabled] = useState(true)
  const [audioLoaded, setAudioLoaded] = useState(false)

  // Precargar sonidos al montar el componente
  useEffect(() => {
    const loadAudio = async () => {
      try {
        const sounds = {
          hover: '/card-hover.mp3',
          click: '/card-click.mp3'
        }

        const loadPromises = Object.entries(sounds).map(async ([key, src]) => {
          return new Promise((resolve, reject) => {
            const audio = new Audio()
            
            audio.addEventListener('canplaythrough', () => {
              audioRefs.current[key] = audio
              resolve()
            })
            
            audio.addEventListener('error', (e) => {
              reject(e)
            })
            
            // Configurar propiedades del audio
            audio.preload = 'auto'
            audio.volume = 0.4
            audio.crossOrigin = 'anonymous'
            
            // Asignar src
            audio.src = src
            audio.load() // Forzar carga explícita
          })
        })

        await Promise.allSettled(loadPromises)
        setAudioLoaded(true)
        
      } catch (error) {
        console.error('Error general cargando sonidos:', error)
      }
    }

    loadAudio()

    // Cleanup al desmontar
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        if (audio) {
          audio.pause()
          audio.currentTime = 0
        }
      })
      audioRefs.current = {}
    }
  }, [])

  const playSound = useCallback((soundType) => {
    if (!soundsEnabled || !audioLoaded) {
      return
    }

    const audio = audioRefs.current[soundType]
    if (!audio) {
      return
    }

    try {
      // Reiniciar el audio si ya se está reproduciendo
      audio.currentTime = 0
      
      // Reproducir inmediatamente
      audio.play().catch((error) => {
        // Silenciar errores de reproducción
      })
      
    } catch (error) {
      // Silenciar errores de audio
    }
  }, [soundsEnabled, audioLoaded])

  const toggleSounds = useCallback(() => {
    setSoundsEnabled(prev => !prev)
  }, [])

  return {
    playSound,
    soundsEnabled,
    toggleSounds,
    audioLoaded
  }
}

export default useSoundEffectsSimple
