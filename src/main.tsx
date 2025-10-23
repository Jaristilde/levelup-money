import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// CRITICAL: Force Firebase to initialize immediately
import '@/lib/firebase';
console.log('🔴 main.tsx: Firebase import executed');

createRoot(document.getElementById("root")!).render(<App />);
