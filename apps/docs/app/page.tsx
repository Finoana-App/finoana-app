import { Architecture } from "@/components/architecture";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MobileDownload } from "@/components/mobile-download";
import { Values } from "@/components/valuers";
import { Vision } from "@/components/vision";

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
