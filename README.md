# Prompt Manager

Aplicação para criar, editar, buscar e organizar prompts de IA, construída com Next.js, Prisma, PostgreSQL, Clean Architecture adaptada e uma suíte de testes com Jest e Playwright.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-000000?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.8-2D3748?logo=prisma)](https://www.prisma.io/)
[![Jest](https://img.shields.io/badge/Jest-Tests-C21325?logo=jest)](https://jestjs.io/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright)](https://playwright.dev/)

## Demo

Projeto ao vivo: [prompt-manager-one-phi.vercel.app](https://prompt-manager-one-phi.vercel.app)

## Sobre

O Prompt Manager é uma aplicação para gerenciar prompts de IA com foco em produtividade, organização e boas práticas de engenharia de software.

Além da interface de CRUD, o projeto explora separação de camadas, entidades de domínio, use cases, repository pattern, validação de dados e testes automatizados em diferentes níveis.

## Funcionalidades

- Criação de prompts com título e conteúdo.
- Edição e exclusão de prompts.
- Busca por título ou conteúdo.
- Validação de dados com Zod.
- Prevenção de títulos duplicados.
- Tema claro/escuro.
- Feedback visual com toasts e estados de carregamento.
- Sidebar para navegação e acesso rápido aos prompts.

## Stack

- **Next.js 16** com App Router.
- **React 19** e **TypeScript**.
- **Prisma 7** com PostgreSQL.
- **React Hook Form** e **Zod** para formulários.
- **shadcn/ui**, **Radix UI** e **Tailwind CSS**.
- **nuqs** para estado na URL.
- **Jest** e **Testing Library** para testes unitários e de componentes.
- **Playwright** para testes E2E.
- **Docker Compose** para banco local.
- **Lefthook**, **ESLint** e **Prettier** para qualidade de código.

## Arquitetura

```txt
src/
├── app/                      # Rotas e server actions
├── components/               # Componentes de UI e feature
├── core/
│   ├── domain/               # Entidades e contratos
│   └── application/          # Use cases e DTOs
├── infra/
│   └── repository/           # Implementação Prisma
├── lib/                      # Prisma, utils e testes
└── tests/                    # Testes unitários, integração e componentes
```

## Como executar

### Pré-requisitos

- Node.js 20 ou superior.
- npm.
- Docker, caso queira subir o PostgreSQL local.

### Instalação

```bash
git clone https://github.com/marquesmaycon/prompt-manager.git
cd prompt-manager
npm install
```

Suba o banco local:

```bash
docker compose up -d
```

Configure o `.env` com a URL do PostgreSQL e rode as migrações:

```bash
npm run db:migrate
npm run dev
```

## Scripts disponíveis

```bash
npm run dev             # Inicia o ambiente local
npm run build           # Gera build com Prisma e migrations
npm run lint            # Executa ESLint
npm run typecheck       # Valida TypeScript
npm run test            # Executa testes com Jest
npm run test:coverage   # Gera cobertura
npm run test:e2e        # Executa testes E2E
npm run db:migrate      # Executa migrations
npm run db:studio       # Abre Prisma Studio
```

## Destaques técnicos

- Clean Architecture adaptada para um projeto Next.js.
- Use cases desacoplados da camada de persistência.
- Repository pattern com implementação Prisma.
- Testes de domínio, aplicação, actions, componentes e fluxos E2E.
- Ambiente local com PostgreSQL em Docker.
- Organização voltada para manutenção e evolução.

---

<div align="center">
  <img src="https://github.com/marquesmaycon.png" width="100px" style="border-radius: 50%"/>
  <br/>
  <strong>Maycon Marques</strong>
  <br/>
  <br/>

  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayconhenrique/)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/marquesmaycon)
  [![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:mayconmarquesh@gmail.com)
</div>
