import './FloatingElements.css'

const FloatingElements = () => {
  const elements = [
    // Elementos astrológicos
    { id: 1, symbol: '⭐', type: 'star', delay: 0 },
    { id: 2, symbol: '🌙', type: 'moon', delay: 2 },
    { id: 3, symbol: '🌟', type: 'star', delay: 4 },
    { id: 4, symbol: '♈', type: 'zodiac', delay: 1 }, // Aries
    { id: 5, symbol: '♉', type: 'zodiac', delay: 6 }, // Tauro
    { id: 6, symbol: '♊', type: 'zodiac', delay: 3 }, // Géminis
    { id: 7, symbol: '♋', type: 'zodiac', delay: 8 }, // Cáncer
    { id: 8, symbol: '♌', type: 'zodiac', delay: 5 }, // Leo
    { id: 9, symbol: '♍', type: 'zodiac', delay: 9 }, // Virgo
    { id: 10, symbol: '♎', type: 'zodiac', delay: 2 }, // Libra
    { id: 11, symbol: '♏', type: 'zodiac', delay: 7 }, // Escorpio
    { id: 12, symbol: '♐', type: 'zodiac', delay: 4 }, // Sagitario
    { id: 13, symbol: '♑', type: 'zodiac', delay: 6 }, // Capricornio
    { id: 14, symbol: '♒', type: 'zodiac', delay: 1 }, // Acuario
    { id: 15, symbol: '♓', type: 'zodiac', delay: 8 }, // Piscis
    
    // Elementos científicos
    { id: 16, symbol: '⚛️', type: 'science', delay: 3 }, // Átomo
    { id: 17, symbol: '🧬', type: 'science', delay: 5 }, // ADN
    { id: 18, symbol: '🔬', type: 'science', delay: 7 }, // Microscopio
    { id: 19, symbol: '🧪', type: 'science', delay: 2 }, // Tubo de ensayo
    { id: 20, symbol: '⚗️', type: 'science', delay: 9 }, // Alambique
    
    // Elementos místicos adicionales
    { id: 21, symbol: '🔮', type: 'mystic', delay: 4 },
    { id: 22, symbol: '✨', type: 'sparkle', delay: 6 },
    { id: 23, symbol: '💫', type: 'comet', delay: 1 },
    { id: 24, symbol: '🌠', type: 'shooting-star', delay: 8 },
    { id: 25, symbol: '🌌', type: 'galaxy', delay: 3 },
  ]

  return (
    <div className="floating-elements">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`floating-element ${element.type}`}
          style={{
            '--delay': `${element.delay}s`,
            '--random-x': `${Math.random() * 100}%`,
            '--random-duration': `${15 + Math.random() * 10}s`
          }}
        >
          {element.symbol}
        </div>
      ))}
    </div>
  )
}

export default FloatingElements
