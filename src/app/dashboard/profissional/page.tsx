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

type Appointment = {
  _id: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  notes: string;
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR");
}

export default function ProfessionalSchedulePage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [barber, setBarber] = useState("");
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadProfessionals() {
    const response = await fetch("/api/professionals");
    const data = await response.json();

    const activeProfessionals = data.filter(
      (professional: Professional) => professional.active
    );

    setProfessionals(activeProfessionals);
  }

  async function loadAppointments() {
    if (!barber) {
      setAppointments([]);
      return;
    }

    setLoading(true);

    const params = new URLSearchParams({
      barber,
    });

    if (date) {
      params.append("date", date);
    }

    const response = await fetch(
      `/api/professional-appointments?${params.toString()}`
    );

    const data = await response.json();

    setAppointments(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProfessionals();
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [barber, date]);

  return (
    <main className="min-h-screen bg-[#F5F5F5] px-6 py-10">
      <section className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1F4D3A]">
              Agenda do profissional
            </h1>

            <p className="text-sm text-zinc-500">
              Consulte os horários agendados por profissional.
            </p>
          </div>

          <Button asChild variant="outline">
            <Link href="/dashboard">Voltar</Link>
          </Button>
        </div>

        <div className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#2E6B52]">
              Profissional
            </label>

            <Select
              value={barber}
              onValueChange={setBarber}
            >
              <SelectTrigger className="h-12 rounded-xl">
                <SelectValue placeholder="Selecione o profissional" />
              </SelectTrigger>

              <SelectContent>
                {professionals.map((professional) => (
                  <SelectItem
                    key={professional._id}
                    value={professional.name}
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
              className="h-12 rounded-xl"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Agendamentos
          </h2>

          {!barber ? (
            <p className="text-sm text-zinc-500">
              Selecione um profissional para consultar a agenda.
            </p>
          ) : loading ? (
            <p className="text-sm text-zinc-500">
              Carregando agendamentos...
            </p>
          ) : appointments.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Nenhum agendamento encontrado.
            </p>
          ) : (
            <div className="space-y-3">
              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="rounded-xl border p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-zinc-900">
                        {appointment.time} - {appointment.service}
                      </p>

                      <p className="text-sm text-zinc-500">
                        {formatDate(appointment.date)}
                      </p>

                      {appointment.notes && (
                        <p className="mt-2 text-sm text-zinc-700">
                          Observação: {appointment.notes}
                        </p>
                      )}
                    </div>

                    <div className="rounded-full bg-[#EAEAEA] px-4 py-2 text-sm font-semibold text-zinc-700">
                      {appointment.barber}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}