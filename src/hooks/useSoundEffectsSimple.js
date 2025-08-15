import { useCallback, useRef, useState, useEffect } from 'react'

const useSoundEffectsSimple = () => {
  const audioRefs = useRef({})
  const [soundsEnabled, setSoundsEnabled] = useState(true)
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [audioContext, setAudioContext] = useState(null)

  // Precargar sonidos al montar el componente
  useEffect(() => {
    const loadAudio = async () => {
      try {
        const sounds = {
          hover: '/sounds/card-hover.mp3',
          click: '/sounds/card-click.mp3'
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
      // Intentar desbloquear el audio en la primera interacción
      if (!audioContext) {
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)()
          setAudioContext(ctx)
          
          // Crear un sonido silencioso para desbloquear
          const oscillator = ctx.createOscillator()
          const gainNode = ctx.createGain()
          oscillator.connect(gainNode)
          gainNode.connect(ctx.destination)
          gainNode.gain.value = 0
          oscillator.start()
          oscillator.stop(ctx.currentTime + 0.01)
        } catch (e) {
          // Fallback si AudioContext no está disponible
        }
      }

      // Reiniciar el audio si ya se está reproduciendo
      audio.currentTime = 0
      
      // Reproducir inmediatamente
      audio.play().catch((error) => {
        // Silenciar errores de reproducción
      })
      
    } catch (error) {
      // Silenciar errores de audio
    }
  }, [soundsEnabled, audioLoaded, audioContext])

  const toggleSounds = useCallback(() => {
    setSoundsEnabled(prev => !prev)
  }, [])

  const initializeAudio = useCallback(() => {
    // Esta función se llama en la primera interacción para desbloquear el audio
    if (!audioContext) {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        setAudioContext(ctx)
        
        // Reproducir un sonido silencioso para activar el contexto
        Object.values(audioRefs.current).forEach(audio => {
          if (audio) {
            const originalVolume = audio.volume
            audio.volume = 0
            audio.play().then(() => {
              audio.pause()
              audio.currentTime = 0
              audio.volume = originalVolume
            }).catch(() => {
              audio.volume = originalVolume
            })
          }
        })
      } catch (e) {
        // Fallback si AudioContext no está disponible
      }
    }
  }, [audioContext])

  return {
    playSound,
    soundsEnabled,
    toggleSounds,
    audioLoaded,
    initializeAudio
  }
}

export default useSoundEffectsSimple
