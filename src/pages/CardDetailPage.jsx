import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getCardById, getAllCards } from '../services/tarotService.js'
import './CardDetailPage.css'

const CardDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [card, setCard] = useState(null)
  const [allCards, setAllCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Función para convertir números a romanos
  const toRoman = (num) => {
    const values = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    const romans = ['XX', 'XIX', 'XVIII', 'XVII', 'XVI', 'XV', 'XIV', 'XIII', 'XII', 'XI', 'X', 'IX', 'VIII', 'VII', 'VI', 'V', 'IV', 'III', 'II', 'I', '0']
    
    const numInt = parseInt(num)
    const index = values.indexOf(numInt)
    return index !== -1 ? romans[index] : num
  }

  // Función para obtener el índice actual y los IDs de navegación
  const getNavigationData = () => {
    if (!allCards.length || !card) return { currentIndex: -1, prevCardId: null, nextCardId: null }
    
    const currentIndex = allCards.findIndex(c => c.id === card.id)
    const prevCardId = currentIndex > 0 ? allCards[currentIndex - 1].id : allCards[allCards.length - 1].id
    const nextCardId = currentIndex < allCards.length - 1 ? allCards[currentIndex + 1].id : allCards[0].id
    
    return { currentIndex, prevCardId, nextCardId }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [cardData, cardsData] = await Promise.all([
          getCardById(id),
          getAllCards()
        ])
        setCard(cardData)
        setAllCards(cardsData)
      } catch (err) {
        setError('Error al cargar la carta. Por favor, intenta de nuevo.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando información de la carta...</p>
        </div>
      </div>
    )
  }

  if (error || !card) {
    return (
      <div className="page-container">
        <div className="error">
          <h2>¡Oops! Algo salió mal</h2>
          <p>{error || 'Carta no encontrada'}</p>
          <Link to="/" className="back-button">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <Link to="/" className="back-link">
        ← Volver a las cartas
      </Link>

      {/* Navegación entre cartas - Movida aquí para mejor usabilidad */}
      {allCards.length > 0 && (
        <div className="card-navigation">
          <Link 
            to={`/card/${getNavigationData().prevCardId}`} 
            className="nav-button nav-button-prev"
            title="Carta anterior"
          >
            ←
          </Link>
          <span className="card-counter">
            Arcano {toRoman(card.arcaneNumber)}
          </span>
          <Link 
            to={`/card/${getNavigationData().nextCardId}`} 
            className="nav-button nav-button-next"
            title="Carta siguiente"
          >
            →
          </Link>
        </div>
      )}
      
      <div className="card-detail">
        <div className="card-detail-header">
          <h1>{card.arcaneName}</h1>
          <p className="arcane-number">Arcano Mayor {toRoman(card.arcaneNumber)}</p>
        </div>

        <div className="card-detail-content">
          <div className="card-detail-left">
            <div className="card-image-container">
              <img 
                src={card.arcaneImage.imageSrc} 
                alt={card.arcaneName}
                className="card-image"
              />
            </div>
            <div className="image-credit">
              <small>
                Imagen por: {card.arcaneImage.author} | 
                Licencia: {card.arcaneImage.license}
              </small>
            </div>
          </div>

          <div className="card-detail-right">
            <div className="card-description">
              <h2>Significado del Arcano</h2>
              <p>{card.arcaneDescription}</p>
            </div>

            <div className="goddess-section">
              <h2>Diosa Contemporánea: {card.goddessName}</h2>
              <div className="goddess-content">
                <div className="goddess-image-wrapper">
                  <div className="goddess-image-container">
                    <img 
                      src={card.goddessImage.imageSrc} 
                      alt={card.goddessName}
                      className="goddess-image"
                    />
                  </div>
                  <div className="goddess-image-credit">
                    <small>
                      <a 
                        href={card.goddessImage.licenseUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Imagen por: {card.goddessImage.author}
                      </a>
                    </small>
                  </div>
                </div>
                <div className="goddess-description">
                  <p>{card.goddessDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDetailPage
