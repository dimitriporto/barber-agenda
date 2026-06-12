import Link from "next/link";

import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: "⏱",
    title: "Agendamento rápido",
    description: "Em poucos cliques",
  },
  {
    icon: "📅",
    title: "Horários disponíveis",
    description: "Veja em tempo real",
  },
  {
    icon: "🔔",
    title: "Lembretes automáticos",
    description: "Menos faltas, mais praticidade",
  },
];

// Página inicial do sistema
export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-8">
      <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col items-center justify-center text-center">
        <div className="w-full rounded-[2rem] border border-zinc-200 bg-white px-6 py-10 shadow-sm">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#EAEAEA] text-5xl shadow-sm">
            ✂
          </div>

          <h1 className="mt-6 text-2xl font-extrabold uppercase leading-tight tracking-wide text-[#1F4D3A]">
            Barbearia
            <br />
            Estilo & Cia
          </h1>

          <div className="mx-auto mt-3 w-40 border-t-2 border-dashed border-zinc-400" />

          <p className="mx-auto mt-3 max-w-xs text-sm text-zinc-700">
            Agende seu corte de forma rápida e prática
          </p>

          <div className="mt-8 space-y-5 text-left">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex items-center gap-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-xl">
                  {benefit.icon}
                </div>

                <div>
                  <p className="text-sm font-bold text-zinc-900">
                    {benefit.title}
                  </p>

                  <p className="text-xs text-zinc-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-3">
            <Button
              asChild
              className="h-12 w-full rounded-full bg-[#1F4D3A] text-sm font-bold uppercase hover:bg-[#2E6B52]"
            >
              <Link href="/login">Agendar agora</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-full border-2 border-zinc-900 text-sm font-medium uppercase"
            >
              <Link href="/register">Criar conta</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}