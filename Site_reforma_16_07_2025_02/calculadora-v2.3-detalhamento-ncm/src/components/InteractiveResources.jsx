import { useState } from 'react'
import { Play, FileText, Calendar, BarChart3, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const InteractiveResources = ({ lessonId }) => {
  const [activeResource, setActiveResource] = useState(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [exerciseAnswers, setExerciseAnswers] = useState({})

  const lessonContent = {
    1: {
      slides: [
        {
          title: "Panorama Geral da Reforma Tributária",
          content: "A Reforma Tributária brasileira representa a maior transformação do sistema fiscal nacional desde a Constituição de 1988."
        },
        {
          title: "Contexto Histórico",
          content: `O sistema tributário brasileiro atual é caracterizado por:

• Complexidade extrema: Mais de 90 tributos diferentes
• Guerra fiscal: Estados competindo com incentivos fiscais
• Cumulatividade: Tributos incidem sobre tributos (cascata)
• Insegurança jurídica: Interpretações divergentes
• Alto custo de compliance: R$ 60 bilhões anuais

Fonte: Emenda Constitucional 132/2023 e Lei Complementar 214/2025`
        },
        {
          title: "Problemas Estruturais Identificados",
          content: `1. Cumulatividade Tributária
O sistema atual permite que tributos incidam sobre outros tributos, criando um efeito cascata que distorce preços e prejudica a competitividade.

2. Guerra Fiscal
Estados e municípios concedem benefícios fiscais de forma desordenada, gerando:
- Distorções na alocação de investimentos
- Perda de arrecadação estimada em R$ 45 bilhões anuais
- Conflitos federativos constantes

3. Complexidade Operacional
- 27 legislações de ICMS diferentes
- Mais de 5.500 municípios com ISS próprio
- Obrigações acessórias excessivas

Fonte: Ministério da Fazenda, 2025`
        },
        {
          title: "A Solução: IVA Dual Brasileiro",
          content: `Substituição de 5 tributos por 2:

TRIBUTOS EXTINTOS:
• PIS (Federal)
• COFINS (Federal) 
• IPI (Federal)
• ICMS (Estadual)
• ISS (Municipal)

NOVOS TRIBUTOS (IVA DUAL):
• CBS - Contribuição sobre Bens e Serviços (Federal)
• IBS - Imposto sobre Bens e Serviços (Estados/Municípios)

Características:
- Não-cumulativo
- Tributação no destino
- Legislação única nacional
- Split Payment obrigatório

Base Legal: Lei Complementar 214/2025`
        },
        {
          title: "Cronograma de Implementação 2025-2033",
          content: `FASE 1 - PREPARAÇÃO (2025-2026)
• Janeiro 2025: Lei Complementar 214/2025 sancionada
• Março 2025: Regulamentação do Comitê Gestor do IBS
• Junho 2025: Início dos testes do Split Payment
• Janeiro 2026: Início da cobrança do IBS e CBS

FASE 2 - TRANSIÇÃO (2026-2029)
• 2026: Cobrança simultânea (sistema atual + novo)
• 2027: Redução gradual dos tributos antigos
• 2028: Eliminação do PIS/COFINS
• 2029: Eliminação do IPI

FASE 3 - CONSOLIDAÇÃO (2030-2033)
• 2030: Eliminação do ICMS
• 2032: Eliminação do ISS
• 2033: Sistema totalmente implementado

Fonte: Cronograma oficial do Ministério da Fazenda`
        },
        {
          title: "Impactos Econômicos Esperados",
          content: `BENEFÍCIOS MACROECONÔMICOS:

1. Crescimento do PIB
- Aumento estimado de 2-3% em 15 anos
- Maior eficiência na alocação de recursos
- Redução de distorções setoriais

2. Redução de Preços
- Eliminação do efeito cascata
- Redução média de 7-12% nos preços
- Maior competitividade internacional

3. Simplificação Administrativa
- Redução de 90% nas obrigações acessórias
- Economia de R$ 60 bilhões anuais em compliance
- Unificação de 27 legislações estaduais

4. Fim da Guerra Fiscal
- Eliminação de incentivos distorcivos
- Maior segurança jurídica
- Alocação eficiente de investimentos

Fonte: Estudos do IPEA e Ministério da Fazenda, 2025`
        },
        {
          title: "Alíquotas e Estrutura Tributária",
          content: `ALÍQUOTA DE REFERÊNCIA: 26,5%

Composição:
• CBS (Federal): 8,8%
• IBS (Estados/Municípios): 17,7%

Repartição do IBS:
• Estados: 60% (10,6%)
• Municípios: 40% (7,1%)

REGIMES ESPECIAIS:
• Simples Nacional: Alíquotas reduzidas
• Cashback: Famílias de baixa renda
• Zona Franca de Manaus: Crédito presumido até 2073
• Cesta Básica: Alíquota zero
• Medicamentos: Alíquota reduzida (60%)

Imposto Seletivo:
• Produtos prejudiciais à saúde e meio ambiente
• Alíquotas específicas por produto
• Arrecadação destinada a políticas públicas

Base Legal: Art. 8º da Lei Complementar 214/2025`
        },
        {
          title: "Desafios da Implementação",
          content: `DESAFIOS TÉCNICOS:

1. Sistemas de Informação
- Integração de 27 sistemas estaduais
- Desenvolvimento do sistema nacional único
- Capacitação de servidores públicos

2. Adaptação Empresarial
- Treinamento de equipes contábeis
- Adequação de sistemas ERP
- Revisão de processos internos

3. Gestão da Transição
- Período de cobrança simultânea
- Migração de créditos acumulados
- Harmonização de procedimentos

RISCOS IDENTIFICADOS:
- Resistência de estados perdedores
- Complexidade tecnológica
- Prazo de implementação apertado

MEDIDAS MITIGADORAS:
- Fundo de equalização federativa
- Programa de capacitação nacional
- Cronograma flexível por setor

Fonte: Relatório do Comitê Gestor, 2025`
        }
      ],
      timeline: [
        { year: "2023", event: "Aprovação da EC 132/2023", status: "completed" },
        { year: "2025", event: "Lei Complementar 214/2025", status: "completed" },
        { year: "2026", event: "Início da cobrança IVA Dual", status: "upcoming" },
        { year: "2029", event: "Eliminação PIS/COFINS/IPI", status: "upcoming" },
        { year: "2033", event: "Sistema totalmente implementado", status: "upcoming" }
      ],
      infographic: {
        title: "Sistema Atual vs Novo Sistema",
        current: {
          title: "Sistema Atual (Complexo)",
          items: ["5 tributos diferentes", "27 legislações de ICMS", "Guerra fiscal", "Efeito cascata", "Alto custo compliance"]
        },
        new: {
          title: "Novo Sistema (Simplificado)", 
          items: ["2 tributos (IVA Dual)", "Legislação única", "Fim da guerra fiscal", "Não-cumulativo", "Split Payment automático"]
        }
      },
      exercises: [
        {
          id: 1,
          title: "Cálculo de Impacto Tributário",
          question: "Uma empresa do setor de varejo tem faturamento anual de R$ 10 milhões. Com base nos dados fornecidos, qual será o impacto líquido da mudança do sistema atual para o IVA Dual?",
          data: {
            faturamento: "R$ 10.000.000",
            margemAtual: "12,5%",
            novaAliquota: "26,5%",
            creditosEstimados: "18%"
          },
          options: [
            "A) Redução de R$ 450.000 na carga tributária anual",
            "B) Aumento de R$ 400.000 na carga tributária anual", 
            "C) Redução de R$ 400.000 na carga tributária anual",
            "D) Aumento de R$ 450.000 na carga tributária anual",
            "E) Impacto neutro (sem alteração significativa)"
          ],
          correctAnswer: 0,
          explanation: "Cálculo: Sistema atual = R$ 10M × 12,5% = R$ 1.250.000. Sistema novo = (R$ 10M × 26,5%) - (R$ 10M × 18%) = R$ 2.650.000 - R$ 1.800.000 = R$ 850.000. Diferença = R$ 1.250.000 - R$ 850.000 = R$ 400.000 de redução."
        },
        {
          id: 2,
          title: "Planejamento de Transição",
          question: "Considerando o cronograma oficial de implementação da Reforma Tributária (2026-2033), qual deve ser a primeira prioridade de uma empresa de médio porte em 2025?",
          options: [
            "A) Implementar imediatamente o Split Payment em todas as operações",
            "B) Treinar equipes e adequar sistemas para o período de cobrança simultânea",
            "C) Eliminar completamente os controles do sistema tributário atual",
            "D) Focar apenas na adequação do ICMS, deixando os demais tributos para depois",
            "E) Aguardar a implementação completa em 2033 para fazer qualquer mudança"
          ],
          correctAnswer: 1,
          explanation: "A partir de 2026 haverá cobrança simultânea dos dois sistemas. Portanto, a prioridade em 2025 deve ser preparar a empresa para gerenciar ambos os sistemas simultaneamente, incluindo treinamento de equipes e adequação de sistemas."
        },
        {
          id: 3,
          title: "Split Payment - Funcionamento",
          question: "No sistema de Split Payment, uma empresa vende produtos por R$ 100.000 com alíquota de IVA de 20%. Como será o fluxo financeiro dessa operação?",
          data: {
            vendaTotal: "R$ 100.000",
            aliquotaIVA: "20%",
            valorIVA: "R$ 20.000"
          },
          options: [
            "A) Empresa recebe R$ 100.000 e depois paga R$ 20.000 ao governo",
            "B) Empresa recebe R$ 80.000 e o governo recebe R$ 20.000 automaticamente",
            "C) Empresa recebe R$ 100.000 e o Split Payment não se aplica",
            "D) Cliente paga R$ 80.000 para a empresa e R$ 20.000 separadamente",
            "E) O valor total fica retido até a declaração mensal"
          ],
          correctAnswer: 1,
          explanation: "No Split Payment, o valor do tributo (R$ 20.000) é automaticamente direcionado para o governo no momento da transação, e a empresa recebe apenas o valor líquido (R$ 80.000). Isso elimina a necessidade de recolhimento posterior."
        },
        {
          id: 4,
          title: "Regimes Especiais - Simples Nacional",
          question: "Uma microempresa enquadrada no Simples Nacional com faturamento de R$ 500.000 anuais. Qual será o principal benefício com a Reforma Tributária?",
          options: [
            "A) Eliminação completa de todos os tributos",
            "B) Manutenção do regime simplificado com alíquotas reduzidas do IVA",
            "C) Obrigatoriedade de migrar para o regime geral",
            "D) Aplicação da alíquota padrão de 26,5% sem benefícios",
            "E) Isenção total por 5 anos"
          ],
          correctAnswer: 1,
          explanation: "O Simples Nacional será mantido na Reforma Tributária, permitindo que microempresas continuem com regime simplificado e alíquotas reduzidas do IVA Dual, preservando os benefícios para pequenos negócios."
        },
        {
          id: 5,
          title: "Cashback Tributário",
          question: "O sistema de Cashback Tributário beneficiará famílias de baixa renda. Qual é o mecanismo de funcionamento deste benefício?",
          options: [
            "A) Desconto direto no momento da compra para todos os produtos",
            "B) Devolução de parte dos tributos pagos via CPF na nota fiscal",
            "C) Isenção total de IVA para famílias cadastradas",
            "D) Crédito automático na conta bancária mensalmente",
            "E) Desconto apenas em produtos da cesta básica"
          ],
          correctAnswer: 1,
          explanation: "O Cashback Tributário funciona através da devolução de parte dos tributos pagos, identificados pelo CPF na nota fiscal. Famílias de baixa renda receberão de volta uma porcentagem dos tributos pagos em suas compras."
        },
        {
          id: 6,
          title: "Zona Franca de Manaus",
          question: "Como a Zona Franca de Manaus será tratada na Reforma Tributária até 2073?",
          options: [
            "A) Perderá todos os benefícios imediatamente em 2026",
            "B) Manterá benefícios através de crédito presumido equivalente",
            "C) Será extinta gradualmente até 2030",
            "D) Terá apenas benefícios para exportação",
            "E) Não sofrerá nenhuma alteração"
          ],
          correctAnswer: 1,
          explanation: "A Zona Franca de Manaus manterá seus benefícios até 2073 através de um sistema de crédito presumido que garantirá tratamento equivalente aos incentivos atuais, preservando a competitividade da região."
        },
        {
          id: 7,
          title: "Imposto Seletivo",
          question: "O Imposto Seletivo incidirá sobre produtos específicos. Qual é o principal critério para definir esses produtos?",
          options: [
            "A) Produtos importados de qualquer categoria",
            "B) Produtos de luxo com alto valor agregado",
            "C) Produtos prejudiciais à saúde e ao meio ambiente",
            "D) Produtos industrializados em geral",
            "E) Produtos com alta margem de lucro"
          ],
          correctAnswer: 2,
          explanation: "O Imposto Seletivo incidirá especificamente sobre produtos prejudiciais à saúde e ao meio ambiente, como cigarros, bebidas alcoólicas e combustíveis fósseis, com objetivo de desestimular o consumo e gerar recursos para políticas públicas."
        },
        {
          id: 8,
          title: "Tributação no Destino",
          question: "Com a implementação da tributação no destino, uma empresa de São Paulo que vende para o Rio de Janeiro terá qual mudança operacional?",
          options: [
            "A) Continuará recolhendo tributos em São Paulo como antes",
            "B) Recolherá tributos no Rio de Janeiro (destino da mercadoria)",
            "C) Dividirá o recolhimento entre origem e destino",
            "D) Ficará isenta de tributos interestaduais",
            "E) Pagará tributo federal apenas"
          ],
          correctAnswer: 1,
          explanation: "Na tributação no destino, os tributos são recolhidos no estado/município onde o produto é consumido (Rio de Janeiro), não onde é produzido (São Paulo). Isso elimina a guerra fiscal e beneficia estados consumidores."
        },
        {
          id: 9,
          title: "Período de Transição",
          question: "Durante o período de transição (2026-2033), as empresas enfrentarão qual principal desafio operacional?",
          options: [
            "A) Escolher entre sistema antigo ou novo",
            "B) Gerenciar cobrança simultânea dos dois sistemas tributários",
            "C) Pagar apenas o novo sistema desde 2026",
            "D) Ficar isentas de tributos durante a transição",
            "E) Migrar imediatamente para o novo sistema"
          ],
          correctAnswer: 1,
          explanation: "O principal desafio será gerenciar a cobrança simultânea dos dois sistemas tributários (atual e novo) durante o período de transição, exigindo controles duplos e adequação gradual dos processos internos."
        },
        {
          id: 10,
          title: "Impacto no Preço Final",
          question: "Com a eliminação do efeito cascata, qual será o impacto esperado nos preços ao consumidor final?",
          options: [
            "A) Aumento médio de 15-20% nos preços",
            "B) Redução média de 7-12% nos preços",
            "C) Manutenção dos preços atuais",
            "D) Variação apenas em produtos importados",
            "E) Impacto apenas em produtos industrializados"
          ],
          correctAnswer: 1,
          explanation: "A eliminação do efeito cascata (tributo sobre tributo) resultará em redução média de 7-12% nos preços ao consumidor final, tornando produtos mais baratos e aumentando a competitividade da economia brasileira."
        }
      ]
    }
  }

  const currentLessonContent = lessonContent[lessonId] || lessonContent[1]

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev < currentLessonContent.slides.length - 1 ? prev + 1 : prev
    )
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => prev > 0 ? prev - 1 : prev)
  }

  const handleExerciseAnswer = (exerciseId, optionIndex) => {
    setExerciseAnswers(prev => ({
      ...prev,
      [exerciseId]: optionIndex
    }))
  }

  const resources = [
    {
      id: 'slides',
      title: 'Slides da Apresentação',
      description: 'Conteúdo completo da aula com análises detalhadas',
      icon: Play,
      color: 'blue'
    },
    {
      id: 'infographic',
      title: 'Infográfico Comparativo',
      description: 'Sistema atual vs novo sistema tributário',
      icon: BarChart3,
      color: 'green'
    },
    {
      id: 'timeline',
      title: 'Timeline da Reforma',
      description: 'Cronograma completo de implementação 2025-2033',
      icon: Calendar,
      color: 'purple'
    },
    {
      id: 'exercises',
      title: 'Exercícios Práticos',
      description: 'Casos reais para fixação do conteúdo',
      icon: FileText,
      color: 'orange'
    }
  ]

  const renderSlides = () => (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">
          Slide {currentSlide + 1} de {currentLessonContent.slides.length}
        </h3>
        <button
          onClick={() => setActiveResource(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 mb-6 min-h-[400px]">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          {currentLessonContent.slides[currentSlide].title}
        </h2>
        <div className="text-gray-800 whitespace-pre-line leading-relaxed">
          {currentLessonContent.slides[currentSlide].content}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Anterior</span>
        </button>
        
        <div className="flex space-x-2">
          {currentLessonContent.slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextSlide}
          disabled={currentSlide === currentLessonContent.slides.length - 1}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          <span>Próximo</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )

  const renderTimeline = () => (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Timeline da Reforma Tributária</h3>
        <button
          onClick={() => setActiveResource(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="space-y-4">
        {currentLessonContent.timeline.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className={`w-4 h-4 rounded-full ${
              item.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
            }`} />
            <div className="flex-1">
              <div className="font-semibold">{item.year}</div>
              <div className="text-gray-600">{item.event}</div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              item.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {item.status === 'completed' ? 'Concluído' : 'Previsto'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderInfographic = () => (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">{currentLessonContent.infographic.title}</h3>
        <button
          onClick={() => setActiveResource(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 rounded-lg p-6">
          <h4 className="text-lg font-bold text-red-800 mb-4">
            {currentLessonContent.infographic.current.title}
          </h4>
          <ul className="space-y-2">
            {currentLessonContent.infographic.current.items.map((item, index) => (
              <li key={index} className="text-red-700 flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6">
          <h4 className="text-lg font-bold text-green-800 mb-4">
            {currentLessonContent.infographic.new.title}
          </h4>
          <ul className="space-y-2">
            {currentLessonContent.infographic.new.items.map((item, index) => (
              <li key={index} className="text-green-700 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )

  const renderExercises = () => (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Exercícios Práticos</h3>
        <button
          onClick={() => setActiveResource(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="space-y-8">
        {currentLessonContent.exercises.map((exercise) => (
          <div key={exercise.id} className="bg-blue-50 rounded-lg p-6">
            <h4 className="font-bold text-blue-900 mb-4">
              Exercício {exercise.id}: {exercise.title}
            </h4>
            
            <p className="text-blue-800 mb-4">
              {exercise.question}
            </p>
            
            {exercise.data && (
              <div className="bg-white rounded-lg p-4 mb-4">
                <strong>Dados:</strong><br />
                {Object.entries(exercise.data).map(([key, value]) => (
                  <div key={key}>- {key.charAt(0).toUpperCase() + key.slice(1)}: {value}</div>
                ))}
              </div>
            )}
            
            <div className="space-y-2 mb-4">
              {exercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleExerciseAnswer(exercise.id, index)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    exerciseAnswers[exercise.id] === index
                      ? 'bg-blue-100 border-blue-500 text-blue-900'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            
            {exerciseAnswers[exercise.id] !== undefined && (
              <div className={`p-4 rounded-lg ${
                exerciseAnswers[exercise.id] === exercise.correctAnswer
                  ? 'bg-green-100 border border-green-300'
                  : 'bg-red-100 border border-red-300'
              }`}>
                <div className={`font-semibold mb-2 ${
                  exerciseAnswers[exercise.id] === exercise.correctAnswer
                    ? 'text-green-800'
                    : 'text-red-800'
                }`}>
                  {exerciseAnswers[exercise.id] === exercise.correctAnswer ? '✓ Correto!' : '✗ Incorreto'}
                </div>
                <div className="text-gray-700">
                  <strong>Explicação:</strong> {exercise.explanation}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Recursos Interativos da Aula</h3>
      
      <AnimatePresence>
        {activeResource ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {activeResource === 'slides' && renderSlides()}
              {activeResource === 'timeline' && renderTimeline()}
              {activeResource === 'infographic' && renderInfographic()}
              {activeResource === 'exercises' && renderExercises()}
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource) => {
              const IconComponent = resource.icon
              return (
                <motion.button
                  key={resource.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveResource(resource.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-300 hover:shadow-lg bg-${resource.color}-50 border-${resource.color}-200 hover:border-${resource.color}-400`}
                >
                  <div className="flex items-start space-x-3">
                    <IconComponent className={`text-${resource.color}-600 mt-1`} size={24} />
                    <div>
                      <h4 className={`font-semibold text-${resource.color}-900`}>
                        {resource.title}
                      </h4>
                      <p className={`text-sm text-${resource.color}-700 mt-1`}>
                        {resource.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default InteractiveResources

