import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { Availability } from "@/models/Availability";
import { Professional } from "@/models/Professional";

// Lista disponibilidades
export async function GET() {
  await connectDB();

  const availabilities = await Availability.find().sort({
    date: 1,
    professionalName: 1,
  });

  return NextResponse.json(availabilities);
}

// Cadastra ou atualiza disponibilidade
export async function POST(request: Request) {
  await connectDB();

  const body = await request.json();

  const { professionalId, date, times } = body;

  if (!professionalId || !date || !times || times.length === 0) {
    return NextResponse.json(
      { error: "Informe profissional, data e horários." },
      { status: 400 }
    );
  }

  const professional = await Professional.findById(professionalId);

  if (!professional) {
    return NextResponse.json(
      { error: "Profissional não encontrado." },
      { status: 404 }
    );
  }

  const availability = await Availability.findOneAndUpdate(
    {
      professionalId,
      date,
    },
    {
      professionalId,
      professionalName: professional.name,
      date,
      times,
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );

  return NextResponse.json(availability, { status: 201 });
}