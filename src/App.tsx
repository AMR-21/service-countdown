import { DirectionProvider } from "@base-ui/react/direction-provider";
import { BatchSelector } from "./components/batch-selector";
import { BgPattern } from "./components/bg-pattern";
import { ContentSection } from "./components/content-section";
import { Footer } from "./components/footer";

export default function App() {
	return (
		<DirectionProvider direction="rtl">
			<div className="mx-auto h-svh bg-background container flex flex-col max-w-2xl sm:border-x overflow-hidden">
				{/* Header */}
				<BatchSelector />

				<h1 className="px-8 pt-8 pb-16 text-center font-ruqaa text-7xl border-b border-border text-primary relative overflow-hidden">
					عَدَّادُ المِيرِي
					<BgPattern />
				</h1>

				<div className=" grow overflow-hidden ">
					<ContentSection />
				</div>
				<div className="border-t border-border">
					<Footer />
				</div>
			</div>
		</DirectionProvider>
	);
}
