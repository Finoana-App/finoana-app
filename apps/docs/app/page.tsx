import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Vision } from "@/components/vision";

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <article>
        <Hero />
        <Vision />
        <Features />
      </article>
      <Footer />
    </main>
  );
}
