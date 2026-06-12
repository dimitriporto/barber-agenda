import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { Professional } from "@/models/Professional";

// Lista profissionais
export async function GET() {
  await connectDB();

  const professionals = await Professional.find().sort({
    name: 1,
  });

  return NextResponse.json(professionals);
}

// Cadastra profissional
export async function POST(request: Request) {
  await connectDB();

  const body = await request.json();

  const { name, email } = body;

  if (!name || !email) {
    return NextResponse.json(
      {
        error: "Nome e e-mail são obrigatórios.",
      },
      {
        status: 400,
      }
    );
  }

  const professionalExists =
    await Professional.findOne({
      email,
    });

  if (professionalExists) {
    return NextResponse.json(
      {
        error: "Já existe profissional com este e-mail.",
      },
      {
        status: 400,
      }
    );
  }

  const professional =
    await Professional.create({
      name,
      email,
      services: [],
    });

  return NextResponse.json(
    professional,
    {
      status: 201,
    }
  );
}