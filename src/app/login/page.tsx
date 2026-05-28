import Link from "next/link";

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

// Página de autenticação do usuário
export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-100 px-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>
            Acesse sua conta para gerenciar agendamentos.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Formulário será integrado ao NextAuth posteriormente */}
          <form className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>

            <Button type="submit" className="w-full">
              Entrar
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
    </main>
  );
}