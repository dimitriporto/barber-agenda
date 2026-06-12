import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { Professional } from "@/models/Professional";

type RouteParams = {
  params: Promise<{ id: string }>;
};

// Busca um profissional específico
export async function GET(request: Request, { params }: RouteParams) {
  await connectDB();

  const { id } = await params;

  const professional = await Professional.findById(id);

  if (!professional) {
    return NextResponse.json(
      { error: "Profissional não encontrado." },
      { status: 404 }
    );
  }

  return NextResponse.json(professional);
}

// Atualiza profissional
export async function PATCH(request: Request, { params }: RouteParams) {
  await connectDB();

  const { id } = await params;
  const body = await request.json();

  const { name, email, active } = body;

  const professional = await Professional.findByIdAndUpdate(
    id,
    {
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
      ...(active !== undefined && { active }),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!professional) {
    return NextResponse.json(
      { error: "Profissional não encontrado." },
      { status: 404 }
    );
  }

  return NextResponse.json(professional);
}

// Remove profissional
export async function DELETE(request: Request, { params }: RouteParams) {
  await connectDB();

  const { id } = await params;

  const professional = await Professional.findByIdAndDelete(id);

  if (!professional) {
    return NextResponse.json(
      { error: "Profissional não encontrado." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "Profissional removido com sucesso.",
  });
}