"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
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
        const response = await fetch(
          `/api/appointments/${params.id}`
        );

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

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setIsSaving(true);

    const response = await fetch(
      `/api/appointments/${params.id}`,
      {
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
      }
    );

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
      <main className="p-6">
        <p>Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-100 p-6">
      <section className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Editar agendamento</CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <Label>Serviço</Label>

                <Input
                  value={service}
                  onChange={(event) =>
                    setService(event.target.value)
                  }
                />
              </div>

              <div>
                <Label>Barbeiro</Label>

                <Input
                  value={barber}
                  onChange={(event) =>
                    setBarber(event.target.value)
                  }
                />
              </div>

              <div>
                <Label>Data</Label>

                <Input
                  type="date"
                  value={date}
                  onChange={(event) =>
                    setDate(event.target.value)
                  }
                />
              </div>

              <div>
                <Label>Horário</Label>

                <Input
                  type="time"
                  value={time}
                  onChange={(event) =>
                    setTime(event.target.value)
                  }
                />
              </div>

              <div>
                <Label>Observação</Label>

                <Input
                  value={notes}
                  onChange={(event) =>
                    setNotes(event.target.value)
                  }
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSaving}
              >
                {isSaving
                  ? "Salvando..."
                  : "Salvar alterações"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}