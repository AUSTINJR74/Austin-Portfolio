import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@fontsource/outfit/latin.css";
import "@fontsource/jetbrains-mono/latin.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
