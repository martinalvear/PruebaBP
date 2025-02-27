import { useState, useEffect } from "react";
import api from "../api";
import Popup from "../components/Popup";
import "../styles/Clientes.css";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  useEffect(() => {
    api.get("/clientes")
      .then(response => setClientes(response.data))
      .catch(error => console.error("Error al obtener clientes:", error));
  }, []);

  const handleDelete = (id) => {
    api.delete(`/clientes/${id}`)
      .then(() => setClientes(clientes.filter(c => c.id !== id)))
      .catch(error => console.error("Error al eliminar cliente:", error));
  };

  const handleEdit = (cliente) => {
    setClienteEditando(cliente);
    setShowPopup(true);
  };

  return (
    <div className="content">
      <h2>Clientes</h2>
      <button onClick={() => setShowPopup(true)}>Agregar Cliente</button>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Identificación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nombre}</td>
              <td>{cliente.identificacion}</td>
              <td>
                <button onClick={() => handleEdit(cliente)}>Editar</button>
                <button onClick={() => handleDelete(cliente.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <Popup 
          setShowPopup={setShowPopup} 
          setClientes={setClientes} 
          clienteEditando={clienteEditando} 
          setClienteEditando={setClienteEditando} 
        />
      )}
    </div>
  );
};

export default Clientes;
