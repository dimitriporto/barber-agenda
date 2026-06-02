"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

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

// Página de login com autenticação via NextAuth
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      setError("E-mail ou senha inválidos.");
      setIsLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] px-6 py-10">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl items-center justify-center">
        <div className="grid w-full gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <AppLogo variant="large" />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-zinc-900">
                Acesse sua agenda
              </h1>

              <p className="mt-4 text-zinc-500">
                Entre para visualizar, criar e gerenciar seus horários na
                barbearia.
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Entrar</CardTitle>

              <CardDescription>
                Use seu e-mail e senha cadastrados.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-zinc-500">
                Ainda não tem conta?{" "}
                <Link href="/register" className="font-medium text-zinc-900">
                  Criar conta
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}