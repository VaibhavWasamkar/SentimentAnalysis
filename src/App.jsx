import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app-shell" style={{minHeight:"100vh",display:"flex",flexDirection:"column",background:"linear-gradient(135deg,#fff7d6 0%,#e6f0ff 100%)"}}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/:step" element={<Home />} />
          {/* Fallback to step 1 if user goes to /story */}
          <Route path="/" element={<Navigate to="/1" replace />} />
          {/* Unknown → Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
