import { Link } from 'react-router-dom'
import { useSoundContext } from '../../contexts/SoundContext'
import './Header.css'

const Header = () => {
  const { playSound, initializeAudio } = useSoundContext()

  const handleLogoHover = () => {
    initializeAudio() // Inicializar audio si es necesario
    playSound('logo')
  }
  return (
    <header className="header">
      <div className="header-content">
        {/* Logo personal como sello en la esquina */}
        <div className="personal-seal">
          <img 
            src="/images/logo-pal.png" 
            alt="Pal Logo" 
            className="personal-logo-header"
            onMouseEnter={handleLogoHover}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        
        <h1 className="header-title">
          <Link to="/">TechnoArcana</Link>
        </h1>
        <p className="header-subtitle">Diosas contemporáneas de la ciencia y tecnología 👩‍🔬</p>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Cartas</Link>
          <Link to="/reading" className="nav-link">Lectura</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
