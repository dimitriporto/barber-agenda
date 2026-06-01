# BarberAgenda

Sistema web fullstack para agendamento de serviços em barbearia.

## Sobre o Projeto

O BarberAgenda permite que usuários criem conta, façam login e gerenciem seus próprios agendamentos.

O sistema possui autenticação de usuários e CRUD completo de agendamentos, com persistência dos dados em banco de dados MongoDB Atlas.

## Tecnologias Utilizadas

* Next.js
* TypeScript
* Tailwind CSS
* ShadCN/UI
* MongoDB Atlas
* Mongoose
* NextAuth.js
* Bcrypt
* Vercel

## Funcionalidades

* Cadastro de usuários
* Login e logout
* Proteção de rotas privadas
* Criação de agendamentos
* Listagem de agendamentos
* Edição de agendamentos
* Exclusão de agendamentos

## Como Executar Localmente

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
MONGODB_URI=sua_string_do_mongodb
NEXTAUTH_SECRET=sua_chave_secreta
NEXTAUTH_URL=http://localhost:3000
```

## Deploy

Sistema publicado em:

https://barber-agenda-shvg.vercel.app

## Estrutura Principal

```txt
src/
 ├── app/
 │   ├── api/
 │   ├── dashboard/
 │   ├── login/
 │   └── register/
 ├── components/
 ├── lib/
 ├── models/
 └── types/
```

## Equipe

* Dimitri Porto
* Rafael
* Davi
