import React from 'react'
import { motion } from 'framer-motion'
import TaxCalculatorComplete from '../components/TaxCalculatorComplete'
import { Calculator, Upload, Brain, FileText } from 'lucide-react'

const CalculadoraPage = () => {
  const features = [
    {
      icon: <Upload className="h-5 w-5" />,
      text: "Upload SPED Real"
    },
    {
      icon: <Brain className="h-5 w-5" />,
      text: "IA Personalizada"
    },
    {
      icon: <FileText className="h-5 w-5" />,
      text: "Relatórios Executivos"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header da página */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <Calculator className="h-8 w-8 mr-3" />
              <h1 className="text-3xl lg:text-4xl font-bold">
                Calculadora Completa v3.0
              </h1>
            </div>
            
            <p className="text-xl text-blue-100 mb-6">
              Análise profissional da Reforma Tributária com SPED Real e IA Personalizada
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                >
                  {feature.icon}
                  <span className="ml-2 text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calculadora */}
      <section className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TaxCalculatorComplete />
        </motion.div>
      </section>

      {/* Informações adicionais */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ✨ Recursos Avançados da Versão 3.0
              </h2>
              <p className="text-lg text-gray-600">
                A calculadora mais completa e precisa do mercado brasileiro
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-green-50 p-6 rounded-lg border border-green-200"
              >
                <h3 className="text-lg font-semibold text-green-800 mb-3">
                  📊 Parser SPED Real
                </h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Registros C170 (Produtos por NCM)</li>
                  <li>• Registros D101 (Serviços por código LC)</li>
                  <li>• Registros M200/M600 (PIS/COFINS)</li>
                  <li>• Validação automática de conformidade</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-blue-50 p-6 rounded-lg border border-blue-200"
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-3">
                  🎯 Benefícios Específicos
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Cesta básica: 0% de tributação</li>
                  <li>• Medicamentos/Agro: 60% redução</li>
                  <li>• Saúde/Educação: 60% redução</li>
                  <li>• Profissionais liberais: 30% redução</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-purple-50 p-6 rounded-lg border border-purple-200"
              >
                <h3 className="text-lg font-semibold text-purple-800 mb-3">
                  🤖 IA Personalizada
                </h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Análises específicas por empresa</li>
                  <li>• Recomendações estratégicas</li>
                  <li>• Chat interativo especializado</li>
                  <li>• Insights baseados em dados reais</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-orange-50 p-6 rounded-lg border border-orange-200"
              >
                <h3 className="text-lg font-semibold text-orange-800 mb-3">
                  📈 Relatórios Executivos
                </h3>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• HTML interativo com gráficos</li>
                  <li>• Excel completo para análise</li>
                  <li>• Análise detalhada Split Payment</li>
                  <li>• Cronograma 2023-2033</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-red-50 p-6 rounded-lg border border-red-200"
              >
                <h3 className="text-lg font-semibold text-red-800 mb-3">
                  💳 Análise Split Payment
                </h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Impacto real no fluxo de caixa</li>
                  <li>• Cálculo de capital necessário</li>
                  <li>• Custos financeiros projetados</li>
                  <li>• Estratégias de mitigação</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-teal-50 p-6 rounded-lg border border-teal-200"
              >
                <h3 className="text-lg font-semibold text-teal-800 mb-3">
                  ✅ Validação Cruzada
                </h3>
                <ul className="text-sm text-teal-700 space-y-1">
                  <li>• Conferência automática SPED</li>
                  <li>• Indicadores de conformidade</li>
                  <li>• Alertas de inconsistências</li>
                  <li>• Relatórios de auditoria</li>
                </ul>
              </motion.div>
            </div>

            {/* Aviso importante */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-yellow-800">
                    💡 Importante: Esta calculadora é uma ferramenta de estimativa
                  </h3>
                  <p className="text-yellow-700 mt-2">
                    Os valores e análises gerados devem ser validados com contadores qualificados. 
                    O autor não se responsabiliza por decisões tomadas com base exclusivamente nesta ferramenta. 
                    Para análises críticas, recomenda-se sempre a consultoria de um profissional especializado.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CalculadoraPage