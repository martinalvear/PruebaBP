import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <ul>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/cuentas">Cuentas</Link></li>
        <li><Link to="/movimientos">Movimientos</Link></li>
        <li><Link to="/reportes">Reportes</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
