import { Link } from 'react-router-dom'
import { Building2, Mail, Phone, MapPin, Linkedin, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    curso: [
      { name: 'Conteúdo Programático', href: '/curso' },
      { name: 'Simuladores', href: '/simuladores' },
      { name: 'Certificação', href: '/certificacao' },
      { name: 'FAQ', href: '/faq' }
    ],
    recursos: [
      { name: 'Material de Apoio', href: '/materiais' },
      { name: 'Legislação Atualizada', href: '/legislacao' },
      { name: 'Casos Práticos', href: '/casos' },
      { name: 'Webinars', href: '/webinars' }
    ],
    suporte: [
      { name: 'Central de Ajuda', href: '/ajuda' },
      { name: 'Contato', href: '/contato' },
      { name: 'Política de Privacidade', href: '/privacidade' },
      { name: 'Termos de Uso', href: '/termos' }
    ]
  }

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/silvio-gonçalves-980b5b229' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/silviogoncalves0' },
    { name: 'YouTube', icon: Youtube, href: '#' }
  ]

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Reforma Tributária</h3>
                <p className="text-sm text-muted-foreground">IVA Dual & Split Payment</p>
              </div>
            </Link>
            
            <p className="text-muted-foreground max-w-md">
              Curso especializado em Reforma Tributária Brasileira, desenvolvido por especialistas 
              para capacitar profissionais na transição para o novo sistema tributário.
            </p>

            <div className="space-y-3">
              <div className="text-sm font-semibold text-foreground">
                📞 SILVIO GONÇALVES - ESPECIALISTA EM CONTROLADORIA
              </div>
              <div className="text-xs text-muted-foreground">
                Contador | MBA Gestão Empresarial - FGV | Especialização em Controladoria
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>consultor.ia.lendario@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Linkedin className="h-4 w-4" />
                  <span>linkedin.com/in/silvio-gonçalves-980b5b229</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Instagram className="h-4 w-4" />
                  <span>@silviogoncalves0</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Course Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Curso</h4>
            <ul className="space-y-2">
              {footerLinks.curso.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Recursos</h4>
            <ul className="space-y-2">
              {footerLinks.recursos.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Suporte</h4>
            <ul className="space-y-2">
              {footerLinks.suporte.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} Reforma Tributária. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>Desenvolvido com ❤️ no Brasil</span>
              <span>•</span>
              <span>Versão MVP 1.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

