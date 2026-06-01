import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";

import { LogoutButton } from "@/components/logout-button";
import { AppointmentsList } from "@/components/appointments-list";
import { AppLogo } from "@/components/app-logo";

// Dashboard protegido por sessão
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-zinc-100 p-6">
      <section className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <AppLogo />

            <div>
              <h1 className="text-3xl font-bold text-zinc-900">
                Meus agendamentos
              </h1>

              <p className="text-zinc-500">
                Consulte e gerencie seus horários marcados.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-zinc-500">
              Olá, {session.user?.name}
            </p>

            <LogoutButton />

            <Button asChild>
              <Link href="/dashboard/novo">
                Novo agendamento
              </Link>
            </Button>
          </div>
        </header>

        <AppointmentsList />
      </section>
    </main>
  );
}