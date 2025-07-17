import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Calculator, Menu, X, Home, BarChart3, Zap } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Calculadora Completa', href: '/calculadora', icon: Calculator },
    { name: 'Simuladores', href: '/simuladores', icon: Zap }
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900">Reforma Tributária</span>
              <span className="block text-xs text-blue-600 font-medium">v3.0 • SPED Real + IA</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            <Link
              to="/calculadora"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Começar Análise
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
              
              {/* Mobile CTA */}
              <div className="pt-4 border-t">
                <Link
                  to="/calculadora"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center w-full px-3 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors justify-center"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Começar Análise
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Breadcrumb (opcional) */}
      {location.pathname !== '/' && (
        <div className="border-t bg-gray-50">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Início
              </Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900 font-medium">
                {location.pathname === '/calculadora' && 'Calculadora Completa'}
                {location.pathname === '/simuladores' && 'Simuladores'}
                {location.pathname === '/calculadora-completa' && 'Calculadora Completa'}
                {location.pathname === '/simulador-rapido' && 'Simuladores'}
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header