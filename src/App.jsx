import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import SoundControl from './components/SoundControl/SoundControl'
import { SoundProvider } from './contexts/SoundContext'
import './App.css'

function App() {
  return (
    <SoundProvider>
      <div className="App">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        <SoundControl />
      </div>
    </SoundProvider>
  )
}

export default App
