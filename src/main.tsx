import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "jotai";
import { NuqsAdapter } from "nuqs/adapters/react";
import { scan } from "react-scan"; // must be imported before React and React DOM
import { Toaster } from "sonner";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { store } from "./lib/atoms.ts";

scan({
	enabled: true,
});

// biome-ignore lint/style/noNonNullAssertion: skip
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<NuqsAdapter>
				<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
					<App />

					<Toaster />
				</ThemeProvider>
			</NuqsAdapter>
		</Provider>
	</StrictMode>,
);
