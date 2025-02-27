import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Cuentas.css"; // Estilos CSS

const Cuentas = () => {
  const [cuentas, setCuentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [nuevaCuenta, setNuevaCuenta] = useState({ numeroCuenta: "", tipoCuenta: "", saldoInicial: "", estado: true, clienteId: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [cuentaEditando, setCuentaEditando] = useState(null);

  // Obtener cuentas y clientes
  useEffect(() => {
    api.get("/cuentas")
      .then(response => setCuentas(response.data))
      .catch(error => console.error("Error al obtener cuentas:", error));

    api.get("/clientes")
      .then(response => setClientes(response.data))
      .catch(error => console.error("Error al obtener clientes:", error));
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setNuevaCuenta({ ...nuevaCuenta, [e.target.name]: e.target.value });
  };

  // Enviar cuenta al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/cuentas", { ...nuevaCuenta, clienteId: parseInt(nuevaCuenta.clienteId, 10) });
      setCuentas([...cuentas, response.data]);
      setModalOpen(false);
      setNuevaCuenta({ numeroCuenta: "", tipoCuenta: "", saldoInicial: "", estado: true, clienteId: "" });
    } catch (error) {
      console.error("Error al agregar cuenta:", error.response?.data || error.message);
    }
  };

  // Editar cuenta
  const handleEdit = (cuenta) => {
    setCuentaEditando(cuenta);
    setModalOpen(true);
  };

  // Guardar edición
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/cuentas/${cuentaEditando.id}`, cuentaEditando);
      setCuentas(cuentas.map(c => (c.id === cuentaEditando.id ? response.data : c)));
      setModalOpen(false);
      setCuentaEditando(null);
    } catch (error) {
      console.error("Error al actualizar cuenta:", error);
    }
  };

  // Eliminar cuenta
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta cuenta?")) {
      await api.delete(`/cuentas/${id}`);
      setCuentas(cuentas.filter(c => c.id !== id));
    }
  };

  return (
    <div className="contenedor-cuentas">
      <h2>Cuentas</h2>
      <button onClick={() => setModalOpen(true)}>Agregar Cuenta</button>

      <ul>
        {cuentas.map((cuenta) => (
          <li key={cuenta.id}>
            {cuenta.numeroCuenta} - {cuenta.tipoCuenta} - Cliente: {cuenta.clienteId}
            <button onClick={() => handleEdit(cuenta)}>Editar</button>
            <button onClick={() => handleDelete(cuenta.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {modalOpen && (
        <div className="modal">
          <form onSubmit={cuentaEditando ? handleUpdate : handleSubmit}>
            <input type="text" name="numeroCuenta" placeholder="Número de Cuenta" value={cuentaEditando ? cuentaEditando.numeroCuenta : nuevaCuenta.numeroCuenta} onChange={handleChange} required />
            <input type="text" name="tipoCuenta" placeholder="Tipo" value={cuentaEditando ? cuentaEditando.tipoCuenta : nuevaCuenta.tipoCuenta} onChange={handleChange} required />
            <input type="number" name="saldoInicial" placeholder="Saldo Inicial" value={cuentaEditando ? cuentaEditando.saldoInicial : nuevaCuenta.saldoInicial} onChange={handleChange} required />
            <select name="clienteId" value={cuentaEditando ? cuentaEditando.clienteId : nuevaCuenta.clienteId} onChange={handleChange} required>
              <option value="">Seleccione Cliente</option>
              {clientes.map(cliente => <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>)}
            </select>
            <button type="submit">{cuentaEditando ? "Actualizar" : "Agregar"}</button>
            <button onClick={() => setModalOpen(false)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cuentas;
