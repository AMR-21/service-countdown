import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "sonner";
import { scan } from "react-scan"; // must be imported before React and React DOM
import { Provider } from "jotai";
import { store } from "./lib/atoms.ts";

scan({
  enabled: true,
});

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
  </StrictMode>
);
