import { Architecture, Features, Footer, Header, Hero, MobileDownload, Values, Vision } from '@/components/landing';

export default function Page() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <article>
        <Hero />
        <Vision />
        <Features />
        <Architecture />
        <Values />
        <MobileDownload />
      </article>
      <Footer />
    </main>
  );
}
