import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Data from "./pages/Data";
import ThemeToggler from "./components/ThemeToggler";

function App() {
  return (
    <Router>
      <main className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 bg-primary overflow-hidden h-screen">
          <div className="relative max-w-7xl mx-auto flex flex-col h-full">
            <ThemeToggler />
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/data" element={<Data />} />
            </Routes>
          </div>
        </div>
      </main>
    </Router>
  );
}

export default App;
