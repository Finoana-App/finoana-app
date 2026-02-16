export default function Dashboard() {
  return (
    <section>
      <header className="bg-background/80 sticky top-0 z-20 hidden border-b px-5 py-4 backdrop-blur-md lg:block">
        <h1 className="text-xl font-semibold">Home</h1>
      </header>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <h1>This should be a protected page</h1>
      </div>
    </section>
  );
}
