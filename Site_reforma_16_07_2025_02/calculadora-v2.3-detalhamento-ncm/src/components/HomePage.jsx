import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Calculator, 
  Award, 
  Clock, 
  Users, 
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Download,
  Target
} from 'lucide-react'

const HomePage = () => {
  const features = [
    {
      icon: BookOpen,
      title: "4 Aulas Práticas",
      description: "Conteúdo focado em aplicação real com casos práticos e exemplos do mercado brasileiro."
    },
    {
      icon: Calculator,
      title: "Simuladores Interativos",
      description: "Ferramentas exclusivas para cálculo de IVA Dual, Split Payment e comparação de regimes."
    },
    {
      icon: Award,
      title: "Certificação Reconhecida",
      description: "Certificado de 40 horas com validade de 2 anos e reconhecimento profissional."
    },
    {
      icon: Clock,
      title: "6 Horas de Conteúdo",
      description: "Curso intensivo e objetivo, otimizado para profissionais com agenda apertada."
    },
    {
      icon: Users,
      title: "Para Profissionais",
      description: "Direcionado para contadores, CFOs, empresários e consultores tributários."
    },
    {
      icon: TrendingUp,
      title: "Aplicação Imediata",
      description: "Conhecimentos aplicáveis desde 2026 com a implementação gradual da reforma."
    }
  ]

  const stats = [
    { number: "27%", label: "Alíquota IVA Dual" },
    { number: "2026", label: "Início da Implementação" },
    { number: "5", label: "Tributos Substituídos" },
    { number: "40h", label: "Certificação Equivalente" }
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Contadora Sênior",
      company: "Escritório Contábil SP",
      content: "Curso essencial para entender as mudanças que vêm por aí. Os simuladores são fantásticos!",
      rating: 5
    },
    {
      name: "João Santos",
      role: "CFO",
      company: "Indústria Brasileira Ltda",
      content: "Conteúdo muito prático e aplicável. Já estou usando os conhecimentos no planejamento da empresa.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Consultora Tributária",
      company: "Consultoria Fiscal",
      content: "Excelente didática e casos reais. Recomendo para todos os profissionais da área.",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950 dark:via-background dark:to-blue-950">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  🚀 Lançamento MVP
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Reforma Tributária
                  <span className="block text-blue-600">na Prática</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Domine o <strong>IVA Dual</strong> e <strong>Split Payment</strong> antes da implementação. 
                  Curso prático com simuladores exclusivos para profissionais tributários.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/curso">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3">
                    <Play className="mr-2 h-5 w-5" />
                    Começar Agora
                  </Button>
                </Link>
                <Link to="/simuladores">
                  <Button variant="outline" size="lg" className="px-8 py-3">
                    <Calculator className="mr-2 h-5 w-5" />
                    Ver Simuladores
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  6 horas de conteúdo
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Certificação incluída
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Acesso vitalício
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white dark:bg-card rounded-2xl shadow-2xl p-8 border">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Estrutura do Curso</h3>
                    <Badge variant="secondary">MVP</Badge>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      "Panorama Geral da Reforma",
                      "IVA Dual - Funcionamento Prático", 
                      "Split Payment na Prática",
                      "Planejamento Tributário Nova Era"
                    ].map((aula, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-sm">{aula}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">4</div>
                        <div className="text-xs text-muted-foreground">Aulas</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">3</div>
                        <div className="text-xs text-muted-foreground">Simuladores</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Por que escolher nosso curso?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Desenvolvido por especialistas, focado na aplicação prática dos conhecimentos 
              no dia a dia profissional.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              O que dizem nossos alunos
            </h2>
            <p className="text-xl text-muted-foreground">
              Feedback de profissionais que já se capacitaram
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-base italic">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} • {testimonial.company}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold">
              Prepare-se para a maior mudança tributária do Brasil
            </h2>
            <p className="text-xl opacity-90">
              Não fique para trás. Capacite-se agora e seja referência em Reforma Tributária 
              na sua região.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/curso">
                <Button size="lg" variant="secondary" className="px-8 py-3">
                  <Target className="mr-2 h-5 w-5" />
                  Começar Curso Agora
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                <Download className="mr-2 h-5 w-5" />
                Baixar Programa
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

