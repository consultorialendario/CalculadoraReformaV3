// ========= 🔧 UTILITÁRIOS REFORMA TRIBUTÁRIA v3.0 =========
// Funções helper para cálculos, validações e processamento

import { 
    BENEFICIOS_REFORMA_TRIBUTARIA, 
    ALIQUOTAS, 
    DADOS_SETORES, 
    VALIDACOES,
    UTILS 
  } from './reformaTributariaConstants.js';
  
  // ========= 📊 FUNÇÕES DE CÁLCULO =========
  
  /**
   * Identifica benefícios específicos por NCM ou código LC 116/03
   * @param {string} codigo - NCM ou código LC 116/03
   * @param {string} tipo - 'produto' ou 'servico'
   * @returns {object} Benefício identificado
   */
  export const identificarBeneficio = (codigo, tipo) => {
    for (let categoria in BENEFICIOS_REFORMA_TRIBUTARIA) {
      const beneficio = BENEFICIOS_REFORMA_TRIBUTARIA[categoria];
      
      if (tipo === 'produto' && beneficio.produtos && beneficio.produtos[codigo]) {
        return {
          reducao: Math.round((1 - beneficio.fatorReducao) * 100),
          fatorReducao: beneficio.fatorReducao,
          categoria: categoria,
          descricao: beneficio.produtos[codigo].descricao,
          creditosPermitidos: beneficio.creditosPermitidos !== false,
          tipoItem: beneficio.produtos[codigo].categoria,
          aliquotaEfetiva: 27.97 * beneficio.fatorReducao
        };
      }
      
      if (tipo === 'servico' && beneficio.servicos && beneficio.servicos[codigo]) {
        return {
          reducao: Math.round((1 - beneficio.fatorReducao) * 100),
          fatorReducao: beneficio.fatorReducao,
          categoria: categoria,
          descricao: beneficio.servicos[codigo].descricao,
          creditosPermitidos: beneficio.creditosPermitidos !== false,
          tipoItem: beneficio.servicos[codigo].categoria,
          aliquotaEfetiva: 27.97 * beneficio.fatorReducao
        };
      }
    }
    
    return {
      reducao: 0,
      fatorReducao: 1,
      categoria: 'padrao',
      descricao: 'Alíquota padrão 27,97%',
      creditosPermitidos: true,
      tipoItem: 'geral',
      aliquotaEfetiva: 27.97
    };
  };
  
  /**
   * Calcula alíquota do Simples Nacional baseada no faturamento
   * @param {number} faturamento - Faturamento dos últimos 12 meses
   * @param {string} atividade - Tipo de atividade
   * @returns {number} Alíquota do Simples Nacional
   */
  export const calcularAliquotaSimples = (faturamento, atividade) => {
    const anexo = obterAnexoSimples(atividade);
    const tabela = ALIQUOTAS.ATUAL.SIMPLES_NACIONAL[anexo];
    
    if (faturamento <= 180000) return tabela[0].aliquota;
    if (faturamento <= 360000) return tabela[1].aliquota;
    if (faturamento <= 720000) return tabela[2].aliquota;
    if (faturamento <= 1800000) return tabela[3].aliquota;
    if (faturamento <= 3600000) return tabela[4].aliquota;
    if (faturamento <= 4800000) return tabela[5].aliquota;
    
    return 0; // Fora do Simples Nacional
  };
  
  /**
   * Obtém anexo do Simples Nacional baseado na atividade
   * @param {string} atividade - Tipo de atividade
   * @returns {string} Anexo do Simples (anexo1, anexo2, anexo3)
   */
  export const obterAnexoSimples = (atividade) => {
    const setor = DADOS_SETORES[atividade];
    return setor ? setor.anexoSimples : 'anexo1';
  };
  
  /**
   * Calcula impostos do sistema atual por regime
   * @param {object} dados - Dados da empresa e receitas
   * @returns {object} Impostos calculados
   */
  export const calcularImpostosAtuais = (dados) => {
    const { regime, faturamento, receitas, atividade, faturamento12Meses } = dados;
    let impostos = { icms: 0, pis: 0, cofins: 0, ipi: 0, iss: 0 };
    
    switch (regime) {
      case 'simples_nacional':
        const aliquotaSimples = calcularAliquotaSimples(faturamento12Meses, atividade);
        const totalSimples = faturamento * (aliquotaSimples / 100);
        
        // Distribuição aproximada do DAS
        impostos = {
          icms: totalSimples * 0.35,
          pis: totalSimples * 0.08,
          cofins: totalSimples * 0.37,
          ipi: totalSimples * 0.05,
          iss: totalSimples * 0.15
        };
        break;
        
      case 'lucro_real':
        impostos = {
          icms: (receitas.vendasInternas * receitas.aliquotaICMSInternas / 100) + 
                (receitas.vendasInterestaduais * receitas.aliquotaICMSInterestaduais / 100),
          pis: faturamento * 0.0165,
          cofins: faturamento * 0.076,
          ipi: receitas.vendasIPI * receitas.aliquotaIPI / 100,
          iss: receitas.servicosMunicipio * receitas.aliquotaISS / 100
        };
        break;
        
      case 'lucro_presumido':
        impostos = {
          icms: (receitas.vendasInternas + receitas.vendasInterestaduais) * 
                receitas.aliquotaICMSInternas / 100,
          pis: faturamento * 0.0065,
          cofins: faturamento * 0.03,
          ipi: receitas.vendasIPI * receitas.aliquotaIPI / 100,
          iss: (receitas.servicosMunicipio + receitas.servicosOutrosMunicipios) * 
               receitas.aliquotaISS / 100
        };
        break;
    }
    
    return impostos;
  };
  
  /**
   * Calcula impostos da reforma tributária com benefícios específicos
   * @param {number} faturamento - Faturamento total
   * @param {array} produtos - Lista de produtos processados
   * @param {array} servicos - Lista de serviços processados
   * @returns {object} Impostos da reforma calculados
   */
  export const calcularImpostosReforma = (faturamento, produtos = [], servicos = []) => {
    let totalReforma = 0;
    let detalhamentoBeneficios = {};
    
    if (produtos.length > 0 || servicos.length > 0) {
      // Calcular com dados SPED específicos
      [...produtos, ...servicos].forEach(item => {
        const categoria = item.categoria || 'padrao';
        if (!detalhamentoBeneficios[categoria]) {
          detalhamentoBeneficios[categoria] = { valor: 0, count: 0 };
        }
        
        const impostoItem = item.valor * item.fatorReducao * 0.2797;
        totalReforma += impostoItem;
        detalhamentoBeneficios[categoria].valor += impostoItem;
        detalhamentoBeneficios[categoria].count += 1;
      });
    } else {
      // Calcular com estimativa por setor (fallback)
      totalReforma = faturamento * 0.2797;
    }
    
    return {
      total: totalReforma,
      detalhamento: detalhamentoBeneficios,
      aliquotaEfetiva: (totalReforma / faturamento) * 100
    };
  };
  
  /**
   * Calcula impacto do Split Payment no fluxo de caixa
   * @param {number} faturamento - Faturamento mensal
   * @returns {object} Análise do Split Payment
   */
  export const calcularSplitPayment = (faturamento) => {
    const percentualRetencao = 27.97;
    const valorRetido = faturamento * (percentualRetencao / 100);
    const capitalNecessario = valorRetido * 3; // 3 meses
    const custoFinanceiroAnual = 30.0; // %
    const custoMensal = capitalNecessario * (custoFinanceiroAnual / 100 / 12);
    
    return {
      valorRetido,
      capitalNecessario,
      custoFinanceiroAnual,
      custoMensal,
      impactoFluxo: valorRetido,
      custoTotalAnual: custoMensal * 12,
      reducaoCaixa: (valorRetido / faturamento) * 100
    };
  };
  
  // ========= 📋 PROCESSAMENTO SPED =========
  
  /**
   * Processa arquivo SPED EFD ICMS/IPI
   * @param {string} conteudo - Conteúdo do arquivo SPED
   * @returns {object} Dados processados
   */
  export const processarSpedICMS = (conteudo) => {
    const linhas = conteudo.split('\n').filter(linha => linha.trim());
    const resultados = { produtos: [], servicos: [], receitas: {}, validacao: {} };
    
    try {
      // Validar estrutura básica
      const registro0000 = linhas.find(linha => linha.startsWith('|0000|'));
      const registro9999 = linhas.find(linha => linha.startsWith('|9999|'));
      
      if (!registro0000 || !registro9999) {
        throw new Error('Arquivo SPED inválido - Registros 0000 ou 9999 não encontrados');
      }
      
      if (linhas.length < VALIDACOES.LIMITES.REGISTROS_SPED_MIN) {
        throw new Error(`Arquivo deve ter no mínimo ${VALIDACOES.LIMITES.REGISTROS_SPED_MIN} registros`);
      }
      
      // Processar registros C170 (Produtos)
      linhas.forEach(linha => {
        if (linha.startsWith('|C170|')) {
          const campos = linha.split('|');
          if (campos.length >= 8) {
            const produto = {
              ncm: campos[3] || '',
              descricao: campos[4] || 'Produto não especificado',
              cfop: campos[5] || '',
              valor: parseFloat(campos[7] || 0),
              aliquotaICMS: parseFloat(campos[8] || 18)
            };
            
            const beneficio = identificarBeneficio(produto.ncm, 'produto');
            resultados.produtos.push({
              ...produto,
              ...beneficio,
              economia: produto.valor * (0.2797 - beneficio.aliquotaEfetiva / 100)
            });
          }
        }
        
        // Processar registros D101 (Serviços)
        if (linha.startsWith('|D101|')) {
          const campos = linha.split('|');
          if (campos.length >= 6) {
            const servico = {
              codigo: campos[3] || '',
              descricao: campos[4] || 'Serviço não especificado',
              valor: parseFloat(campos[5] || 0),
              aliquotaISS: parseFloat(campos[6] || 5)
            };
            
            const beneficio = identificarBeneficio(servico.codigo, 'servico');
            resultados.servicos.push({
              ...servico,
              ...beneficio,
              economia: servico.valor * (0.2797 - beneficio.aliquotaEfetiva / 100)
            });
          }
        }
      });
      
      // Totalizar receitas por CFOP
      resultados.receitas = {
        vendasInternas: resultados.produtos
          .filter(p => p.cfop && p.cfop.startsWith('5'))
          .reduce((sum, p) => sum + p.valor, 0),
        vendasInterestaduais: resultados.produtos
          .filter(p => p.cfop && p.cfop.startsWith('6'))
          .reduce((sum, p) => sum + p.valor, 0),
        exportacoes: resultados.produtos
          .filter(p => p.cfop && p.cfop.startsWith('7'))
          .reduce((sum, p) => sum + p.valor, 0),
        servicosMunicipio: resultados.servicos
          .reduce((sum, s) => sum + s.valor, 0)
      };
      
      // Validação final
      resultados.validacao = {
        conformidade: true,
        registros: resultados.produtos.length + resultados.servicos.length,
        totalReceitas: Object.values(resultados.receitas).reduce((sum, val) => sum + val, 0),
        erros: []
      };
      
    } catch (error) {
      resultados.validacao = {
        conformidade: false,
        registros: 0,
        totalReceitas: 0,
        erros: [error.message]
      };
    }
    
    return resultados;
  };
  
  /**
   * Processa arquivo SPED EFD-Contribuições
   * @param {string} conteudo - Conteúdo do arquivo SPED
   * @returns {object} Dados processados
   */
  export const processarSpedContribuicoes = (conteudo) => {
    const linhas = conteudo.split('\n').filter(linha => linha.trim());
    const resultados = { receitas: {}, custos: {}, validacao: {} };
    
    try {
      linhas.forEach(linha => {
        // Registro M200 - Receitas PIS/COFINS
        if (linha.startsWith('|M200|')) {
          const campos = linha.split('|');
          if (campos.length >= 4) {
            const receita = parseFloat(campos[3] || 0);
            resultados.receitas.receitasBrutas = receita;
          }
        }
        
        // Registro M600 - Créditos PIS/COFINS
        if (linha.startsWith('|M600|')) {
          const campos = linha.split('|');
          if (campos.length >= 4) {
            const credito = parseFloat(campos[3] || 0);
            resultados.custos.creditosPIS = credito * 0.178; // Proporção PIS
            resultados.custos.creditosCOFINS = credito * 0.822; // Proporção COFINS
          }
        }
      });
      
      resultados.validacao = {
        conformidade: true,
        registrosProcessados: linhas.length,
        erros: []
      };
      
    } catch (error) {
      resultados.validacao = {
        conformidade: false,
        registrosProcessados: 0,
        erros: [error.message]
      };
    }
    
    return resultados;
  };
  
  /**
   * Totaliza dados por categoria de benefício
   * @param {array} produtos - Lista de produtos
   * @param {array} servicos - Lista de serviços
   * @returns {object} Totais por categoria
   */
  export const calcularTotalPorCategoria = (produtos, servicos) => {
    const categorias = {
      cestaBasica: 0,
      medicamentos: 0,
      profissionaisLiberais: 0,
      alimentacao: 0,
      educacao: 0,
      saude: 0,
      agropecuario: 0,
      padrao: 0
    };
  
    produtos.forEach(produto => {
      const categoria = mapearCategoriaParaTotal(produto.categoria, produto.tipoItem);
      if (categorias.hasOwnProperty(categoria)) {
        categorias[categoria] += produto.valor;
      } else {
        categorias.padrao += produto.valor;
      }
    });
  
    servicos.forEach(servico => {
      const categoria = mapearCategoriaParaTotal(servico.categoria, servico.tipoItem);
      if (categorias.hasOwnProperty(categoria)) {
        categorias[categoria] += servico.valor;
      } else {
        categorias.padrao += servico.valor;
      }
    });
  
    return categorias;
  };
  
  /**
   * Mapeia categoria de benefício para categoria de total
   * @param {string} categoria - Categoria do benefício
   * @param {string} tipoItem - Tipo específico do item
   * @returns {string} Categoria para totalização
   */
  const mapearCategoriaParaTotal = (categoria, tipoItem) => {
    const mapeamento = {
      'aliquotaZero': tipoItem === 'cesta_basica' ? 'cestaBasica' : 'padrao',
      'reducao60': {
        'saude': 'medicamentos',
        'agropecuario': 'medicamentos', 
        'educacao': 'educacao'
      },
      'reducao30': 'profissionaisLiberais',
      'reducao40_sem_creditos': 'alimentacao',
      'padrao': 'padrao'
    };
    
    if (typeof mapeamento[categoria] === 'object') {
      return mapeamento[categoria][tipoItem] || 'padrao';
    }
    
    return mapeamento[categoria] || 'padrao';
  };
  
  // ========= 🔍 VALIDAÇÕES =========
  
  /**
   * Valida CNPJ
   * @param {string} cnpj - CNPJ para validar
   * @returns {boolean} True se válido
   */
  export const validarCNPJ = (cnpj) => {
    return VALIDACOES.CNPJ.test(cnpj);
  };
  
  /**
   * Valida email
   * @param {string} email - Email para validar
   * @returns {boolean} True se válido
   */
  export const validarEmail = (email) => {
    return VALIDACOES.EMAIL.test(email);
  };
  
  /**
   * Valida dados obrigatórios da empresa
   * @param {object} dadosEmpresa - Dados da empresa
   * @returns {object} Resultado da validação
   */
  export const validarDadosEmpresa = (dadosEmpresa) => {
    const erros = [];
    
    if (!dadosEmpresa.nome) {
      erros.push('Nome da empresa é obrigatório');
    }
    
    if (!dadosEmpresa.cnpj) {
      erros.push('CNPJ é obrigatório');
    } else if (!validarCNPJ(dadosEmpresa.cnpj)) {
      erros.push(VALIDACOES.MENSAGENS.CNPJ_INVALIDO);
    }
    
    if (!dadosEmpresa.regimeTributario) {
      erros.push(VALIDACOES.MENSAGENS.REGIME_OBRIGATORIO);
    }
    
    if (dadosEmpresa.email && !validarEmail(dadosEmpresa.email)) {
      erros.push(VALIDACOES.MENSAGENS.EMAIL_INVALIDO);
    }
    
    return {
      valido: erros.length === 0,
      erros
    };
  };
  
  /**
   * Valida arquivo SPED
   * @param {File} arquivo - Arquivo para validar
   * @returns {object} Resultado da validação
   */
  export const validarArquivoSPED = (arquivo) => {
    const erros = [];
    
    if (!arquivo) {
      erros.push('Arquivo é obrigatório');
      return { valido: false, erros };
    }
    
    if (!arquivo.name.endsWith('.txt')) {
      erros.push('Arquivo deve ser .txt');
    }
    
    if (arquivo.size > 50 * 1024 * 1024) { // 50MB
      erros.push('Arquivo muito grande (máx 50MB)');
    }
    
    if (arquivo.size < 1024) { // 1KB
      erros.push('Arquivo muito pequeno');
    }
    
    return {
      valido: erros.length === 0,
      erros
    };
  };
  
  // ========= 🎨 FORMATAÇÃO =========
  
  /**
   * Formata valor monetário
   * @param {number} valor - Valor para formatar
   * @returns {string} Valor formatado
   */
  export const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor || 0);
  };
  
  /**
   * Formata percentual
   * @param {number} valor - Valor para formatar (em decimal)
   * @returns {string} Percentual formatado
   */
  export const formatarPercentual = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 2
    }).format(valor / 100);
  };
  
  /**
   * Formata número
   * @param {number} valor - Valor para formatar
   * @param {number} decimais - Número de casas decimais
   * @returns {string} Número formatado
   */
  export const formatarNumero = (valor, decimais = 0) => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: decimais,
      maximumFractionDigits: decimais
    }).format(valor || 0);
  };
  
  /**
   * Formata data
   * @param {Date|string} data - Data para formatar
   * @returns {string} Data formatada
   */
  export const formatarData = (data) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(data));
  };
  
  // ========= 📊 ANÁLISES =========
  
  /**
   * Gera análise comparativa entre regimes
   * @param {object} dadosEmpresa - Dados da empresa
   * @param {number} faturamento - Faturamento anual
   * @returns {object} Análise comparativa
   */
  export const analisarRegimes = (dadosEmpresa, faturamento) => {
    const regimes = ['simples_nacional', 'lucro_presumido', 'lucro_real'];
    const analise = {};
    
    regimes.forEach(regime => {
      const dados = { ...dadosEmpresa, regime, faturamento };
      const impostos = calcularImpostosAtuais(dados);
      const total = Object.values(impostos).reduce((sum, val) => sum + val, 0);
      
      analise[regime] = {
        impostos,
        total,
        cargaTributaria: (total / faturamento) * 100,
        adequado: verificarAdequacaoRegime(regime, dadosEmpresa, faturamento)
      };
    });
    
    return analise;
  };
  
  /**
   * Verifica adequação do regime tributário
   * @param {string} regime - Regime tributário
   * @param {object} dadosEmpresa - Dados da empresa
   * @param {number} faturamento - Faturamento anual
   * @returns {boolean} True se adequado
   */
  export const verificarAdequacaoRegime = (regime, dadosEmpresa, faturamento) => {
    switch (regime) {
      case 'simples_nacional':
        return faturamento <= 4800000;
      case 'lucro_presumido':
        return faturamento <= 78000000;
      case 'lucro_real':
        return true; // Sempre adequado
      default:
        return false;
    }
  };
  
  /**
   * Calcula métricas de impacto da reforma
   * @param {object} sistemaAtual - Impostos do sistema atual
   * @param {object} sistemaReforma - Impostos da reforma
   * @param {number} faturamento - Faturamento total
   * @returns {object} Métricas calculadas
   */
  export const calcularMetricasImpacto = (sistemaAtual, sistemaReforma, faturamento) => {
    const totalAtual = Object.values(sistemaAtual).reduce((sum, val) => sum + val, 0);
    const totalReforma = sistemaReforma.total;
    const diferenca = totalReforma - totalAtual;
    
    return {
      diferenca,
      percentualImpacto: (diferenca / totalAtual) * 100,
      cargaTributariaAtual: (totalAtual / faturamento) * 100,
      cargaTributariaReforma: (totalReforma / faturamento) * 100,
      economia: diferenca < 0 ? Math.abs(diferenca) : 0,
      acrescimo: diferenca > 0 ? diferenca : 0,
      recomendacao: diferenca < 0 ? 'FAVORÁVEL' : 'PREPARAR-SE'
    };
  };
  
  // ========= 📁 SIMULAÇÕES =========
  
  /**
   * Gera dados de simulação por setor
   * @param {string} regime - Regime tributário
   * @param {string} atividade - Tipo de atividade
   * @returns {object} Dados simulados
   */
  export const gerarSimulacao = (regime, atividade) => {
    const setor = DADOS_SETORES[atividade];
    if (!setor) return null;
    
    const faturamentoBase = regime === 'simples_nacional' ? 1200000 : 
                           regime === 'lucro_presumido' ? 3600000 : 8400000;
    
    const simulacao = {
      dadosEmpresa: {
        nome: `${setor.nome} Simulado Ltda`,
        regime,
        atividade,
        faturamento12Meses: faturamentoBase
      },
      receitas: {
        vendasInternas: faturamentoBase * 0.6,
        vendasInterestaduais: faturamentoBase * 0.25,
        servicosMunicipio: faturamentoBase * 0.15,
        aliquotaICMSInternas: '18',
        aliquotaICMSInterestaduais: '12',
        aliquotaISS: '5'
      },
      custos: {
        aquisicoesRevenda: faturamentoBase * setor.creditosMedias,
        energiaEletrica: faturamentoBase * 0.02
      }
    };
    
    return simulacao;
  };
  
  // ========= 🤖 INTEGRAÇÃO IA =========
  
  /**
   * Prepara contexto para envio à IA
   * @param {object} dadosCompletos - Todos os dados da empresa
   * @returns {object} Contexto estruturado
   */
  export const prepararContextoIA = (dadosCompletos) => {
    const {
      empresa,
      receitas,
      custos,
      resultados,
      spedProcessado,
      dadosSPED
    } = dadosCompletos;
    
    return {
      versao: '3.0',
      timestamp: new Date().toISOString(),
      empresa: {
        nome: empresa.nome,
        cnpj: empresa.cnpj,
        regime: empresa.regimeTributario,
        atividade: empresa.atividade,
        estado: empresa.estado
      },
      financeiro: {
        faturamentoTotal: Object.values(receitas).reduce((sum, val) => sum + parseFloat(val || 0), 0),
        impostoAtual: resultados.totalAtual,
        impostoReforma: resultados.totalReforma,
        diferenca: resultados.diferenca,
        percentualImpacto: resultados.percentualImpacto
      },
      sped: {
        processado: spedProcessado,
        produtos: dadosSPED?.produtos?.length || 0,
        servicos: dadosSPED?.servicos?.length || 0,
        economiaIdentificada: spedProcessado ? 
          [...(dadosSPED.produtos || []), ...(dadosSPED.servicos || [])]
            .reduce((sum, item) => sum + (item.economia || 0), 0) : 0
      }
    };
  };
  
  // ========= 📊 EXPORT DEFAULT =========
  export default {
    // Funções de cálculo
    identificarBeneficio,
    calcularAliquotaSimples,
    calcularImpostosAtuais,
    calcularImpostosReforma,
    calcularSplitPayment,
    
    // Processamento SPED
    processarSpedICMS,
    processarSpedContribuicoes,
    calcularTotalPorCategoria,
    
    // Validações
    validarCNPJ,
    validarEmail,
    validarDadosEmpresa,
    validarArquivoSPED,
    
    // Formatação
    formatarMoeda,
    formatarPercentual,
    formatarNumero,
    formatarData,
    
    // Análises
    analisarRegimes,
    verificarAdequacaoRegime,
    calcularMetricasImpacto,
    
    // Simulações
    gerarSimulacao,
    
    // IA
    prepararContextoIA
  };