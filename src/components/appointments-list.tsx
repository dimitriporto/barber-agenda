"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Tipagem do agendamento
type Appointment = {
  _id: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  notes: string;
};

// Lista os agendamentos do usuário
export function AppointmentsList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await fetch("/api/appointments");

        const data = await response.json();

        setAppointments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

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
          <CardHeader>
            <CardTitle>
              {appointment.service}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2 text-sm text-zinc-600">
            <p>
              <strong>Barbeiro:</strong>{" "}
              {appointment.barber}
            </p>

            <p>
              <strong>Data:</strong>{" "}
              {appointment.date}
            </p>

            <p>
              <strong>Horário:</strong>{" "}
              {appointment.time}
            </p>

            {appointment.notes && (
              <p>
                <strong>Observação:</strong>{" "}
                {appointment.notes}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}