import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Calculator, 
  Mail, 
  Linkedin, 
  Instagram, 
  ExternalLink,
  Calendar,
  MapPin,
  Phone
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Início', href: '/' },
    { name: 'Calculadora Completa', href: '/calculadora' },
    { name: 'Simuladores', href: '/simuladores' },
    { name: 'Sobre a Reforma', href: '#reforma' }
  ]

  const resources = [
    { name: 'Documentação', href: '#docs' },
    { name: 'Guia de Uso', href: '#guia' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Suporte', href: '#suporte' }
  ]

  const social = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/silvio-gonçalves-980b5b229',
      icon: Linkedin
    },
    {
      name: 'Instagram', 
      href: 'https://instagram.com/silviogoncalves0',
      icon: Instagram
    },
    {
      name: 'Email',
      href: 'mailto:consultor.ia.lendario@gmail.com',
      icon: Mail
    }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">Calculadora Reforma Tributária</span>
                <span className="block text-sm text-blue-400">v3.0 • SPED Real + IA Personalizada</span>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md">
              A ferramenta mais completa e precisa para análise da Reforma Tributária brasileira. 
              Desenvolvida por especialista em controladoria com validação de dados SPED reais.
            </p>

            {/* Developer Info */}
            <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold text-blue-400 mb-3">📞 Desenvolvido por:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-300">
                  <span className="font-semibold text-white mr-2">Silvio Gonçalves</span>
                  - Especialista em Controladoria
                </div>
                <div className="flex items-center text-gray-400">
                  <span>🎓 Contador CRC Ativo • MBA FGV • Especialização em Controladoria</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail className="h-3 w-3 mr-2" />
                  <a href="mailto:consultor.ia.lendario@gmail.com" className="hover:text-blue-400 transition-colors">
                    consultor.ia.lendario@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Links Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Recursos</h3>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors flex items-center"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="font-semibold mb-4">Conecte-se</h4>
              <div className="flex space-x-4">
                {social.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                      title={item.name}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Strip */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="text-green-400 text-lg">📊</span>
              <span className="text-sm text-gray-300">SPED Real Processado</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="text-blue-400 text-lg">🎯</span>
              <span className="text-sm text-gray-300">Benefícios por NCM</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="text-purple-400 text-lg">🤖</span>
              <span className="text-sm text-gray-300">IA Personalizada</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="text-orange-400 text-lg">📈</span>
              <span className="text-sm text-gray-300">Relatórios Executivos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              <p>
                © {currentYear} Calculadora Reforma Tributária v3.0. 
                <span className="ml-2">Desenvolvido por Silvio Gonçalves.</span>
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Atualizado em {new Date().toLocaleDateString('pt-BR')}</span>
              </div>
              <span className="hidden md:block">•</span>
              <span className="px-2 py-1 bg-green-600 text-white rounded text-xs">
                v3.0 Estável
              </span>
            </div>
          </div>
          
          {/* Legal Disclaimer */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
              <p className="text-xs text-yellow-200 leading-relaxed">
                <strong>⚠️ Disclaimer Legal:</strong> Esta calculadora é uma ferramenta de estimativa baseada em interpretações 
                da legislação da Reforma Tributária (EC 132/2023 e LC 214/2025). Os valores e análises gerados devem 
                ser validados com contadores qualificados. O autor não se responsabiliza por decisões tomadas com base 
                exclusivamente nesta ferramenta. Para análises críticas, sempre consulte um profissional especializado.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer