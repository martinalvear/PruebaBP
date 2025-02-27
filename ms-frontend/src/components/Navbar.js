import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Clientes</Link></li>
        <li><Link to="/cuentas">Cuentas</Link></li>
        <li><Link to="/movimientos">Movimientos</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
