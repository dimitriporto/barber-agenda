import Link from "next/link";

type AppLogoProps = {
  variant?: "default" | "icon" | "large";
};

// Logo reutilizável do sistema
export function AppLogo({ variant = "default" }: AppLogoProps) {
  if (variant === "icon") {
    return (
      <Link href="/" className="inline-flex justify-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#EAEAEA] text-6xl shadow-sm">
          ✂
        </div>
      </Link>
    );
  }

  if (variant === "large") {
    return (
      <Link href="/" className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAEAEA] text-3xl shadow-sm">
          ✂
        </div>

        <div>
          <p className="text-2xl font-bold leading-none text-[#1F4D3A]">
            Barbearia
          </p>

          <p className="text-2xl font-bold leading-none text-[#1F4D3A]">
            Estilo & Cia
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAEAEA] text-xl shadow-sm">
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