import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  BarChart3, 
  TrendingUp, 
  FileText, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Upload,
  Brain,
  PieChart
} from 'lucide-react'

const HomePage = () => {
  const features = [
    {
      icon: <Upload className="h-8 w-8 text-blue-600" />,
      title: "📊 SPED Real",
      description: "Upload e processamento automático de arquivos EFD ICMS/IPI e EFD-Contribuições com validação cruzada"
    },
    {
      icon: <PieChart className="h-8 w-8 text-green-600" />,
      title: "🎯 Benefícios Específicos", 
      description: "Identificação automática por NCM/código LC 116/03 com reduções de 0%, 30%, 40% e 60%"
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-600" />,
      title: "🤖 IA Personalizada",
      description: "Análises específicas por empresa com recomendações estratégicas baseadas nos seus dados reais"
    },
    {
      icon: <FileText className="h-8 w-8 text-orange-600" />,
      title: "📈 Relatórios Executivos",
      description: "Relatórios HTML interativos + Excel com gráficos Chart.js e análise detalhada do Split Payment"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-teal-600" />,
      title: "✅ Validação Automática",
      description: "Conferência automática entre dados SPED e cálculos com indicadores de conformidade"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-red-600" />,
      title: "💳 Análise Split Payment",
      description: "Impacto real no fluxo de caixa com estratégias de mitigação e custo financeiro"
    }
  ]

  const benefits = [
    "Cesta Básica: Alíquota 0% (arroz, feijão, leite, etc.)",
    "Medicamentos/Agro: 60% de redução (11,19% efetiva)",
    "Saúde/Educação: 60% de redução (11,19% efetiva)", 
    "Profissionais Liberais: 30% de redução (19,58% efetiva)",
    "Alimentação: 40% redução s/ créditos (16,78% efetiva)"
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium">
                <span className="mr-2">🚀</span>
                Versão 3.0 - Com SPED Real e IA
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Calculadora da
              <span className="block gradient-text bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Reforma Tributária
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Análise profissional com upload de arquivos SPED reais, benefícios específicos 
              por NCM/código e IA personalizada para sua empresa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                to="/calculadora" 
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Calculator className="mr-3 h-5 w-5" />
                🧮 Calculadora Completa
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                to="/simuladores" 
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                <Zap className="mr-3 h-5 w-5" />
                ⚡ Simuladores Rápidos
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-yellow-300">27,97%</div>
                <div className="text-sm text-blue-200">Alíquota IVA Dual</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-green-300">5 → 3</div>
                <div className="text-sm text-blue-200">Tributos Unificados</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-orange-300">2033</div>
                <div className="text-sm text-blue-200">Vigência Plena</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-pink-300">60%</div>
                <div className="text-sm text-blue-200">Redução Máxima</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Por que usar nossa calculadora?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A ferramenta mais completa e precisa para análise da Reforma Tributária brasileira
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow card-hover"
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios da Reforma */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                🎯 Benefícios Específicos da Reforma
              </h2>
              <p className="text-xl text-gray-600">
                Nossa calculadora identifica automaticamente todos os benefícios por NCM e código LC 116/03
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <CheckCircle className="mr-3 h-6 w-6 text-green-600" />
                  Reduções Identificadas
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="mr-3 h-6 w-6 text-blue-600" />
                  Impacto no Split Payment
                </h3>
                <div className="space-y-6">
                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                    <h4 className="font-semibold text-red-800 mb-2">⚠️ Retenção Automática</h4>
                    <p className="text-red-700 text-sm">
                      27,97% do valor das vendas será retido automaticamente pelo governo, 
                      impactando diretamente o fluxo de caixa.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-800 mb-2">💡 Estratégias de Mitigação</h4>
                    <p className="text-blue-700 text-sm">
                      Nossa análise inclui estratégias específicas para minimizar o impacto 
                      no capital de giro e custos financeiros.
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-semibold text-green-800 mb-2">📊 Análise Detalhada</h4>
                    <p className="text-green-700 text-sm">
                      Relatórios executivos com projeções de capital necessário 
                      e cronograma de implementação 2027-2033.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Pronto para analisar sua empresa?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Faça uma análise completa e descubra como a Reforma Tributária 
              vai impactar seu negócio com dados reais e precisos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/calculadora" 
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Calculator className="mr-3 h-5 w-5" />
                Começar Análise Completa
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                to="/simuladores" 
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                <Zap className="mr-3 h-5 w-5" />
                Teste Rápido
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Autor Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              📞 Desenvolvido por Especialista
            </h2>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                Silvio Gonçalves
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                Contador CRC Ativo • MBA Gestão Empresarial - FGV • Especialização em Controladoria
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <span>📧 consultor.ia.lendario@gmail.com</span>
                <span>💼 LinkedIn: silvio-gonçalves-980b5b229</span>
                <span>📱 Instagram: @silviogoncalves0</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage