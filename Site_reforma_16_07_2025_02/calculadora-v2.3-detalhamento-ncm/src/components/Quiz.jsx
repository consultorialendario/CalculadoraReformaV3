import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react'

const Quiz = ({ lessonId, questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutos por quiz

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleFinishQuiz()
    }
  }, [timeLeft, showResults])

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    })
  }

  const handleFinishQuiz = () => {
    let correctAnswers = 0
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })
    
    const finalScore = Math.round((correctAnswers / questions.length) * 100)
    setScore(finalScore)
    setShowResults(true)
    
    // Salvar progresso no localStorage
    const progress = JSON.parse(localStorage.getItem('courseProgress') || '{}')
    progress[`quiz_${lessonId}`] = {
      score: finalScore,
      completed: true,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('courseProgress', JSON.stringify(progress))
    
    if (onComplete) {
      onComplete(finalScore)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setShowResults(false)
    setScore(0)
    setTimeLeft(300)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto"
      >
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            score >= 70 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {score >= 70 ? <Trophy className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
          </div>
          
          <h3 className="text-2xl font-bold mb-2">
            {score >= 70 ? 'Parabéns! Você foi aprovado!' : 'Não foi dessa vez...'}
          </h3>
          
          <div className="text-4xl font-bold mb-4 text-blue-600">
            {score}%
          </div>
          
          <p className="text-gray-600 mb-6">
            Você acertou {questions.filter((_, index) => selectedAnswers[index] === questions[index].correctAnswer).length} de {questions.length} questões
          </p>
          
          {score >= 70 ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800">
                ✅ Quiz concluído com sucesso! Você pode prosseguir para a próxima aula.
              </p>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">
                ❌ Nota mínima necessária: 70%. Revise o conteúdo e tente novamente.
              </p>
            </div>
          )}
          
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={index} className="text-left bg-gray-50 rounded-lg p-4">
                <p className="font-medium mb-2">{question.question}</p>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className={`p-2 rounded ${
                      optionIndex === question.correctAnswer 
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : selectedAnswers[index] === optionIndex
                        ? 'bg-red-100 text-red-800 border border-red-300'
                        : 'bg-white'
                    }`}>
                      {optionIndex === question.correctAnswer && <CheckCircle className="inline w-4 h-4 mr-2" />}
                      {selectedAnswers[index] === optionIndex && optionIndex !== question.correctAnswer && <XCircle className="inline w-4 h-4 mr-2" />}
                      {option}
                    </div>
                  ))}
                </div>
                {question.explanation && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                    <p className="text-sm text-blue-800">
                      <strong>Explicação:</strong> {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {score < 70 && (
            <button
              onClick={resetQuiz}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <RotateCcw className="w-4 h-4" />
              Tentar Novamente
            </button>
          )}
        </div>
      </motion.div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto"
    >
      {/* Header com progresso e timer */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600">
            Questão {currentQuestion + 1} de {questions.length}
          </span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className={`text-sm font-medium px-3 py-1 rounded-full ${
          timeLeft < 60 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
        }`}>
          ⏱️ {formatTime(timeLeft)}
        </div>
      </div>

      {/* Questão */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswerSelect(currentQuestion, index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswers[currentQuestion] === index && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Navegação */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Anterior
        </button>
        
        {currentQuestion === questions.length - 1 ? (
          <button
            onClick={handleFinishQuiz}
            disabled={Object.keys(selectedAnswers).length !== questions.length}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Finalizar Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Próxima →
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default Quiz

