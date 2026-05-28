import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LogoutButton } from "@/components/logout-button";
import { AppointmentsList } from "@/components/appointments-list";

// Dashboard protegido por sessão
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

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

          <div className="flex items-center gap-3">
            <p className="text-sm text-zinc-500">
                Olá, {session.user?.name}
            </p>

            <LogoutButton />

            <Button asChild>
                <Link href="/dashboard/novo">Novo agendamento</Link>
            </Button>
            </div>
        </header>

        <AppointmentsList />
        
      </section>
    </main>
  );
}