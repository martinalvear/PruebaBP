import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Movimientos.css";

const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [nuevoMovimiento, setNuevoMovimiento] = useState({ fecha: "", tipoMovimiento: "", valor: "", cuentaId: "" });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    api.get("/movimientos")
      .then(response => setMovimientos(response.data))
      .catch(error => console.error("Error al obtener movimientos:", error));
  }, []);

  const handleChange = (e) => {
    setNuevoMovimiento({ ...nuevoMovimiento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/movimientos", { ...nuevoMovimiento, cuentaId: parseInt(nuevoMovimiento.cuentaId, 10) });
      setMovimientos([...movimientos, response.data]);
      setModalOpen(false);
    } catch (error) {
      console.error("Error al agregar movimiento:", error);
    }
  };

  return (
    <div className="contenedor-movimientos">
      <h2>Movimientos</h2>
      <button onClick={() => setModalOpen(true)}>Agregar Movimiento</button>

      <ul>
        {movimientos.map((mov) => (
          <li key={mov.id}>{mov.fecha} - {mov.tipoMovimiento} - ${mov.valor}</li>
        ))}
      </ul>

      {modalOpen && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <input type="date" name="fecha" value={nuevoMovimiento.fecha} onChange={handleChange} required />
            <input type="text" name="tipoMovimiento" value={nuevoMovimiento.tipoMovimiento} onChange={handleChange} required />
            <input type="number" name="valor" value={nuevoMovimiento.valor} onChange={handleChange} required />
            <input type="number" name="cuentaId" value={nuevoMovimiento.cuentaId} onChange={handleChange} required placeholder="ID Cuenta" />
            <button type="submit">Agregar</button>
            <button onClick={() => setModalOpen(false)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Movimientos;
