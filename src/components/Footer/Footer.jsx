import { useSoundContext } from '../../contexts/SoundContext'
import Swal from 'sweetalert2'
import './Footer.css'

const Footer = () => {
  const { playSound, initializeAudio } = useSoundContext()

  const handleLogoHover = () => {
    initializeAudio() // Inicializar audio si es necesario
    playSound('logo')
  }

  const handleLogoClick = () => {
    console.log('Logo clicked - showing contact info...')
    
    // Copiar email al portapapeles y mostrar confirmación con SweetAlert2
    const email = 'pp.factoriaf5@gmail.com'
    
    if (navigator.clipboard && window.isSecureContext) {
      // Usar la API moderna del portapapeles
      navigator.clipboard.writeText(email).then(() => {
        showSuccessAlert(email)
      }).catch(() => {
        showEmailAlert(email)
      })
    } else {
      // Fallback para navegadores antiguos
      showEmailAlert(email)
    }
  }

  const showSuccessAlert = (email) => {
    Swal.fire({
      title: '📧 ¡Email Copiado!',
      html: `
        <div style="text-align: center; font-family: 'Segoe UI', sans-serif;">
          <p style="font-size: 1.1rem; margin: 20px 0; color: #ffd700; font-weight: bold; text-shadow: 0 1px 3px rgba(0,0,0,0.3);">
            <strong>${email}</strong>
          </p>
          <p style="color: rgba(255,255,255,0.95); margin: 15px 0; font-weight: 500; text-shadow: 0 1px 2px rgba(0,0,0,0.4);">
            Ya puedes pegarlo en tu cliente de email favorito ✨
          </p>
        </div>
      `,
      icon: 'success',
      confirmButtonText: '¡Perfecto!',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      confirmButtonColor: '#ffd700',
      customClass: {
        popup: 'tarot-popup',
        title: 'tarot-title',
        confirmButton: 'tarot-button'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }

  const showEmailAlert = (email) => {
    Swal.fire({
      title: '📧 Mi Email de Contacto',
      html: `
        <div style="text-align: center; font-family: 'Segoe UI', sans-serif;">
          <p style="font-size: 1.2rem; margin: 20px 0; color: #ffd700; font-weight: bold; text-shadow: 0 1px 3px rgba(0,0,0,0.3);">
            ${email}
          </p>
          <p style="color: rgba(255,255,255,0.95); margin: 15px 0; font-weight: 500; text-shadow: 0 1px 2px rgba(0,0,0,0.4);">
            ¡Copia este email para escribirme! 🌟
          </p>
        </div>
      `,
      icon: 'info',
      confirmButtonText: 'Entendido',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff',
      confirmButtonColor: '#ffd700',
      customClass: {
        popup: 'tarot-popup',
        title: 'tarot-title',
        confirmButton: 'tarot-button'
      },
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p className="footer-text">
            Este proyecto ha sido desarrollado como parte del programa de formación de 
            <strong> FactoriaF5</strong>
          </p>
          <p className="footer-copyright">
            © 2025 Tarot STEM | 
          </p>
        </div>
        
        <div className="footer-logo">
          <a 
            href="https://factoriaf5.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className="factoria-link"
          >
            <div className="factoria-logo">
              <span className="factoria-text">factoría</span>
              <span className="factoria-icon">F5</span>
            </div>
          </a>
        </div>

        <div className="footer-social">
          <h4>Conéctate conmigo</h4>
          
          {/* Logo personal como marca elegante */}
          <div className="personal-brand">
            <img 
              src="/images/logo-pal.png" 
              alt="Pal Brand" 
              className="personal-logo-footer clickable-logo"
              onMouseEnter={handleLogoHover}
              onClick={(e) => {
                e.preventDefault()
                handleLogoClick()
              }}
              style={{ cursor: 'pointer' }}
              title="Click para copiar mi email"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="brand-text">Desarrollado por Pal</span>
          </div>
          
          <div className="social-links">
            <a 
              href="https://github.com/Pal-cloud" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link github"
              title="Mi GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/palomagsal/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link linkedin"
              title="Mi LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </a>

            </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <p className="footer-credits">
          Desarrollado con 💜 para aprender React y honrar a las diosas de la ciencia
        </p>
      </div>
    </footer>
  )
}

export default Footer
