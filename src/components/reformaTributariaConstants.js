// ========= 📊 CONSTANTES DA REFORMA TRIBUTÁRIA v3.0 =========
// Arquivo centralizado com todas as configurações, alíquotas e benefícios da reforma

// ========= 🔥 BENEFÍCIOS REFORMA TRIBUTÁRIA LC 214/2025 =========
export const BENEFICIOS_REFORMA_TRIBUTARIA = {
    // ALÍQUOTA ZERO (100% de redução)
    aliquotaZero: {
      fatorReducao: 0,
      descricao: "Produtos da cesta básica - Alíquota 0%",
      produtos: {
        // Cesta Básica - Alimentos essenciais
        "1006.10.10": { descricao: "Arroz em casca", categoria: "cesta_basica" },
        "1006.30.20": { descricao: "Arroz parboilizado", categoria: "cesta_basica" },
        "0713.31.00": { descricao: "Feijão preto", categoria: "cesta_basica" },
        "0713.32.00": { descricao: "Feijão comum", categoria: "cesta_basica" },
        "0201.10.00": { descricao: "Carnes bovinas frescas", categoria: "cesta_basica" },
        "0202.10.00": { descricao: "Carnes bovinas congeladas", categoria: "cesta_basica" },
        "0203.11.00": { descricao: "Carnes suínas frescas", categoria: "cesta_basica" },
        "0207.12.00": { descricao: "Frango inteiro", categoria: "cesta_basica" },
        "0207.14.00": { descricao: "Frango em pedaços", categoria: "cesta_basica" },
        "0401.10.10": { descricao: "Leite fluido", categoria: "cesta_basica" },
        "1701.14.00": { descricao: "Açúcar cristal", categoria: "cesta_basica" },
        "1507.10.00": { descricao: "Óleo de soja bruto", categoria: "cesta_basica" },
        "1511.10.00": { descricao: "Óleo de palma", categoria: "cesta_basica" },
        "1905.90.20": { descricao: "Pão", categoria: "cesta_basica" },
        "0803.90.00": { descricao: "Banana", categoria: "cesta_basica" },
        "0702.00.00": { descricao: "Tomate", categoria: "cesta_basica" },
        "0701.90.00": { descricao: "Batata", categoria: "cesta_basica" },
        "0706.10.00": { descricao: "Cenoura", categoria: "cesta_basica" },
        "0703.10.00": { descricao: "Cebola", categoria: "cesta_basica" },
        "0704.10.00": { descricao: "Couve-flor", categoria: "cesta_basica" },
        "1101.00.10": { descricao: "Farinha de trigo", categoria: "cesta_basica" },
        "1102.20.00": { descricao: "Farinha de milho", categoria: "cesta_basica" }
      },
      servicos: {
        "transporte_publico": { descricao: "Transporte público urbano", categoria: "mobilidade" },
        "saneamento": { descricao: "Serviços de saneamento básico", categoria: "essencial" }
      }
    },
    
    // 60% DE REDUÇÃO (40% da alíquota)
    reducao60: {
      fatorReducao: 0.4,
      descricao: "Medicamentos, agropecuário, saúde e educação - 60% de redução",
      produtos: {
        // Medicamentos e Saúde
        "3004.10.00": { descricao: "Penicilinas", categoria: "saude" },
        "3004.20.00": { descricao: "Antibióticos", categoria: "saude" },
        "3004.31.00": { descricao: "Insulina", categoria: "saude" },
        "3004.32.00": { descricao: "Corticosteroides", categoria: "saude" },
        "3004.39.00": { descricao: "Outros hormônios", categoria: "saude" },
        "3004.40.00": { descricao: "Alcaloides", categoria: "saude" },
        "3004.50.00": { descricao: "Vitaminas", categoria: "saude" },
        "3004.90.99": { descricao: "Outros medicamentos", categoria: "saude" },
        "3005.10.00": { descricao: "Curativos", categoria: "saude" },
        "3005.90.00": { descricao: "Outros artigos de farmácia", categoria: "saude" },
        "3006.10.00": { descricao: "Material de sutura", categoria: "saude" },
        "3006.20.00": { descricao: "Reagentes de diagnóstico", categoria: "saude" },
        
        // Agropecuário e Fertilizantes
        "3101.00.00": { descricao: "Fertilizantes animais/vegetais", categoria: "agropecuario" },
        "3102.10.00": { descricao: "Ureia", categoria: "agropecuario" },
        "3102.21.00": { descricao: "Sulfato de amônio", categoria: "agropecuario" },
        "3102.29.00": { descricao: "Outros sulfatos", categoria: "agropecuario" },
        "3102.30.00": { descricao: "Nitrato de amônio", categoria: "agropecuario" },
        "3102.40.00": { descricao: "Misturas nitrato/carbonato", categoria: "agropecuario" },
        "3102.50.00": { descricao: "Nitrato de sódio", categoria: "agropecuario" },
        "3102.60.00": { descricao: "Sais duplos", categoria: "agropecuario" },
        "3102.80.00": { descricao: "Misturas ureia/nitrato", categoria: "agropecuario" },
        "3102.90.00": { descricao: "Outros fertilizantes", categoria: "agropecuario" },
        "3103.10.00": { descricao: "Superfosfatos", categoria: "agropecuario" },
        "3103.90.00": { descricao: "Outros fosfatos", categoria: "agropecuario" },
        "3104.20.00": { descricao: "Cloreto de potássio", categoria: "agropecuario" },
        "3104.30.00": { descricao: "Sulfato de potássio", categoria: "agropecuario" },
        "3104.90.00": { descricao: "Outros potássicos", categoria: "agropecuario" },
        "3105.10.00": { descricao: "NPK em tabletes", categoria: "agropecuario" },
        "3105.20.00": { descricao: "NPK líquidos", categoria: "agropecuario" },
        "3105.30.00": { descricao: "Hidrogenofosfato", categoria: "agropecuario" },
        "3105.40.00": { descricao: "Fosfato de amônio", categoria: "agropecuario" },
        "3105.51.00": { descricao: "NPK com nitrato", categoria: "agropecuario" },
        "3105.59.00": { descricao: "Outros NPK", categoria: "agropecuario" },
        "3105.60.00": { descricao: "PK", categoria: "agropecuario" },
        "3105.90.00": { descricao: "Outros fertilizantes", categoria: "agropecuario" },
        
        // Sementes
        "1001.11.00": { descricao: "Trigo para semeadura", categoria: "agropecuario" },
        "1001.19.00": { descricao: "Outros trigos", categoria: "agropecuario" },
        "1201.10.00": { descricao: "Soja para semeadura", categoria: "agropecuario" },
        "1201.90.00": { descricao: "Outras sojas", categoria: "agropecuario" },
        "1005.10.00": { descricao: "Milho para semeadura", categoria: "agropecuario" },
        "1005.90.00": { descricao: "Outros milhos", categoria: "agropecuario" },
        
        // Insumos Alimentares
        "1507.90.00": { descricao: "Óleo de soja refinado", categoria: "alimentos" },
        "1701.99.00": { descricao: "Outros açúcares", categoria: "alimentos" }
      },
      servicos: {
        // Saúde
        "4.01": { descricao: "Medicina e biomedicina", categoria: "saude" },
        "4.02": { descricao: "Análises clínicas", categoria: "saude" },
        "4.03": { descricao: "Hospitais", categoria: "saude" },
        "4.04": { descricao: "Ambulatórios", categoria: "saude" },
        "4.05": { descricao: "Bancos de sangue", categoria: "saude" },
        "4.06": { descricao: "Enfermagem", categoria: "saude" },
        "4.07": { descricao: "Veterinária", categoria: "saude" },
        "4.08": { descricao: "Terapias", categoria: "saude" },
        "4.09": { descricao: "Terapia ocupacional", categoria: "saude" },
        "4.10": { descricao: "Nutrição", categoria: "saude" },
        "4.11": { descricao: "Obstetrícia", categoria: "saude" },
        "4.12": { descricao: "Odontologia", categoria: "saude" },
        "4.13": { descricao: "Ortóptica", categoria: "saude" },
        "4.14": { descricao: "Próteses", categoria: "saude" },
        "4.15": { descricao: "Psicanálise", categoria: "saude" },
        "4.16": { descricao: "Psicologia", categoria: "saude" },
        "4.17": { descricao: "Casas de repouso", categoria: "saude" },
        "4.18": { descricao: "Inseminação artificial", categoria: "saude" },
        "4.19": { descricao: "Bancos de leite", categoria: "saude" },
        "4.20": { descricao: "Acupuntura", categoria: "saude" },
        "4.21": { descricao: "Bioanálises", categoria: "saude" },
        "4.22": { descricao: "Diagnóstico", categoria: "saude" },
        "4.23": { descricao: "Imagenologia", categoria: "saude" },
        
        // Educação
        "8.01": { descricao: "Ensino regular pré-escolar", categoria: "educacao" },
        "8.02": { descricao: "Instrução, treinamento, ensino", categoria: "educacao" },
        "8.03": { descricao: "Ensino de esportes", categoria: "educacao" }
      }
    },
    
    // 30% DE REDUÇÃO PARA PROFISSIONAIS LIBERAIS (70% da alíquota)
    reducao30: {
      fatorReducao: 0.7,
      descricao: "Profissionais liberais - 30% de redução",
      servicos: {
        "17.01": { descricao: "Assessoria ou consultoria de qualquer natureza", categoria: "profissionais_liberais" },
        "17.02": { descricao: "Datilografia, digitação, estenografia, expediente", categoria: "profissionais_liberais" },
        "17.03": { descricao: "Planejamento, coordenação, programação ou organização técnica", categoria: "profissionais_liberais" },
        "17.04": { descricao: "Recrutamento, agenciamento, seleção e colocação de pessoal", categoria: "profissionais_liberais" },
        "17.05": { descricao: "Fornecimento de mão-de-obra", categoria: "profissionais_liberais" },
        "17.06": { descricao: "Propaganda e publicidade", categoria: "profissionais_liberais" },
        "17.08": { descricao: "Franquia (franchising)", categoria: "profissionais_liberais" },
        "17.09": { descricao: "Perícias, laudos, exames técnicos e análises técnicas", categoria: "profissionais_liberais" },
        "17.10": { descricao: "Planejamento, organização e administração de feiras", categoria: "profissionais_liberais" },
        "17.11": { descricao: "Organização de festas e recepções", categoria: "profissionais_liberais" },
        "17.12": { descricao: "Administração em geral", categoria: "profissionais_liberais" },
        "17.13": { descricao: "Administração de cartão de crédito ou débito", categoria: "profissionais_liberais" },
        "17.14": { descricao: "Administração de consórcio", categoria: "profissionais_liberais" },
        "17.15": { descricao: "Leilão e hasta pública", categoria: "profissionais_liberais" },
        "17.16": { descricao: "Administração de fundos mútuos", categoria: "profissionais_liberais" },
        "17.17": { descricao: "Análise, engenharia financeira, econômica", categoria: "profissionais_liberais" },
        "17.18": { descricao: "Consultoria ou assessoria econômica ou financeira", categoria: "profissionais_liberais" },
        "17.19": { descricao: "Estatística", categoria: "profissionais_liberais" },
        "17.20": { descricao: "Atuária e cálculos técnicos de qualquer natureza", categoria: "profissionais_liberais" },
        "17.21": { descricao: "Contabilidade", categoria: "profissionais_liberais" },
        "17.22": { descricao: "Auditoria", categoria: "profissionais_liberais" },
        "17.23": { descricao: "Análise de organização e métodos", categoria: "profissionais_liberais" },
        "17.24": { descricao: "Atuária, assessoria e consultoria econômica", categoria: "profissionais_liberais" },
        "17.25": { descricao: "Análise de qualquer natureza", categoria: "profissionais_liberais" }
      }
    },
    
    // 40% DE REDUÇÃO PARA ALIMENTAÇÃO SEM CRÉDITOS (60% da alíquota, sem créditos)
    reducao40_sem_creditos: {
      fatorReducao: 0.6,
      creditosPermitidos: false,
      descricao: "Alimentação preparada - 40% de redução sem direito a créditos",
      servicos: {
        "alimentacao": { descricao: "Alimentação preparada (bares, restaurantes, etc.)", categoria: "alimentacao" }
      }
    }
  };
  
  // ========= 📊 ALÍQUOTAS PADRÃO =========
  export const ALIQUOTAS = {
    // Sistema Atual
    ATUAL: {
      SIMPLES_NACIONAL: {
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
      },
      LUCRO_REAL: {
        PIS: 1.65,
        COFINS: 7.6,
        ICMS: { min: 7, max: 25 },
        IPI: { min: 0, max: 30 },
        ISS: { min: 2, max: 5 }
      },
      LUCRO_PRESUMIDO: {
        PIS: 0.65,
        COFINS: 3.0,
        ICMS: { min: 7, max: 25 },
        IPI: { min: 0, max: 30 },
        ISS: { min: 2, max: 5 }
      }
    },
    
    // Reforma Tributária
    REFORMA: {
      IVA_DUAL: 27.97, // IBS + CBS
      IBS: 18.00, // Estimativa IBS
      CBS: 9.97,  // Estimativa CBS
      IMPOSTO_SELETIVO: { min: 0, max: 25 } // Para produtos específicos
    }
  };
  
  // ========= 📅 CRONOGRAMA DA REFORMA =========
  export const CRONOGRAMA_REFORMA = {
    2023: {
      evento: "Aprovação da Emenda Constitucional",
      data: "20/12/2023",
      descricao: "Promulgação da Emenda Constitucional nº 132/2023"
    },
    2025: {
      evento: "Lei Complementar",
      data: "16/01/2025", 
      descricao: "Sanção da Lei Complementar nº 214/2025"
    },
    2026: {
      evento: "Testes",
      descricao: "CBS: 0,9% e IBS: 0,1% - Simulações sem recolhimento"
    },
    2027: {
      evento: "Início CBS",
      descricao: "CBS substitui PIS/COFINS + Imposto Seletivo"
    },
    2028: {
      evento: "Consolidação CBS",
      descricao: "Ajustes e consolidação do sistema CBS"
    },
    2029: {
      evento: "Transição IBS - 10%",
      descricao: "10% IBS / 90% ICMS+ISS"
    },
    2030: {
      evento: "Transição IBS - 20%", 
      descricao: "20% IBS / 80% ICMS+ISS"
    },
    2031: {
      evento: "Transição IBS - 30%",
      descricao: "30% IBS / 70% ICMS+ISS"
    },
    2032: {
      evento: "Transição IBS - 40%",
      descricao: "40% IBS / 60% ICMS+ISS"
    },
    2033: {
      evento: "Vigência Plena",
      descricao: "IVA Dual completo - extinção de ICMS, ISS e IPI"
    }
  };
  
  // ========= 🏢 DADOS POR SETOR =========
  export const DADOS_SETORES = {
    comercio: {
      nome: "Comércio",
      icone: "🛒",
      aliquotaAtualMedia: 12.5,
      beneficiosEstimados: {
        cestaBasica: 0.25,
        medicamentos: 0.10,
        demais: 0.65
      },
      anexoSimples: "anexo1",
      margemLucroMedia: 15,
      creditosMedias: 0.08
    },
    industria: {
      nome: "Indústria", 
      icone: "🏭",
      aliquotaAtualMedia: 11.8,
      beneficiosEstimados: {
        agropecuario: 0.30,
        medicamentos: 0.15,
        demais: 0.55
      },
      anexoSimples: "anexo2",
      margemLucroMedia: 25,
      creditosMedias: 0.15
    },
    servicos: {
      nome: "Serviços",
      icone: "🏢", 
      aliquotaAtualMedia: 14.2,
      beneficiosEstimados: {
        saude: 0.20,
        profissionais: 0.30,
        demais: 0.50
      },
      anexoSimples: "anexo3",
      margemLucroMedia: 40,
      creditosMedias: 0.05
    },
    tecnologia: {
      nome: "Tecnologia",
      icone: "💻",
      aliquotaAtualMedia: 13.5,
      beneficiosEstimados: {
        profissionais: 0.60,
        demais: 0.40
      },
      anexoSimples: "anexo3",
      margemLucroMedia: 50,
      creditosMedias: 0.03
    },
    saude: {
      nome: "Saúde",
      icone: "🏥",
      aliquotaAtualMedia: 10.5,
      beneficiosEstimados: {
        medicamentos: 0.40,
        servicos_saude: 0.50,
        demais: 0.10
      },
      anexoSimples: "anexo3",
      margemLucroMedia: 35,
      creditosMedias: 0.07
    },
    educacao: {
      nome: "Educação",
      icone: "🎓",
      aliquotaAtualMedia: 9.8,
      beneficiosEstimados: {
        servicos_educacao: 0.80,
        demais: 0.20
      },
      anexoSimples: "anexo3", 
      margemLucroMedia: 30,
      creditosMedias: 0.04
    }
  };
  
  // ========= 🗺️ ESTADOS BRASILEIROS =========
  export const ESTADOS_BRASILEIROS = [
    { codigo: 'AC', nome: 'Acre', regiao: 'Norte' },
    { codigo: 'AL', nome: 'Alagoas', regiao: 'Nordeste' },
    { codigo: 'AP', nome: 'Amapá', regiao: 'Norte' },
    { codigo: 'AM', nome: 'Amazonas', regiao: 'Norte' },
    { codigo: 'BA', nome: 'Bahia', regiao: 'Nordeste' },
    { codigo: 'CE', nome: 'Ceará', regiao: 'Nordeste' },
    { codigo: 'DF', nome: 'Distrito Federal', regiao: 'Centro-Oeste' },
    { codigo: 'ES', nome: 'Espírito Santo', regiao: 'Sudeste' },
    { codigo: 'GO', nome: 'Goiás', regiao: 'Centro-Oeste' },
    { codigo: 'MA', nome: 'Maranhão', regiao: 'Nordeste' },
    { codigo: 'MT', nome: 'Mato Grosso', regiao: 'Centro-Oeste' },
    { codigo: 'MS', nome: 'Mato Grosso do Sul', regiao: 'Centro-Oeste' },
    { codigo: 'MG', nome: 'Minas Gerais', regiao: 'Sudeste' },
    { codigo: 'PA', nome: 'Pará', regiao: 'Norte' },
    { codigo: 'PB', nome: 'Paraíba', regiao: 'Nordeste' },
    { codigo: 'PR', nome: 'Paraná', regiao: 'Sul' },
    { codigo: 'PE', nome: 'Pernambuco', regiao: 'Nordeste' },
    { codigo: 'PI', nome: 'Piauí', regiao: 'Nordeste' },
    { codigo: 'RJ', nome: 'Rio de Janeiro', regiao: 'Sudeste' },
    { codigo: 'RN', nome: 'Rio Grande do Norte', regiao: 'Nordeste' },
    { codigo: 'RS', nome: 'Rio Grande do Sul', regiao: 'Sul' },
    { codigo: 'RO', nome: 'Rondônia', regiao: 'Norte' },
    { codigo: 'RR', nome: 'Roraima', regiao: 'Norte' },
    { codigo: 'SC', nome: 'Santa Catarina', regiao: 'Sul' },
    { codigo: 'SP', nome: 'São Paulo', regiao: 'Sudeste' },
    { codigo: 'SE', nome: 'Sergipe', regiao: 'Nordeste' },
    { codigo: 'TO', nome: 'Tocantins', regiao: 'Norte' }
  ];
  
  // ========= 📋 REGISTROS SPED =========
  export const REGISTROS_SPED = {
    EFD_ICMS_IPI: {
      C170: {
        nome: "Vendas de Mercadorias",
        descricao: "Registro de vendas de produtos por NCM",
        campos: ["NCM", "Descrição", "CFOP", "Valor", "Alíquota ICMS", "Base Cálculo"]
      },
      A170: {
        nome: "Aquisições",
        descricao: "Registro de compras de mercadorias",
        campos: ["NCM", "Descrição", "CFOP", "Valor", "Crédito ICMS"]
      },
      D101: {
        nome: "Serviços de Transporte/Comunicação",
        descricao: "Registro de serviços prestados",
        campos: ["Código LC 116/03", "Descrição", "Valor", "Alíquota ISS"]
      }
    },
    EFD_CONTRIBUICOES: {
      M200: {
        nome: "Receitas PIS/COFINS",
        descricao: "Base de cálculo PIS/COFINS",
        campos: ["Receita Bruta", "Natureza", "Alíquota PIS", "Alíquota COFINS"]
      },
      M600: {
        nome: "Créditos PIS/COFINS", 
        descricao: "Créditos apurados",
        campos: ["Valor Crédito", "Código Crédito", "Descrição"]
      },
      F100: {
        nome: "Demais Documentos",
        descricao: "Outros documentos fiscais",
        campos: ["Tipo", "Valor", "Natureza"]
      }
    }
  };
  
  // ========= 💰 SPLIT PAYMENT =========
  export const SPLIT_PAYMENT = {
    PERCENTUAL_RETENCAO: 27.97,
    CUSTO_FINANCEIRO_ANUAL: 30.0, // CDI + Spread estimado
    CAPITAL_NECESSARIO_MESES: 3, // Meses de capital de giro
    CRONOGRAMA_IMPLEMENTACAO: {
      2027: "Testes em setores específicos",
      2028: "Implementação gradual",
      2029: "Expansão para todos os setores",
      2033: "Vigência plena"
    }
  };
  
  // ========= 🤖 CONFIGURAÇÕES IA =========
  export const CONFIG_IA = {
    WEBHOOK_URL: "https://n8nwebhook.consultor-ia.io/webhook/calculadora-tributaria-ai",
    TIMEOUT: 10000, // 10 segundos
    RETRY_ATTEMPTS: 3,
    CONTEXTO_PADRAO: {
      versao: "3.0",
      sistema: "Calculadora Reforma Tributária",
      especialidade: "Análise tributária personalizada"
    }
  };
  
  // ========= 📊 VALIDAÇÕES =========
  export const VALIDACOES = {
    CNPJ: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    TELEFONE: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
    
    LIMITES: {
      FATURAMENTO_MIN: 1000,
      FATURAMENTO_MAX: 50000000000, // 50 bilhões
      ALIQUOTA_MIN: 0,
      ALIQUOTA_MAX: 50,
      REGISTROS_SPED_MIN: 100
    },
    
    MENSAGENS: {
      CNPJ_INVALIDO: "CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX",
      EMAIL_INVALIDO: "E-mail deve ter formato válido",
      FATURAMENTO_OBRIGATORIO: "Faturamento é obrigatório",
      REGIME_OBRIGATORIO: "Regime tributário é obrigatório",
      ARQUIVO_SPED_INVALIDO: "Arquivo SPED deve ser .txt com estrutura válida"
    }
  };
  
  // ========= 🎨 TEMAS E CORES =========
  export const TEMAS = {
    CORES: {
      primaria: "#3498db",
      secundaria: "#6f42c1", 
      sucesso: "#28a745",
      alerta: "#ffc107",
      erro: "#dc3545",
      info: "#17a2b8"
    },
    
    BADGES: {
      aliquotaZero: "bg-green-100 text-green-800",
      reducao60: "bg-blue-100 text-blue-800", 
      reducao30: "bg-purple-100 text-purple-800",
      reducao40: "bg-yellow-100 text-yellow-800",
      padrao: "bg-orange-100 text-orange-800",
      sped: "bg-green-100 text-green-800",
      manual: "bg-yellow-100 text-yellow-800"
    }
  };
  
  // ========= 📈 MÉTRICAS E KPIs =========
  export const METRICAS = {
    BENCHMARKS: {
      CARGA_TRIBUTARIA_MEDIA_BR: 33.0, // % PIB
      TEMPO_COMPLIANCE_HORAS_ANO: 1958,
      CUSTO_COMPLIANCE_PERCENTUAL: 2.6,
      REDUCAO_ESTIMADA_REFORMA: 15.0 // % redução custos compliance
    },
    
    METAS_REFORMA: {
      REDUCAO_COMPLIANCE: 50, // % redução
      UNIFICACAO_TRIBUTOS: 5, // De 27 para 3
      TRANSPARENCIA_AUMENTO: 80, // % melhoria
      ARRECADACAO_MANUTENCAO: 100 // Manter mesma arrecadação
    }
  };
  
  // ========= 🔧 UTILITÁRIOS =========
  export const UTILS = {
    formatarMoeda: (valor) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(valor);
    },
    
    formatarPercentual: (valor) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 2
      }).format(valor / 100);
    },
    
    formatarData: (data) => {
      return new Intl.DateTimeFormat('pt-BR').format(new Date(data));
    },
    
    validarCNPJ: (cnpj) => {
      return VALIDACOES.CNPJ.test(cnpj);
    },
    
    obterAnexoSimples: (atividade) => {
      const setor = DADOS_SETORES[atividade];
      return setor ? setor.anexoSimples : 'anexo1';
    },
    
    calcularAliquotaSimples: (faturamento, atividade) => {
      const anexo = UTILS.obterAnexoSimples(atividade);
      const tabela = ALIQUOTAS.ATUAL.SIMPLES_NACIONAL[anexo];
      
      if (faturamento <= 180000) return tabela[0].aliquota;
      if (faturamento <= 360000) return tabela[1].aliquota;
      if (faturamento <= 720000) return tabela[2].aliquota;
      if (faturamento <= 1800000) return tabela[3].aliquota;
      if (faturamento <= 3600000) return tabela[4].aliquota;
      if (faturamento <= 4800000) return tabela[5].aliquota;
      
      return 0; // Fora do Simples
    }
  };
  
  export default {
    BENEFICIOS_REFORMA_TRIBUTARIA,
    ALIQUOTAS,
    CRONOGRAMA_REFORMA,
    DADOS_SETORES,
    ESTADOS_BRASILEIROS,
    REGISTROS_SPED,
    SPLIT_PAYMENT,
    CONFIG_IA,
    VALIDACOES,
    TEMAS,
    METRICAS,
    UTILS
  };