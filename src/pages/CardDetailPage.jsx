import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCardById } from '../services/tarotService.js'
import './CardDetailPage.css'

const CardDetailPage = () => {
  const { id } = useParams()
  const [card, setCard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true)
        const data = await getCardById(id)
        setCard(data)
      } catch (err) {
        setError('Error al cargar la carta. Por favor, intenta de nuevo.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCard()
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
      
      <div className="card-detail">
        <div className="card-detail-header">
          <h1>{card.arcaneName}</h1>
          <p className="arcane-number">Arcano Mayor {card.arcaneNumber}</p>
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
