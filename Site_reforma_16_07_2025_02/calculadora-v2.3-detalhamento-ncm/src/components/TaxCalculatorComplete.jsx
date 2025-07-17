import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Calculator, FileText, Download, MessageCircle, X, Send, Edit, Save, RotateCcw, Upload, CheckCircle, FileX } from 'lucide-react';

// ========= 🔥 BENEFÍCIOS REFORMA TRIBUTÁRIA LC 214/2025 =========
const beneficiosReformaTributaria = {
  // ALÍQUOTA ZERO (100% de redução)
  aliquotaZero: {
    fatorReducao: 0,
    produtos: {
      "1006.10.10": { descricao: "Arroz em casca", categoria: "cesta_basica" },
      "1006.30.20": { descricao: "Arroz parboilizado", categoria: "cesta_basica" },
      "0713.31.00": { descricao: "Feijão preto", categoria: "cesta_basica" },
      "0713.32.00": { descricao: "Feijão comum", categoria: "cesta_basica" },
      "0201.10.00": { descricao: "Carnes bovinas frescas", categoria: "cesta_basica" },
      "0401.10.10": { descricao: "Leite fluido", categoria: "cesta_basica" },
      "1701.14.00": { descricao: "Açúcar cristal", categoria: "cesta_basica" },
      "1507.10.00": { descricao: "Óleo de soja bruto", categoria: "cesta_basica" },
      "1905.90.20": { descricao: "Pão", categoria: "cesta_basica" },
      "0803.90.00": { descricao: "Banana", categoria: "cesta_basica" },
      "0702.00.00": { descricao: "Tomate", categoria: "cesta_basica" },
      "0701.90.00": { descricao: "Batata", categoria: "cesta_basica" },
      "1101.00.10": { descricao: "Farinha de trigo", categoria: "cesta_basica" }
    }
  },
  
  // 60% DE REDUÇÃO (40% da alíquota)
  reducao60: {
    fatorReducao: 0.4,
    produtos: {
      "3004.10.00": { descricao: "Penicilinas", categoria: "saude" },
      "3004.20.00": { descricao: "Antibióticos", categoria: "saude" },
      "3004.31.00": { descricao: "Insulina", categoria: "saude" },
      "3004.90.99": { descricao: "Outros medicamentos", categoria: "saude" },
      "3101.00.00": { descricao: "Fertilizantes animais/vegetais", categoria: "agropecuario" },
      "3102.10.00": { descricao: "Ureia", categoria: "agropecuario" },
      "1001.11.00": { descricao: "Trigo para semeadura", categoria: "agropecuario" },
      "1201.10.00": { descricao: "Soja para semeadura", categoria: "agropecuario" }
    },
    servicos: {
      "4.01": { descricao: "Medicina e biomedicina", categoria: "saude" },
      "4.02": { descricao: "Análises clínicas", categoria: "saude" },
      "4.03": { descricao: "Hospitais", categoria: "saude" },
      "8.01": { descricao: "Ensino regular pré-escolar", categoria: "educacao" },
      "8.02": { descricao: "Instrução, treinamento, ensino", categoria: "educacao" }
    }
  },
  
  // 30% DE REDUÇÃO PARA PROFISSIONAIS LIBERAIS (70% da alíquota)
  reducao30: {
    fatorReducao: 0.7,
    servicos: {
      "17.01": { descricao: "Assessoria ou consultoria", categoria: "profissionais_liberais" },
      "17.02": { descricao: "Datilografia, digitação", categoria: "profissionais_liberais" },
      "17.21": { descricao: "Contabilidade", categoria: "profissionais_liberais" },
      "17.22": { descricao: "Auditoria", categoria: "profissionais_liberais" }
    }
  },
  
  // 40% DE REDUÇÃO PARA ALIMENTAÇÃO SEM CRÉDITOS (60% da alíquota)
  reducao40_sem_creditos: {
    fatorReducao: 0.6,
    creditosPermitidos: false,
    servicos: {
      "alimentacao": { descricao: "Alimentação preparada", categoria: "alimentacao" }
    }
  }
};

// ========= FUNÇÃO DE IDENTIFICAÇÃO DE BENEFÍCIOS =========
const identificarBeneficio = (codigo, tipo) => {
  for (let categoria in beneficiosReformaTributaria) {
    const beneficio = beneficiosReformaTributaria[categoria];
    
    if (tipo === 'produto' && beneficio.produtos && beneficio.produtos[codigo]) {
      return {
        reducao: Math.round((1 - beneficio.fatorReducao) * 100),
        fatorReducao: beneficio.fatorReducao,
        categoria: categoria,
        descricao: beneficio.produtos[codigo].descricao,
        creditosPermitidos: beneficio.creditosPermitidos !== false,
        tipoItem: beneficio.produtos[codigo].categoria
      };
    }
    
    if (tipo === 'servico' && beneficio.servicos && beneficio.servicos[codigo]) {
      return {
        reducao: Math.round((1 - beneficio.fatorReducao) * 100),
        fatorReducao: beneficio.fatorReducao,
        categoria: categoria,
        descricao: beneficio.servicos[codigo].descricao,
        creditosPermitidos: beneficio.creditosPermitidos !== false,
        tipoItem: beneficio.servicos[codigo].categoria
      };
    }
  }
  
  return {
    reducao: 0,
    fatorReducao: 1,
    categoria: 'padrao',
    descricao: 'Alíquota padrão 27,97%',
    creditosPermitidos: true,
    tipoItem: 'geral'
  };
};

// ========= PARSER SPED =========
const processarArquivoSPED = (conteudo, tipo) => {
  const linhas = conteudo.split('\n').filter(linha => linha.trim());
  const resultados = { produtos: [], servicos: [], receitas: {}, custos: {} };
  
  try {
    if (tipo === 'icms') {
      // Processar EFD ICMS/IPI
      linhas.forEach(linha => {
        if (linha.startsWith('|C170|')) {
          // Registro C170 - Vendas de mercadorias
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
              aliquotaReforma: 27.97 * beneficio.fatorReducao,
              economia: produto.valor * (0.2797 - (0.2797 * beneficio.fatorReducao))
            });
          }
        }
        
        if (linha.startsWith('|D101|')) {
          // Registro D101 - Serviços
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
              aliquotaReforma: 27.97 * beneficio.fatorReducao,
              economia: servico.valor * (0.2797 - (0.2797 * beneficio.fatorReducao))
            });
          }
        }
      });
      
      // Totalizar receitas
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
    }
    
    if (tipo === 'contribuicoes') {
      // Processar EFD-Contribuições
      linhas.forEach(linha => {
        if (linha.startsWith('|M200|')) {
          // Registro M200 - Receitas PIS/COFINS
          const campos = linha.split('|');
          if (campos.length >= 4) {
            const receita = parseFloat(campos[3] || 0);
            resultados.receitas.receitasBrutas = receita;
          }
        }
        
        if (linha.startsWith('|M600|')) {
          // Registro M600 - Créditos PIS/COFINS
          const campos = linha.split('|');
          if (campos.length >= 4) {
            const credito = parseFloat(campos[3] || 0);
            resultados.custos.creditosPIS = credito * 0.178; // Proporção PIS
            resultados.custos.creditosCOFINS = credito * 0.822; // Proporção COFINS
          }
        }
      });
    }
    
  } catch (error) {
    console.error('Erro ao processar SPED:', error);
    throw new Error('Erro na estrutura do arquivo SPED');
  }
  
  return resultados;
};

const TaxCalculatorComplete = () => {
  // Estados principais
  const [activeTab, setActiveTab] = useState('configuracao');
  const [dadosEmpresa, setDadosEmpresa] = useState({
    nome: '',
    cnpj: '',
    responsavel: '',
    telefone: '',
    email: '',
    estado: '',
    regimeTributario: '',
    atividade: '',
    periodoApuracao: 'mensal',
    mesAno: '',
    faturamento12Meses: '',
    metodoEntrada: 'manual'
  });

  const [receitas, setReceitas] = useState({
    vendasInternas: '',
    aliquotaICMSInternas: '18',
    vendasInterestaduais: '',
    aliquotaICMSInterestaduais: '12',
    exportacoes: '',
    vendasIPI: '',
    aliquotaIPI: '10',
    servicosMunicipio: '',
    aliquotaISS: '5',
    servicosOutrosMunicipios: '',
    receitasFinanceiras: ''
  });

  const [custos, setCustos] = useState({
    aquisicoesRevenda: '',
    materiasPrimas: '',
    energiaEletrica: '',
    saldoAnteriorICMS: '',
    saldoAnteriorPIS: '',
    saldoAnteriorCOFINS: ''
  });

  // ========= 🔥 NOVOS ESTADOS PARA SPED =========
  const [arquivosSPED, setArquivosSPED] = useState({
    icms: null,
    contribuicoes: null,
    processado: false,
    dadosProcessados: {
      produtos: [],
      servicos: [],
      totalPorCategoria: {},
      validacao: { conformidade: false, registros: 0 }
    }
  });

  const [resultados, setResultados] = useState({
    icms: 0, pis: 0, cofins: 0, ipi: 0, iss: 0,
    totalAtual: 0, totalReforma: 0, diferenca: 0, percentualImpacto: 0
  });

  const [resultadosEditaveis, setResultadosEditaveis] = useState({
    icms: 0, pis: 0, cofins: 0, ipi: 0, iss: 0
  });

  const [modoEdicao, setModoEdicao] = useState(false);
  const [chatAberto, setChatAberto] = useState(false);
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [carregandoIA, setCarregandoIA] = useState(false);

  // Estados brasileiros
  const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  // Tabelas Simples Nacional 2025
  const tabelasSimples = {
    anexo1: [
      { faixa: 'Até 180.000', aliquota: 4.0 },
      { faixa: '180.000,01 a 360.000', aliquota: 7.3 },
      { faixa: '360.000,01 a 720.000', aliquota: 9.5 },
      { faixa: '720.000,01 a 1.800.000', aliquota: 10.7 },
      { faixa: '1.800.000,01 a 3.600.000', aliquota: 14.3 },
      { faixa: '3.600.000,01 a 4.800.000', aliquota: 19.0 }
    ],
    anexo2: [
      { faixa: 'Até 180.000', aliquota: 4.5 },
      { faixa: '180.000,01 a 360.000', aliquota: 7.8 },
      { faixa: '360.000,01 a 720.000', aliquota: 10.0 },
      { faixa: '720.000,01 a 1.800.000', aliquota: 11.2 },
      { faixa: '1.800.000,01 a 3.600.000', aliquota: 14.7 },
      { faixa: '3.600.000,01 a 4.800.000', aliquota: 30.0 }
    ],
    anexo3: [
      { faixa: 'Até 180.000', aliquota: 6.0 },
      { faixa: '180.000,01 a 360.000', aliquota: 11.2 },
      { faixa: '360.000,01 a 720.000', aliquota: 13.5 },
      { faixa: '720.000,01 a 1.800.000', aliquota: 16.0 },
      { faixa: '1.800.000,01 a 3.600.000', aliquota: 21.0 },
      { faixa: '3.600.000,01 a 4.800.000', aliquota: 33.0 }
    ]
  };

  // ========= 🔥 FUNÇÃO PARA PROCESSAR ARQUIVOS SPED =========
  const processarArquivosSPED = async () => {
    if (!arquivosSPED.icms || !arquivosSPED.contribuicoes) {
      alert('❌ Por favor, selecione ambos os arquivos SPED antes de processar.');
      return;
    }

    try {
      // Ler conteúdo dos arquivos
      const conteudoICMS = await lerArquivo(arquivosSPED.icms);
      const conteudoContrib = await lerArquivo(arquivosSPED.contribuicoes);

      // Processar cada arquivo
      const dadosICMS = processarArquivoSPED(conteudoICMS, 'icms');
      const dadosContrib = processarArquivoSPED(conteudoContrib, 'contribuicoes');

      // Combinar resultados
      const dadosCombinados = {
        produtos: dadosICMS.produtos,
        servicos: dadosICMS.servicos,
        totalPorCategoria: calcularTotalPorCategoria(dadosICMS.produtos, dadosICMS.servicos),
        validacao: {
          conformidade: true,
          registros: dadosICMS.produtos.length + dadosICMS.servicos.length,
          totalReceitas: Object.values(dadosICMS.receitas).reduce((sum, val) => sum + val, 0)
        }
      };

      // Atualizar estados
      setArquivosSPED(prev => ({
        ...prev,
        processado: true,
        dadosProcessados: dadosCombinados
      }));

      // Preencher automaticamente receitas e custos
      setReceitas(prev => ({
        ...prev,
        vendasInternas: dadosICMS.receitas.vendasInternas?.toString() || prev.vendasInternas,
        vendasInterestaduais: dadosICMS.receitas.vendasInterestaduais?.toString() || prev.vendasInterestaduais,
        exportacoes: dadosICMS.receitas.exportacoes?.toString() || prev.exportacoes,
        servicosMunicipio: dadosICMS.receitas.servicosMunicipio?.toString() || prev.servicosMunicipio
      }));

      setCustos(prev => ({
        ...prev,
        saldoAnteriorPIS: dadosContrib.custos.creditosPIS?.toString() || prev.saldoAnteriorPIS,
        saldoAnteriorCOFINS: dadosContrib.custos.creditosCOFINS?.toString() || prev.saldoAnteriorCOFINS
      }));

      alert(`✅ SPED processado com sucesso!\n\n📊 Dados extraídos:\n• ${dadosCombinados.produtos.length} produtos processados\n• ${dadosCombinados.servicos.length} serviços processados\n• R$ ${dadosCombinados.validacao.totalReceitas.toLocaleString('pt-BR', {minimumFractionDigits: 2})} em receitas\n\n🎯 Navegue para as próximas abas para ver os dados preenchidos automaticamente.`);

      // Navegar automaticamente para próxima aba
      setActiveTab('receitas');

    } catch (error) {
      console.error('Erro ao processar SPED:', error);
      alert(`❌ Erro ao processar arquivos SPED:\n${error.message}\n\nVerifique se os arquivos estão no formato correto.`);
    }
  };

  // Função auxiliar para ler arquivo
  const lerArquivo = (arquivo) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsText(arquivo, 'ISO-8859-1'); // Encoding comum para SPED
    });
  };

  // Função para calcular total por categoria
  const calcularTotalPorCategoria = (produtos, servicos) => {
    const categorias = {
      cestaBasica: 0,
      medicamentos: 0,
      profissionaisLiberais: 0,
      alimentacao: 0,
      padrao: 0
    };

    produtos.forEach(produto => {
      if (produto.categoria === 'aliquotaZero') {
        categorias.cestaBasica += produto.valor;
      } else if (produto.categoria === 'reducao60') {
        categorias.medicamentos += produto.valor;
      } else {
        categorias.padrao += produto.valor;
      }
    });

    servicos.forEach(servico => {
      if (servico.categoria === 'reducao60') {
        categorias.medicamentos += servico.valor;
      } else if (servico.categoria === 'reducao30') {
        categorias.profissionaisLiberais += servico.valor;
      } else if (servico.categoria === 'reducao40_sem_creditos') {
        categorias.alimentacao += servico.valor;
      } else {
        categorias.padrao += servico.valor;
      }
    });

    return categorias;
  };

  // Função para calcular faturamento total
  const calcularFaturamentoTotal = () => {
    const vendas = parseFloat(receitas.vendasInternas || 0);
    const vendasInter = parseFloat(receitas.vendasInterestaduais || 0);
    const exportacoes = parseFloat(receitas.exportacoes || 0);
    const vendasIPI = parseFloat(receitas.vendasIPI || 0);
    const servicos = parseFloat(receitas.servicosMunicipio || 0);
    const servicosOutros = parseFloat(receitas.servicosOutrosMunicipios || 0);
    const financeiras = parseFloat(receitas.receitasFinanceiras || 0);
    
    return vendas + vendasInter + exportacoes + vendasIPI + servicos + servicosOutros + financeiras;
  };

  // Função para obter alíquota Simples Nacional
  const obterAliquotaSimples = () => {
    const faturamento = parseFloat(dadosEmpresa.faturamento12Meses || 0);
    let anexo = 'anexo1';
    
    if (dadosEmpresa.atividade === 'industria') anexo = 'anexo2';
    if (dadosEmpresa.atividade === 'servicos') anexo = 'anexo3';
    
    const tabela = tabelasSimples[anexo];
    
    if (faturamento <= 180000) return tabela[0].aliquota;
    if (faturamento <= 360000) return tabela[1].aliquota;
    if (faturamento <= 720000) return tabela[2].aliquota;
    if (faturamento <= 1800000) return tabela[3].aliquota;
    if (faturamento <= 3600000) return tabela[4].aliquota;
    if (faturamento <= 4800000) return tabela[5].aliquota;
    
    return 0;
  };

  // Função para calcular impostos
  const calcularImpostos = () => {
    const faturamentoTotal = calcularFaturamentoTotal();
    
    if (faturamentoTotal === 0) {
      setResultados({
        icms: 0, pis: 0, cofins: 0, ipi: 0, iss: 0,
        totalAtual: 0, totalReforma: 0, diferenca: 0, percentualImpacto: 0
      });
      setResultadosEditaveis({
        icms: 0, pis: 0, cofins: 0, ipi: 0, iss: 0
      });
      return;
    }

    let icms = 0, pis = 0, cofins = 0, ipi = 0, iss = 0;

    if (dadosEmpresa.regimeTributario === 'simples_nacional') {
      const aliquotaSimples = obterAliquotaSimples();
      const totalSimples = faturamentoTotal * (aliquotaSimples / 100);
      
      icms = totalSimples * 0.35;
      pis = totalSimples * 0.08;
      cofins = totalSimples * 0.37;
      iss = totalSimples * 0.20;
      
    } else if (dadosEmpresa.regimeTributario === 'lucro_real') {
      const vendasInternas = parseFloat(receitas.vendasInternas || 0);
      const vendasInterestaduais = parseFloat(receitas.vendasInterestaduais || 0);
      const aliquotaICMSInterna = parseFloat(receitas.aliquotaICMSInternas || 18);
      const aliquotaICMSInter = parseFloat(receitas.aliquotaICMSInterestaduais || 12);
      
      icms = (vendasInternas * (aliquotaICMSInterna / 100)) + (vendasInterestaduais * (aliquotaICMSInter / 100));
      
      pis = faturamentoTotal * 0.0165;
      cofins = faturamentoTotal * 0.076;
      
      const vendasIPI = parseFloat(receitas.vendasIPI || 0);
      const aliquotaIPI = parseFloat(receitas.aliquotaIPI || 10);
      ipi = vendasIPI * (aliquotaIPI / 100);
      
      const servicosMunicipio = parseFloat(receitas.servicosMunicipio || 0);
      const aliquotaISS = parseFloat(receitas.aliquotaISS || 5);
      iss = servicosMunicipio * (aliquotaISS / 100);
      
    } else if (dadosEmpresa.regimeTributario === 'lucro_presumido') {
      const vendasICMS = parseFloat(receitas.vendasInternas || 0) + parseFloat(receitas.vendasInterestaduais || 0);
      icms = vendasICMS * (parseFloat(receitas.aliquotaICMSInternas || 18) / 100);
      
      pis = faturamentoTotal * 0.0065;
      cofins = faturamentoTotal * 0.03;
      
      ipi = parseFloat(receitas.vendasIPI || 0) * (parseFloat(receitas.aliquotaIPI || 10) / 100);
      
      const servicosTotal = parseFloat(receitas.servicosMunicipio || 0) + parseFloat(receitas.servicosOutrosMunicipios || 0);
      iss = servicosTotal * (parseFloat(receitas.aliquotaISS || 5) / 100);
    }

    const totalAtual = icms + pis + cofins + ipi + iss;
    
    // ========= 🔥 CÁLCULO DA REFORMA COM BENEFÍCIOS ESPECÍFICOS =========
    let totalReforma = 0;
    
    if (arquivosSPED.processado && arquivosSPED.dadosProcessados.produtos.length > 0) {
      // Usar dados reais do SPED com benefícios específicos
      const { produtos, servicos } = arquivosSPED.dadosProcessados;
      
      totalReforma = produtos.reduce((sum, produto) => {
        return sum + (produto.valor * produto.fatorReducao * 0.2797);
      }, 0) + servicos.reduce((sum, servico) => {
        return sum + (servico.valor * servico.fatorReducao * 0.2797);
      }, 0);
    } else {
      // Fallback para cálculo estimativo
      totalReforma = faturamentoTotal * 0.2797;
    }
    
    const diferenca = totalReforma - totalAtual;
    const percentualImpacto = totalAtual > 0 ? (diferenca / totalAtual) * 100 : 0;

    const novosResultados = {
      icms: Math.round(icms * 100) / 100,
      pis: Math.round(pis * 100) / 100,
      cofins: Math.round(cofins * 100) / 100,
      ipi: Math.round(ipi * 100) / 100,
      iss: Math.round(iss * 100) / 100,
      totalAtual: Math.round(totalAtual * 100) / 100,
      totalReforma: Math.round(totalReforma * 100) / 100,
      diferenca: Math.round(diferenca * 100) / 100,
      percentualImpacto: Math.round(percentualImpacto * 100) / 100
    };

    setResultados(novosResultados);
    setResultadosEditaveis({
      icms: novosResultados.icms,
      pis: novosResultados.pis,
      cofins: novosResultados.cofins,
      ipi: novosResultados.ipi,
      iss: novosResultados.iss
    });
  };

  // Recalcular quando dados mudarem
  useEffect(() => {
    calcularImpostos();
  }, [dadosEmpresa, receitas, custos, arquivosSPED.dadosProcessados]);

  // Função para simular dados
  const simularDados = () => {
    const regime = dadosEmpresa.regimeTributario;
    const atividade = dadosEmpresa.atividade;
    
    const simulacoes = {
      'lucro_real': {
        'comercio': {
          receitas: { vendasInternas: '450000', vendasInterestaduais: '180000', exportacoes: '50000' },
          custos: { aquisicoesRevenda: '280000', energiaEletrica: '8500' }
        },
        'industria': {
          receitas: { vendasInternas: '380000', vendasIPI: '600000', exportacoes: '120000' },
          custos: { materiasPrimas: '350000', energiaEletrica: '25000' }
        },
        'servicos': {
          receitas: { servicosMunicipio: '420000', servicosOutrosMunicipios: '180000' },
          custos: { energiaEletrica: '12000' }
        }
      }
    };

    const dados = simulacoes[regime]?.[atividade];
    if (dados) {
      setReceitas(prev => ({ ...prev, ...dados.receitas }));
      setCustos(prev => ({ ...prev, ...dados.custos }));
      
      alert(`✅ Simulação aplicada!\n\nPerfil: ${regime.replace('_', ' ')} - ${atividade}\nDados preenchidos automaticamente nas abas Receitas e Custos.`);
    }
  };

  // Função para limpar todos os dados
  const limparTudo = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados preenchidos?')) {
      setDadosEmpresa({
        nome: '', cnpj: '', responsavel: '', telefone: '', email: '', estado: '',
        regimeTributario: '', atividade: '', periodoApuracao: 'mensal', mesAno: '',
        faturamento12Meses: '', metodoEntrada: 'manual'
      });
      setReceitas({
        vendasInternas: '', aliquotaICMSInternas: '18', vendasInterestaduais: '',
        aliquotaICMSInterestaduais: '12', exportacoes: '', vendasIPI: '', aliquotaIPI: '10',
        servicosMunicipio: '', aliquotaISS: '5', servicosOutrosMunicipios: '', receitasFinanceiras: ''
      });
      setCustos({
        aquisicoesRevenda: '', materiasPrimas: '', energiaEletrica: '',
        saldoAnteriorICMS: '', saldoAnteriorPIS: '', saldoAnteriorCOFINS: ''
      });
      setArquivosSPED({
        icms: null, contribuicoes: null, processado: false,
        dadosProcessados: { produtos: [], servicos: [], totalPorCategoria: {}, validacao: { conformidade: false, registros: 0 } }
      });
      setMensagens([]);
      setActiveTab('configuracao');
    }
  };

  // Função para navegar entre abas
  const navegarAba = (direcao) => {
    const abas = ['configuracao', 'receitas', 'custos', 'produtos', 'resultados', 'reforma'];
    const indiceAtual = abas.indexOf(activeTab);
    
    if (direcao === 'anterior' && indiceAtual > 0) {
      setActiveTab(abas[indiceAtual - 1]);
    } else if (direcao === 'proximo' && indiceAtual < abas.length - 1) {
      setActiveTab(abas[indiceAtual + 1]);
    }
  };

  // ========= 🔥 RENDERIZAR ABA DE CONFIGURAÇÃO CORRIGIDA =========
  const renderConfiguracaoTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🏢</span> Dados da Empresa
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nome">Nome da Empresa *</Label>
              <Input
                id="nome"
                value={dadosEmpresa.nome}
                onChange={(e) => setDadosEmpresa(prev => ({...prev, nome: e.target.value}))}
                placeholder="Razão Social da empresa"
                className="bg-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="cnpj">CNPJ *</Label>
              <Input
                id="cnpj"
                value={dadosEmpresa.cnpj}
                onChange={(e) => setDadosEmpresa(prev => ({...prev, cnpj: e.target.value}))}
                placeholder="00.000.000/0001-00"
                className="bg-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="responsavel">Responsável</Label>
              <Input
                id="responsavel"
                value={dadosEmpresa.responsavel}
                onChange={(e) => setDadosEmpresa(prev => ({...prev, responsavel: e.target.value}))}
                placeholder="Nome do responsável"
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={dadosEmpresa.telefone}
                onChange={(e) => setDadosEmpresa(prev => ({...prev, telefone: e.target.value}))}
                placeholder="(11) 99999-9999"
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={dadosEmpresa.email}
                onChange={(e) => setDadosEmpresa(prev => ({...prev, email: e.target.value}))}
                placeholder="contato@empresa.com.br"
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="estado">Estado Principal</Label>
              <Select value={dadosEmpresa.estado} onValueChange={(value) => setDadosEmpresa(prev => ({...prev, estado: value}))}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent>
                  {estadosBrasileiros.map(estado => (
                    <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="regime">Regime Tributário *</Label>
              <Select value={dadosEmpresa.regimeTributario} onValueChange={(value) => setDadosEmpresa(prev => ({...prev, regimeTributario: value}))}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione o regime" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simples_nacional">Simples Nacional</SelectItem>
                  <SelectItem value="lucro_presumido">Lucro Presumido</SelectItem>
                  <SelectItem value="lucro_real">Lucro Real</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="atividade">Atividade Principal</Label>
              <Select value={dadosEmpresa.atividade} onValueChange={(value) => setDadosEmpresa(prev => ({...prev, atividade: value}))}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione a atividade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comercio">Comércio</SelectItem>
                  <SelectItem value="industria">Indústria</SelectItem>
                  <SelectItem value="servicos">Serviços</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="periodo">Período de Apuração</Label>
              <Select value={dadosEmpresa.periodoApuracao} onValueChange={(value) => setDadosEmpresa(prev => ({...prev, periodoApuracao: value}))}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mensal">Mensal</SelectItem>
                  <SelectItem value="trimestral">Trimestral</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mesAno">Mês/Ano de Referência</Label>
              <Input
                id="mesAno"
                value={dadosEmpresa.mesAno}
                onChange={(e) => setDadosEmpresa(prev => ({...prev, mesAno: e.target.value}))}
                placeholder="01/2025"
                className="bg-white"
              />
            </div>
            {dadosEmpresa.regimeTributario === 'simples_nacional' && (
              <div>
                <Label htmlFor="faturamento12">Faturamento Últimos 12 Meses *</Label>
                <Input
                  id="faturamento12"
                  type="number"
                  value={dadosEmpresa.faturamento12Meses}
                  onChange={(e) => setDadosEmpresa(prev => ({...prev, faturamento12Meses: e.target.value}))}
                  placeholder="0,00"
                  className="bg-white"
                  required
                />
                {dadosEmpresa.faturamento12Meses && (
                  <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                    <strong>Alíquota Simples:</strong> {obterAliquotaSimples().toFixed(2)}%
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ========= 🔥 INTERFACE ÚNICA PARA MÉTODO DE ENTRADA ========= */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📊</span> Método de Entrada de Dados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label>Selecione como deseja informar os dados:</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Manual */}
              <Card 
                className={`p-4 border-2 cursor-pointer transition-all hover:shadow-lg ${
                  dadosEmpresa.metodoEntrada === 'manual' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setDadosEmpresa(prev => ({...prev, metodoEntrada: 'manual'}))}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">📝</div>
                  <div className="font-semibold text-blue-600 mb-2">Manual</div>
                  <div className="text-sm text-gray-600">Digite todos os dados manualmente</div>
                </div>
              </Card>

              {/* SPED */}
              <Card 
                className={`p-4 border-2 cursor-pointer transition-all hover:shadow-lg ${
                  dadosEmpresa.metodoEntrada === 'sped' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                }`}
                onClick={() => setDadosEmpresa(prev => ({...prev, metodoEntrada: 'sped'}))}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-semibold text-green-600 mb-2">SPED Real</div>
                  <div className="text-sm text-gray-600">Upload dos arquivos EFD</div>
                </div>
              </Card>

              {/* Simulação */}
              <Card 
                className={`p-4 border-2 cursor-pointer transition-all hover:shadow-lg ${
                  dadosEmpresa.metodoEntrada === 'simulacao' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                }`}
                onClick={() => setDadosEmpresa(prev => ({...prev, metodoEntrada: 'simulacao'}))}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="font-semibold text-purple-600 mb-2">Simulação</div>
                  <div className="text-sm text-gray-600">Dados fictícios por perfil</div>
                </div>
              </Card>
            </div>

            {/* Interface SPED */}
            {dadosEmpresa.metodoEntrada === 'sped' && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-700 mb-4">📊 Upload de Arquivos SPED</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sped-icms">EFD ICMS/IPI (.txt) *</Label>
                        <Input
                          id="sped-icms"
                          type="file"
                          accept=".txt"
                          className="bg-white"
                          onChange={(e) => setArquivosSPED(prev => ({...prev, icms: e.target.files[0]}))}
                        />
                        {arquivosSPED.icms && (
                          <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span>{arquivosSPED.icms.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="sped-contrib">EFD-Contribuições (.txt) *</Label>
                        <Input
                          id="sped-contrib"
                          type="file"
                          accept=".txt"
                          className="bg-white"
                          onChange={(e) => setArquivosSPED(prev => ({...prev, contribuicoes: e.target.files[0]}))}
                        />
                        {arquivosSPED.contribuicoes && (
                          <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span>{arquivosSPED.contribuicoes.name}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button 
                      onClick={processarArquivosSPED} 
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={!arquivosSPED.icms || !arquivosSPED.contribuicoes}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      🔄 Processar Arquivos SPED
                    </Button>

                    {arquivosSPED.processado && (
                      <div className="bg-green-100 border-2 border-green-300 p-4 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                          <CheckCircle className="w-5 h-5" />
                          <span>SPED Processado com Sucesso!</span>
                        </div>
                        <div className="text-sm text-green-600 space-y-1">
                          <div>📦 {arquivosSPED.dadosProcessados.produtos.length} produtos processados</div>
                          <div>🏢 {arquivosSPED.dadosProcessados.servicos.length} serviços processados</div>
                          <div>✅ {arquivosSPED.dadosProcessados.validacao.registros} registros válidos</div>
                          <div>💰 R$ {arquivosSPED.dadosProcessados.validacao.totalReceitas?.toLocaleString('pt-BR', {minimumFractionDigits: 2}) || '0,00'} em receitas</div>
                        </div>
                      </div>
                    )}

                    <div className="text-sm text-green-700 bg-green-100 p-3 rounded">
                      <strong>Registros processados:</strong><br/>
                      • C170 - Vendas de mercadorias (NCM)<br/>
                      • D101 - Serviços (códigos LC 116/03)<br/>
                      • M200 - Receitas PIS/COFINS<br/>
                      • M600 - Créditos PIS/COFINS
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Interface Simulação */}
            {dadosEmpresa.metodoEntrada === 'simulacao' && (
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h4 className="font-semibold text-purple-700 mb-4">🎯 Simulação de Dados</h4>
                    <p className="text-sm text-purple-600 mb-4">
                      Será gerado um conjunto de dados fictícios baseado no regime tributário e atividade selecionados.
                    </p>
                    <Button 
                      onClick={simularDados} 
                      className="bg-purple-600 hover:bg-purple-700"
                      disabled={!dadosEmpresa.regimeTributario || !dadosEmpresa.atividade}
                    >
                      🎮 Aplicar Simulação
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Renderizar aba de receitas
  const renderReceitasTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>💰</span> Receitas 
            {arquivosSPED.processado && (
              <Badge className="bg-green-100 text-green-800">Auto-preenchido via SPED</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vendasInternas">Vendas Internas (R$)</Label>
              <Input
                id="vendasInternas"
                type="number"
                value={receitas.vendasInternas}
                onChange={(e) => setReceitas(prev => ({...prev, vendasInternas: e.target.value}))}
                placeholder="0,00"
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="aliquotaICMSInternas">Alíquota ICMS Internas (%)</Label>
              <Input
                id="aliquotaICMSInternas"
                type="number"
                value={receitas.aliquotaICMSInternas}
                onChange={(e) => setReceitas(prev => ({...prev, aliquotaICMSInternas: e.target.value}))}
                placeholder="18"
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="vendasInterestaduais">Vendas Interestaduais (R$)</Label>
              <Input
                id="vendasInterestaduais"
                type="number"
                value={receitas.vendasInterestaduais}
                onChange={(e) => setReceitas(prev => ({...prev, vendasInterestaduais: e.target.value}))}
                placeholder="0,00"
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="aliquotaICMSInterestaduais">Alíquota ICMS Interestaduais (%)</Label>
              <Input
                id="aliquotaICMSInterestaduais"
                type="number"
                value={receitas.aliquotaICMSInterestaduais}
                onChange={(e) => setReceitas(prev => ({...prev, aliquotaICMSInterestaduais: e.target.value}))}
                placeholder="12"
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="exportacoes">Exportações (R$)</Label>
              <Input
                id="exportacoes"
                type="number"
                value={receitas.exportacoes}
                onChange={(e) => setReceitas(prev => ({...prev, exportacoes: e.target.value}))}
                placeholder="0,00"
                className="bg-white"
              />
            </div>
            <div>
              <Label>Exportações (Sem impostos)</Label>
              <div className="p-2 bg-green-50 rounded text-sm text-green-700">
                PIS/COFINS isentos para exportação
              </div>
            </div>
            <div>
              <Label htmlFor="vendasIPI">Vendas IPI (R$)</Label>
              <Input
                id="vendasIPI"
                type="number"
                value={receitas.vendasIPI}
                onChange={(e) => setReceitas(prev => ({...prev, vendasIPI: e.target.value}))}
                placeholder="0,00"
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="aliquotaIPI">Alíquota IPI (%)</Label>
              <Input
                id="aliquotaIPI"
                type="number"
                value={receitas.aliquotaIPI}
                onChange={(e) => setReceitas(prev => ({...prev, aliquotaIPI: e.target.value}))}
                placeholder="10"
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="servicosMunicipio">Serviços no Município (R$)</Label>
              <Input
                id="servicosMunicipio"
                type="number"
                value={receitas.servicosMunicipio}
                onChange={(e) => setReceitas(prev => ({...prev, servicosMunicipio: e.target.value}))}
                placeholder="0,00"
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="aliquotaISS">Alíquota ISS (%)</Label>
              <Input
                id="aliquotaISS"
                type="number"
                value={receitas.aliquotaISS}
                onChange={(e) => setReceitas(prev => ({...prev, aliquotaISS: e.target.value}))}
                placeholder="5"
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="servicosOutros">Serviços Outros Municípios (R$)</Label>
              <Input
                id="servicosOutros"
                type="number"
                value={receitas.servicosOutrosMunicipios}
                onChange={(e) => setReceitas(prev => ({...prev, servicosOutrosMunicipios: e.target.value}))}
                placeholder="0,00"
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="receitasFinanceiras">Receitas Financeiras (R$)</Label>
              <Input
                id="receitasFinanceiras"
                type="number"
                value={receitas.receitasFinanceiras}
                onChange={(e) => setReceitas(prev => ({...prev, receitasFinanceiras: e.target.value}))}
                placeholder="0,00"
                className="bg-white"
              />
            </div>
          </div>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-700">
                  R$ {calcularFaturamentoTotal().toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                </div>
                <div className="text-sm text-blue-600">Faturamento Total Calculado</div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );

  // Renderizar aba de custos
  const renderCustosTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>💸</span> Custos 
            {arquivosSPED.processado && (
              <Badge className="bg-green-100 text-green-800">Auto-preenchido via SPED</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="aquisicoesRevenda">Aquisições para Revenda (R$)</Label>
              <Input
                id="aquisicoesRevenda"
                type="number"
                value={custos.aquisicoesRevenda}
                onChange={(e) => setCustos(prev => ({...prev, aquisicoesRevenda: e.target.value}))}
                placeholder="0,00"
                className="bg-white"
              />
            </div>
            <div>
              <Label>Base para Créditos</Label>
              <div className="p-2 bg-green-50 rounded text-sm text-green-700">
                Gera créditos ICMS/PIS/COFINS
              </div>
            </div>
            <div>
              <Label htmlFor="materiasPrimas">Matérias-Primas (R$)</Label>
              <Input
                id="materiasPrimas"
                type="number"
                value={custos.materiasPrimas}
                onChange={(e) => setCustos(prev => ({...prev, materiasPrimas: e.target.value}))}
                placeholder="0,00"
                className="bg-white"
              />
            </div>
            <div>
              <Label>Para Indústrias</Label>
              <div className="p-2 bg-blue-50 rounded text-sm text-blue-700">
                Créditos IPI para industrialização
              </div>
            </div>
            <div>
              <Label htmlFor="energiaEletrica">Energia Elétrica (R$)</Label>
              <Input
                id="energiaEletrica"
                type="number"
                value={custos.energiaEletrica}
                onChange={(e) => setCustos(prev => ({...prev, energiaEletrica: e.target.value}))}
                placeholder="0,00"
                className="bg-white"
              />
            </div>
            <div>
              <Label>Crédito Múltiplo</Label>
              <div className="p-2 bg-purple-50 rounded text-sm text-purple-700">
                ICMS + PIS + COFINS
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Saldos Anteriores</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="saldoICMS">Saldo Anterior ICMS (R$)</Label>
                <Input
                  id="saldoICMS"
                  type="number"
                  value={custos.saldoAnteriorICMS}
                  onChange={(e) => setCustos(prev => ({...prev, saldoAnteriorICMS: e.target.value}))}
                  placeholder="0,00"
                  className="bg-white"
                />
              </div>
              <div>
                <Label htmlFor="saldoPIS">Saldo Anterior PIS (R$)</Label>
                <Input
                  id="saldoPIS"
                  type="number"
                  value={custos.saldoAnteriorPIS}
                  onChange={(e) => setCustos(prev => ({...prev, saldoAnteriorPIS: e.target.value}))}
                  placeholder="0,00"
                  className="bg-white"
                />
              </div>
              <div>
                <Label htmlFor="saldoCOFINS">Saldo Anterior COFINS (R$)</Label>
                <Input
                  id="saldoCOFINS"
                  type="number"
                  value={custos.saldoAnteriorCOFINS}
                  onChange={(e) => setCustos(prev => ({...prev, saldoAnteriorCOFINS: e.target.value}))}
                  placeholder="0,00"
                  className="bg-white"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // ========= 🔥 NOVA ABA PRODUTOS E SERVIÇOS CORRIGIDA =========
  const renderProdutosTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🛍️</span> Produtos e Serviços (Detalhamento SPED)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {arquivosSPED.processado ? (
            <div className="space-y-6">
              {/* Resumo por Categoria */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 bg-green-50 border-green-200">
                  <div className="text-center">
                    <div className="text-green-600 font-semibold mb-2">🛒 Cesta Básica</div>
                    <div className="text-xl font-bold text-green-700">
                      R$ {(arquivosSPED.dadosProcessados.totalPorCategoria.cestaBasica || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                    </div>
                    <Badge className="bg-green-100 text-green-800 mt-2">0% IBS+CBS</Badge>
                    <div className="text-xs text-green-600 mt-1">
                      {((arquivosSPED.dadosProcessados.totalPorCategoria.cestaBasica || 0) / calcularFaturamentoTotal() * 100).toFixed(1)}% do faturamento
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="text-center">
                    <div className="text-blue-600 font-semibold mb-2">💊 Medicamentos/Agro</div>
                    <div className="text-xl font-bold text-blue-700">
                      R$ {(arquivosSPED.dadosProcessados.totalPorCategoria.medicamentos || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 mt-2">60% Redução</Badge>
                    <div className="text-xs text-blue-600 mt-1">
                      {((arquivosSPED.dadosProcessados.totalPorCategoria.medicamentos || 0) / calcularFaturamentoTotal() * 100).toFixed(1)}% do faturamento
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-purple-50 border-purple-200">
                  <div className="text-center">
                    <div className="text-purple-600 font-semibold mb-2">👨‍💼 Prof. Liberais</div>
                    <div className="text-xl font-bold text-purple-700">
                      R$ {(arquivosSPED.dadosProcessados.totalPorCategoria.profissionaisLiberais || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 mt-2">30% Redução</Badge>
                    <div className="text-xs text-purple-600 mt-1">
                      {((arquivosSPED.dadosProcessados.totalPorCategoria.profissionaisLiberais || 0) / calcularFaturamentoTotal() * 100).toFixed(1)}% do faturamento
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-orange-50 border-orange-200">
                  <div className="text-center">
                    <div className="text-orange-600 font-semibold mb-2">📊 Demais</div>
                    <div className="text-xl font-bold text-orange-700">
                      R$ {(arquivosSPED.dadosProcessados.totalPorCategoria.padrao || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                    </div>
                    <Badge className="bg-orange-100 text-orange-800 mt-2">Alíquota Padrão</Badge>
                    <div className="text-xs text-orange-600 mt-1">
                      {((arquivosSPED.dadosProcessados.totalPorCategoria.padrao || 0) / calcularFaturamentoTotal() * 100).toFixed(1)}% do faturamento
                    </div>
                  </div>
                </Card>
              </div>

              {/* Tabela de Produtos */}
              {arquivosSPED.dadosProcessados.produtos.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">📦 Produtos Processados (NCM)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 p-2 text-left">NCM</th>
                            <th className="border border-gray-300 p-2 text-left">Descrição</th>
                            <th className="border border-gray-300 p-2 text-left">CFOP</th>
                            <th className="border border-gray-300 p-2 text-left">Valor (R$)</th>
                            <th className="border border-gray-300 p-2 text-left">Benefício</th>
                            <th className="border border-gray-300 p-2 text-left">Alíq. Atual</th>
                            <th className="border border-gray-300 p-2 text-left">Alíq. Reforma</th>
                            <th className="border border-gray-300 p-2 text-left">Economia</th>
                          </tr>
                        </thead>
                        <tbody>
                          {arquivosSPED.dadosProcessados.produtos.slice(0, 10).map((produto, index) => (
                            <tr key={index}>
                              <td className="border border-gray-300 p-2">{produto.ncm}</td>
                              <td className="border border-gray-300 p-2">{produto.descricao}</td>
                              <td className="border border-gray-300 p-2">{produto.cfop}</td>
                              <td className="border border-gray-300 p-2">R$ {produto.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                              <td className="border border-gray-300 p-2">
                                <Badge className={`
                                  ${produto.categoria === 'aliquotaZero' ? 'bg-green-100 text-green-800' : ''}
                                  ${produto.categoria === 'reducao60' ? 'bg-blue-100 text-blue-800' : ''}
                                  ${produto.categoria === 'padrao' ? 'bg-orange-100 text-orange-800' : ''}
                                `}>
                                  {produto.reducao}% Red.
                                </Badge>
                              </td>
                              <td className="border border-gray-300 p-2">{produto.aliquotaICMS}%</td>
                              <td className="border border-gray-300 p-2">{produto.aliquotaReforma?.toFixed(2)}%</td>
                              <td className={`border border-gray-300 p-2 ${produto.economia > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                R$ {produto.economia.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {arquivosSPED.dadosProcessados.produtos.length > 10 && (
                        <div className="text-center mt-4 text-sm text-gray-600">
                          Mostrando 10 de {arquivosSPED.dadosProcessados.produtos.length} produtos. 
                          <Button variant="outline" size="sm" className="ml-2">Ver todos</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tabela de Serviços */}
              {arquivosSPED.dadosProcessados.servicos.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">🏢 Serviços Processados (LC 116/03)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 p-2 text-left">Código LC</th>
                            <th className="border border-gray-300 p-2 text-left">Descrição</th>
                            <th className="border border-gray-300 p-2 text-left">Valor (R$)</th>
                            <th className="border border-gray-300 p-2 text-left">Benefício</th>
                            <th className="border border-gray-300 p-2 text-left">Alíq. Atual</th>
                            <th className="border border-gray-300 p-2 text-left">Alíq. Reforma</th>
                            <th className="border border-gray-300 p-2 text-left">Economia</th>
                          </tr>
                        </thead>
                        <tbody>
                          {arquivosSPED.dadosProcessados.servicos.map((servico, index) => (
                            <tr key={index}>
                              <td className="border border-gray-300 p-2">{servico.codigo}</td>
                              <td className="border border-gray-300 p-2">{servico.descricao}</td>
                              <td className="border border-gray-300 p-2">R$ {servico.valor.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                              <td className="border border-gray-300 p-2">
                                <Badge className={`
                                  ${servico.categoria === 'reducao60' ? 'bg-blue-100 text-blue-800' : ''}
                                  ${servico.categoria === 'reducao30' ? 'bg-purple-100 text-purple-800' : ''}
                                  ${servico.categoria === 'padrao' ? 'bg-orange-100 text-orange-800' : ''}
                                `}>
                                  {servico.reducao}% Red.
                                </Badge>
                              </td>
                              <td className="border border-gray-300 p-2">{servico.aliquotaISS}%</td>
                              <td className="border border-gray-300 p-2">{servico.aliquotaReforma?.toFixed(2)}%</td>
                              <td className={`border border-gray-300 p-2 ${servico.economia > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                R$ {servico.economia.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Análise de Impacto */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-700">📊 Análise de Impacto da Reforma</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Economia Total Identificada:</span>
                      <span className="font-bold text-green-600">
                        R$ {(
                          [...arquivosSPED.dadosProcessados.produtos, ...arquivosSPED.dadosProcessados.servicos]
                          .reduce((sum, item) => sum + item.economia, 0)
                        ).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">% de Economia Total:</span>
                      <span className="font-bold text-blue-600">
                        {(
                          [...arquivosSPED.dadosProcessados.produtos, ...arquivosSPED.dadosProcessados.servicos]
                          .reduce((sum, item) => sum + item.economia, 0) / calcularFaturamentoTotal() * 100
                        ).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Produtos Mais Beneficiados:</span>
                      <span className="text-sm text-green-600">
                        {arquivosSPED.dadosProcessados.produtos
                          .filter(p => p.economia > 0)
                          .length} itens com redução
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Estado quando SPED não foi processado
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FileX className="mx-auto h-12 w-12" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Dados SPED não processados
              </h3>
              <p className="text-gray-600 mb-4">
                Para ver o detalhamento de produtos e serviços, configure o upload SPED na primeira aba.
              </p>
              <Button 
                onClick={() => setActiveTab('configuracao')} 
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                ⚙️ Configurar SPED
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  // Renderizar aba de resultados
  const renderResultadosTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📊</span> Resultados + SPED
            <div className="ml-auto flex gap-2">
              {!modoEdicao ? (
                <Button onClick={() => setModoEdicao(true)} variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Valores
                </Button>
              ) : (
                <>
                  <Button onClick={() => {
                    calcularImpostos();
                    setModoEdicao(false);
                  }} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar
                  </Button>
                  <Button onClick={() => setModoEdicao(false)} variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              🏛️ Sistema Atual - {dadosEmpresa.regimeTributario?.toUpperCase().replace('_', ' ')}
            </h3>
            
            {dadosEmpresa.regimeTributario === 'simples_nacional' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-blue-50 border-blue-200">
                  <div className="text-center">
                    <div className="text-blue-600 font-semibold mb-2 text-lg">📋 DAS - Simples Nacional</div>
                    {modoEdicao ? (
                      <Input
                        type="number"
                        value={resultadosEditaveis.totalDAS || resultados.totalAtual}
                        onChange={(e) => setResultadosEditaveis(prev => ({...prev, totalDAS: parseFloat(e.target.value) || 0}))}
                        className="text-center font-bold text-blue-600 bg-white text-2xl"
                      />
                    ) : (
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        R$ {resultados.totalAtual.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                      </div>
                    )}
                    <div className="text-sm text-blue-500 mb-3">
                      Alíquota: {obterAliquotaSimples()}% | Faturamento 12 meses: R$ {parseFloat(dadosEmpresa.faturamento12Meses || 0).toLocaleString('pt-BR')}
                    </div>
                    <div className="text-xs text-gray-600 bg-white p-2 rounded">
                      <strong>Composição do DAS:</strong><br/>
                      IRPJ, CSLL, PIS, COFINS, IPI, ICMS, ISS e CPP unificados
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6 bg-gray-50 border-gray-200">
                  <div className="text-center">
                    <div className="text-gray-600 font-semibold mb-2 text-lg">📊 Resumo Tributário</div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Faturamento do Período:</span>
                        <span className="font-semibold">R$ {calcularFaturamentoTotal().toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Carga Tributária:</span>
                        <span className="font-semibold">{(resultados.totalAtual / calcularFaturamentoTotal() * 100).toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Anexo Simples:</span>
                        <span className="font-semibold">
                          {dadosEmpresa.atividade === 'industria' ? 'II' : dadosEmpresa.atividade === 'servicos' ? 'III' : 'I'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Card className="p-4 bg-red-50 border-red-200">
                  <div className="text-center">
                    <div className="text-red-600 font-semibold mb-2">ICMS</div>
                    {modoEdicao ? (
                      <Input
                        type="number"
                        value={resultadosEditaveis.icms}
                        onChange={(e) => setResultadosEditaveis(prev => ({...prev, icms: parseFloat(e.target.value) || 0}))}
                        className="text-center font-bold text-red-600 bg-white"
                      />
                    ) : (
                      <div className="text-xl font-bold text-red-600">
                        R$ {resultados.icms.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                      </div>
                    )}
                  </div>
                </Card>
                <Card className="p-4 bg-orange-50 border-orange-200">
                  <div className="text-center">
                    <div className="text-orange-600 font-semibold mb-2">PIS</div>
                    {modoEdicao ? (
                      <Input
                        type="number"
                        value={resultadosEditaveis.pis}
                        onChange={(e) => setResultadosEditaveis(prev => ({...prev, pis: parseFloat(e.target.value) || 0}))}
                        className="text-center font-bold text-orange-600 bg-white"
                      />
                    ) : (
                      <div className="text-xl font-bold text-orange-600">
                        R$ {resultados.pis.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                      </div>
                    )}
                  </div>
                </Card>
                <Card className="p-4 bg-purple-50 border-purple-200">
                  <div className="text-center">
                    <div className="text-purple-600 font-semibold mb-2">COFINS</div>
                    {modoEdicao ? (
                      <Input
                        type="number"
                        value={resultadosEditaveis.cofins}
                        onChange={(e) => setResultadosEditaveis(prev => ({...prev, cofins: parseFloat(e.target.value) || 0}))}
                        className="text-center font-bold text-purple-600 bg-white"
                      />
                    ) : (
                      <div className="text-xl font-bold text-purple-600">
                        R$ {resultados.cofins.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                      </div>
                    )}
                  </div>
                </Card>
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="text-center">
                    <div className="text-blue-600 font-semibold mb-2">IPI</div>
                    {modoEdicao ? (
                      <Input
                        type="number"
                        value={resultadosEditaveis.ipi}
                        onChange={(e) => setResultadosEditaveis(prev => ({...prev, ipi: parseFloat(e.target.value) || 0}))}
                        className="text-center font-bold text-blue-600 bg-white"
                      />
                    ) : (
                      <div className="text-xl font-bold text-blue-600">
                        R$ {resultados.ipi.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                      </div>
                    )}
                  </div>
                </Card>
                <Card className="p-4 bg-green-50 border-green-200">
                  <div className="text-center">
                    <div className="text-green-600 font-semibold mb-2">ISS</div>
                    {modoEdicao ? (
                      <Input
                        type="number"
                        value={resultadosEditaveis.iss}
                        onChange={(e) => setResultadosEditaveis(prev => ({...prev, iss: parseFloat(e.target.value) || 0}))}
                        className="text-center font-bold text-green-600 bg-white"
                      />
                    ) : (
                      <div className="text-xl font-bold text-green-600">
                        R$ {resultados.iss.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                      </div>
                    )}
                  </div>
                </Card>
                <Card className="p-4 bg-gray-50 border-gray-200">
                  <div className="text-center">
                    <div className="text-gray-600 font-semibold mb-2">TOTAL ATUAL</div>
                    <div className="text-xl font-bold text-gray-700">
                      R$ {(modoEdicao ? Object.values(resultadosEditaveis).reduce((sum, val) => sum + val, 0) : resultados.totalAtual).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                    </div>
                    <div className="text-sm text-gray-500">
                      {((modoEdicao ? Object.values(resultadosEditaveis).reduce((sum, val) => sum + val, 0) : resultados.totalAtual) / calcularFaturamentoTotal() * 100).toFixed(2)}% do faturamento
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center gap-2 mb-4">
              <span>📋</span>
              <span className="font-semibold">Validação SPED Real v3.0</span>
              <Badge variant="outline" className={`${
                arquivosSPED.processado ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
              }`}>
                {arquivosSPED.processado ? 'CONFORME' : 'MANUAL'}
              </Badge>
            </div>
            <div className="text-sm text-gray-600">
              {arquivosSPED.processado ? (
                <>
                  ✅ Registros validados: {arquivosSPED.dadosProcessados.validacao.registros} itens processados
                  <br />
                  ✅ Produtos com benefícios: {arquivosSPED.dadosProcessados.produtos.filter(p => p.reducao > 0).length} itens
                  <br />
                  ✅ Receitas totalizadas: R$ {arquivosSPED.dadosProcessados.validacao.totalReceitas?.toLocaleString('pt-BR', {minimumFractionDigits: 2}) || '0,00'}
                </>
              ) : (
                <>
                  ⚠️ Dados inseridos manualmente - sem validação SPED
                  <br />
                  💡 Configure upload SPED na primeira aba para validação automática
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Renderizar aba de reforma tributária
  const renderReformaTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🏛️</span> Reforma Tributária (Impactos)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="p-6 border-2 border-orange-200 bg-orange-50">
              <div className="text-center">
                <div className="text-orange-600 font-semibold mb-2 flex items-center justify-center gap-2">
                  🏛️ Sistema Atual ({dadosEmpresa.regimeTributario?.replace('_', ' ')})
                </div>
                <div className="text-3xl font-bold text-orange-700 mb-2">
                  R$ {resultados.totalAtual.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                </div>
                <div className="text-sm text-orange-600">
                  {((resultados.totalAtual / calcularFaturamentoTotal()) * 100).toFixed(2)}% do faturamento
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-purple-200 bg-purple-50">
              <div className="text-center">
                <div className="text-purple-600 font-semibold mb-2 flex items-center justify-center gap-2">
                  🔄 Reforma Tributária (2034)
                </div>
                <div className="text-3xl font-bold text-purple-700 mb-2">
                  R$ {resultados.totalReforma.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                </div>
                <div className="text-sm text-purple-600">
                  {arquivosSPED.processado ? 'Cálculo com benefícios específicos' : '27,97% do faturamento (estimativa)'}
                </div>
              </div>
            </Card>
          </div>

          <Card className={`p-6 border-2 ${resultados.diferenca >= 0 ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
            <div className="text-center">
              <div className={`font-semibold mb-2 ${resultados.diferenca >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                💰 DIFERENÇA TOTAL
              </div>
              <div className={`text-4xl font-bold mb-2 ${resultados.diferenca >= 0 ? 'text-red-700' : 'text-green-700'}`}>
                {resultados.diferenca >= 0 ? '+' : ''}R$ {resultados.diferenca.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
              </div>
              <div className={`text-lg ${resultados.diferenca >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                {Math.abs(resultados.percentualImpacto).toFixed(1)}% de {resultados.diferenca >= 0 ? 'acréscimo' : 'redução'}
              </div>
              <div className={`text-sm mt-2 ${resultados.diferenca >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                {resultados.diferenca >= 0 ? '⚠️ ATENÇÃO NECESSÁRIA' : '✅ OPORTUNIDADE DE ECONOMIA'}
              </div>
            </div>
          </Card>

          {/* Análise Split Payment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <span>💳</span> Split Payment - Impacto no Fluxo de Caixa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg mb-6">
                <h3 className="text-red-700 font-semibold mb-4">⚠️ IMPACTO REAL NO FLUXO DE CAIXA:</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span><strong>ANTES:</strong> Cliente paga R$ {calcularFaturamentoTotal().toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    <span>→ Empresa recebe R$ {calcularFaturamentoTotal().toLocaleString('pt-BR', {minimumFractionDigits: 2})} no caixa</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>DEPOIS:</strong> Cliente paga R$ {calcularFaturamentoTotal().toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                    <span>→ R$ {(calcularFaturamentoTotal() * 0.2797).toLocaleString('pt-BR', {minimumFractionDigits: 2})} vão direto para o governo</span>
                  </div>
                  <div className="border-t pt-3 text-red-700 font-semibold">
                    <div className="flex justify-between">
                      <span>RESULTADO:</span>
                      <span>Empresa recebe apenas R$ {(calcularFaturamentoTotal() * 0.7203).toLocaleString('pt-BR', {minimumFractionDigits: 2})} no caixa</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="p-4 bg-red-50 border-red-200">
                  <div className="text-center">
                    <div className="text-red-600 font-semibold mb-2">💸 Redução no Fluxo</div>
                    <div className="text-xl font-bold text-red-700">
                      R$ {(calcularFaturamentoTotal() * 0.2797).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                    </div>
                    <div className="text-xs text-red-600 mt-1">Por mês</div>
                  </div>
                </Card>
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="text-center">
                    <div className="text-blue-600 font-semibold mb-2">💰 Capital Necessário</div>
                    <div className="text-xl font-bold text-blue-700">
                      R$ {(calcularFaturamentoTotal() * 0.2797 * 3).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                    </div>
                    <div className="text-xs text-blue-600 mt-1">3 meses de capital</div>
                  </div>
                </Card>
                <Card className="p-4 bg-orange-50 border-orange-200">
                  <div className="text-center">
                    <div className="text-orange-600 font-semibold mb-2">📊 Custo Financeiro</div>
                    <div className="text-xl font-bold text-orange-700">30,0% a.a.</div>
                    <div className="text-xs text-orange-600 mt-1">CDI + Spread</div>
                  </div>
                </Card>
                <Card className="p-4 bg-purple-50 border-purple-200">
                  <div className="text-center">
                    <div className="text-purple-600 font-semibold mb-2">💔 Custo Total Anual</div>
                    <div className="text-xl font-bold text-purple-700">
                      R$ {(calcularFaturamentoTotal() * 0.2797 * 3 * 0.30).toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                    </div>
                    <div className="text-xs text-purple-600 mt-1">Custo do capital</div>
                  </div>
                </Card>
              </div>

              {/* Estratégias de Mitigação */}
              <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-lg">
                <h4 className="text-yellow-700 font-semibold mb-3">🛡️ ESTRATÉGIAS DE MITIGAÇÃO:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-red-100 p-3 rounded">
                    <h5 className="font-semibold text-red-700 mb-2">🚨 URGENTE (6 meses)</h5>
                    <ul className="space-y-1 text-red-600">
                      <li>• Negociar linha de crédito específica</li>
                      <li>• Revisar prazos com fornecedores</li>
                      <li>• Implementar gestão rigorosa de caixa</li>
                    </ul>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <h5 className="font-semibold text-orange-700 mb-2">⚠️ IMPORTANTE (6-12 meses)</h5>
                    <ul className="space-y-1 text-orange-600">
                      <li>• Reestruturar preços considerando Split Payment</li>
                      <li>• Diversificar formas de recebimento</li>
                      <li>• Negociar desconto por pagamento antecipado</li>
                    </ul>
                  </div>
                  <div className="bg-blue-100 p-3 rounded">
                    <h5 className="font-semibold text-blue-700 mb-2">🔮 PREVENTIVO (12+ meses)</h5>
                    <ul className="space-y-1 text-blue-600">
                      <li>• Constituir reserva para transição</li>
                      <li>• Avaliar impacto na precificação</li>
                      <li>• Preparar estrutura para 2027</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cronograma da Reforma */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>📅</span> Cronograma da Reforma Tributária (2023-2033)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-700 mb-2">1. Aprovação e Regulamentação (2023–2025)</h4>
                  <p className="text-sm text-blue-600">
                    <strong>20/12/2023:</strong> EC nº 132/2023 • <strong>16/01/2025:</strong> LC nº 214/2025 • <strong>2025:</strong> Regulamentação detalhada
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-700 mb-2">2. Testes (2026)</h4>
                  <p className="text-sm text-green-600">
                    <strong>CBS:</strong> 0,9% • <strong>IBS:</strong> 0,1% • Simulações sem recolhimento efetivo
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-700 mb-2">3. Início da Cobrança (2027–2028)</h4>
                  <p className="text-sm text-orange-600">
                    <strong>2027:</strong> CBS substitui PIS/COFINS + Imposto Seletivo • <strong>2028:</strong> Consolidação
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-700 mb-2">4. Transição IBS (2029–2032)</h4>
                  <p className="text-sm text-purple-600">
                    <strong>2029:</strong> 10% IBS • <strong>2030:</strong> 20% • <strong>2031:</strong> 30% • <strong>2032:</strong> 40%
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-700 mb-2">5. Conclusão (2033)</h4>
                  <p className="text-sm text-red-600">
                    <strong>Janeiro/2033:</strong> Vigência plena • Extinção ICMS/ISS/IPI • Sistema: CBS + IBS + Seletivo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );

  // ========= 🔥 CHAT IA PERSONALIZADO =========
  const enviarMensagemIA = async () => {
    if (!novaMensagem.trim()) return;

    const mensagemUsuario = { tipo: 'usuario', texto: novaMensagem };
    setMensagens(prev => [...prev, mensagemUsuario]);
    setCarregandoIA(true);
    setNovaMensagem('');

    try {
      const contexto = {
        empresa: dadosEmpresa.nome || 'Empresa não informada',
        cnpj: dadosEmpresa.cnpj || 'CNPJ não informado',
        regime: dadosEmpresa.regimeTributario || 'Regime não informado',
        faturamento: calcularFaturamentoTotal(),
        impostos: resultados,
        spedProcessado: arquivosSPED.processado,
        beneficiosIdentificados: arquivosSPED.processado ? {
          produtos: arquivosSPED.dadosProcessados.produtos.length,
          servicos: arquivosSPED.dadosProcessados.servicos.length,
          economia: [...arquivosSPED.dadosProcessados.produtos, ...arquivosSPED.dadosProcessados.servicos]
            .reduce((sum, item) => sum + item.economia, 0)
        } : null,
        pergunta: novaMensagem
      };

      const response = await fetch('https://n8nwebhook.consultor-ia.io/webhook/calculadora-tributaria-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contexto)
      });

      if (response.ok) {
        const resultado = await response.json();
        let respostaIA = '';
        
        if (Array.isArray(resultado) && resultado.length > 0 && resultado[0].response) {
          respostaIA = resultado[0].response;
        } else if (resultado.response) {
          respostaIA = resultado.response;
        } else {
          throw new Error('Formato de resposta inválido');
        }

        const mensagemIA = { tipo: 'ia', texto: respostaIA };
        setMensagens(prev => [...prev, mensagemIA]);
      } else {
        throw new Error('Erro na resposta do webhook');
      }
    } catch (error) {
      console.error('Erro ao enviar para IA:', error);
      
      const respostaFallback = `Olá! Sou o Contador IA v3.0 especialista em Reforma Tributária.

Para ${dadosEmpresa.nome || 'sua empresa'} (${dadosEmpresa.regimeTributario || 'regime não informado'}), posso ajudar com:

📊 **Análise do impacto da reforma tributária**
🔄 **Comparação entre regimes tributários**  
💡 **Estratégias de otimização fiscal**
💳 **Planejamento para o Split Payment**
📅 **Cronograma de implementação da reforma**

${arquivosSPED.processado ? `✅ **Dados SPED detectados!**
• ${arquivosSPED.dadosProcessados.produtos.length} produtos processados
• ${arquivosSPED.dadosProcessados.servicos.length} serviços processados  
• Benefícios específicos identificados` : '⚠️ Recomendo configurar upload SPED para análise mais precisa'}

Como posso ajudar especificamente com: "${novaMensagem}"?`;

      const mensagemIA = { tipo: 'ia', texto: respostaFallback };
      setMensagens(prev => [...prev, mensagemIA]);
    } finally {
      setCarregandoIA(false);
    }
  };

  // Renderizar chat IA
  const renderChatIA = () => (
    <div className={`fixed bottom-20 right-8 w-96 bg-white rounded-lg shadow-2xl border-2 border-blue-200 z-50 ${chatAberto ? 'block' : 'hidden'}`}>
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <div className="font-semibold flex items-center gap-2">
            <span>🤖</span> Contador IA v3.0
          </div>
          <div className="text-sm opacity-90">Especialista em Reforma Tributária</div>
        </div>
        <Button
          onClick={() => setChatAberto(false)}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-blue-700"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-4 bg-blue-50">
        <div className="text-sm">
          <div className="flex items-center gap-2 mb-2">
            <span>👋</span>
            <span className="font-semibold">Olá! Análises personalizadas para {dadosEmpresa.nome || 'sua empresa'}</span>
          </div>
          {arquivosSPED.processado && (
            <div className="bg-green-100 p-2 rounded text-green-700 text-xs mb-2">
              ✅ SPED processado - análises específicas disponíveis!
            </div>
          )}
          <div className="text-xs text-blue-600">
            Estou aqui para ajudar com análises específicas baseadas nos seus dados reais.
          </div>
        </div>
      </div>

      <div className="h-64 overflow-y-auto p-4 space-y-3">
        {mensagens.map((msg, index) => (
          <div key={index} className={`flex ${msg.tipo === 'usuario' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.tipo === 'usuario' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              <div className="text-sm whitespace-pre-wrap">{msg.texto}</div>
            </div>
          </div>
        ))}
        {carregandoIA && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="text-sm">Analisando seus dados...</div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={novaMensagem}
            onChange={(e) => setNovaMensagem(e.target.value)}
            placeholder="Digite sua pergunta sobre sua empresa..."
            className="bg-white"
            onKeyPress={(e) => e.key === 'Enter' && enviarMensagemIA()}
          />
          <Button onClick={enviarMensagemIA} disabled={carregandoIA} className="bg-blue-600 hover:bg-blue-700">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // ========= 🔥 FUNÇÃO PARA GERAR RELATÓRIO HTML COMPLETO =========
  const gerarRelatorioHTML = async () => {
    const faturamentoTotal = calcularFaturamentoTotal();
    const dataAtual = new Date().toLocaleString('pt-BR');
    
    // Calcular economia total dos benefícios identificados
    const economiaTotal = arquivosSPED.processado ? 
      [...arquivosSPED.dadosProcessados.produtos, ...arquivosSPED.dadosProcessados.servicos]
        .reduce((sum, item) => sum + item.economia, 0) : 0;

    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório Executivo - ${dadosEmpresa.nome}</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background: #f5f7fa; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 15px; margin-bottom: 30px; text-align: center; }
        .header h1 { font-size: 2.5em; margin-bottom: 10px; }
        .header p { font-size: 1.2em; opacity: 0.9; }
        .empresa-info { background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
        .empresa-info div { text-align: center; }
        .empresa-info strong { display: block; font-size: 0.9em; opacity: 0.8; }
        .empresa-info span { font-size: 1.1em; font-weight: bold; }
        .section { background: white; padding: 30px; border-radius: 15px; margin-bottom: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .section h2 { color: #2c3e50; margin-bottom: 20px; font-size: 1.8em; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
        .resumo-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .card { padding: 25px; border-radius: 12px; text-align: center; border: 3px solid; }
        .card h3 { font-size: 1.1em; margin-bottom: 10px; opacity: 0.8; }
        .card .valor { font-size: 2.2em; font-weight: bold; margin-bottom: 5px; }
        .card .descricao { font-size: 0.9em; opacity: 0.7; }
        .card.atual { background: #fff3cd; border-color: #ffc107; color: #856404; }
        .card.reforma { background: #e7e3ff; border-color: #6f42c1; color: #4a2c7a; }
        .card.impacto { background: ${resultados.diferenca >= 0 ? '#f8d7da; border-color: #dc3545; color: #721c24;' : '#d4edda; border-color: #28a745; color: #155724;'} }
        .card.split { background: #d1ecf1; border-color: #17a2b8; color: #0c5460; }
        .charts-container { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0; }
        .chart-box { background: #f8f9fa; padding: 20px; border-radius: 10px; }
        .chart-box h3 { text-align: center; margin-bottom: 15px; color: #495057; }
        .sped-status { background: ${arquivosSPED.processado ? '#d4edda' : '#fff3cd'}; border-left: 5px solid ${arquivosSPED.processado ? '#28a745' : '#ffc107'}; padding: 25px; border-radius: 0 10px 10px 0; }
        .footer { background: #2c3e50; color: white; padding: 30px; border-radius: 15px; text-align: center; }
        .footer h3 { margin-bottom: 15px; }
        .footer p { margin-bottom: 10px; }
        .footer a { color: #3498db; text-decoration: none; }
        .footer a:hover { text-decoration: underline; }
        .actions { text-align: center; margin: 30px 0; }
        .btn { background: #3498db; color: white; padding: 12px 25px; border: none; border-radius: 8px; cursor: pointer; margin: 0 10px; font-size: 1em; }
        .btn:hover { background: #2980b9; }
        .btn.success { background: #27ae60; }
        .btn.success:hover { background: #229954; }
        @media (max-width: 768px) {
            .charts-container { grid-template-columns: 1fr; }
            .resumo-cards { grid-template-columns: 1fr; }
            .empresa-info { grid-template-columns: 1fr; }
        }
        @media print {
            body { background: white; }
            .actions { display: none; }
            .section { box-shadow: none; border: 1px solid #ddd; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Relatório Executivo da Reforma Tributária v3.0</h1>
            <p>Análise Completa: Sistema Atual • Reforma Tributária • Split Payment • SPED Real</p>
            <div class="empresa-info">
                <div><strong>Empresa</strong><span>${dadosEmpresa.nome}</span></div>
                <div><strong>CNPJ</strong><span>${dadosEmpresa.cnpj}</span></div>
                <div><strong>Responsável</strong><span>${dadosEmpresa.responsavel}</span></div>
                <div><strong>Data Relatório</strong><span>${dataAtual}</span></div>
                <div><strong>Método</strong><span>${arquivosSPED.processado ? 'SPED Real' : 'Manual'}</span></div>
                <div><strong>Regime</strong><span>${dadosEmpresa.regimeTributario?.replace('_', ' ')}</span></div>
            </div>
        </div>

        <div class="section">
            <h2>📊 RESUMO EXECUTIVO</h2>
            <div class="resumo-cards">
                <div class="card atual">
                    <h3>🏛️ Sistema Atual</h3>
                    <div class="valor">R$ ${resultados.totalAtual.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                    <div class="descricao">${((resultados.totalAtual / faturamentoTotal) * 100).toFixed(2)}% do faturamento<br>${dadosEmpresa.regimeTributario?.toUpperCase().replace('_', ' ')}</div>
                </div>
                <div class="card reforma">
                    <h3>🔄 Reforma Tributária</h3>
                    <div class="valor">R$ ${resultados.totalReforma.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                    <div class="descricao">${arquivosSPED.processado ? 'Com benefícios específicos' : '27,97% estimativa'}<br>IBS + CBS UNIFICADO</div>
                </div>
                <div class="card impacto">
                    <h3>📈 Impacto Total</h3>
                    <div class="valor">${resultados.diferenca >= 0 ? '+' : ''}R$ ${resultados.diferenca.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                    <div class="descricao">${resultados.percentualImpacto.toFixed(1)}% de ${resultados.diferenca >= 0 ? 'acréscimo' : 'redução'}<br>${resultados.diferenca >= 0 ? 'ATENÇÃO NECESSÁRIA' : 'OPORTUNIDADE'}</div>
                </div>
                <div class="card split">
                    <h3>💳 Split Payment</h3>
                    <div class="valor">R$ ${(faturamentoTotal * 0.2797).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                    <div class="descricao">Impacto mensal no fluxo<br>Retenção automática</div>
                </div>
            </div>
        </div>

        ${arquivosSPED.processado ? `
        <div class="section">
            <div class="sped-status">
                <h3 style="color: #155724; margin-bottom: 15px;">✅ ANÁLISE SPED REAL PROCESSADA</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                    <div>
                        <strong>📦 Produtos:</strong> ${arquivosSPED.dadosProcessados.produtos.length} itens<br>
                        <strong>🏢 Serviços:</strong> ${arquivosSPED.dadosProcessados.servicos.length} itens
                    </div>
                    <div>
                        <strong>💰 Receitas:</strong> R$ ${(arquivosSPED.dadosProcessados.validacao.totalReceitas || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}<br>
                        <strong>✅ Registros:</strong> ${arquivosSPED.dadosProcessados.validacao.registros} válidos
                    </div>
                    <div>
                        <strong>🎯 Economia Identificada:</strong><br>
                        R$ ${economiaTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                    </div>
                </div>
            </div>
        </div>
        ` : ''}

        <div class="section">
            <div class="charts-container">
                <div class="chart-box">
                    <h3>Comparativo de Impostos</h3>
                    <canvas id="comparativoChart" width="400" height="300"></canvas>
                </div>
                <div class="chart-box">
                    <h3>${dadosEmpresa.regimeTributario === 'simples_nacional' ? 'DAS vs Reforma' : 'Distribuição Atual'}</h3>
                    <canvas id="distribuicaoChart" width="400" height="300"></canvas>
                </div>
            </div>
        </div>

        <div class="actions">
            <button class="btn success" onclick="gerarExcel()">📊 Baixar Excel Completo</button>
            <button class="btn" onclick="window.print()">🖨️ Imprimir Relatório</button>
        </div>

        <div class="footer">
            <h3>📞 SILVIO GONÇALVES - ESPECIALISTA EM CONTROLADORIA</h3>
            <p>Contador | MBA Gestão Empresarial - FGV | Especialização em Controladoria</p>
            <p>📧 <a href="mailto:consultor.ia.lendario@gmail.com">consultor.ia.lendario@gmail.com</a></p>
            <p>💼 <a href="https://linkedin.com/in/silvio-gonçalves-980b5b229" target="_blank">LinkedIn: silvio-gonçalves-980b5b229</a></p>
            <p style="margin-top: 20px; font-size: 0.9em; opacity: 0.8;">
                Relatório gerado em ${dataAtual} • Sistema v3.0 + IA Personalizada<br>
                ${arquivosSPED.processado ? 'Baseado em dados SPED reais com benefícios específicos identificados' : 'Baseado em dados informados manualmente'}
            </p>
        </div>
    </div>

    <script>
        // Gráfico Comparativo
        const ctx1 = document.getElementById('comparativoChart').getContext('2d');
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Sistema Atual', 'Reforma Tributária'],
                datasets: [{
                    label: 'Impostos (R$)',
                    data: [${resultados.totalAtual}, ${resultados.totalReforma}],
                    backgroundColor: ['#ffc107', '#6f42c1'],
                    borderColor: ['#e0a800', '#5a2d91'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'R$ ' + value.toLocaleString('pt-BR');
                            }
                        }
                    }
                }
            }
        });

        // Gráfico de Distribuição
        const ctx2 = document.getElementById('distribuicaoChart').getContext('2d');
        ${dadosEmpresa.regimeTributario === 'simples_nacional' ? `
        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['DAS Atual', 'Reforma (Estimativa)'],
                datasets: [{
                    data: [${resultados.totalAtual}, ${resultados.totalReforma}],
                    backgroundColor: ['#ffc107', '#6f42c1'],
                    borderWidth: 3,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });
        ` : `
        new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: ['ICMS', 'PIS', 'COFINS', 'ISS', 'IPI'],
                datasets: [{
                    data: [${resultados.icms}, ${resultados.pis}, ${resultados.cofins}, ${resultados.iss}, ${resultados.ipi}],
                    backgroundColor: ['#dc3545', '#fd7e14', '#6f42c1', '#198754', '#0dcaf0'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });
        `}

        // Função para gerar Excel
        function gerarExcel() {
            const wb = XLSX.utils.book_new();
            
            // Aba 1: Resumo Executivo
            const resumo = [
                ['RELATÓRIO EXECUTIVO - REFORMA TRIBUTÁRIA v3.0'],
                [''],
                ['Empresa:', '${dadosEmpresa.nome}'],
                ['CNPJ:', '${dadosEmpresa.cnpj}'],
                ['Responsável:', '${dadosEmpresa.responsavel}'],
                ['Data:', '${dataAtual}'],
                ['Método:', '${arquivosSPED.processado ? 'SPED Real' : 'Manual'}'],
                [''],
                ['RESUMO FINANCEIRO'],
                ['Sistema Atual:', 'R$ ${resultados.totalAtual.toLocaleString('pt-BR', {minimumFractionDigits: 2})}'],
                ['Reforma Tributária:', 'R$ ${resultados.totalReforma.toLocaleString('pt-BR', {minimumFractionDigits: 2})}'],
                ['Diferença:', 'R$ ${resultados.diferenca.toLocaleString('pt-BR', {minimumFractionDigits: 2})}'],
                ['Impacto (%):', '${resultados.percentualImpacto.toFixed(2)}%'],
                ${arquivosSPED.processado ? `['Economia SPED:', 'R$ ${economiaTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}']` : ''}
            ];
            const ws1 = XLSX.utils.aoa_to_sheet(resumo);
            XLSX.utils.book_append_sheet(wb, ws1, 'Resumo Executivo');

            ${arquivosSPED.processado ? `
            // Aba 2: Produtos SPED
            const produtos = [
                ['PRODUTOS PROCESSADOS - SPED'],
                [''],
                ['NCM', 'Descrição', 'CFOP', 'Valor (R$)', 'Categoria', 'Redução (%)', 'Alíq. Atual (%)', 'Alíq. Reforma (%)', 'Economia (R$)'],
                ...${JSON.stringify(arquivosSPED.dadosProcessados.produtos)}.map(p => [
                    p.ncm, p.descricao, p.cfop, p.valor.toFixed(2), p.categoria, p.reducao, 
                    p.aliquotaICMS.toFixed(2), p.aliquotaReforma?.toFixed(2) || '0.00', p.economia.toFixed(2)
                ])
            ];
            const ws2 = XLSX.utils.aoa_to_sheet(produtos);
            XLSX.utils.book_append_sheet(wb, ws2, 'Produtos SPED');

            // Aba 3: Serviços SPED
            const servicos = [
                ['SERVIÇOS PROCESSADOS - SPED'],
                [''],
                ['Código LC', 'Descrição', 'Valor (R$)', 'Categoria', 'Redução (%)', 'Alíq. Atual (%)', 'Alíq. Reforma (%)', 'Economia (R$)'],
                ...${JSON.stringify(arquivosSPED.dadosProcessados.servicos)}.map(s => [
                    s.codigo, s.descricao, s.valor.toFixed(2), s.categoria, s.reducao,
                    s.aliquotaISS.toFixed(2), s.aliquotaReforma?.toFixed(2) || '0.00', s.economia.toFixed(2)
                ])
            ];
            const ws3 = XLSX.utils.aoa_to_sheet(servicos);
            XLSX.utils.book_append_sheet(wb, ws3, 'Serviços SPED');
            ` : ''}

            // Salvar arquivo
            XLSX.writeFile(wb, 'RelatórioReformaTributária-${dadosEmpresa.nome.replace(/[^a-zA-Z0-9]/g, '')}-${new Date().toLocaleDateString('pt-BR').replace(/\//g, '_')}.xlsx');
        }
    </script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');

    setTimeout(() => {
      if (confirm('Relatório HTML aberto! Deseja baixar também a versão Excel?')) {
        // Excel será gerado pelo JavaScript no HTML
      }
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <CardContent className="pt-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
              <Calculator className="w-8 h-8" />
              🧮 Calculadora da Reforma Tributária v3.0
            </h1>
            <p className="text-blue-100">
              SPED Real + Benefícios Específicos + Split Payment + IA Personalizada
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navegação por abas */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="configuracao" className="flex items-center gap-2">
            <span>⚙️</span> Empresa + Método
          </TabsTrigger>
          <TabsTrigger value="receitas" className="flex items-center gap-2">
            <span>💰</span> Receitas
          </TabsTrigger>
          <TabsTrigger value="custos" className="flex items-center gap-2">
            <span>💸</span> Custos
          </TabsTrigger>
          <TabsTrigger value="produtos" className="flex items-center gap-2">
            <span>🛍️</span> Produtos/Serviços
          </TabsTrigger>
          <TabsTrigger value="resultados" className="flex items-center gap-2">
            <span>📊</span> Resultados + SPED
          </TabsTrigger>
          <TabsTrigger value="reforma" className="flex items-center gap-2">
            <span>🏛️</span> Reforma Tributária
          </TabsTrigger>
        </TabsList>

        <TabsContent value="configuracao">{renderConfiguracaoTab()}</TabsContent>
        <TabsContent value="receitas">{renderReceitasTab()}</TabsContent>
        <TabsContent value="custos">{renderCustosTab()}</TabsContent>
        <TabsContent value="produtos">{renderProdutosTab()}</TabsContent>
        <TabsContent value="resultados">{renderResultadosTab()}</TabsContent>
        <TabsContent value="reforma">{renderReformaTab()}</TabsContent>
      </Tabs>

      {/* Botões de navegação */}
      <div className="flex justify-between items-center">
        <Button 
          onClick={() => navegarAba('anterior')} 
          variant="outline"
          disabled={activeTab === 'configuracao'}
        >
          ← Anterior
        </Button>

        <div className="flex gap-4">
          <Button onClick={limparTudo} variant="outline" className="bg-orange-500 hover:bg-orange-600 text-white">
            🧹 Limpar Tudo
          </Button>
          <Button onClick={gerarRelatorioHTML} className="bg-green-600 hover:bg-green-700">
            📊 Relatório HTML + Excel
          </Button>
        </div>

        <Button 
          onClick={() => navegarAba('proximo')} 
          disabled={activeTab === 'reforma'}
        >
          Próximo →
        </Button>
      </div>

      {/* Botão do chat IA */}
      <Button
        onClick={() => setChatAberto(!chatAberto)}
        className="fixed bottom-16 right-8 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat IA */}
      {renderChatIA()}
    </div>
  );
};

export default TaxCalculatorComplete;