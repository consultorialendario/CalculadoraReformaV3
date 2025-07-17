import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CalculadoraPage from './pages/CalculadoraPage'
import SimuladoresPage from './pages/SimuladoresPage'
import Header from './components/Header'
import Footer from './components/Footer'
import './styles/globals.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calculadora" element={<CalculadoraPage />} />
            <Route path="/calculadora-completa" element={<CalculadoraPage />} />
            <Route path="/simuladores" element={<SimuladoresPage />} />
            <Route path="/simulador-rapido" element={<SimuladoresPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App