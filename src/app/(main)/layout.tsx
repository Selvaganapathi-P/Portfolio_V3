import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ai/ChatWidget";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ParticleField } from "@/components/ui/ParticleField";
import { PageTransition } from "@/components/ui/PageTransition";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <CustomCursor />
      <ParticleField />
      <Navbar />
      <main className="min-h-screen pt-16 relative z-[1]">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <ChatWidget />
    </LenisProvider>
  );
}
