import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { Appointment } from "@/models/Appointment";

// Retorna horários já ocupados por barbeiro e data
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const barber = searchParams.get("barber");
  const date = searchParams.get("date");

  if (!barber || !date) {
    return NextResponse.json(
      { error: "Informe barbeiro e data." },
      { status: 400 }
    );
  }

  await connectDB();

  const appointments = await Appointment.find({
    barber,
    date,
  }).select("time");

  const unavailableTimes = appointments.map(
    (appointment) => appointment.time
  );

  return NextResponse.json({
    unavailableTimes,
  });
}