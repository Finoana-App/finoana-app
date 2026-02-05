import {
  Architecture,
  Features,
  Footer,
  Header,
  Hero,
  MobileDownload,
  Values,
  Vision,
} from "@/components/landing";

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
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
