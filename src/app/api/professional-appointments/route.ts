import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { Appointment } from "@/models/Appointment";

// Lista agendamentos de um profissional
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const barber = searchParams.get("barber");
  const date = searchParams.get("date");

  if (!barber) {
    return NextResponse.json(
      { error: "Informe o profissional." },
      { status: 400 }
    );
  }

  await connectDB();

  const filters: {
    barber: string;
    date?: string;
  } = {
    barber,
  };

  if (date) {
    filters.date = date;
  }

  const appointments = await Appointment.find(filters).sort({
    date: 1,
    time: 1,
  });

  return NextResponse.json(appointments);
}