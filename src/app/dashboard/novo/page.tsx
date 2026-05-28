"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Página de criação de agendamento
export default function NewAppointmentPage() {
  const router = useRouter();

  const [service, setService] = useState("");
  const [barber, setBarber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    const response = await fetch("/api/appointments", {
      method: "POST",
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
      setError(data.error || "Erro ao criar agendamento.");
      setIsLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen bg-zinc-100 p-6">
      <section className="mx-auto max-w-2xl">
        <Button asChild variant="outline">
          <Link href="/dashboard">Voltar</Link>
        </Button>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Novo agendamento</CardTitle>

            <CardDescription>
              Informe os dados para marcar um horário.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="service">Serviço</Label>

                <Input
                  id="service"
                  placeholder="Ex: Corte de cabelo"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="barber">Barbeiro</Label>

                <Input
                  id="barber"
                  placeholder="Ex: João"
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
                  placeholder="Observação opcional"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </div>

              {error && (
                <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Salvando..."
                  : "Salvar agendamento"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}