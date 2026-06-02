import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Appointment } from "@/models/Appointment";

type RouteParams = {
  params: Promise<{ id: string }>;
};

// Busca um agendamento do usuário autenticado
export async function GET(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Não autorizado." },
      { status: 401 }
    );
  }

  await connectDB();

  const { id } = await params;

  const appointment = await Appointment.findOne({
    _id: id,
    userId: session.user.id,
  });

  if (!appointment) {
    return NextResponse.json(
      { error: "Agendamento não encontrado." },
      { status: 404 }
    );
  }

  return NextResponse.json(appointment);
}

// Atualiza um agendamento do usuário autenticado
export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Não autorizado." },
      { status: 401 }
    );
  }

  await connectDB();

  const { id } = await params;
  const body = await request.json();

  const { service, barber, date, time, notes } = body;

  if (!service || !barber || !date || !time) {
    return NextResponse.json(
      { error: "Preencha os campos obrigatórios." },
      { status: 400 }
    );
  }

  const selectedDateTime = new Date(`${date}T${time}:00`);
  const now = new Date();

  if (selectedDateTime < now) {
    return NextResponse.json(
      {
        error: "Não é possível agendar para data ou horário passado.",
      },
      {
        status: 400,
      }
    );
  }

  const appointmentExists = await Appointment.findOne({
    _id: { $ne: id },
    barber,
    date,
    time,
  });

  if (appointmentExists) {
    return NextResponse.json(
      {
        error: "Este horário já está ocupado para este barbeiro.",
      },
      {
        status: 400,
      }
    );
  }

  const appointment = await Appointment.findOneAndUpdate(
    {
      _id: id,
      userId: session.user.id,
    },
    {
      service,
      barber,
      date,
      time,
      notes,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!appointment) {
    return NextResponse.json(
      { error: "Agendamento não encontrado." },
      { status: 404 }
    );
  }

  // Revalida o dashboard após atualização
  revalidatePath("/dashboard");

  return NextResponse.json({
    message: "Agendamento atualizado com sucesso.",
    appointment,
  });
}

// Remove agendamento do usuário autenticado
export async function DELETE(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Não autorizado." },
      { status: 401 }
    );
  }

  await connectDB();

  const { id } = await params;

  const appointment = await Appointment.findOne({
    _id: id,
    userId: session.user.id,
  });

  if (!appointment) {
    return NextResponse.json(
      { error: "Agendamento não encontrado." },
      { status: 404 }
    );
  }

  await Appointment.deleteOne({ _id: id });

  // Revalida o dashboard após exclusão
  revalidatePath("/dashboard");

  return NextResponse.json({
    message: "Agendamento removido com sucesso.",
  });
}