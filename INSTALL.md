# 🚀 Guia de Instalação - Calculadora Reforma Tributária v3.0

## ⚡ Instalação Rápida

### 1. Pré-requisitos

```bash
# Verificar versões
node --version  # >= 18.0.0
npm --version   # >= 9.0.0
```

### 2. Clone e Configure

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/calculadora-reforma-tributaria.git
cd calculadora-reforma-tributaria

# Instale dependências
npm install

# Configure ambiente (opcional)
cp .env.example .env
# Edite .env com suas configurações
```

### 3. Execute Localmente

```bash
# Desenvolvimento
npm run dev
# Acesse: http://localhost:3000

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🌐 Deploy para Vercel

### Método 1: Deploy Automático (Recomendado)

1. **Fork** este repositório no GitHub
2. **Acesse** [vercel.com](https://vercel.com)
3. **Import** seu repositório
4. **Deploy** automaticamente

### Método 2: Deploy Manual

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Método 3: Script Automatizado

```bash
# Dar permissão de execução
chmod +x scripts/deploy.sh

# Executar script
./scripts/deploy.sh
```

## ⚙️ Configurações Opcionais

### Variáveis de Ambiente

```bash
# .env
VITE_AI_WEBHOOK_URL=https://sua-url-n8n.com/webhook
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Configurar IA Personalizada

1. **Configure N8N** ou similar
2. **Crie webhook** para receber dados da calculadora
3. **Configure OpenAI/ChatGPT** para processar
4. **Retorne** análises personalizadas

## 📁 Estrutura de Arquivos

```
calculadora-reforma-tributaria/
├── 📁 public/          # Arquivos estáticos
├── 📁 src/
│   ├── 📁 components/  # Componentes React
│   ├── 📁 pages/       # Páginas
│   ├── 📁 lib/         # Utilitários
│   └── 📄 App.jsx      # App principal
├── 📄 package.json     # Dependências
├── 📄 vite.config.js   # Configuração Vite
└── 📄 vercel.json      # Configuração Vercel
```

## 🛠️ Comandos Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run preview      # Preview build
npm run deploy       # Build + Deploy Vercel
```

## 📦 Dependências Principais

- **React 18** - Interface
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Componentes
- **Lucide React** - Ícones
- **Framer Motion** - Animações

## 🔧 Personalização

### Modificar Benefícios

Edite `src/components/reformaTributariaConstants.js`:

```javascript
export const BENEFICIOS_REFORMA_TRIBUTARIA = {
  // Adicione novos benefícios aqui
}
```

### Adicionar Novos Setores

```javascript
export const DADOS_SETORES = {
  novo_setor: {
    nome: "Novo Setor",
    icone: "🏢",
    // configurações...
  }
}
```

## 🤝 Contribuição

1. **Fork** o projeto
2. **Crie** sua feature branch: `git checkout -b feature/nova-funcionalidade`
3. **Commit** suas mudanças: `git commit -m 'Add nova funcionalidade'`
4. **Push** para branch: `git push origin feature/nova-funcionalidade`
5. **Abra** um Pull Request

## 🆘 Problemas Comuns

### Erro: "Module not found"

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro de Build

```bash
# Verificar versão do Node
node --version

# Atualizar para Node 18+
nvm install 18
nvm use 18
```

### Deploy falha no Vercel

1. Verificar `vercel.json`
2. Verificar variáveis de ambiente
3. Verificar logs no dashboard Vercel

## 📞 Suporte

- 📧 **Email**: consultor.ia.lendario@gmail.com
- 💼 **LinkedIn**: [silvio-gonçalves-980b5b229](https://linkedin.com/in/silvio-gonçalves-980b5b229)
- 📱 **Instagram**: [@silviogoncalves0](https://instagram.com/silviogoncalves0)

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

---

**🎉 Pronto! Sua Calculadora da Reforma Tributária v3.0 está funcionando!**