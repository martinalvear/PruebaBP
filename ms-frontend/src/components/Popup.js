import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Popup.css";

const Popup = ({ setShowPopup, setClientes, clienteEditando, setClienteEditando }) => {
  const [cliente, setCliente] = useState({ nombre: "", identificacion: "" });

  useEffect(() => {
    if (clienteEditando) {
      setCliente(clienteEditando);
    } else {
      setCliente({ nombre: "", identificacion: "" });
    }
  }, [clienteEditando]);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clienteEditando) {
      // Si está editando, actualiza el cliente
      api.put(`/clientes/${cliente.id}`, cliente)
        .then(response => {
          setClientes(prev => prev.map(c => (c.id === cliente.id ? response.data : c)));
          setShowPopup(false);
          setClienteEditando(null);
        })
        .catch(error => console.error("Error al actualizar cliente:", error));
    } else {
      // Si está agregando uno nuevo
      api.post("/clientes", cliente)
        .then(response => {
          setClientes(prev => [...prev, response.data]);
          setShowPopup(false);
        })
        .catch(error => console.error("Error al agregar cliente:", error));
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>{clienteEditando ? "Editar Cliente" : "Agregar Cliente"}</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre" value={cliente.nombre} onChange={handleChange} required />
          <input type="text" name="identificacion" placeholder="Identificación" value={cliente.identificacion} onChange={handleChange} required />
          <button type="submit">{clienteEditando ? "Guardar Cambios" : "Agregar"}</button>
          <button type="button" onClick={() => { setShowPopup(false); setClienteEditando(null); }}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
