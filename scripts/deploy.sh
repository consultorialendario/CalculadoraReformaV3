#!/bin/bash

# ===== SCRIPT DE DEPLOY - CALCULADORA REFORMA TRIBUTÁRIA v3.0 =====
# Este script automatiza o processo de build e deploy para Vercel

set -e  # Sair se qualquer comando falhar

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para print colorido
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Header
echo "=================================================="
echo "🧮 CALCULADORA REFORMA TRIBUTÁRIA v3.0"
echo "📦 Script de Deploy Automatizado"
echo "👨‍💻 Desenvolvido por: Silvio Gonçalves"
echo "=================================================="
echo

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    print_error "package.json não encontrado. Execute este script na raiz do projeto."
    exit 1
fi

# Verificar se tem Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js não está instalado."
    exit 1
fi

# Verificar se tem npm
if ! command -v npm &> /dev/null; then
    print_error "npm não está instalado."
    exit 1
fi

print_status "Verificando ambiente..."

# Verificar versão do Node
NODE_VERSION=$(node --version)
print_status "Node.js: $NODE_VERSION"

# Verificar se tem Vercel CLI
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI não encontrado. Instalando..."
    npm install -g vercel
fi

print_status "Limpando arquivos anteriores..."
rm -rf dist/
rm -rf .vercel/

print_status "Instalando dependências..."
npm ci

print_status "Executando testes (se existirem)..."
if npm run test --silent 2>/dev/null; then
    print_success "Testes passaram!"
else
    print_warning "Nenhum teste encontrado ou falha nos testes."
fi

print_status "Executando build de produção..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build concluído com sucesso!"
else
    print_error "Falha no build!"
    exit 1
fi

print_status "Verificando tamanho do bundle..."
if [ -d "dist" ]; then
    BUNDLE_SIZE=$(du -sh dist | cut -f1)
    print_status "Tamanho do bundle: $BUNDLE_SIZE"
fi

# Verificar se deve fazer deploy
echo
read -p "Deseja fazer deploy para produção? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Iniciando deploy para Vercel..."
    
    # Deploy para produção
    vercel --prod
    
    if [ $? -eq 0 ]; then
        print_success "Deploy concluído com sucesso!"
        echo
        echo "=================================================="
        echo "🎉 DEPLOY REALIZADO COM SUCESSO!"
        echo "🔗 Acesse: https://calculadora-reforma-tributaria.vercel.app"
        echo "📊 Dashboard: https://vercel.com/dashboard"
        echo "=================================================="
    else
        print_error "Falha no deploy!"
        exit 1
    fi
else
    print_status "Deploy cancelado pelo usuário."
    print_status "Para testar localmente: npm run preview"
fi

# Cleanup opcional
read -p "Deseja limpar arquivos temporários? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Limpando arquivos temporários..."
    rm -rf node_modules/.cache/
    rm -rf .vite/
    print_success "Limpeza concluída!"
fi

print_success "Script concluído!"
echo
echo "📞 Suporte: consultor.ia.lendario@gmail.com"
echo "💼 LinkedIn: https://linkedin.com/in/silvio-gonçalves-980b5b229"