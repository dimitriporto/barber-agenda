"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Página de edição de agendamento
export default function EditAppointmentPage() {
  const params = useParams();

  const [service, setService] = useState("");
  const [barber, setBarber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadAppointment() {
      try {
        const response = await fetch(`/api/appointments/${params.id}`);
        const data = await response.json();

        setService(data.service);
        setBarber(data.barber);
        setDate(data.date);
        setTime(data.time);
        setNotes(data.notes || "");
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadAppointment();
  }, [params.id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsSaving(true);

    const response = await fetch(`/api/appointments/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service,
        barber,
        date,
        time,
        notes,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Erro ao atualizar.");
      setIsSaving(false);
      return;
    }

    window.location.href = "/dashboard";
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F5F5F5] px-6 py-10">
        <section className="mx-auto max-w-3xl space-y-6">
          <div className="h-10 w-48 animate-pulse rounded bg-zinc-300" />
          <div className="h-96 animate-pulse rounded-2xl bg-zinc-300" />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] px-6 py-10">
      <section className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <AppLogo />

          <Button asChild variant="outline">
            <Link href="/dashboard">Voltar</Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Editar agendamento</CardTitle>

            <CardDescription>
              Atualize os dados do serviço agendado.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="service">Serviço</Label>

                <Input
                  id="service"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="barber">Barbeiro</Label>

                <Input
                  id="barber"
                  value={barber}
                  onChange={(event) => setBarber(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>

                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>

                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observação</Label>

                <Input
                  id="notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </div>

              {error && (
                <p className="rounded-md bg-red-50 p-3 text-sm text-red-600 sm:col-span-2">
                  {error}
                </p>
              )}

              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  className="w-full bg-[#1F4D3A] hover:bg-[#2E6B52]"
                  disabled={isSaving}
                >
                  {isSaving ? "Salvando..." : "Salvar alterações"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}