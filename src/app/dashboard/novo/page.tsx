"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        setTime("");
        return;
      }

      const response = await fetch(
        `/api/availability?barber=${encodeURIComponent(
          barber
        )}&date=${encodeURIComponent(date)}`
      );

      const data = await response.json();
      const occupiedTimes = data.unavailableTimes || [];

      setUnavailableTimes(occupiedTimes);

      if (time && occupiedTimes.includes(time)) {
        setTime("");
      }
    }

    loadAvailability();
  }, [barber, date]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!service || !barber || !date || !time) {
      setError("Preencha serviço, barbeiro, data e horário.");
      return;
    }

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

    const params = new URLSearchParams({
      service,
      barber,
      date,
      time,
    });

    window.location.href = `/dashboard/confirmacao?${params.toString()}`;
  }

  return (
    <main className="min-h-screen bg-white px-4 py-8">
      <section className="mx-auto max-w-md">
        <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm">
          <header className="flex items-center gap-4 bg-[#1F4D3A] px-5 py-5 text-white">
            <Link href="/dashboard" className="text-2xl leading-none">
              ←
            </Link>

            <h1 className="text-xl font-extrabold">
              Escolha de horário
            </h1>
          </header>

          <div className="px-6 py-5">
            <div className="mb-6 flex items-start justify-between">
              <div className="flex flex-col items-center">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 bg-white text-sm font-bold text-zinc-500">
                  1
                </div>
                <span className="mt-1 text-xs text-zinc-600">
                  Serviço
                </span>
              </div>

              <div className="mt-3 h-px flex-1 bg-zinc-300" />

              <div className="flex flex-col items-center">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
                  2
                </div>
                <span className="mt-1 text-xs font-semibold text-zinc-900">
                  Horário
                </span>
              </div>

              <div className="mt-3 h-px flex-1 bg-zinc-300" />

              <div className="flex flex-col items-center">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 bg-white text-sm font-bold text-zinc-500">
                  3
                </div>
                <span className="mt-1 text-xs text-zinc-600">
                  Confirmação
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#EAEAEA] text-2xl">
                    ✂
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="service"
                      className="text-xs font-semibold text-zinc-500"
                    >
                      Serviço
                    </label>

                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger
                        id="service"
                        className="mt-2 h-16 w-full rounded-xl border border-zinc-200 bg-[#F5F5F5] px-5 text-base font-bold text-zinc-900"
                      >
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>

                      <SelectContent>
                        {services.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <p className="mt-1 text-xs text-zinc-600">
                      R$ 35,00 • 30 min
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#EAEAEA] text-2xl">
                    👤
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="barber"
                      className="text-xs font-semibold text-zinc-500"
                    >
                      Barbeiro
                    </label>

                    <Select
                      value={barber}
                      onValueChange={(value) => {
                        setBarber(value);
                        setTime("");
                      }}
                    >
                      <SelectTrigger
                        id="barber"
                        className="mt-2 h-16 w-full rounded-xl border border-zinc-200 bg-[#F5F5F5] px-5 text-base font-bold text-zinc-900"
                      >
                        <SelectValue placeholder="Selecione o barbeiro" />
                      </SelectTrigger>

                      <SelectContent>
                        {barbers.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="mb-3 text-lg font-extrabold text-zinc-900">
                  Escolha a data
                </h2>

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
                  className="h-12 rounded-xl"
                />
              </div>

              <div>
                <h2 className="mb-3 text-lg font-extrabold text-zinc-900">
                  Horários disponíveis
                </h2>

                {!barber || !date ? (
                  <div className="rounded-xl border border-dashed border-zinc-300 p-4 text-center text-sm text-zinc-500">
                    Selecione barbeiro e data para ver os horários.
                  </div>
                ) : filteredTimes.length === 0 ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
                    Não há horários disponíveis para este barbeiro nesta data.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {filteredTimes.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTime(item)}
                        className={`h-12 rounded-lg border text-sm font-medium transition ${
                          time === item
                            ? "border-zinc-900 bg-zinc-900 text-white"
                            : "border-zinc-300 bg-white text-zinc-700 hover:border-[#1F4D3A]"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-semibold text-[#2E6B52]"
                >
                  Observação
                </label>

                <Input
                  id="notes"
                  placeholder="Observação opcional"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>

              {error && (
                <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="h-14 w-full rounded-2xl bg-[#1F4D3A] text-base font-extrabold uppercase hover:bg-[#2E6B52]"
                disabled={isLoading}
              >
                {isLoading ? "Salvando..." : "Confirmar horário"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}