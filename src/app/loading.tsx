// Tela global de carregamento do App Router
export default function Loading() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] px-6 py-10">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-4xl items-center justify-center">
        <div className="w-full max-w-xl space-y-6">
          <div className="mx-auto h-20 w-20 animate-pulse rounded-full bg-[#EAEAEA]" />

          <div className="space-y-3">
            <div className="mx-auto h-6 w-64 animate-pulse rounded bg-[#EAEAEA]" />
            <div className="mx-auto h-4 w-80 animate-pulse rounded bg-[#EAEAEA]" />
          </div>

          <div className="h-40 animate-pulse rounded-3xl bg-white shadow-sm" />
        </div>
      </section>
    </main>
  );
}