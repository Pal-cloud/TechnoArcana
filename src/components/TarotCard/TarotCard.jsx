import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSoundContext } from '../../contexts/SoundContext'
import './TarotCard.css'

const TarotCard = ({ card, isRevealed = false, onClick, position = null }) => {
  const { playSound, audioLoaded } = useSoundContext()

  const handleClick = () => {
    playSound('click')
    if (onClick) {
      onClick(card)
    }
  }

  const handleMouseEnter = () => {
    playSound('hover')
  }

  const handleLinkClick = () => {
    playSound('click')
  }

  const cardContent = isRevealed ? (
    <div className="card-front">
      <div className="card-image-container">
        <img 
          src={card.arcaneImage.imageSrc} 
          alt={card.arcaneName}
          className="card-image"
        />
      </div>
      <div className="card-info">
        <h3 className="card-title">{card.arcaneName}</h3>
        <p className="card-number">Arcano {card.arcaneNumber}</p>
        {position && <p className="card-position">{position}</p>}
      </div>
    </div>
  ) : (
    <div className="card-back">
      <div className="card-back-design">
        <div className="card-back-symbol">🔮</div>
        <div className="card-back-text">TechnoArcana</div>
      </div>
    </div>
  )

  if (onClick) {
    return (
      <div 
        className={`tarot-card ${isRevealed ? 'revealed' : 'hidden'}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
      >
        {cardContent}
      </div>
    )
  }

  return (
    <Link 
      to={`/card/${card.id}`} 
      className={`tarot-card ${isRevealed ? 'revealed' : 'hidden'}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleLinkClick}
    >
      {cardContent}
    </Link>
  )
}

TarotCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    arcaneNumber: PropTypes.string.isRequired,
    arcaneName: PropTypes.string.isRequired,
    arcaneImage: PropTypes.shape({
      imageSrc: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  isRevealed: PropTypes.bool,
  onClick: PropTypes.func,
  position: PropTypes.string
}

export default TarotCard
