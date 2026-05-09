import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ResultsPageContent } from "./ResultsPageContent";

export const metadata = {
  title: "Audit Results | ShadowStack",
  description: "Your personalized AI spending audit results and optimization recommendations",
};

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <ResultsPageContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}
