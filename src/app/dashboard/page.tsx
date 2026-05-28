import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Dashboard principal do usuário
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-100 p-6">
      <section className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">
              Meus agendamentos
            </h1>

            <p className="text-zinc-500">
              Consulte e gerencie seus horários marcados.
            </p>
          </div>

          <Button asChild>
            <Link href="/dashboard/novo">
              Novo agendamento
            </Link>
          </Button>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Próximos horários</CardTitle>
          </CardHeader>

          <CardContent>
            {/* Lista provisória até integrar com o banco */}
            <div className="rounded-lg border border-dashed p-6 text-center text-zinc-500">
              Nenhum agendamento encontrado.
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}