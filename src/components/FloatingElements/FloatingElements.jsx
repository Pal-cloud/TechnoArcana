import { useEffect, useState, useCallback } from 'react'
import './FloatingElements.css'

const FloatingElements = () => {
  const [elements, setElements] = useState([])
  const [elementCounter, setElementCounter] = useState(0)

  const baseElements = [
    // Elementos astrológicos
    { symbol: '⭐', type: 'star' },
    { symbol: '🌙', type: 'moon' },
    { symbol: '🌟', type: 'star' },
    { symbol: '♈', type: 'zodiac' }, // Aries
    { symbol: '♉', type: 'zodiac' }, // Tauro
    { symbol: '♊', type: 'zodiac' }, // Géminis
    { symbol: '♋', type: 'zodiac' }, // Cáncer
    { symbol: '♌', type: 'zodiac' }, // Leo
    { symbol: '♍', type: 'zodiac' }, // Virgo
    { symbol: '♎', type: 'zodiac' }, // Libra
    { symbol: '♏', type: 'zodiac' }, // Escorpio
    { symbol: '♐', type: 'zodiac' }, // Sagitario
    { symbol: '♑', type: 'zodiac' }, // Capricornio
    { symbol: '♒', type: 'zodiac' }, // Acuario
    { symbol: '♓', type: 'zodiac' }, // Piscis
    
    // Elementos científicos
    { symbol: '⚛️', type: 'science' }, // Átomo
    { symbol: '🧬', type: 'science' }, // ADN
    { symbol: '🔬', type: 'science' }, // Microscopio
    { symbol: '🧪', type: 'science' }, // Tubo de ensayo
    { symbol: '⚗️', type: 'science' }, // Alambique
    
    // Elementos místicos adicionales
    { symbol: '🔮', type: 'mystic' },
    { symbol: '✨', type: 'sparkle' },
    { symbol: '💫', type: 'comet' },
    { symbol: '🌠', type: 'shooting-star' },
    { symbol: '🌌', type: 'galaxy' },
  ]

  const createNewElement = useCallback(() => {
    const randomElement = baseElements[Math.floor(Math.random() * baseElements.length)]
    const newCounter = elementCounter + 1
    setElementCounter(newCounter)
    
    const duration = 15 // Duración extendida de 15 segundos para movimiento ultra-lento
    const animationTypes = ['fromTop', 'fromLeft', 'fromRight']
    const animationType = animationTypes[Math.floor(Math.random() * animationTypes.length)]
    
    const element = {
      ...randomElement,
      id: `element-${newCounter}-${Date.now()}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration,
      animationType,
      createdAt: Date.now()
    }
    
    // Programar eliminación automática del DOM
    setTimeout(() => {
      setElements(prevElements => 
        prevElements.filter(el => el.id !== element.id)
      )
    }, duration * 1000 - 200) // Eliminar 200ms antes de que termine
    
    return element
  }, [elementCounter, baseElements])

  const addNewElement = useCallback(() => {
    setElements(prevElements => {
      const maxElements = 40 
      if (prevElements.length >= maxElements) {
        return prevElements
      }
      
      const newElement = createNewElement()
      return [...prevElements, newElement]
    })
  }, [createNewElement])

  // Añadir nuevos elementos periódicamente
  useEffect(() => {
    // Primer elemento inmediato
    addNewElement()
    
    const interval = setInterval(() => {
      addNewElement()
    }, 15000) 

    return () => clearInterval(interval)
  }, [addNewElement])

  return (
    <div className="floating-elements">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`floating-element ${element.type} ${element.animationType}`}
          style={{
            '--random-x': `${element.x}%`,
            '--random-y': `${element.y}%`,
            '--random-duration': `${element.duration}s`,
            left: element.animationType === 'fromTop' ? `${element.x}%` : 
                  element.animationType === 'fromLeft' ? '-5%' : '105%',
            top: element.animationType === 'fromTop' ? '-5%' : `${element.y}%`
          }}
        >
          {element.symbol}
        </div>
      ))}
    </div>
  )
}

export default FloatingElements
