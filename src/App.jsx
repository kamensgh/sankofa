import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import MovieDetailPage from './pages/MovieDetailPage'
import WatchlistPage from './pages/WatchlistPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Footer() {
  return (
    <footer className="bg-[#0A0603] border-t border-[#1F160D] mt-16 py-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-xl font-black text-[#C8922A]">SANKOFA</p>
          <p className="font-body text-xs text-[#6B5A47] mt-1">Preserving Ghana's cinematic heritage</p>
        </div>
        <p className="font-body text-xs text-[#4A3A2A] text-center sm:text-right">
          © 2024 Sankofa Archive · Dedicated to the pioneers of Ghanaian cinema
        </p>
      </div>
    </footer>
  )
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/search"      element={<SearchPage />} />
        <Route path="/film/:slug"  element={<MovieDetailPage />} />
        <Route path="/watchlist"   element={<WatchlistPage />} />
        <Route path="*"            element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
