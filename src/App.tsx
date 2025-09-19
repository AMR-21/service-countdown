import { BatchSelector } from "./components/batch-selector";
import { ContentSection } from "./components/content-section";
import { Footer } from "./components/footer";

export default function App() {
  return (
    <div className="mx-auto h-dvh bg-background container flex flex-col max-w-2xl sm:border-x overflow-hidden">
      {/* Header */}
      <div className="border-b border-border grid text-xl grid-cols-[1fr_0.75fr_0.75fr_1fr] text-center items-center">
        <BatchSelector />
      </div>

      <h1 className="px-8 pt-4 pb-8 text-center font-ruqaa text-6xl border-b border-border">
        عَدَّادُ المِيرِي
      </h1>

      <div className=" grow overflow-y-auto ">
        <ContentSection />
      </div>
      <div className="border-t border-border">
        <Footer />
      </div>
    </div>
  );
}
