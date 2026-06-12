"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Professional = {
  _id: string;
  name: string;
  email: string;
  active: boolean;
};

type Availability = {
  _id: string;
  professionalId: string;
  professionalName: string;
  date: string;
  times: string[];
};

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

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR");
}

export default function AvailabilityManagementPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  const [professionalId, setProfessionalId] = useState("");
  const [date, setDate] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadProfessionals() {
    const response = await fetch("/api/professionals");
    const data = await response.json();

    const activeProfessionals = data.filter(
      (professional: Professional) => professional.active
    );

    setProfessionals(activeProfessionals);
  }

  async function loadAvailabilities() {
    const response = await fetch("/api/availability-management");
    const data = await response.json();

    setAvailabilities(data);
  }

  useEffect(() => {
    loadProfessionals();
    loadAvailabilities();
  }, []);

  function toggleTime(time: string) {
    setSelectedTimes((currentTimes) => {
      if (currentTimes.includes(time)) {
        return currentTimes.filter((item) => item !== time);
      }

      return [...currentTimes, time].sort();
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    const response = await fetch("/api/availability-management", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        professionalId,
        date,
        times: selectedTimes,
      }),
    });

    if (response.ok) {
      setMessage("Disponibilidade salva com sucesso.");
      setProfessionalId("");
      setDate("");
      setSelectedTimes([]);
      loadAvailabilities();
    } else {
      const data = await response.json();
      setMessage(data.error || "Erro ao salvar disponibilidade.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] px-6 py-10">
      <section className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1F4D3A]">
              Disponibilidade
            </h1>

            <p className="text-sm text-zinc-500">
              Libere dias e horários para cada profissional.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/dashboard">Voltar</Link>
          </Button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-zinc-900">
            Liberar horários
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#2E6B52]">
                Profissional
              </label>

              <Select
                value={professionalId}
                onValueChange={setProfessionalId}
              >
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Selecione o profissional" />
                </SelectTrigger>

                <SelectContent>
                  {professionals.map((professional) => (
                    <SelectItem
                      key={professional._id}
                      value={professional._id}
                    >
                      {professional.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
                className="h-12 rounded-xl"
              />
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-[#2E6B52]">
              Horários
            </h3>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => toggleTime(time)}
                  className={`h-12 rounded-lg border text-sm font-medium transition ${
                    selectedTimes.includes(time)
                      ? "border-[#1F4D3A] bg-[#1F4D3A] text-white"
                      : "border-zinc-300 bg-white text-zinc-700"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {message && (
            <p className="rounded-md bg-zinc-100 p-3 text-sm text-zinc-700">
              {message}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="bg-[#1F4D3A] hover:bg-[#2E6B52]"
          >
            {loading ? "Salvando..." : "Salvar disponibilidade"}
          </Button>
        </form>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Disponibilidades cadastradas
          </h2>

          {availabilities.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Nenhuma disponibilidade cadastrada.
            </p>
          ) : (
            <div className="space-y-3">
              {availabilities.map((availability) => (
                <div
                  key={availability._id}
                  className="rounded-xl border p-4"
                >
                  <p className="font-semibold text-zinc-900">
                    {availability.professionalName}
                  </p>

                  <p className="text-sm text-zinc-500">
                    {formatDate(availability.date)}
                  </p>

                  <p className="mt-2 text-sm text-zinc-700">
                    {availability.times.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}