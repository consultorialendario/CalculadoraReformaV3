import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import './App.css'

// Components
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import CoursePage from './components/CoursePage'
import SimulatorsPage from './components/SimulatorsPage'
import CertificationPage from './components/CertificationPage'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen bg-background text-foreground ${darkMode ? 'dark' : ''}`}>
      <Router>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/curso" element={<CoursePage />} />
            <Route path="/simuladores" element={<SimulatorsPage />} />
            <Route path="/certificacao" element={<CertificationPage />} />
          </Routes>
        </motion.main>
        
        <Footer />
      </Router>
    </div>
  )
}

export default App

