import Link from "next/link";

import { Button } from "@/components/ui/button";

type Props = {
  searchParams: Promise<{
    service?: string;
    barber?: string;
    date?: string;
    time?: string;
  }>;
};

function formatDate(date?: string) {
  if (!date) {
    return "Data não informada";
  }

  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR");
}

// Tela de confirmação do agendamento
export default async function AppointmentConfirmationPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const service = params.service || "Serviço não informado";
  const barber = params.barber || "Barbeiro não informado";
  const date = formatDate(params.date);
  const time = params.time || "Horário não informado";

  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <section className="mx-auto max-w-md">
        <div className="rounded-[2rem] border border-zinc-200 bg-white px-6 py-10 text-center shadow-sm">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#D9D9D9] text-7xl font-bold text-zinc-900">
            ✓
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-[#1F4D3A]">
            Agendamento realizado!
          </h1>

          <p className="mt-2 text-sm text-zinc-600">
            Seu horário foi confirmado com sucesso.
          </p>

          <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4 text-left shadow-sm">
            <h2 className="border-b pb-3 text-center text-sm font-bold text-zinc-800">
              Resumo do agendamento
            </h2>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-500">✂ Serviço</span>
                <strong className="text-right text-zinc-900">
                  {service}
                </strong>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-500">👤 Barbeiro</span>
                <strong className="text-right text-zinc-900">
                  {barber}
                </strong>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-500">📅 Data</span>
                <strong className="text-right text-zinc-900">
                  {date}
                </strong>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-500">🕒 Horário</span>
                <strong className="text-right text-zinc-900">
                  {time}
                </strong>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-zinc-500">💵 Valor</span>
                <strong className="text-right text-zinc-900">
                  R$ 35,00
                </strong>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-[#EAEAEA] p-4 text-left text-sm text-zinc-700">
            🔔 Você receberá um lembrete automático antes do seu horário.
          </div>

          <div className="mt-8 space-y-3">
            <Button
              asChild
              className="h-14 w-full rounded-2xl bg-[#1F4D3A] text-base font-extrabold uppercase hover:bg-[#2E6B52]"
            >
              <Link href="/dashboard">Ver meus agendamentos</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-14 w-full rounded-2xl border-2 border-zinc-900 text-base font-medium uppercase"
            >
              <Link href="/">Sair</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}