import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { Appointment } from "@/models/Appointment";
import { Availability } from "@/models/Availability";

// Retorna horários disponíveis por barbeiro e data
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

  const availability = await Availability.findOne({
    professionalName: barber,
    date,
  });

  if (!availability) {
    return NextResponse.json({
      availableTimes: [],
      unavailableTimes: [],
    });
  }

  const appointments = await Appointment.find({
    barber,
    date,
  }).select("time");

  const unavailableTimes = appointments.map(
    (appointment) => appointment.time
  );

  const availableTimes = availability.times.filter(
    (time: string) => !unavailableTimes.includes(time)
  );

  return NextResponse.json({
    availableTimes,
    unavailableTimes,
  });
}