import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/ai/ChatWidget";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { LenisProvider } from "@/components/providers/LenisProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
      <ChatWidget />
    </LenisProvider>
  );
}
