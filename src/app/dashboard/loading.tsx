// Loading automático para rotas do dashboard
export default function DashboardLoading() {
  return (
    <main className="min-h-screen bg-zinc-100 p-6">
      <section className="mx-auto max-w-5xl space-y-6">
        <div className="h-8 w-64 animate-pulse rounded bg-zinc-300" />

        <div className="h-32 animate-pulse rounded-xl bg-zinc-300" />

        <div className="h-32 animate-pulse rounded-xl bg-zinc-300" />
      </section>
    </main>
  );
}