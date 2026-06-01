import Link from "next/link";

// Logo textual reutilizável do sistema
export function AppLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white">
        BA
      </div>

      <span className="text-xl font-bold text-zinc-900">
        BarberAgenda
      </span>
    </Link>
  );
}