import { useState, useEffect } from 'react'
import TarotCard from '../components/TarotCard/TarotCard.jsx'
import { getAllCards } from '../services/tarotService.js'
import './ReadingPage.css'

const ReadingPage = () => {
  const [cards, setCards] = useState([])
  const [selectedCards, setSelectedCards] = useState({
    past: null,
    present: null,
    future: null
  })
  const [currentPosition, setCurrentPosition] = useState('past')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isReadingComplete, setIsReadingComplete] = useState(false)

  const positions = {
    past: 'Pasado',
    present: 'Presente', 
    future: 'Futuro'
  }

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true)
        const data = await getAllCards()
        setCards(data)
      } catch (err) {
        setError('Error al cargar las cartas. Por favor, intenta de nuevo.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCards()
  }, [])

  const handleCardSelect = (card) => {
    // No permitir seleccionar una carta ya seleccionada
    const alreadySelected = Object.values(selectedCards).some(
      selectedCard => selectedCard && selectedCard.id === card.id
    )
    
    if (alreadySelected) {
      return
    }

    // Actualizar la carta seleccionada para la posición actual
    const newSelectedCards = {
      ...selectedCards,
      [currentPosition]: card
    }
    
    setSelectedCards(newSelectedCards)

    // Avanzar a la siguiente posición
    if (currentPosition === 'past') {
      setCurrentPosition('present')
    } else if (currentPosition === 'present') {
      setCurrentPosition('future')
    } else {
      setIsReadingComplete(true)
    }
  }

  const resetReading = () => {
    setSelectedCards({
      past: null,
      present: null,
      future: null
    })
    setCurrentPosition('past')
    setIsReadingComplete(false)
  }

  const getAvailableCards = () => {
    const selectedCardIds = Object.values(selectedCards)
      .filter(card => card !== null)
      .map(card => card.id)
    
    return cards.filter(card => !selectedCardIds.includes(card.id))
  }

  // Función para verificar si una carta está seleccionada
  const isCardSelected = (cardId) => {
    return Object.values(selectedCards).some(
      selectedCard => selectedCard && selectedCard.id === cardId
    )
  }

  // Función para obtener la posición donde fue seleccionada la carta
  const getCardPosition = (cardId) => {
    for (const [position, card] of Object.entries(selectedCards)) {
      if (card && card.id === cardId) {
        return positions[position]
      }
    }
    return null
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Preparando las cartas para tu lectura...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error">
          <h2>¡Oops! Algo salió mal</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="reading-header">
        <h1>Lectura de Tres Cartas</h1>
        <p>Pasado, Presente y Futuro</p>
      </div>

      {/* Área de cartas seleccionadas */}
      <div className="selected-cards-area">
        {Object.entries(positions).map(([key, label]) => (
          <div 
            key={key} 
            className={`position-slot ${currentPosition === key ? 'active' : ''}`}
          >
            <h3>{label}</h3>
            {selectedCards[key] ? (
              <div className="selected-card-container">
                <TarotCard 
                  card={selectedCards[key]} 
                  isRevealed={true}
                  position={label}
                />
                <div className="card-meaning">
                  <h4>{selectedCards[key].arcaneName}</h4>
                  <p className="goddess-name">
                    <strong>{selectedCards[key].goddessName}</strong>
                  </p>
                  <p className="card-description">
                    {selectedCards[key].arcaneDescription}
                  </p>
                </div>
              </div>
            ) : (
              <div className="empty-slot">
                <div className="slot-placeholder">
                  {currentPosition === key ? 
                    'Selecciona una carta' : 
                    'Esperando selección'
                  }
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Instrucciones y controles */}
      <div className="reading-controls">
        {!isReadingComplete ? (
          <div className="instruction">
            <h3>
              Selecciona una carta para: <span className="highlight">{positions[currentPosition]}</span>
            </h3>
            <p>Elige la carta que sientes que representa mejor tu {positions[currentPosition].toLowerCase()}.</p>
          </div>
        ) : (
          <div className="completion-message">
            <h3>¡Tu lectura está completa! ✨</h3>
            <p>Las diosas de la ciencia han hablado. Reflexiona sobre sus mensajes.</p>
            <button onClick={resetReading} className="reset-button">
              Nueva Lectura
            </button>
          </div>
        )}
      </div>

      {/* Grid de cartas disponibles y seleccionadas */}
      {!isReadingComplete && (
        <div className="available-cards">
          <h3>Cartas Disponibles</h3>
          <div className="cards-grid">
            {cards.map((card) => {
              const cardIsSelected = isCardSelected(card.id)
              const cardPosition = getCardPosition(card.id)
              
              if (cardIsSelected) {
                // Mostrar hueco marcado para carta seleccionada
                return (
                  <div key={card.id} className="selected-card-placeholder">
                    <div className="placeholder-content">
                      <div className="placeholder-icon">✓</div>
                      <div className="placeholder-text">
                        <span className="card-name">{card.arcaneName}</span>
                        <span className="position-label">Seleccionada para: {cardPosition}</span>
                      </div>
                    </div>
                  </div>
                )
              } else {
                // Mostrar carta disponible
                return (
                  <TarotCard 
                    key={card.id} 
                    card={card} 
                    isRevealed={false}
                    onClick={handleCardSelect}
                  />
                )
              }
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default ReadingPage
