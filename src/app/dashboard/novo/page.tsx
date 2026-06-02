"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const services = ["Corte Masculino", "Barba", "Corte + Barba"];

const barbers = ["João", "Carlos", "Pedro"];

const availableTimes = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
];

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function filterPastTimes(times: string[], selectedDate: string) {
  const today = getTodayDate();

  if (selectedDate !== today) {
    return times;
  }

  const now = new Date();

  return times.filter((time) => {
    const selectedDateTime = new Date(`${selectedDate}T${time}:00`);

    return selectedDateTime > now;
  });
}

// Página de criação de agendamento
export default function NewAppointmentPage() {
  const [service, setService] = useState("");
  const [barber, setBarber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredTimes = filterPastTimes(
    availableTimes.filter(
      (availableTime) => !unavailableTimes.includes(availableTime)
    ),
    date
  );

  useEffect(() => {
    async function loadAvailability() {
      if (!barber || !date) {
        setUnavailableTimes([]);
        return;
      }

      const response = await fetch(
        `/api/availability?barber=${encodeURIComponent(
          barber
        )}&date=${encodeURIComponent(date)}`
      );

      const data = await response.json();

      setUnavailableTimes(data.unavailableTimes || []);

      if (data.unavailableTimes?.includes(time)) {
        setTime("");
      }
    }

    loadAvailability();
  }, [barber, date, time]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    const response = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ service, barber, date, time, notes }),
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
    <main className="min-h-screen bg-[#F5F5F5] px-6 py-10">
      <section className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <AppLogo />

          <Button asChild variant="outline">
            <Link href="/dashboard">Voltar</Link>
          </Button>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-[#1F4D3A]">
              Novo agendamento
            </CardTitle>

            <CardDescription>
              Informe os dados do serviço para reservar um horário.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="service"
                  className="text-sm font-semibold text-[#2E6B52]"
                >
                  Serviço
                </label>

                <select
                  id="service"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  required
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Selecione um serviço</option>

                  {services.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="barber"
                  className="text-sm font-semibold text-[#2E6B52]"
                >
                  Barbeiro
                </label>

                <select
                  id="barber"
                  value={barber}
                  onChange={(event) => {
                    setBarber(event.target.value);
                    setTime("");
                  }}
                  required
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Selecione um barbeiro</option>

                  {barbers.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="text-sm font-semibold text-[#2E6B52]"
                >
                  Data
                </label>

                <Input
                  id="date"
                  type="date"
                  min={getTodayDate()}
                  value={date}
                  onChange={(event) => {
                    setDate(event.target.value);
                    setTime("");
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="time"
                  className="text-sm font-semibold text-[#2E6B52]"
                >
                  Horário
                </label>

                <select
                  id="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  required
                  disabled={!barber || !date}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">
                    {!barber || !date
                      ? "Selecione barbeiro e data"
                      : "Selecione um horário"}
                  </option>

                  {filteredTimes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                {barber && date && filteredTimes.length === 0 && (
                  <p className="text-xs text-red-500">
                    Não há horários disponíveis para este barbeiro nesta data.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="notes"
                  className="text-sm font-semibold text-[#2E6B52]"
                >
                  Observação
                </label>

                <Input
                  id="notes"
                  placeholder="Observação opcional"
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
                  disabled={isLoading}
                >
                  {isLoading ? "Salvando..." : "Salvar agendamento"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}