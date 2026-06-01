import Link from "next/link";

// Logo textual reutilizável do sistema
export function AppLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F4D3A] text-sm font-bold text-white">
        BA
      </div>

      <span className="text-xl font-bold text-[#1A1A1A]">
        BarberAgenda
      </span>
    </Link>
  );
}