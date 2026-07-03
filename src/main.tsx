import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { HydraiVoiceAssistant } from "./components/voice/HydraiVoiceAssistant";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <div>
    <App />
    <HydraiVoiceAssistant />
  </div>,
);
