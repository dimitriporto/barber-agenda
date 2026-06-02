# BarberAgenda

Sistema web fullstack para gerenciamento de agendamentos em uma barbearia, desenvolvido como projeto acadêmico da disciplina de Desenvolvimento Web II.

---

# Sobre o Projeto

O BarberAgenda foi desenvolvido com o objetivo de permitir que clientes realizem o gerenciamento de seus próprios agendamentos de forma simples e segura.

A aplicação oferece autenticação de usuários, cadastro de contas, controle de acesso às áreas privadas e operações completas de criação, consulta, edição e exclusão de agendamentos.

Os dados são armazenados em um banco de dados MongoDB Atlas, utilizando Mongoose para modelagem e persistência, enquanto a autenticação é realizada através do NextAuth.

---

# Arquitetura

O projeto foi desenvolvido utilizando a arquitetura baseada no App Router do Next.js.

A aplicação está organizada em módulos independentes, separando responsabilidades entre:

* Interface do usuário (UI)
* Componentes reutilizáveis
* Rotas da aplicação
* APIs do backend
* Modelos de dados
* Camada de autenticação
* Gerenciamento de estado

Também foram utilizados recursos modernos do framework, como:

* Server Components
* Client Components
* Dynamic Routes
* Route Handlers
* Revalidação de rotas
* Loading UI
* Error Boundaries

---

# Tecnologias Utilizadas

## Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* ShadCN/UI
* Lucide React

## Backend

* Next.js Route Handlers
* NextAuth.js
* MongoDB Atlas
* Mongoose

## Segurança

* NextAuth
* BcryptJS

## Gerenciamento de Estado

* Zustand

## Deploy

* Vercel

---

# Funcionalidades

## Autenticação

* Cadastro de usuários
* Login com credenciais
* Logout
* Sessões protegidas
* Proteção de rotas privadas

## Gerenciamento de Agendamentos

* Criar agendamentos
* Listar agendamentos
* Editar agendamentos
* Excluir agendamentos

## Interface

* Dashboard personalizado
* Layout responsivo
* Componentes reutilizáveis
* Loading global
* Tratamento global de erros

## Estado da Aplicação

* Filtro de agendamentos utilizando Zustand
* Controle de estado da interface no cliente

## Performance

* Utilização de Link do Next.js
* Server Components
* Revalidação de rotas utilizando revalidatePath()

---

# Segurança

As senhas dos usuários não são armazenadas em texto puro.

Durante o cadastro, a senha é criptografada utilizando Bcrypt antes de ser salva no banco de dados.

Além disso, todas as rotas protegidas verificam a existência de uma sessão válida através do NextAuth.

---

# Estrutura Principal

```txt
src/
├── app/
│   ├── api/
│   │   ├── appointments/
│   │   ├── auth/
│   │   └── register/
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   ├── loading.tsx
│   └── error.tsx
│
├── components/
│
├── lib/
│
├── models/
│
├── store/
│
└── types/
```

---

# Como Executar Localmente

## 1. Clonar o projeto

```bash
git clone <url-do-repositorio>
```

## 2. Entrar na pasta

```bash
cd barber-agenda
```

## 3. Instalar dependências

```bash
npm install
```

## 4. Configurar variáveis de ambiente

Criar o arquivo:

```txt
.env.local
```

Conteúdo:

```env
MONGODB_URI=sua_string_do_mongodb
NEXTAUTH_SECRET=sua_chave_secreta
NEXTAUTH_URL=http://localhost:3000
```

## 5. Executar

```bash
npm run dev
```

## 6. Acessar

```txt
http://localhost:3000
```

---

# Deploy

Aplicação publicada na plataforma Vercel:

https://barber-agenda-shvg.vercel.app

---

# Equipe

* Dimitri Porto
* Rafael
* Davi

---

# Considerações Finais

O projeto BarberAgenda demonstra a utilização integrada de tecnologias modernas do ecossistema React e Next.js para construção de uma aplicação web fullstack.

Foram aplicados conceitos de autenticação, persistência de dados, segurança, gerenciamento de estado, componentização, responsividade e deploy em ambiente de produção, atendendo aos requisitos propostos para a disciplina de Desenvolvimento Web II.
