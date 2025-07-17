# 🧮 Calculadora da Reforma Tributária v3.0

> **Análise profissional da Reforma Tributária brasileira com SPED Real e IA Personalizada**

[![Deploy Status](https://img.shields.io/badge/deploy-success-brightgreen)](https://calculadora-reforma-tributaria.vercel.app)
[![Version](https://img.shields.io/badge/version-3.0.0-blue)](https://github.com/usuario/calculadora-reforma-tributaria)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🚀 Acesso Online

**🔗 [calculadora-reforma-tributaria.vercel.app](https://calculadora-reforma-tributaria.vercel.app)**

## ✨ Principais Funcionalidades

- **📊 SPED Real**: Upload e processamento de arquivos EFD ICMS/IPI + EFD-Contribuições
- **🎯 Benefícios Específicos**: Identificação automática por NCM/código LC 116/03
- **🤖 IA Personalizada**: Análises específicas por empresa com recomendações estratégicas
- **📈 Relatórios Executivos**: HTML interativo + Excel com gráficos Chart.js
- **💳 Split Payment**: Análise detalhada do impacto no fluxo de caixa
- **✅ Validação Cruzada**: Conferência automática entre dados SPED e cálculos

## 🎯 Benefícios da Reforma Identificados

| Categoria | Redução | Alíquota Efetiva | Exemplos |
|-----------|---------|------------------|----------|
| 🛒 **Cesta Básica** | **100%** | **0%** | Arroz, feijão, leite, pão |
| 💊 **Medicamentos/Agro** | **60%** | **11,19%** | Insulina, fertilizantes, sementes |
| 🏥 **Saúde/Educação** | **60%** | **11,19%** | Hospitais, escolas, consultórios |
| 👨‍💼 **Prof. Liberais** | **30%** | **19,58%** | Consultoria, contabilidade |
| 🍽️ **Alimentação** | **40%** | **16,78%** | Restaurantes (sem créditos) |

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Chart.js
- **Deploy**: Vercel
- **IA**: N8N + ChatGPT (webhook personalizado)

## 📦 Instalação Local

```bash
# Clone o repositório
git clone https://github.com/usuario/calculadora-reforma-tributaria.git
cd calculadora-reforma-tributaria

# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🌍 Deploy

### Deploy Automático (Vercel)

1. Faça fork deste repositório
2. Conecte ao Vercel via GitHub
3. Configure as variáveis de ambiente (opcional):
   - `VITE_AI_WEBHOOK_URL`: URL do webhook N8N para IA
   - `VITE_GA_TRACKING_ID`: Google Analytics ID

### Deploy Manual

```bash
# Build e deploy
npm run build
npx vercel --prod
```

## 📊 Estrutura do Projeto

```
calculadora-reforma-tributaria/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/         # Componentes React
│   │   ├── ui/            # shadcn/ui components
│   │   ├── TaxCalculatorComplete.jsx
│   │   ├── SimulatorsPage.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/             # Páginas da aplicação
│   ├── styles/            # Estilos globais
│   └── App.jsx           # Componente raiz
├── package.json
├── vite.config.js
├── tailwind.config.js
└── vercel.json
```

## 🧩 Componentes Principais

### TaxCalculatorComplete
Calculadora principal com 6 abas:
- ⚙️ Configuração + Empresa
- 💰 Receitas
- 💸 Custos  
- 🛍️ Produtos/Serviços
- 📊 Resultados + SPED
- 🏛️ Reforma Tributária

### SimulatorsPage
Simuladores rápidos:
- 🧮 Calculadora Completa
- ⚡ Simulador Rápido
- 📊 Comparador de Regimes

## 📋 Funcionalidades Técnicas

### Parser SPED
- Registros C170 (vendas por NCM)
- Registros D101 (serviços por código LC)
- Registros M200/M600 (PIS/COFINS)
- Validação automática de estrutura

### Cálculos Tributários
- Simples Nacional (Anexos I, II, III)
- Lucro Presumido
- Lucro Real
- IVA Dual (CBS + IBS)

### Relatórios
- HTML interativo com gráficos
- Excel com múltiplas abas
- Análise Split Payment
- Cronograma 2023-2033

## 🤖 IA Personalizada

A calculadora integra com webhook N8N + ChatGPT para análises específicas:

```javascript
// Configuração do webhook
const AI_CONFIG = {
  url: process.env.VITE_AI_WEBHOOK_URL,
  timeout: 10000
}
```

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Silvio Gonçalves** - Especialista em Controladoria
- 📧 [consultor.ia.lendario@gmail.com](mailto:consultor.ia.lendario@gmail.com)
- 💼 [LinkedIn](https://linkedin.com/in/silvio-gonçalves-980b5b229)
- 📱 [Instagram](https://instagram.com/silviogoncalves0)

### Qualificações
- 🎓 Contador CRC Ativo
- 🏆 MBA Gestão Empresarial - FGV
- 📊 Especialização em Controladoria
- 🤖 Certificações em IA e Automação

## 🆘 Suporte

Para suporte técnico ou dúvidas:
- 📧 Email: consultor.ia.lendario@gmail.com
- 💬 Chat IA integrado na calculadora
- 📖 Documentação: Este README

## ⚠️ Disclaimer

Esta calculadora é uma ferramenta de estimativa baseada em interpretações da legislação da Reforma Tributária (EC 132/2023 e LC 214/2025). Os valores devem ser validados com contadores qualificados.

---

**🎉 Calculadora da Reforma Tributária v3.0 - A mais completa do Brasil!**