"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { AppLogo } from "@/components/app-logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Página de cadastro com integração à API
export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Erro ao criar conta.");
      setIsLoading(false);
      return;
    }

    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] px-6 py-10">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl items-center justify-center">
        <div className="grid w-full gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <AppLogo />

            <div>
              <h1 className="text-4xl font-bold text-zinc-900">
                Crie sua conta
              </h1>

              <p className="mt-4 text-zinc-500">
                Cadastre-se para marcar horários e acompanhar seus
                agendamentos.
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Criar conta</CardTitle>

              <CardDescription>
                Preencha seus dados para acessar a plataforma.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>

                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>

                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>

                {error && (
                  <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#1F4D3A] hover:bg-[#2E6B52]"
                  disabled={isLoading}
                >
                  {isLoading ? "Criando conta..." : "Criar conta"}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-zinc-500">
                Já possui conta?{" "}
                <Link href="/login" className="font-medium text-zinc-900">
                  Entrar
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}