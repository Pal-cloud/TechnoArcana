import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
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
