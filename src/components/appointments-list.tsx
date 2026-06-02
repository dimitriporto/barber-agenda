"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppointmentFilterStore } from "@/store/appointment-filter-store";

type Appointment = {
  _id: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  notes: string;
};

// Formata a data para o padrão brasileiro
function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR");
}

// Lista e gerencia agendamentos do usuário
export function AppointmentsList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { filter, setFilter } = useAppointmentFilterStore();

  async function fetchAppointments() {
    const response = await fetch("/api/appointments");
    const data = await response.json();

    setAppointments(data);
    setIsLoading(false);
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Deseja excluir este agendamento?");

    if (!confirmDelete) {
      return;
    }

    await fetch(`/api/appointments/${id}`, {
      method: "DELETE",
    });

    setAppointments((currentAppointments) =>
      currentAppointments.filter((appointment) => appointment._id !== id)
    );
  }

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-zinc-500">
          Carregando agendamentos...
        </CardContent>
      </Card>
    );
  }

  if (appointments.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-zinc-500">
          Nenhum agendamento encontrado.
        </CardContent>
      </Card>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === "today") {
      return appointment.date === today;
    }

    if (filter === "upcoming") {
      return appointment.date > today;
    }

    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          className={filter === "all" ? "bg-[#1F4D3A] hover:bg-[#2E6B52]" : ""}
          onClick={() => setFilter("all")}
        >
          Todos
        </Button>

        <Button
          variant={filter === "today" ? "default" : "outline"}
          className={
            filter === "today" ? "bg-[#1F4D3A] hover:bg-[#2E6B52]" : ""
          }
          onClick={() => setFilter("today")}
        >
          Hoje
        </Button>

        <Button
          variant={filter === "upcoming" ? "default" : "outline"}
          className={
            filter === "upcoming" ? "bg-[#1F4D3A] hover:bg-[#2E6B52]" : ""
          }
          onClick={() => setFilter("upcoming")}
        >
          Próximos
        </Button>
      </div>

      {filteredAppointments.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-zinc-500">
            Nenhum agendamento encontrado para este filtro.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment._id} className="overflow-hidden">
              <CardHeader className="flex flex-col gap-4 border-b bg-white sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#2E6B52]">
                    Serviço agendado
                  </p>

                  <CardTitle className="mt-1 text-2xl">
                    {appointment.service}
                  </CardTitle>
                </div>

                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/dashboard/editar/${appointment._id}`}>
                      Editar
                    </Link>
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(appointment._id)}
                  >
                    Excluir
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="grid gap-4 p-6 text-sm text-zinc-600 sm:grid-cols-3">
                <div className="rounded-xl bg-zinc-50 p-4">
                  <p className="text-xs font-semibold uppercase text-[#2E6B52]">
                    Barbeiro
                  </p>

                  <p className="mt-1 font-semibold text-zinc-800">
                    {appointment.barber}
                  </p>
                </div>

                <div className="rounded-xl bg-zinc-50 p-4">
                  <p className="text-xs font-semibold uppercase text-[#2E6B52]">
                    Data
                  </p>

                  <p className="mt-1 font-semibold text-zinc-800">
                    {formatDate(appointment.date)}
                  </p>
                </div>

                <div className="rounded-xl bg-zinc-50 p-4">
                  <p className="text-xs font-semibold uppercase text-[#2E6B52]">
                    Horário
                  </p>

                  <p className="mt-1 font-semibold text-zinc-800">
                    {appointment.time}
                  </p>
                </div>

                {appointment.notes && (
                  <div className="rounded-xl bg-zinc-50 p-4 sm:col-span-3">
                    <p className="text-xs font-semibold uppercase text-[#2E6B52]">
                      Observação
                    </p>

                    <p className="mt-1 text-zinc-700">
                      {appointment.notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}