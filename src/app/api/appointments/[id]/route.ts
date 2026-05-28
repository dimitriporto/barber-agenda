import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Appointment } from "@/models/Appointment";

// Remove agendamento do usuário autenticado
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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

  await Appointment.deleteOne({
    _id: id,
  });

  return NextResponse.json({
    message: "Agendamento removido com sucesso.",
  });
}