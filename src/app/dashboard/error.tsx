"use client";

import { Button } from "@/components/ui/button";

// Tela exibida quando ocorre erro no dashboard
export default function DashboardError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-zinc-100 p-6">
      <section className="mx-auto max-w-3xl rounded-xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-zinc-900">
          Algo deu errado
        </h1>

        <p className="mt-2 text-zinc-500">
          Não foi possível carregar esta área do sistema.
        </p>

        <Button onClick={reset} className="mt-6">
          Tentar novamente
        </Button>
      </section>
    </main>
  );
}