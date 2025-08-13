import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import CardDetailPage from './pages/CardDetailPage.jsx'
import ReadingPage from './pages/ReadingPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/card/:id',
        element: <CardDetailPage />
      },
      {
        path: '/reading',
        element: <ReadingPage />
      }
    ]
  }
])

export default router
