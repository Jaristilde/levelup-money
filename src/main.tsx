import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize Firebase on app start
import '@/lib/firebase';

createRoot(document.getElementById("root")!).render(<App />);
