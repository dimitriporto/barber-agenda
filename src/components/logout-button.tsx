"use client";

import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

// Encerra sessão do usuário autenticado
export function LogoutButton() {
  return (
    <Button
      variant="outline"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      Sair
    </Button>
  );
}