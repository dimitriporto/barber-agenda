import Link from "next/link";

import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";

// Página inicial do sistema
export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] px-6 py-10">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-4xl flex-col items-center justify-center text-center">
        <div className="space-y-8">
          <div className="flex justify-center">
            <AppLogo variant="icon" />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
              Plataforma de Agendamento
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight text-[#1F4D3A]">
              Barbearia Estilo & Cia
            </h1>

            <p className="mt-3 text-lg font-medium text-zinc-700">
              Seu estilo, do seu jeito.
            </p>

            <p className="mt-6 text-lg text-zinc-600">
              Agende seus horários com praticidade e acompanhe seus
              atendimentos em um único lugar.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-[#1F4D3A] hover:bg-[#2E6B52]"
            >
              <Link href="/login">Entrar</Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/register">Criar conta</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-widest text-zinc-400">
            Projeto Web II
          </p>

          <h2 className="mt-3 text-xl font-bold text-[#1F4D3A]">
            Sistema Fullstack de Agendamento
          </h2>

          <p className="mt-4 text-zinc-600">
            Aplicação desenvolvida com Next.js, TypeScript, MongoDB Atlas,
            NextAuth e Vercel, integrando autenticação, rotas protegidas e
            CRUD completo de agendamentos.
          </p>
        </div>
      </section>
    </main>
  );
}