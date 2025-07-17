import { useState, useEffect } from 'react';

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

  // Alíquotas por setor (estimativas baseadas na reforma)
  const aliquotas = {
    comercio: { atual: 12.5, nova: 26.5 },
    industria: { atual: 11.8, nova: 26.5 },
    servicos: { atual: 14.2, nova: 26.5 },
    tecnologia: { atual: 13.5, nova: 26.5 },
    saude: { atual: 10.5, nova: 26.5 },
    educacao: { atual: 9.8, nova: 26.5 }
  };

  // Benefícios por regime
  const beneficios = {
    simples_nacional: { reducao: 0.15 },
    lucro_presumido: { reducao: 0.05 },
    lucro_real: { reducao: 0.02 }
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
      const aliquotaSetor = aliquotas[formData.setor];
      const beneficioRegime = beneficios[formData.regime];
      
      // Cálculo sistema atual
      const impostoAtual = faturamento * (aliquotaSetor.atual / 100);
      
      // Cálculo novo sistema com benefícios
      const aliquotaNova = aliquotaSetor.nova * (1 - beneficioRegime.reducao);
      const impostoNovo = faturamento * (aliquotaNova / 100);
      
      // Diferença
      const diferenca = impostoNovo - impostoAtual;
      const percentualDiferenca = ((diferenca / impostoAtual) * 100);
      
      // Economia com Split Payment (estimativa)
      const economiaSplit = faturamento * 0.002; // 0.2% do faturamento
      
      // Cashback (para empresas menores)
      const cashback = faturamento < 1000000 ? faturamento * 0.001 : 0;
      
      setResultado({
        faturamento,
        impostoAtual,
        impostoNovo,
        diferenca,
        percentualDiferenca,
        economiaSplit,
        cashback,
        impactoFinal: diferenca - economiaSplit - cashback
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
        <h3 className="text-2xl font-bold text-blue-900 mb-2">
          Calculadora da Reforma Tributária
        </h3>
        <p className="text-gray-600">
          Simule o impacto da reforma tributária no seu negócio
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Formulário */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Faturamento Anual (R$)
            </label>
            <input
              type="number"
              name="faturamento"
              value={formData.faturamento}
              onChange={handleInputChange}
              placeholder="Ex: 1000000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Setor de Atividade
            </label>
            <select
              name="setor"
              value={formData.setor}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="comercio">Comércio</option>
              <option value="industria">Indústria</option>
              <option value="servicos">Serviços</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="saude">Saúde</option>
              <option value="educacao">Educação</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Regime Tributário
            </label>
            <select
              name="regime"
              value={formData.regime}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="simples_nacional">Simples Nacional</option>
              <option value="lucro_presumido">Lucro Presumido</option>
              <option value="lucro_real">Lucro Real</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="SP">São Paulo</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="MG">Minas Gerais</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="PR">Paraná</option>
              <option value="SC">Santa Catarina</option>
              <option value="BA">Bahia</option>
              <option value="GO">Goiás</option>
              <option value="PE">Pernambuco</option>
              <option value="CE">Ceará</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número de Funcionários
            </label>
            <input
              type="number"
              name="funcionarios"
              value={formData.funcionarios}
              onChange={handleInputChange}
              placeholder="Ex: 50"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Margem de Lucro (%)
            </label>
            <input
              type="number"
              name="margem"
              value={formData.margem}
              onChange={handleInputChange}
              placeholder="Ex: 15"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={calcularImpacto}
            disabled={loading || !formData.faturamento}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Calculando...' : 'Calcular Impacto'}
          </button>
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          {resultado && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Resultado da Simulação
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
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-white rounded border">
                  <span className="text-gray-700">Impostos Novo Sistema:</span>
                  <span className="font-semibold text-blue-600">
                    {formatCurrency(resultado.impostoNovo)}
                  </span>
                </div>

                <div className={`flex justify-between items-center p-3 rounded border ${
                  resultado.diferenca > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                }`}>
                  <span className="text-gray-700">Diferença:</span>
                  <span className={`font-bold ${
                    resultado.diferenca > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {resultado.diferenca > 0 ? '+' : ''}{formatCurrency(resultado.diferenca)}
                    <br />
                    <span className="text-sm">
                      ({resultado.percentualDiferenca > 0 ? '+' : ''}{resultado.percentualDiferenca.toFixed(1)}%)
                    </span>
                  </span>
                </div>

                {resultado.economiaSplit > 0 && (
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded border border-green-200">
                    <span className="text-gray-700">Economia Split Payment:</span>
                    <span className="font-semibold text-green-600">
                      -{formatCurrency(resultado.economiaSplit)}
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

              <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Observação:</strong> Esta simulação é baseada em estimativas e dados preliminares da reforma tributária. 
                  Os valores reais podem variar conforme a regulamentação final e características específicas do seu negócio.
                </p>
              </div>
            </div>
          )}

          {!resultado && (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-500">
                Preencha os dados acima e clique em "Calcular Impacto" para ver os resultados
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Informações adicionais */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-semibold text-blue-900 mb-2">IVA Dual</h5>
          <p className="text-sm text-blue-800">
            Substituição de 5 tributos por 2: CBS (federal) e IBS (estados/municípios)
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h5 className="font-semibold text-green-900 mb-2">Split Payment</h5>
          <p className="text-sm text-green-800">
            Retenção automática de impostos nas transações, reduzindo custos operacionais
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h5 className="font-semibold text-purple-900 mb-2">Cashback</h5>
          <p className="text-sm text-purple-800">
            Devolução de impostos para famílias de baixa renda e pequenas empresas
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;

