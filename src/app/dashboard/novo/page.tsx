import Link from "next/link";

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

// Página para criação de agendamento
export default function NewAppointmentPage() {
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
            {/* Formulário será integrado ao banco posteriormente */}
            <form className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="service">Serviço</Label>
                <Input id="service" placeholder="Ex: Corte de cabelo" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="barber">Barbeiro</Label>
                <Input id="barber" placeholder="Ex: João" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input id="date" type="date" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>
                <Input id="time" type="time" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observação</Label>
                <Input id="notes" placeholder="Observação opcional" />
              </div>

              <Button type="submit">
                Salvar agendamento
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}