import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Header from './Header'

// Mock del hook useSoundContext
vi.mock('../../contexts/SoundContext', () => ({
  useSoundContext: () => ({
    playSound: vi.fn(),
    initializeAudio: vi.fn(),
    soundEnabled: true,
    toggleSound: vi.fn()
  })
}))

// Componente wrapper para las pruebas
const HeaderWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('Header Component', () => {
  it('should render header with title and subtitle', () => {
    render(
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
    )

    expect(screen.getByText('TechnoArcana')).toBeInTheDocument()
    expect(screen.getByText('Diosas contemporáneas de la ciencia y tecnología 👩‍🔬')).toBeInTheDocument()
  })

  it('should render navigation links', () => {
    render(
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
    )

    const cartasLink = screen.getByRole('link', { name: 'Cartas' })
    const lecturaLink = screen.getByRole('link', { name: 'Lectura' })

    expect(cartasLink).toBeInTheDocument()
    expect(cartasLink).toHaveAttribute('href', '/')
    
    expect(lecturaLink).toBeInTheDocument()
    expect(lecturaLink).toHaveAttribute('href', '/reading')
  })

  it('should render personal logo with correct attributes', () => {
    render(
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
    )

    const logo = screen.getByAltText('Pal Logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/images/logo-pal.png')
    expect(logo).toHaveClass('personal-logo-header')
  })

  it('should render title as link to home', () => {
    render(
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
    )

    const titleLink = screen.getByRole('link', { name: 'TechnoArcana' })
    expect(titleLink).toBeInTheDocument()
    expect(titleLink).toHaveAttribute('href', '/')
  })

  it('should have correct semantic HTML structure', () => {
    render(
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
    )

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
