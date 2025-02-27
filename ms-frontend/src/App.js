import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Clientes from "./pages/Clientes";
import Cuentas from "./pages/Cuentas";
import Movimientos from "./pages/Movimientos";
import Reportes from "./pages/Reportes";
import "./styles/Clientes.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/cuentas" element={<Cuentas />} />
            <Route path="/movimientos" element={<Movimientos />} />
            <Route path="/reportes" element={<Reportes />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
