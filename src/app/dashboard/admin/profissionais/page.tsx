"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Professional = {
  _id: string;
  name: string;
  email: string;
  active: boolean;
};

export default function ProfessionalsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [editingId, setEditingId] = useState("");
  const [editingName, setEditingName] = useState("");
  const [editingEmail, setEditingEmail] = useState("");

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadProfessionals() {
    const response = await fetch("/api/professionals");
    const data = await response.json();

    setProfessionals(data);
  }

  useEffect(() => {
    loadProfessionals();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    const response = await fetch("/api/professionals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    if (response.ok) {
      setName("");
      setEmail("");
      loadProfessionals();
    }

    setLoading(false);
  }

  function startEdit(professional: Professional) {
    setEditingId(professional._id);
    setEditingName(professional.name);
    setEditingEmail(professional.email);
  }

  function cancelEdit() {
    setEditingId("");
    setEditingName("");
    setEditingEmail("");
  }

  async function saveEdit(id: string) {
    await fetch(`/api/professionals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editingName,
        email: editingEmail,
      }),
    });

    cancelEdit();
    loadProfessionals();
  }

  async function toggleActive(professional: Professional) {
    await fetch(`/api/professionals/${professional._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        active: !professional.active,
      }),
    });

    loadProfessionals();
  }

  async function deleteProfessional(id: string) {
    const confirmDelete = confirm(
      "Deseja excluir este profissional?"
    );

    if (!confirmDelete) {
      return;
    }

    await fetch(`/api/professionals/${id}`, {
      method: "DELETE",
    });

    loadProfessionals();
  }

  return (
    <main className="min-h-screen bg-[#F5F5F5] px-6 py-10">
      <section className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#1F4D3A]">
            Profissionais
          </h1>

          <Button asChild variant="outline">
            <Link href="/dashboard">Voltar</Link>
          </Button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold text-zinc-900">
            Cadastrar profissional
          </h2>

          <Input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            disabled={loading}
            className="bg-[#1F4D3A] hover:bg-[#2E6B52]"
          >
            {loading ? "Salvando..." : "Cadastrar profissional"}
          </Button>
        </form>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Profissionais cadastrados
          </h2>

          {professionals.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Nenhum profissional cadastrado.
            </p>
          ) : (
            <div className="space-y-3">
              {professionals.map((professional) => (
                <div
                  key={professional._id}
                  className="rounded-lg border p-4"
                >
                  {editingId === professional._id ? (
                    <div className="space-y-3">
                      <Input
                        value={editingName}
                        onChange={(e) =>
                          setEditingName(e.target.value)
                        }
                      />

                      <Input
                        type="email"
                        value={editingEmail}
                        onChange={(e) =>
                          setEditingEmail(e.target.value)
                        }
                      />

                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          className="bg-[#1F4D3A] hover:bg-[#2E6B52]"
                          onClick={() =>
                            saveEdit(professional._id)
                          }
                        >
                          Salvar
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={cancelEdit}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold">
                          {professional.name}
                        </p>

                        <p className="text-sm text-zinc-500">
                          {professional.email}
                        </p>

                        <p
                          className={`mt-1 text-xs font-semibold ${
                            professional.active
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {professional.active
                            ? "Ativo"
                            : "Inativo"}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => startEdit(professional)}
                        >
                          Editar
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => toggleActive(professional)}
                        >
                          {professional.active
                            ? "Desativar"
                            : "Ativar"}
                        </Button>

                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() =>
                            deleteProfessional(professional._id)
                          }
                        >
                          Excluir
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}