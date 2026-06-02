"use client";

import { Button } from "@/components/ui/button";

// Tela global de erro do App Router
export default function Error({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#F5F5F5] px-6 py-10">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-3xl items-center justify-center">
        <div className="w-full rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAEAEA] text-3xl">
            ✂
          </div>

          <h1 className="mt-6 text-2xl font-bold text-[#1F4D3A]">
            Algo deu errado
          </h1>

          <p className="mt-3 text-zinc-500">
            Não foi possível carregar esta área do sistema.
          </p>

          <Button
            onClick={reset}
            className="mt-6 bg-[#1F4D3A] hover:bg-[#2E6B52]"
          >
            Tentar novamente
          </Button>
        </div>
      </section>
    </main>
  );
}