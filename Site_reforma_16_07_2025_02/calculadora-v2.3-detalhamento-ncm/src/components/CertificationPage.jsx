import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, CheckCircle, XCircle, Download, Share2, Calendar, Award, Star, Target } from 'lucide-react'

const CertificationPage = () => {
  const [progress, setProgress] = useState({})
  const [overallScore, setOverallScore] = useState(0)
  const [certificateGenerated, setCertificateGenerated] = useState(false)
  const [studentName, setStudentName] = useState('')

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}')
    const savedName = localStorage.getItem('studentName') || ''
    setProgress(savedProgress)
    setStudentName(savedName)
    
    // Calcular nota geral
    const quizScores = Object.keys(savedProgress)
      .filter(key => key.startsWith('quiz_') && savedProgress[key].completed)
      .map(key => savedProgress[key].score)
    
    if (quizScores.length > 0) {
      const average = quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length
      setOverallScore(Math.round(average))
    }
    
    // Verificar se pode gerar certificado
    const allQuizzesCompleted = [1, 2, 3, 4].every(lessonId => 
      savedProgress[`quiz_${lessonId}`] && 
      savedProgress[`quiz_${lessonId}`].completed && 
      savedProgress[`quiz_${lessonId}`].score >= 70
    )
    
    setCertificateGenerated(allQuizzesCompleted && overallScore >= 70)
  }, [overallScore])

  const requirements = [
    {
      id: 'lessons',
      title: 'Conclusão das Aulas',
      description: 'Complete todas as 4 aulas do curso',
      icon: <CheckCircle className="w-5 h-5" />,
      getProgress: () => {
        const completedLessons = [1, 2, 3, 4].filter(lessonId => 
          progress[`quiz_${lessonId}`] && progress[`quiz_${lessonId}`].completed
        ).length
        return { current: completedLessons, total: 4 }
      }
    },
    {
      id: 'quizzes',
      title: 'Aprovação nos Quizzes',
      description: 'Obtenha nota mínima de 70% em cada quiz',
      icon: <Target className="w-5 h-5" />,
      getProgress: () => {
        const approvedQuizzes = [1, 2, 3, 4].filter(lessonId => 
          progress[`quiz_${lessonId}`] && 
          progress[`quiz_${lessonId}`].completed && 
          progress[`quiz_${lessonId}`].score >= 70
        ).length
        return { current: approvedQuizzes, total: 4 }
      }
    },
    {
      id: 'simulators',
      title: 'Uso dos Simuladores',
      description: 'Utilize todos os simuladores práticos',
      icon: <Star className="w-5 h-5" />,
      getProgress: () => {
        // Simular uso dos simuladores (pode ser implementado com tracking real)
        const usedSimulators = progress.simulatorsUsed || 0
        return { current: Math.min(usedSimulators, 3), total: 3 }
      }
    },
    {
      id: 'overall',
      title: 'Nota Geral',
      description: 'Mantenha média geral de 70% ou superior',
      icon: <Award className="w-5 h-5" />,
      getProgress: () => {
        return { current: overallScore, total: 100, isPercentage: true }
      }
    }
  ]

  const handleNameChange = (name) => {
    setStudentName(name)
    localStorage.setItem('studentName', name)
  }

  const generateCertificate = () => {
    if (!studentName.trim()) {
      alert('Por favor, insira seu nome para gerar o certificado.')
      return
    }
    
    // Simular geração de certificado
    const certificateData = {
      studentName: studentName.trim(),
      courseName: 'Reforma Tributária: IVA Dual e Split Payment na Prática',
      completionDate: new Date().toLocaleDateString('pt-BR'),
      score: overallScore,
      certificateId: `RT-${Date.now()}`,
      hours: 40
    }
    
    localStorage.setItem('certificate', JSON.stringify(certificateData))
    
    // Criar e baixar certificado (simulado)
    const certificateHTML = generateCertificateHTML(certificateData)
    downloadCertificate(certificateHTML, certificateData.certificateId)
  }

  const generateCertificateHTML = (data) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Certificado - ${data.studentName}</title>
        <style>
            body { 
                font-family: 'Georgia', serif; 
                margin: 0; 
                padding: 40px; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .certificate {
                background: white;
                padding: 60px;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                text-align: center;
                max-width: 800px;
                border: 8px solid #2563eb;
                position: relative;
            }
            .certificate::before {
                content: '';
                position: absolute;
                top: 20px;
                left: 20px;
                right: 20px;
                bottom: 20px;
                border: 2px solid #3b82f6;
                border-radius: 12px;
            }
            .header { color: #1e40af; margin-bottom: 30px; }
            .title { font-size: 48px; font-weight: bold; margin: 20px 0; color: #1e40af; }
            .subtitle { font-size: 24px; color: #374151; margin-bottom: 40px; }
            .student-name { 
                font-size: 36px; 
                font-weight: bold; 
                color: #059669; 
                margin: 30px 0;
                text-decoration: underline;
                text-decoration-color: #10b981;
            }
            .course-name { 
                font-size: 28px; 
                color: #1f2937; 
                margin: 30px 0;
                font-style: italic;
            }
            .details { 
                display: flex; 
                justify-content: space-around; 
                margin: 40px 0;
                flex-wrap: wrap;
            }
            .detail-item { 
                text-align: center; 
                margin: 10px;
            }
            .detail-value { 
                font-size: 24px; 
                font-weight: bold; 
                color: #2563eb; 
            }
            .detail-label { 
                font-size: 14px; 
                color: #6b7280; 
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .footer { 
                margin-top: 50px; 
                padding-top: 30px; 
                border-top: 2px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
            }
            .certificate-id {
                position: absolute;
                bottom: 20px;
                right: 30px;
                font-size: 12px;
                color: #9ca3af;
            }
            .seal {
                position: absolute;
                top: 30px;
                right: 30px;
                width: 80px;
                height: 80px;
                background: #2563eb;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 12px;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="certificate">
            <div class="seal">CERTIFICADO<br>DIGITAL</div>
            
            <div class="header">
                <h1 style="margin: 0; font-size: 32px;">CERTIFICADO DE CONCLUSÃO</h1>
            </div>
            
            <div class="title">Reforma Tributária</div>
            <div class="subtitle">IVA Dual e Split Payment na Prática</div>
            
            <p style="font-size: 18px; color: #374151; margin: 30px 0;">
                Certificamos que
            </p>
            
            <div class="student-name">${data.studentName}</div>
            
            <p style="font-size: 18px; color: #374151; margin: 30px 0;">
                concluiu com aproveitamento o curso intensivo sobre a Reforma Tributária Brasileira,
                demonstrando competência técnica em IVA Dual, Split Payment e planejamento tributário estratégico.
            </p>
            
            <div class="details">
                <div class="detail-item">
                    <div class="detail-value">${data.hours}h</div>
                    <div class="detail-label">Carga Horária</div>
                </div>
                <div class="detail-item">
                    <div class="detail-value">${data.score}%</div>
                    <div class="detail-label">Nota Final</div>
                </div>
                <div class="detail-item">
                    <div class="detail-value">${data.completionDate}</div>
                    <div class="detail-label">Data de Conclusão</div>
                </div>
            </div>
            
            <div class="footer">
                <p>Este certificado atesta a conclusão do curso com aproveitamento satisfatório,<br>
                validando conhecimentos em Reforma Tributária aplicáveis a partir de 2026.</p>
                
                <p style="margin-top: 20px;">
                    <strong>Competências Certificadas:</strong><br>
                    Cálculo de IVA Dual • Implementação de Split Payment • Planejamento Tributário Estratégico
                </p>
            </div>
            
            <div class="certificate-id">
                ID: ${data.certificateId}
            </div>
        </div>
    </body>
    </html>
    `
  }

  const downloadCertificate = (html, certificateId) => {
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Certificado_Reforma_Tributaria_${certificateId}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getOverallProgress = () => {
    const totalRequirements = requirements.length
    const completedRequirements = requirements.filter(req => {
      const progress = req.getProgress()
      if (req.id === 'overall') {
        return progress.current >= 70
      }
      return progress.current === progress.total
    }).length
    
    return Math.round((completedRequirements / totalRequirements) * 100)
  }

  const canGenerateCertificate = () => {
    return requirements.every(req => {
      const progress = req.getProgress()
      if (req.id === 'overall') {
        return progress.current >= 70
      }
      return progress.current === progress.total
    }) && studentName.trim()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Certificação em Reforma Tributária
            </h1>
            <p className="text-gray-600">
              Torne-se um especialista certificado em IVA Dual e Split Payment
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progresso Geral */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Progresso Geral</h2>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{getOverallProgress()}%</div>
              <div className="text-sm text-gray-600">Completo</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getOverallProgress()}%` }}
            />
          </div>
          
          <p className="text-gray-600 text-center">
            Continue completando os requisitos para obter sua certificação profissional
          </p>
        </div>

        {/* Requisitos */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Requisitos para Certificação</h2>
          
          <div className="space-y-6">
            {requirements.map((requirement) => {
              const progress = requirement.getProgress()
              const isCompleted = requirement.id === 'overall' 
                ? progress.current >= 70 
                : progress.current === progress.total
              
              return (
                <div key={requirement.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : requirement.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{requirement.title}</h3>
                        <span className={`text-sm font-medium ${
                          isCompleted ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {progress.isPercentage 
                            ? `${progress.current}%`
                            : `${progress.current}/${progress.total}`
                          }
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-3">{requirement.description}</p>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isCompleted ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ 
                            width: `${progress.isPercentage 
                              ? Math.min(progress.current, 100) 
                              : (progress.current / progress.total) * 100
                            }%` 
                          }}
                        />
                      </div>
                      
                      {/* Detalhes específicos por requisito */}
                      {requirement.id === 'quizzes' && (
                        <div className="mt-3 grid grid-cols-4 gap-2">
                          {[1, 2, 3, 4].map(lessonId => {
                            const quiz = progress[`quiz_${lessonId}`]
                            const passed = quiz && quiz.completed && quiz.score >= 70
                            
                            return (
                              <div key={lessonId} className={`text-xs p-2 rounded text-center ${
                                passed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                              }`}>
                                Aula {lessonId}: {quiz ? `${quiz.score}%` : 'Pendente'}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Geração de Certificado */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Seu Certificado
          </h2>
          
          {canGenerateCertificate() ? (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Parabéns! Você concluiu o curso com sucesso!
                </h3>
                <p className="text-green-700">
                  Nota final: <strong>{overallScore}%</strong> • 
                  Todos os requisitos foram atendidos
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome para o Certificado
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="w-full max-w-md mx-auto p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button
                onClick={generateCertificate}
                disabled={!studentName.trim()}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center gap-2 mx-auto"
              >
                <Download className="w-5 h-5" />
                Gerar Certificado
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <XCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Certificado não disponível
                </h3>
                <p className="text-yellow-700">
                  Complete todos os requisitos acima para gerar seu certificado
                </p>
              </div>
              
              <div className="text-left max-w-md mx-auto">
                <h4 className="font-semibold mb-3">Ainda falta:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {requirements.filter(req => {
                    const progress = req.getProgress()
                    if (req.id === 'overall') {
                      return progress.current < 70
                    }
                    return progress.current < progress.total
                  }).map(req => (
                    <li key={req.id} className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      {req.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Características do Certificado */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h2 className="text-xl font-bold mb-6">Características do Certificado</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Award className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-900 mb-2">Certificado Digital</h3>
              <p className="text-sm text-blue-700">
                Documento oficial com ID único para verificação de autenticidade
              </p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Calendar className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-green-900 mb-2">40 Horas Equivalentes</h3>
              <p className="text-sm text-green-700">
                Certificação reconhecida com carga horária equivalente a 40 horas
              </p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Star className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-purple-900 mb-2">Reconhecimento Profissional</h3>
              <p className="text-sm text-purple-700">
                Válido para comprovação de capacitação em Reforma Tributária
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-3">Competências Certificadas:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Calcular tributos no sistema IVA Dual
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Implementar estratégias de Split Payment
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Desenvolver planejamento tributário estratégico
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Orientar clientes sobre transição tributária
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificationPage

