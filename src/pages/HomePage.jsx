import { useState, useEffect } from 'react'
import TarotCard from '../components/TarotCard/TarotCard.jsx'
import { getAllCards } from '../services/tarotService.js'
import './HomePage.css'

const HomePage = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando las cartas del tarot...</p>
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
      <div className="home-header">
        <h1>Descubre las Diosas de la Ciencia</h1>
        <p>Haz clic en cualquier carta para conocer a las mujeres extraordinarias que han transformado el mundo de la ciencia y la tecnología.</p>
      </div>
      
      <div className="cards-grid">
        {cards.map((card) => (
          <TarotCard 
            key={card.id} 
            card={card} 
            isRevealed={false}
          />
        ))}
      </div>
    </div>
  )
}

export default HomePage
