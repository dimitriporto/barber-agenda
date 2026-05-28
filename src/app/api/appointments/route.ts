import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Appointment } from "@/models/Appointment";

// Lista agendamentos do usuário logado
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Não autorizado." },
      { status: 401 }
    );
  }

  await connectDB();

  const appointments = await Appointment.find({
    userId: session.user.id,
  }).sort({ date: 1, time: 1 });

  return NextResponse.json(appointments);
}

// Cria agendamento para o usuário logado
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Não autorizado." },
      { status: 401 }
    );
  }

  await connectDB();

  const body = await request.json();
  const { service, barber, date, time, notes } = body;

  if (!service || !barber || !date || !time) {
    return NextResponse.json(
      { error: "Preencha os campos obrigatórios." },
      { status: 400 }
    );
  }

  const appointment = await Appointment.create({
    service,
    barber,
    date,
    time,
    notes,
    userId: session.user.id,
  });

  return NextResponse.json(
    {
      message: "Agendamento criado com sucesso.",
      appointment,
    },
    { status: 201 }
  );
}