import Link from "next/link";

// Logo reutilizável do sistema
export function AppLogo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAEAEA] text-xl">
        ✂
      </div>

      <div>
        <p className="font-bold leading-none text-[#1F4D3A]">
          Barbearia
        </p>

        <p className="font-bold leading-none text-[#1F4D3A]">
          Estilo & Cia
        </p>
      </div>
    </Link>
  );
}