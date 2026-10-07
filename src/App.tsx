import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ListPage from './pages/ListPage'
import GalleryPage from './pages/GalleryPage'
import DetailPage from './pages/DetailPage'
import './App.css'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="app">
        <header>
          <nav>
            <Link to="/">Pokédex</Link>

            <div className="nav-links">
              <Link to="/">List</Link>
              <Link to="/gallery">Gallery</Link>
            </div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/pokemon/:id" element={<DetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App