import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Calculator, ExternalLink, Zap } from 'lucide-react';

const TaxCalculator = () => {
  const [formData, setFormData] = useState({
    faturamento: '',
    setor: 'comercio',
    regime: 'lucro_real',
    estado: 'SP',
    funcionarios: '',
    margem: ''
  });

  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  // ========= 🔥 ALÍQUOTAS CORRIGIDAS COM BENEFÍCIOS =========
  const aliquotasPorSetor = {
    comercio: { 
      atual: 12.5, 
      novaEstimada: 21.8, // Considerando mix com cesta básica
      beneficios: {
        cestaBasica: 0.25,
        medicamentos: 0.10,
        demais: 0.65
      }
    },
    industria: { 
      atual: 11.8, 
      novaEstimada: 18.9, // Considerando insumos agropecuários
      beneficios: {
        agropecuario: 0.30,
        medicamentos: 0.15,
        demais: 0.55
      }
    },
    servicos: { 
      atual: 14.2, 
      novaEstimada: 22.3, // Considerando serviços profissionais
      beneficios: {
        saude: 0.20,
        profissionais: 0.30,
        demais: 0.50
      }
    },
    tecnologia: { 
      atual: 13.5, 
      novaEstimada: 23.8, // Principalmente profissionais liberais
      beneficios: {
        profissionais: 0.60,
        demais: 0.40
      }
    },
    saude: { 
      atual: 10.5, 
      novaEstimada: 11.2, // Grande benefício com 60% redução
      beneficios: {
        medicamentos: 0.40,
        servicos_saude: 0.50,
        demais: 0.10
      }
    },
    educacao: { 
      atual: 9.8, 
      novaEstimada: 8.4, // Benefício de 60% redução
      beneficios: {
        servicos_educacao: 0.80,
        demais: 0.20
      }
    }
  };

  // Benefícios por regime
  const beneficiosPorRegime = {
    simples_nacional: { 
      reducaoEstimada: 0.15,
      descricao: "Redução estimada por manter simplicidade"
    },
    lucro_presumido: { 
      reducaoEstimada: 0.05,
      descricao: "Redução limitada - considerar migração"
    },
    lucro_real: { 
      reducaoEstimada: 0.02,
      descricao: "Aproveitamento integral de créditos"
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calcularImpacto = () => {
    setLoading(true);
    
    setTimeout(() => {
      const faturamento = parseFloat(formData.faturamento) || 0;
      const dadosSetor = aliquotasPorSetor[formData.setor];
      const beneficioRegime = beneficiosPorRegime[formData.regime];
      
      // Cálculo sistema atual
      const impostoAtual = faturamento * (dadosSetor.atual / 100);
      
      // Cálculo novo sistema com benefícios específicos por categoria
      let impostoNovo = 0;
      
      Object.entries(dadosSetor.beneficios).forEach(([categoria, percentual]) => {
        const valorCategoria = faturamento * percentual;
        let aliquotaEfetiva = 27.97;
        
        // Aplicar benefícios específicos
        switch(categoria) {
          case 'cestaBasica':
            aliquotaEfetiva = 0; // Alíquota zero
            break;
          case 'medicamentos':
          case 'agropecuario':
          case 'servicos_saude':
          case 'servicos_educacao':
            aliquotaEfetiva = 27.97 * 0.4; // 60% de redução
            break;
          case 'profissionais':
            aliquotaEfetiva = 27.97 * 0.7; // 30% de redução
            break;
          case 'saude':
            aliquotaEfetiva = 27.97 * 0.4; // 60% de redução
            break;
          default:
            aliquotaEfetiva = 27.97; // Alíquota padrão
        }
        
        impostoNovo += valorCategoria * (aliquotaEfetiva / 100);
      });
      
      // Aplicar benefício do regime
      impostoNovo *= (1 - beneficioRegime.reducaoEstimada);
      
      // Diferença
      const diferenca = impostoNovo - impostoAtual;
      const percentualDiferenca = ((diferenca / impostoAtual) * 100);
      
      // Split Payment impact (custo financeiro)
      const impactoSplit = faturamento * 0.2797 * 0.025; // 2,5% a.a. sobre valor retido
      
      // Cashback (para empresas menores)
      const cashback = faturamento < 1000000 ? faturamento * 0.001 : 0;
      
      setResultado({
        faturamento,
        impostoAtual,
        impostoNovo,
        diferenca,
        percentualDiferenca,
        impactoSplit,
        cashback,
        impactoFinal: diferenca + impactoSplit - cashback,
        beneficiosAplicados: dadosSetor.beneficios,
        cargaTributariaAtual: (impostoAtual / faturamento) * 100,
        cargaTributariaNova: (impostoNovo / faturamento) * 100
      });
      
      setLoading(false);
    }, 1000);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">
              Calculadora da Reforma Tributária v3.0
            </h3>
            <p className="text-gray-600">
              Simule o impacto da reforma tributária com benefícios específicos
            </p>
          </div>
          <Badge className="bg-yellow-100 text-yellow-800">
            Versão Básica
          </Badge>
        </div>

        {/* Aviso sobre versão completa */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>💡 Análise mais precisa disponível!</strong> Para resultados baseados em dados SPED reais 
                com benefícios específicos por NCM/código, use nossa 
                <strong> Calculadora Completa v3.0</strong> com IA personalizada.
              </p>
              <div className="mt-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Calculator className="mr-2 h-4 w-4" />
                  Acessar Versão Completa
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Formulário */}
        <div className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Faturamento Anual (R$)
            </Label>
            <Input
              type="number"
              name="faturamento"
              value={formData.faturamento}
              onChange={handleInputChange}
              placeholder="Ex: 1000000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Setor de Atividade
            </Label>
            <Select
              name="setor"
              value={formData.setor}
              onValueChange={(value) => setFormData(prev => ({...prev, setor: value}))}
            >
              <SelectTrigger className="w-full">
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
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Regime Tributário
            </Label>
            <Select
              name="regime"
              value={formData.regime}
              onValueChange={(value) => setFormData(prev => ({...prev, regime: value}))}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simples_nacional">Simples Nacional</SelectItem>
                <SelectItem value="lucro_presumido">Lucro Presumido</SelectItem>
                <SelectItem value="lucro_real">Lucro Real</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </Label>
            <Select
              name="estado"
              value={formData.estado}
              onValueChange={(value) => setFormData(prev => ({...prev, estado: value}))}
            >
              <SelectTrigger className="w-full">
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

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Funcionários
            </Label>
            <Input
              type="number"
              name="funcionarios"
              value={formData.funcionarios}
              onChange={handleInputChange}
              placeholder="Ex: 50"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Margem de Lucro (%)
            </Label>
            <Input
              type="number"
              name="margem"
              value={formData.margem}
              onChange={handleInputChange}
              placeholder="Ex: 15"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button
            onClick={calcularImpacto}
            disabled={loading || !formData.faturamento}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Calculando...' : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Calcular Impacto
              </>
            )}
          </Button>
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          {resultado && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Resultado da Simulação - {formData.setor}
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded border">
                  <span className="text-gray-700">Faturamento Anual:</span>
                  <span className="font-semibold text-blue-900">
                    {formatCurrency(resultado.faturamento)}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white rounded border">
                  <span className="text-gray-700">Impostos Atuais:</span>
                  <span className="font-semibold text-red-600">
                    {formatCurrency(resultado.impostoAtual)}
                    <div className="text-xs">({resultado.cargaTributariaAtual.toFixed(2)}%)</div>
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white rounded border">
                  <span className="text-gray-700">Reforma (com benefícios):</span>
                  <span className="font-semibold text-blue-600">
                    {formatCurrency(resultado.impostoNovo)}
                    <div className="text-xs">({resultado.cargaTributariaNova.toFixed(2)}%)</div>
                  </span>
                </div>

                <div className={`flex justify-between items-center p-3 rounded border ${
                  resultado.diferenca > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                }`}>
                  <span className="text-gray-700">Diferença Tributária:</span>
                  <span className={`font-bold ${
                    resultado.diferenca > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {resultado.diferenca > 0 ? '+' : ''}{formatCurrency(resultado.diferenca)}
                    <div className="text-xs">
                      ({resultado.percentualDiferenca > 0 ? '+' : ''}{resultado.percentualDiferenca.toFixed(1)}%)
                    </div>
                  </span>
                </div>

                {resultado.impactoSplit > 0 && (
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded border border-red-200">
                    <span className="text-gray-700">Split Payment (custo):</span>
                    <span className="font-semibold text-red-600">
                      +{formatCurrency(resultado.impactoSplit)}
                      <div className="text-xs">Custo financeiro</div>
                    </span>
                  </div>
                )}

                {resultado.cashback > 0 && (
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded border border-green-200">
                    <span className="text-gray-700">Cashback Tributário:</span>
                    <span className="font-semibold text-green-600">
                      -{formatCurrency(resultado.cashback)}
                    </span>
                  </div>
                )}

                <div className={`flex justify-between items-center p-4 rounded-lg border-2 ${
                  resultado.impactoFinal > 0 ? 'bg-red-100 border-red-300' : 'bg-green-100 border-green-300'
                }`}>
                  <span className="font-semibold text-gray-800">Impacto Final:</span>
                  <span className={`font-bold text-lg ${
                    resultado.impactoFinal > 0 ? 'text-red-700' : 'text-green-700'
                  }`}>
                    {resultado.impactoFinal > 0 ? '+' : ''}{formatCurrency(resultado.impactoFinal)}
                  </span>
                </div>
              </div>

              {/* Detalhamento dos benefícios */}
              <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                <h5 className="font-semibold text-blue-800 mb-2">Benefícios Aplicados por Categoria:</h5>
                <div className="text-sm text-blue-700 space-y-1">
                  {Object.entries(resultado.beneficiosAplicados).map(([categoria, percentual]) => (
                    <div key={categoria} className="flex justify-between">
                      <span>{categoria.charAt(0).toUpperCase() + categoria.slice(1)}:</span>
                      <span>{(percentual * 100).toFixed(0)}% da receita</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>📊 Análise Estimativa:</strong> Esta simulação usa médias por setor. 
                  Para análise precisa com seus dados SPED reais e benefícios específicos por NCM/código, 
                  use a Calculadora Completa v3.0.
                </p>
              </div>
            </div>
          )}

          {!resultado && (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Calculator className="mx-auto h-12 w-12" />
              </div>
              <p className="text-gray-500">
                Preencha os dados acima e clique em "Calcular Impacto" para ver os resultados
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Informações adicionais melhoradas */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-semibold text-blue-900 mb-2">🔄 IVA Dual</h5>
          <p className="text-sm text-blue-800">
            Substituição de 5 tributos por 2: CBS (federal) e IBS (estados/municípios) 
            com benefícios específicos por categoria
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h5 className="font-semibold text-green-900 mb-2">💳 Split Payment</h5>
          <p className="text-sm text-green-800">
            Retenção automática de 27,97% nas transações, impactando fluxo de caixa 
            mas reduzindo custos de compliance
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h5 className="font-semibold text-purple-900 mb-2">🎯 Benefícios Específicos</h5>
          <p className="text-sm text-purple-800">
            Cesta básica (0%), medicamentos/agro (60% red.), profissionais liberais (30% red.), 
            alimentação (40% red. s/ créditos)
          </p>
        </div>
      </div>

      {/* Call to Action para versão completa */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold mb-1">🚀 Quer uma análise mais precisa?</h4>
            <p className="text-sm opacity-90">
              Upload de arquivos SPED + IA personalizada + benefícios específicos por NCM
            </p>
          </div>
          <Button className="bg-white text-blue-600 hover:bg-gray-100">
            <ExternalLink className="mr-2 h-4 w-4" />
            Versão Completa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;