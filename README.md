# 📝 Prompt Manager - Gerenciador de Prompts de IA

🚀 Aplicação Next.js moderna para criar, gerenciar e buscar prompts de forma eficiente com suporte a tema claro/escuro, validação de dados e interface responsiva.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-7.x-0c344b?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/)

## 📖 Sobre o Projeto

Aplicação desenvolvida para gerenciar prompts de IA, permitindo criar, editar, listar e deletar prompts de forma eficiente. O projeto foca em **boas práticas de engenharia de software**, **qualidade de código** e uma **experiência de usuário fluida**.

## 🌐 Demo Online

**[👉 VER PROJETO AO VIVO](https://prompt-manager-one-phi.vercel.app)**

### 🎓 Aprendizados em Engenharia de Software

Este projeto vai além do código, aplicando conceitos fundamentais de engenharia de software para um aprendizado prático e profissional:

#### 🏗️ **Arquitetura de Software**

- Adoção de **Clean Architecture** (adaptação)
- Separação do código em camadas: **Core**, **Domain**, **Application**, **Infra**
- Facilita manutenção, testes e escalabilidade
- Código organizado e expressivo

#### 🎯 **Design Patterns**

- **Repository Pattern** - Abstração da persistência de dados
- **Inverção de Dependências** - Componentes desacoplados
- Facilita testes e manutenção

#### ⚙️ **Princípios SOLID**

- **Single Responsibility** - Cada entidade com uma responsabilidade
- **Open/Closed** - Aberto para extensão, fechado para modificação
- **Liskov Substitution** - Substituibilidade de tipos
- **Interface Segregation** - Interfaces específicas
- **Dependency Inversion** - Depender de abstrações, não de implementações

#### 🧪 **Testes Automatizados - Pirâmide de Testes**

- **Base (Muitos):** Testes unitários com Jest
- **Meio (Alguns):** Testes de integração
- **Topo (Poucos):** Testes E2E com Playwright

#### 🎭 **Test Doubles**

- **Mocks** - Simulam comportamentos e verificam chamadas
- **Stubs** - Retornam valores pré-definidos
- **Fakes** - Implementações simplificadas
- Isolamento total de comportamentos em testes

⚠️ **Importante:** Sistema em desenvolvimento com boa cobertura de testes (Jest) e testes E2E (Playwright).

## ✨ Principais Funcionalidades

### 📋 Gerenciamento de Prompts

- ✅ Criar novos prompts com título e conteúdo
- ✅ Editar prompts existentes
- ✅ Deletar prompts
<!-- - ✅ Listar todos os prompts com infinite scroll -->
- ✅ Buscar prompts por título ou conteúdo
- ✅ Validação de duplicidade de títulos

### 🎨 Interface de Usuário

- ✅ Design responsivo (Mobile First)
- ✅ Suporte a tema claro/escuro com persistência
- ✅ Sidebar com navegação intuitiva
- ✅ Ícones com Phosphor Icons
- ✅ Componentes reutilizáveis do Shadcn UI
- ✅ Notificações com Sonner Toast
- ✅ Estados de loading e vazio informativos

### 🔍 Busca e Filtros

- ✅ Busca em tempo real de prompts
- ✅ URL query params para compartilhamento de filtros
- ✅ Histórico de filtros na URL

### 🧪 Qualidade de Código

- ✅ Testes unitários com Jest
- ✅ Testes E2E com Playwright
- ✅ Cobertura de testes
- ✅ TypeScript strict mode
- ✅ ESLint para qualidade
- ✅ Prettier para formatação

## 🛠️ Stack Tecnológica

### Frontend Core

- ⚛️ **Next.js 16** - Framework React com App Router
- 📘 **TypeScript 5.x** - Tipagem estática completa
- ⚛️ **React 19** - Biblioteca principal com novos hooks

### Backend & Banco de Dados

- 🗃️ **Prisma ORM 7.x** - ORM type-safe com PostgreSQL
- 🐘 **PostgreSQL** - Banco de dados relacional

### UI & Styling

- 🎨 **Shadcn UI** - Componentes acessíveis e customizáveis
- 💨 **Tailwind CSS v4** - Utility-first CSS framework
- 🌗 **next-themes** - Suporte a tema claro/escuro
- 🎯 **Phosphor Icons** - Ícones modernos
- 🔔 **Sonner** - Toast notifications elegantes

### Formulários & Validação

- 📝 **React Hook Form** - Gerenciamento de formulários
- ✅ **Zod v4** - Schema validation com type inference
- 🔗 **nuqs** - Query params com TypeScript

### Testes

- 🧪 **Jest** - Testes unitários e de integração
- 🎭 **@testing-library** - Utilitários para testes React
- 🎪 **Playwright** - Testes E2E

### Qualidade de Código

- 🔍 **ESLint 9** - Análise estática
- 💅 **Prettier** - Formatação automática

## 🏗️ Arquitetura do Projeto

```
src/
├── app/
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Página home com listagem
│   ├── providers.tsx           # Provedores (Themes, etc)
│   ├── actions/                # Server actions
│   ├── new/                    # Página de criação
│   └── [id]/                   # Página de detalhes/edição
│
├── components/
│   ├── theme-provider.tsx      # Provider de tema
│   ├── theme-switcher.tsx      # Toggle de tema
│   ├── button-actions/         # Botões de ações (CRUD)
│   ├── prompts/                # Componentes de prompts
│   ├── sidebar/                # Navegação lateral
│   └── ui/                     # Componentes base (Shadcn)
│
├── core/
│   ├── application/            # Lógica de aplicação
│   └── domain/                 # Entidades de domínio
│
├── infra/
│   └── repository/             # Acesso a dados
│
├── hooks/                      # React hooks customizados
│
├── lib/
│   ├── prisma.ts              # Cliente Prisma singleton
│   ├── utils.ts               # Funções utilitárias
│   └── test-utils.ts          # Utilitários para testes
│
├── styles/
│   └── globals.css            # Estilos globais
│
└── tests/                      # Testes unitários e integração
    ├── app/
    ├── components/
    ├── core/
    └── infra/

prisma/
├── schema.prisma              # Definição de modelos
├── migrations/                # Histórico de migrações
└── seed.ts                    # Script de seed

e2e/                          # Testes end-to-end
├── home.spec.ts
├── prompt-create.spec.ts
├── prompt-search.spec.ts
├── prompt-update.spec.ts
└── delete-prompt.spec.ts
```

## 🚀 Como Executar

### Pré-requisitos

- 📦 Node.js 18+
- 📦 npm, yarn ou pnpm
- 🐘 PostgreSQL 14+ (ou use Neon para serverless)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/marquesmaycon/prompt-manager
cd prompt-manager

# Instale as dependências
npm install
```

### Configuração de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/prompt_manager"
```

### Setup do Banco de Dados

```bash
# Gerar cliente Prisma
npm run db:generate

# Executar migrações
npm run db:migrate

# (Opcional) Abrir Prisma Studio
npm run db:studio

# (Opcional) Fazer seed do banco com dados iniciais
npm run db:seed
```

### Executar o Projeto

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar build de produção
npm run start
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Comandos Disponíveis

```bash
npm run dev              # 🚀 Servidor de desenvolvimento
npm run build            # 🏗️ Build para produção
npm run start            # ▶️ Executar build de produção
npm run lint             # 🔍 Análise de código com ESLint
npm run format           # 💅 Formatar código com Prettier
npm run typecheck        # ✅ Verificar tipos TypeScript
npm run test             # 🧪 Executar testes com Jest
npm run test:watch      # 👀 Modo watch para testes
npm run test:coverage   # 📊 Cobertura de testes
npm run test:e2e        # 🎭 Testes E2E com Playwright
npm run test:e2e:ui     # 🎪 UI dos testes E2E
npm run db:generate     # 📦 Gerar cliente Prisma
npm run db:seed         # 🌱 Executar seed do banco
npm run db:migrate      # 🔄 Criar nova migração
npm run db:studio       # 🎨 Abrir Prisma Studio
```

## 🎯 Destaques Técnicos

### ⚡ Otimizações de Performance

- 🚀 Server Components por padrão
- 🔄 Client Components apenas onde necessário
- 💾 Cache inteligente com Next.js
<!-- - ⚡ Static generation onde possível -->
- 📊 Queries otimizadas com Prisma
- 🎯 Lazy loading de componentes

### 🎨 Experiência do Usuário

- ⏳ Loading states em todas as ações
- 🎯 Estados vazios informativos
- 🚨 Tratamento de erros contextual
- 📱 Design totalmente responsivo
- ⌨️ Navegação por teclado
- 🌗 Suporte a tema claro/escuro
- 🔔 Notificações toast elegantes

### ✅ Validação & Segurança

- 🛡️ Validação com Zod em client e server
- 🔒 CSRF protection (Next.js default)
- ✅ Validação de entrada obrigatória
- 🔑 Tipagem forte com TypeScript
- 👁️ Tratamento seguro de dados

### 💻 Desenvolvimento

- 📘 TypeScript strict mode
- 🔍 ESLint para qualidade
- 💅 Prettier para formatação
- 🏗️ Arquitetura modular
- 🎨 Componentes por features
- 🔄 Hot reload em desenvolvimento
- 📦 Code splitting automático

## 🌐 Fluxo da Aplicação

```
1. 📋 Listagem de Prompts
   ├─> Página inicial exibe todos os prompts
   └─> Busca em tempo real

2. ✍️ Criar Novo Prompt
   ├─> Ir para página /new
   ├─> Preencher título e conteúdo
   ├─> Validação com Zod
   ├─> Verificar duplicidade
   └─> Salvar no banco (Prisma)

3. 📖 Ver Detalhes
   ├─> Clicar em um prompt
   ├─> Exibir título e conteúdo
   └─> Opções de editar/deletar

4. ✏️ Editar Prompt
   ├─> Acessar página de edição /[id]
   ├─> Pre-preencher dados
   ├─> Validar alterações
   ├─> Atualizar no banco
   └─> Feedback ao usuário

5. 🗑️ Deletar Prompt
   ├─> Clique no botão deletar
   ├─> Confirmação de exclusão
   ├─> Remover do banco de dados
   └─> Atualizar listagem

6. 🔍 Buscar Prompts
   ├─> Digitar no campo de busca
   ├─> Filtrar por título/conteúdo
   ├─> Atualizar URL com query params
   └─> Mostrar resultados em tempo real
```

## 📊 Estrutura do Banco de Dados

### Model: Prompt

```sql
CREATE TABLE prompts (
  id         VARCHAR(255) PRIMARY KEY,
  title      VARCHAR(255) UNIQUE NOT NULL,
  content    TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Campos:**

- `id`: Identificador único (CUID)
- `title`: Título do prompt (único)
- `content`: Conteúdo/descrição do prompt
- `created_at`: Data de criação
- `updated_at`: Data da última atualização

## 📱 Responsividade

- ✅ Mobile First: Design otimizado para dispositivos móveis
- ✅ Breakpoints Tailwind: sm, md, lg, xl, 2xl
- ✅ Componentes Adaptáveis: Layouts flexíveis
- ✅ Touch Friendly: Áreas de toque otimizadas

## ♿ Acessibilidade

- ✅ Navegação completa por teclado
- ✅ ARIA labels em componentes interativos
- ✅ Foco visível em elementos
- ✅ Mensagens de erro descritivas
- ✅ Loading states anunciados
- ✅ Contraste adequado nos temas

## 🧪 Testes

### Testes Unitários e Integração

```bash
npm run test              # Executar testes
npm run test:watch      # Modo watch
npm run test:coverage   # Cobertura de testes
```

**Áreas com testes:**

- ✅ Componentes React
- ✅ Hooks customizados
- ✅ Lógica de negócio

### Testes E2E

```bash
npm run test:e2e        # Executar testes E2E
npm run test:e2e:ui     # UI dos testes
```

**Cenários E2E:**

- ✅ Criar prompt com sucesso
- ✅ Validar duplicidade de título
- ✅ Buscar prompts
- ✅ Editar prompts
- ✅ Deletar prompts

### TypeScript

- ✅ Strict mode ativado
- ✅ Type inference quando possível
- ✅ Exports nomeados (exceto default)
- ✅ Interfaces para componentes

## 👤 Autor

<div align="center">
  <img src="https://github.com/marquesmaycon.png" width="100px" style="border-radius: 50%"/>
  <br/>
  <strong>Maycon Marques</strong>
  <br/>
  <br/>
  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayconhenrique/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/marquesmaycon)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:mayconmarquesh@gmail.com)

### Feito com ❤️ e muita 🎵

</div>
