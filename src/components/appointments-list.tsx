"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Appointment = {
  _id: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  notes: string;
};

// Lista e gerencia agendamentos do usuário
export function AppointmentsList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        <CardContent className="p-6 text-center text-zinc-500">
          Nenhum agendamento encontrado.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {appointments.map((appointment) => (
        <Card key={appointment._id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{appointment.service}</CardTitle>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(appointment._id)}
            >
              Excluir
            </Button>
          </CardHeader>

          <CardContent className="space-y-2 text-sm text-zinc-600">
            <p>
              <strong>Barbeiro:</strong> {appointment.barber}
            </p>

            <p>
              <strong>Data:</strong> {appointment.date}
            </p>

            <p>
              <strong>Horário:</strong> {appointment.time}
            </p>

            {appointment.notes && (
              <p>
                <strong>Observação:</strong> {appointment.notes}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}