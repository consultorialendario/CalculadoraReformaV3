import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TaxCalculatorComplete from './TaxCalculatorComplete'
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  BarChart3,
  Download,
  RefreshCw,
  Info,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  FileText,
  Zap
} from 'lucide-react'

const SimulatorsPage = () => {
  // Estados para os simuladores
  const [regimeData, setRegimeData] = useState({
    faturamento: 2400000,
    atividade: 'comercio',
    gastos: 1440000,
    percentualB2B: 70,
    funcionarios: 25,
    estado: 'SP'
  })

  const [simuladorRapido, setSimuladorRapido] = useState({
    receita: 500000,
    setor: 'comercio',
    porte: 'pequeno'
  })

  const [resultadoRapido, setResultadoRapido] = useState(null)

  // ========= 🔥 SIMULADOR RÁPIDO MELHORADO =========
  const calcularSimuladorRapido = () => {
    const receita = parseFloat(simuladorRapido.receita) || 0
    
    // Alíquotas por setor (estimativas baseadas na reforma)
    const aliquotasAtuais = {
      comercio: 12.5,
      industria: 11.8, 
      servicos: 14.2,
      tecnologia: 13.5,
      saude: 10.5,
      educacao: 9.8
    }

    // Benefícios estimados por setor
    const beneficiosSetor = {
      comercio: { cestaBasica: 0.25, medicamentos: 0.10, demais: 0.65 },
      industria: { agropecuario: 0.30, medicamentos: 0.15, demais: 0.55 },
      servicos: { saude: 0.20, profissionais: 0.30, demais: 0.50 },
      tecnologia: { profissionais: 0.60, demais: 0.40 },
      saude: { medicamentos: 0.70, profissionais: 0.30 },
      educacao: { educacao: 0.80, demais: 0.20 }
    }

    const aliquotaAtual = aliquotasAtuais[simuladorRapido.setor] || 13.0
    const impostoAtual = receita * (aliquotaAtual / 100)

    // Cálculo reforma com benefícios específicos
    const beneficios = beneficiosSetor[simuladorRapido.setor] || { demais: 1.0 }
    let impostoReforma = 0

    Object.entries(beneficios).forEach(([categoria, percentual]) => {
      const valorCategoria = receita * percentual
      let aliquotaEfetiva = 27.97

      switch(categoria) {
        case 'cestaBasica':
          aliquotaEfetiva = 0 // Alíquota zero
          break
        case 'medicamentos':
        case 'agropecuario':
        case 'saude':
        case 'educacao':
          aliquotaEfetiva = 27.97 * 0.4 // 60% de redução
          break
        case 'profissionais':
          aliquotaEfetiva = 27.97 * 0.7 // 30% de redução
          break
        default:
          aliquotaEfetiva = 27.97 // Alíquota padrão
      }

      impostoReforma += valorCategoria * (aliquotaEfetiva / 100)
    })

    const diferenca = impostoReforma - impostoAtual
    const percentualImpacto = impostoAtual > 0 ? (diferenca / impostoAtual) * 100 : 0

    // Split Payment impact
    const impactoSplit = receita * 0.2797 * 2.5 / 100 // Custo financeiro estimado
    const impactoFinal = diferenca + impactoSplit

    setResultadoRapido({
      receita,
      impostoAtual,
      impostoReforma,
      diferenca,
      percentualImpacto,
      impactoSplit,
      impactoFinal,
      beneficiosDetalhados: beneficios,
      cargaAtual: aliquotaAtual,
      cargaReforma: (impostoReforma / receita) * 100
    })
  }

  // Cálculos Comparação de Regimes
  const compararRegimes = () => {
    // Simples Nacional (simplificado)
    let aliquotaSimples
    if (regimeData.atividade === 'comercio') {
      if (regimeData.faturamento <= 1800000) aliquotaSimples = 10.7
      else if (regimeData.faturamento <= 3600000) aliquotaSimples = 14.3
      else aliquotaSimples = 19.0
    } else if (regimeData.atividade === 'industria') {
      if (regimeData.faturamento <= 1800000) aliquotaSimples = 11.2
      else if (regimeData.faturamento <= 3600000) aliquotaSimples = 14.7
      else aliquotaSimples = 30.0
    } else {
      if (regimeData.faturamento <= 1800000) aliquotaSimples = 16.0
      else if (regimeData.faturamento <= 3600000) aliquotaSimples = 21.0
      else aliquotaSimples = 33.0
    }

    const tributosSimples = regimeData.faturamento * (aliquotaSimples / 100)
    const debitosIVA = regimeData.faturamento * 0.2797
    const creditosIVA = regimeData.gastos * 0.2797
    const tributosIVA = debitosIVA - creditosIVA
    const diferenca = tributosIVA - tributosSimples

    return { tributosSimples, tributosIVA, diferenca, aliquotaSimples }
  }

  const resultadosRegimes = compararRegimes()

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Simplificado */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950 dark:via-background dark:to-blue-950 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Ferramentas Interativas v3.0
            </Badge>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Simuladores da Reforma Tributária
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ferramentas práticas para calcular, simular e comparar cenários da nova tributação brasileira com SPED Real
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Simulators */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="calculadora" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculadora" className="flex items-center space-x-2">
                <Calculator className="h-4 w-4" />
                <span>Calculadora Completa</span>
              </TabsTrigger>
              <TabsTrigger value="rapido" className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Simulador Rápido</span>
              </TabsTrigger>
              <TabsTrigger value="regimes" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Comparador de Regimes</span>
              </TabsTrigger>
            </TabsList>

            {/* Tax Calculator Complete */}
            <TabsContent value="calculadora" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    <span>Calculadora Completa da Reforma Tributária v3.0</span>
                    <Badge className="bg-green-100 text-green-800">SPED Real + IA</Badge>
                  </CardTitle>
                  <CardDescription>
                    Análise profissional com upload de arquivos SPED, benefícios específicos por NCM/código e IA personalizada
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-800 mb-2">✨ Novidades da Versão 3.0:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
                      <div>• 📊 Parser SPED Real (EFD ICMS/IPI + EFD-Contribuições)</div>
                      <div>• 🎯 Benefícios específicos por NCM/código LC 116/03</div>
                      <div>• 🤖 IA personalizada por empresa</div>
                      <div>• 📈 Relatórios HTML + Excel com gráficos</div>
                      <div>• 💳 Análise detalhada Split Payment</div>
                      <div>• ✅ Validação cruzada automática</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <TaxCalculatorComplete />
            </TabsContent>

            {/* Quick Simulator */}
            <TabsContent value="rapido" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Simulador Rápido com Benefícios</span>
                  </CardTitle>
                  <CardDescription>
                    Análise rápida considerando benefícios específicos por setor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="receita-rapido">Receita Anual (R$)</Label>
                        <Input
                          id="receita-rapido"
                          type="number"
                          value={simuladorRapido.receita}
                          onChange={(e) => setSimuladorRapido({...simuladorRapido, receita: Number(e.target.value)})}
                          className="mt-1 bg-white"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="setor-rapido">Setor de Atividade</Label>
                        <Select 
                          value={simuladorRapido.setor} 
                          onValueChange={(value) => setSimuladorRapido({...simuladorRapido, setor: value})}
                        >
                          <SelectTrigger className="mt-1 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="comercio">🛒 Comércio</SelectItem>
                            <SelectItem value="industria">🏭 Indústria</SelectItem>
                            <SelectItem value="servicos">🏢 Serviços</SelectItem>
                            <SelectItem value="tecnologia">💻 Tecnologia</SelectItem>
                            <SelectItem value="saude">🏥 Saúde</SelectItem>
                            <SelectItem value="educacao">🎓 Educação</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="porte-rapido">Porte da Empresa</Label>
                        <Select 
                          value={simuladorRapido.porte} 
                          onValueChange={(value) => setSimuladorRapido({...simuladorRapido, porte: value})}
                        >
                          <SelectTrigger className="mt-1 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="micro">Microempresa</SelectItem>
                            <SelectItem value="pequeno">Pequeno Porte</SelectItem>
                            <SelectItem value="medio">Médio Porte</SelectItem>
                            <SelectItem value="grande">Grande Porte</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button onClick={calcularSimuladorRapido} className="w-full bg-blue-600 hover:bg-blue-700">
                        <Zap className="mr-2 h-4 w-4" />
                        Calcular Impacto Rápido
                      </Button>

                      <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Info className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-purple-800 dark:text-purple-200">
                            <strong>Benefícios Considerados:</strong> Este simulador aplica automaticamente 
                            os benefícios específicos da reforma por setor (cesta básica, medicamentos, 
                            serviços de saúde/educação, profissionais liberais).
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="space-y-4">
                      {resultadoRapido ? (
                        <>
                          <h4 className="font-semibold">Análise Rápida - {simuladorRapido.setor}</h4>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                              <span className="font-medium">Sistema Atual:</span>
                              <span className="font-bold text-orange-600">
                                {formatCurrency(resultadoRapido.impostoAtual)}
                                <div className="text-xs">({resultadoRapido.cargaAtual}%)</div>
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                              <span className="font-medium">Reforma (com benefícios):</span>
                              <span className="font-bold text-purple-600">
                                {formatCurrency(resultadoRapido.impostoReforma)}
                                <div className="text-xs">({resultadoRapido.cargaReforma.toFixed(2)}%)</div>
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                              <span className="font-medium">Impacto Split Payment:</span>
                              <span className="font-bold text-red-600">
                                +{formatCurrency(resultadoRapido.impactoSplit)}
                                <div className="text-xs">Custo financeiro</div>
                              </span>
                            </div>
                            
                            <div className={`flex justify-between items-center p-3 rounded-lg ${
                              resultadoRapido.impactoFinal < 0 ? 'bg-green-50' : 'bg-red-50'
                            }`}>
                              <span className="font-medium">Impacto Final:</span>
                              <span className={`font-bold ${
                                resultadoRapido.impactoFinal < 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {resultadoRapido.impactoFinal < 0 ? '' : '+'}{formatCurrency(resultadoRapido.impactoFinal)}
                                <div className="text-xs">
                                  ({((resultadoRapido.impactoFinal / resultadoRapido.impostoAtual) * 100).toFixed(1)}%)
                                </div>
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                              <span className="font-medium">Recomendação:</span>
                              <span className="font-bold text-primary">
                                {resultadoRapido.impactoFinal < 0 ? 'FAVORÁVEL' : 'PREPARAR-SE'}
                              </span>
                            </div>
                          </div>

                          {/* Detalhamento dos Benefícios */}
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <h5 className="font-semibold text-blue-800 mb-2">Benefícios Aplicados:</h5>
                            <div className="text-sm text-blue-700 space-y-1">
                              {Object.entries(resultadoRapido.beneficiosDetalhados).map(([categoria, percentual]) => (
                                <div key={categoria} className="flex justify-between">
                                  <span>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}:</span>
                                  <span>{(percentual * 100).toFixed(0)}% da receita</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Button className="w-full" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Relatório Detalhado
                          </Button>
                        </>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-8 text-center">
                          <div className="text-gray-400 mb-4">
                            <Zap className="mx-auto h-12 w-12" />
                          </div>
                          <p className="text-gray-500">
                            Preencha os dados acima e clique em "Calcular Impacto Rápido"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Regime Comparator */}
            <TabsContent value="regimes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Comparador de Regimes Tributários</span>
                  </CardTitle>
                  <CardDescription>
                    Compare Simples Nacional vs IVA Dual para escolher o melhor regime
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="faturamento-regime">Faturamento Anual (R$)</Label>
                        <Input
                          id="faturamento-regime"
                          type="number"
                          value={regimeData.faturamento}
                          onChange={(e) => setRegimeData({...regimeData, faturamento: Number(e.target.value)})}
                          className="mt-1 bg-white"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="atividade-regime">Atividade Principal</Label>
                        <Select 
                          value={regimeData.atividade} 
                          onValueChange={(value) => setRegimeData({...regimeData, atividade: value})}
                        >
                          <SelectTrigger className="mt-1 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="comercio">Comércio</SelectItem>
                            <SelectItem value="industria">Indústria</SelectItem>
                            <SelectItem value="servicos">Serviços</SelectItem>
                            <SelectItem value="consultoria">Consultoria</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="gastos-regime">Gastos Anuais Elegíveis (R$)</Label>
                        <Input
                          id="gastos-regime"
                          type="number"
                          value={regimeData.gastos}
                          onChange={(e) => setRegimeData({...regimeData, gastos: Number(e.target.value)})}
                          className="mt-1 bg-white"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="b2b-regime">% Vendas B2B</Label>
                        <Input
                          id="b2b-regime"
                          type="number"
                          value={regimeData.percentualB2B}
                          onChange={(e) => setRegimeData({...regimeData, percentualB2B: Number(e.target.value)})}
                          className="mt-1 bg-white"
                          min="0"
                          max="100"
                        />
                      </div>

                      <div>
                        <Label htmlFor="funcionarios-regime">Número de Funcionários</Label>
                        <Input
                          id="funcionarios-regime"
                          type="number"
                          value={regimeData.funcionarios}
                          onChange={(e) => setRegimeData({...regimeData, funcionarios: Number(e.target.value)})}
                          className="mt-1 bg-white"
                        />
                      </div>

                      <div>
                        <Label htmlFor="estado-regime">Estado Principal</Label>
                        <Select 
                          value={regimeData.estado} 
                          onValueChange={(value) => setRegimeData({...regimeData, estado: value})}
                        >
                          <SelectTrigger className="mt-1 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SP">São Paulo</SelectItem>
                            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                            <SelectItem value="MG">Minas Gerais</SelectItem>
                            <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                            <SelectItem value="PR">Paraná</SelectItem>
                            <SelectItem value="SC">Santa Catarina</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-purple-800 dark:text-purple-200">
                            <strong>Dica:</strong> IVA Dual é geralmente mais vantajoso para empresas B2B 
                            com muitos gastos elegíveis a crédito. Considere também o impacto do Split Payment.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Results */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Comparação Anual</h4>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="font-medium">Simples Nacional:</span>
                          <span className="font-bold text-blue-600">
                            {formatCurrency(resultadosRegimes.tributosSimples)}
                            <div className="text-xs">Alíq: {resultadosRegimes.aliquotaSimples}%</div>
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <span className="font-medium">IVA Dual (Líquido):</span>
                          <span className="font-bold text-purple-600">
                            {formatCurrency(resultadosRegimes.tributosIVA)}
                            <div className="text-xs">Com créditos</div>
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <span className="font-medium">Split Payment (custo):</span>
                          <span className="font-bold text-red-600">
                            +{formatCurrency(regimeData.faturamento * 0.2797 * 0.025)}
                            <div className="text-xs">2,5% a.a. sobre retido</div>
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <span className="font-medium">Diferença Final:</span>
                          <span className={`font-bold ${resultadosRegimes.diferenca < 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {formatCurrency(resultadosRegimes.diferenca + (regimeData.faturamento * 0.2797 * 0.025))}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                          <span className="font-medium">Regime Recomendado:</span>
                          <span className="font-bold text-primary">
                            {resultadosRegimes.diferenca < -(regimeData.faturamento * 0.2797 * 0.025) ? 'IVA Dual' : 'Simples Nacional'}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground space-y-2 bg-gray-50 p-3 rounded">
                        <p><strong>Análise Considerada:</strong></p>
                        <p>• Créditos estimados: R$ {(regimeData.gastos * 0.2797).toLocaleString('pt-BR')}</p>
                        <p>• Impacto Split Payment incluído</p>
                        <p>• Percentual B2B: {regimeData.percentualB2B}%</p>
                        <p>• Porte: {regimeData.funcionarios} funcionários</p>
                      </div>

                      <Button className="w-full" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Relatório Comparativo Completo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action para Calculadora Completa */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-white space-y-6"
          >
            <h2 className="text-3xl font-bold">
              Precisa de uma Análise Mais Profunda?
            </h2>
            <p className="text-xl opacity-90">
              Use nossa Calculadora Completa com upload de arquivos SPED e análise personalizada por IA
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span>Upload SPED Real</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span>Benefícios por NCM</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span>IA Personalizada</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4" />
                <span>Relatórios Executivos</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              onClick={() => {
                // Scroll para a calculadora completa
                const calculadoraTab = document.querySelector('[value="calculadora"]');
                if (calculadoraTab) {
                  calculadoraTab.click();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <Calculator className="mr-2 h-5 w-5" />
              Acessar Calculadora Completa
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default SimulatorsPage