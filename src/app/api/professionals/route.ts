import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Professional } from "@/models/Professional";
import { User } from "@/models/User";

// Lista profissionais
export async function GET() {
  await connectDB();

  const professionals = await Professional.find().sort({
    name: 1,
  });

  return NextResponse.json(professionals);
}

// Cadastra profissional e cria usuário de acesso
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string } | undefined)?.role;

  if (role !== "admin") {
    return NextResponse.json(
      { error: "Apenas administradores podem cadastrar profissionais." },
      { status: 403 }
    );
  }

  await connectDB();

  const body = await request.json();
  const { name, email } = body;

  if (!name || !email) {
    return NextResponse.json(
      { error: "Nome e e-mail são obrigatórios." },
      { status: 400 }
    );
  }

  const professionalExists = await Professional.findOne({ email });

  if (professionalExists) {
    return NextResponse.json(
      { error: "Já existe profissional com este e-mail." },
      { status: 400 }
    );
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return NextResponse.json(
      { error: "Já existe usuário com este e-mail." },
      { status: 400 }
    );
  }

  const initialPassword = "123456";
  const hashedPassword = await bcrypt.hash(initialPassword, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "professional",
  });

  const professional = await Professional.create({
    name,
    email,
    userId: user._id,
    services: [],
    active: true,
  });

  return NextResponse.json(
    {
      message: "Profissional cadastrado com sucesso.",
      professional,
      initialPassword,
    },
    { status: 201 }
  );
}