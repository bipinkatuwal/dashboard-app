import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
  const [activeView, setActiveView] = useState("home");
  return (
    <main className="flex min-h-screen">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <MainContent activeView={activeView} />
    </main>
  );
}

export default App;
