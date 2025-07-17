import { useState, useEffect } from 'react'
import { Clock, CheckCircle, Lock, Play, FileText, BarChart3, Calendar, Award } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Quiz from './Quiz'
import InteractiveResources from './InteractiveResources'

const CoursePage = () => {
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [completedLessons, setCompletedLessons] = useState([])
  const [quizScores, setQuizScores] = useState({})
  const [showQuiz, setShowQuiz] = useState(false)
  const [showResources, setShowResources] = useState(false)

  const lessons = [
    {
      id: 1,
      title: "Panorama Geral da Reforma Tributária",
      duration: "90 min",
      description: "Contexto histórico, problemas estruturais do sistema atual e cronograma de implementação com análises de impacto econômico",
      isUnlocked: true,
      content: {
        summary: "Compreenda o contexto histórico e os fundamentos da maior reforma tributária do Brasil.",
        objectives: [
          "Entender o contexto histórico da tributação brasileira",
          "Identificar os problemas do sistema atual",
          "Conhecer o cronograma de implementação 2025-2033",
          "Analisar os impactos econômicos esperados"
        ]
      }
    },
    {
      id: 2,
      title: "IVA Dual - Funcionamento Prático",
      duration: "90 min", 
      description: "Domínio técnico do cálculo de IVA Dual, débitos, créditos e mecânica operacional",
      isUnlocked: false,
      content: {
        summary: "Domine a mecânica operacional do IVA Dual brasileiro.",
        objectives: [
          "Calcular IBS e CBS na prática",
          "Entender o sistema de débitos e créditos",
          "Aplicar as regras de não-cumulatividade",
          "Dominar a tributação no destino"
        ]
      }
    },
    {
      id: 3,
      title: "Split Payment na Prática",
      duration: "90 min",
      description: "Implementação e gestão do Split Payment, impactos no fluxo de caixa",
      isUnlocked: false,
      content: {
        summary: "Implemente e gerencie o Split Payment em sua empresa.",
        objectives: [
          "Configurar o sistema de Split Payment",
          "Gerenciar impactos no fluxo de caixa",
          "Otimizar a gestão financeira",
          "Implementar controles internos"
        ]
      }
    },
    {
      id: 4,
      title: "Planejamento Tributário na Nova Era",
      duration: "90 min",
      description: "Estratégias de otimização fiscal no novo sistema tributário",
      isUnlocked: false,
      content: {
        summary: "Desenvolva estratégias de planejamento tributário para o novo sistema.",
        objectives: [
          "Identificar oportunidades de otimização",
          "Desenvolver estratégias de transição",
          "Implementar controles de compliance",
          "Maximizar benefícios fiscais"
        ]
      }
    }
  ]

  const quizQuestions = {
    1: [
      {
        question: "Qual é o principal objetivo da Reforma Tributária brasileira aprovada pela Emenda Constitucional 132/2023?",
        options: [
          "A) Aumentar a arrecadação federal em 20%",
          "B) Simplificar o sistema tributário substituindo 5 tributos por 2",
          "C) Reduzir a carga tributária para empresas",
          "D) Eliminar todos os tributos estaduais e municipais",
          "E) Criar novos tributos sobre patrimônio"
        ],
        correct: 1,
        explanation: "A reforma visa simplificar o sistema substituindo PIS, COFINS, IPI, ICMS e ISS por IBS e CBS (IVA Dual)."
      },
      {
        question: "Segundo a Lei Complementar 214/2025, qual será a alíquota de referência do IVA Dual?",
        options: [
          "A) 15,5%",
          "B) 18,2%", 
          "C) 26,5%",
          "D) 22,7%",
          "E) 20,0%"
        ],
        correct: 2,
        explanation: "A alíquota de referência estabelecida é de 26,5%, sendo 8,8% para CBS e 17,7% para IBS."
      },
      {
        question: "Qual é o cronograma de implementação do Split Payment conforme regulamentação de 2025?",
        options: [
          "A) Janeiro de 2026 para todas as empresas",
          "B) Julho de 2026 para grandes empresas, 2027 para demais",
          "C) Janeiro de 2027 para todos os setores",
          "D) Implementação gradual de 2026 a 2029",
          "E) Apenas em 2030 após período de testes"
        ],
        correct: 3,
        explanation: "O Split Payment será implementado gradualmente entre 2026-2029, começando pelas grandes empresas."
      },
      {
        question: "Qual o principal benefício econômico esperado com a eliminação da guerra fiscal?",
        options: [
          "A) Redução de 15% nos preços ao consumidor",
          "B) Aumento de 2-3% no PIB em 15 anos",
          "C) Eliminação total da sonegação fiscal",
          "D) Redução de 50% na burocracia empresarial",
          "E) Aumento de 10% na arrecadação federal"
        ],
        correct: 1,
        explanation: "Estudos indicam potencial aumento de 2-3% no PIB em 15 anos devido à maior eficiência econômica."
      },
      {
        question: "Qual será o impacto da reforma na Zona Franca de Manaus?",
        options: [
          "A) Extinção imediata dos benefícios",
          "B) Manutenção através de crédito presumido até 2073",
          "C) Redução gradual dos incentivos em 10 anos",
          "D) Transferência dos benefícios para outras regiões",
          "E) Conversão em zona econômica especial"
        ],
        correct: 1,
        explanation: "A ZFM terá seus benefícios mantidos através de sistema de crédito presumido até 2073."
      }
    ]
  }

  useEffect(() => {
    // Verificar se a aula 1 deve ser desbloqueada automaticamente
    const lesson1Score = quizScores[1]
    if (lesson1Score >= 70 && !completedLessons.includes(1)) {
      setCompletedLessons([...completedLessons, 1])
      // Desbloquear próxima aula
      lessons[1].isUnlocked = true
    }
  }, [quizScores, completedLessons])

  const handleLessonSelect = (lesson) => {
    if (!lesson.isUnlocked) return
    setSelectedLesson(lesson)
    setShowQuiz(false)
    setShowResources(false)
  }

  const handleQuizComplete = (score) => {
    setQuizScores({...quizScores, [selectedLesson.id]: score})
    if (score >= 70) {
      setCompletedLessons([...completedLessons, selectedLesson.id])
      // Desbloquear próxima aula
      const nextLessonIndex = lessons.findIndex(l => l.id === selectedLesson.id) + 1
      if (nextLessonIndex < lessons.length) {
        lessons[nextLessonIndex].isUnlocked = true
      }
    }
  }

  const calculateProgress = () => {
    return Math.round((completedLessons.length / lessons.length) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Reforma Tributária: IVA Dual e Split Payment na Prática
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Curso intensivo e prático para dominar as principais mudanças da reforma tributária brasileira
          </p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-blue-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{calculateProgress()}%</div>
              <div className="text-sm text-blue-800">Progresso Geral</div>
            </div>
            <div className="bg-green-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">6 horas</div>
              <div className="text-sm text-green-800">Duração Total</div>
            </div>
            <div className="bg-purple-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">4</div>
              <div className="text-sm text-purple-800">Aulas Práticas</div>
            </div>
            <div className="bg-orange-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">16</div>
              <div className="text-sm text-orange-800">Recursos</div>
            </div>
            <div className="bg-red-100 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">40h</div>
              <div className="text-sm text-red-800">Certificação</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lesson List */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Conteúdo do Curso</h2>
            <div className="space-y-4">
              {lessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    lesson.isUnlocked
                      ? selectedLesson?.id === lesson.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                  }`}
                  onClick={() => handleLessonSelect(lesson)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        lesson.isUnlocked ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500'
                      }`}>
                        {lesson.isUnlocked ? lesson.id : <Lock size={16} />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                          <Clock size={14} />
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                    {completedLessons.includes(lesson.id) && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{lesson.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedLesson ? (
                <motion.div
                  key={selectedLesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  {/* Lesson Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedLesson.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{selectedLesson.content.summary}</p>
                    
                    {/* Objectives */}
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-blue-900 mb-2">Objetivos de Aprendizagem:</h3>
                      <ul className="space-y-1">
                        {selectedLesson.content.objectives.map((objective, index) => (
                          <li key={index} className="text-blue-800 text-sm flex items-start">
                            <CheckCircle size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <button
                      onClick={() => setShowResources(!showResources)}
                      className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <Play size={20} />
                      <span>Recursos da Aula</span>
                    </button>
                    
                    <button
                      onClick={() => setShowQuiz(!showQuiz)}
                      className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <FileText size={20} />
                      <span>Iniciar Quiz</span>
                    </button>
                    
                    <div className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-600 px-4 py-3 rounded-lg">
                      <Award size={20} />
                      <span>
                        {quizScores[selectedLesson.id] ? `Nota: ${quizScores[selectedLesson.id]}%` : 'Não avaliado'}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Content */}
                  <AnimatePresence>
                    {showResources && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6"
                      >
                        <InteractiveResources lessonId={selectedLesson.id} />
                      </motion.div>
                    )}

                    {showQuiz && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <Quiz
                          questions={quizQuestions[selectedLesson.id] || []}
                          onComplete={handleQuizComplete}
                          lessonTitle={selectedLesson.title}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-lg shadow-lg p-8 text-center"
                >
                  <BarChart3 size={64} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Selecione uma aula para começar
                  </h3>
                  <p className="text-gray-600">
                    Escolha uma aula na lista ao lado para acessar o conteúdo, recursos e quiz.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePage

