// Componente de navegação otimizado do Next.js
import Link from "next/link";

// Página inicial do sistema
export default function Home() {
  return (

    // Container principal ocupando toda altura da tela
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center px-6">

      {/* Área central de apresentação */}
      <section className="max-w-3xl text-center">

        {/* Texto superior */}
        <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">
          Plataforma de Agendamento
        </p>

        {/* Nome principal do sistema */}
        <h1 className="mt-4 text-5xl font-bold text-zinc-900">
          BarberAgenda
        </h1>

        {/* Descrição resumida da plataforma */}
        <p className="mt-6 text-lg text-zinc-600">
          Sistema simples para clientes agendarem horários em uma barbearia,
          com controle de login, painel de agendamentos e gerenciamento dos
          serviços marcados.
        </p>

        {/* Área dos botões principais */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

          {/* Botão de login */}
          <Link
            href="/login"
            className="rounded-lg bg-zinc-900 px-6 py-3 text-white font-medium hover:bg-zinc-700 transition"
          >
            Entrar
          </Link>

          {/* Botão de cadastro */}
          <Link
            href="/register"
            className="rounded-lg border border-zinc-300 px-6 py-3 text-zinc-900 font-medium hover:bg-white transition"
          >
            Criar conta
          </Link>

        </div>
      </section>
    </main>
  );
}