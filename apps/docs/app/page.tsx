import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <article>
        <Hero />
      </article>
      <Footer />
    </main>
  );
}
