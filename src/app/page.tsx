import Link from "next/link";

import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";

// Página inicial do sistema
export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] px-6 py-10">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center">
        <div className="grid w-full gap-10 md:grid-cols-[2fr_1fr] md:items-center">
          <div className="space-y-8">
            <AppLogo />

            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
                Plataforma de Agendamento
              </p>

              <h1 className="mt-4 text-5xl font-bold leading-tight text-zinc-900">
                Agende horários de barbearia com praticidade.
              </h1>

              <p className="mt-6 text-lg text-zinc-600">
                O BarberAgenda permite que clientes criem conta, façam login e
                gerenciem seus próprios horários de atendimento.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
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

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-widest text-zinc-400">
              Projeto Web II
            </p>

            <h2 className="mt-3 text-xl font-bold text-zinc-900">
              Sistema completo de agendamento
            </h2>

            <p className="mt-4 text-zinc-600">
              Desenvolvido com Next.js, TypeScript, MongoDB Atlas, NextAuth e
              Vercel, permitindo cadastro, autenticação e gerenciamento de
              horários em ambiente web.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}