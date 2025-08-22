import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Footer from './Footer'

// Mock de SweetAlert2
vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn()
  }
}))

// Mock del hook useSoundContext
vi.mock('../../contexts/SoundContext', () => ({
  useSoundContext: () => ({
    playSound: vi.fn(),
    initializeAudio: vi.fn(),
    soundEnabled: true,
    toggleSound: vi.fn()
  })
}))

describe('Footer Component', () => {
  it('should render footer content correctly', () => {
    render(<Footer />)

    expect(screen.getByText(/Este proyecto ha sido desarrollado como parte del programa de formación de/)).toBeInTheDocument()
    expect(screen.getByText('FactoriaF5')).toBeInTheDocument()
    expect(screen.getByText('© 2025 Tarot STEM |')).toBeInTheDocument()
  })

  it('should render FactoriaF5 link with correct attributes', () => {
    render(<Footer />)

    const factoriaLink = screen.getByRole('link', { name: /factoría F5/ })
    expect(factoriaLink).toBeInTheDocument()
    expect(factoriaLink).toHaveAttribute('href', 'https://factoriaf5.org')
    expect(factoriaLink).toHaveAttribute('target', '_blank')
    expect(factoriaLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should render social links correctly', () => {
    render(<Footer />)

    const githubLink = screen.getByRole('link', { name: /GitHub/ })
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Pal-cloud')
    expect(githubLink).toHaveAttribute('target', '_blank')

    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/ })
    expect(linkedinLink).toBeInTheDocument()
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/palomagsal/')
    expect(linkedinLink).toHaveAttribute('target', '_blank')
  })

  it('should render personal logo with correct attributes', () => {
    render(<Footer />)

    const logo = screen.getByAltText('Pal Brand')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/images/logo-pal.png')
    expect(logo).toHaveClass('personal-logo-footer', 'clickable-logo')
    expect(logo).toHaveAttribute('title', 'Click para copiar mi email')
    expect(logo.style.cursor).toBe('pointer')
  })

  it('should render connect section and brand text', () => {
    render(<Footer />)

    expect(screen.getByText('Conéctate conmigo')).toBeInTheDocument()
    expect(screen.getByText('Desarrollado por Pal')).toBeInTheDocument()
    expect(screen.getByText('Desarrollado con 💜 para aprender React y honrar a las diosas de la ciencia')).toBeInTheDocument()
  })

  it('should have correct semantic HTML structure', () => {
    render(<Footer />)

    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toHaveClass('footer')
  })
})
