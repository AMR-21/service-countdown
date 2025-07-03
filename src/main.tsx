import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "sonner";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NuqsAdapter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />

        <Toaster />
      </ThemeProvider>
    </NuqsAdapter>
  </StrictMode>
);
