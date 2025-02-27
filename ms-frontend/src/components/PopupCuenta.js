import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Popup.css";

const PopupCuenta = ({ setShowPopup, setCuentas, cuentaEditando, setCuentaEditando }) => {
  const [cuenta, setCuenta] = useState({ numeroCuenta: "", tipoCuenta: "", saldoInicial: "", estado: true });

  useEffect(() => {
    if (cuentaEditando) {
      setCuenta(cuentaEditando);
    } else {
      setCuenta({ numeroCuenta: "", tipoCuenta: "", saldoInicial: "", estado: true });
    }
  }, [cuentaEditando]);

  const handleChange = (e) => {
    setCuenta({ ...cuenta, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cuentaEditando) {
      api.put(`/cuentas/${cuenta.id}`, cuenta)
        .then(response => {
          setCuentas(prev => prev.map(c => (c.id === cuenta.id ? response.data : c)));
          setShowPopup(false);
          setCuentaEditando(null);
        })
        .catch(error => console.error("Error al actualizar cuenta:", error));
    } else {
      api.post("/cuentas", cuenta)
        .then(response => {
          setCuentas(prev => [...prev, response.data]);
          setShowPopup(false);
        })
        .catch(error => console.error("Error al agregar cuenta:", error));
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>{cuentaEditando ? "Editar Cuenta" : "Agregar Cuenta"}</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="numeroCuenta" placeholder="Número de cuenta" value={cuenta.numeroCuenta} onChange={handleChange} required />
          <input type="text" name="tipoCuenta" placeholder="Tipo de cuenta" value={cuenta.tipoCuenta} onChange={handleChange} required />
          <input type="number" name="saldoInicial" placeholder="Saldo Inicial" value={cuenta.saldoInicial} onChange={handleChange} required />
          <button type="submit">{cuentaEditando ? "Guardar Cambios" : "Agregar"}</button>
          <button type="button" onClick={() => { setShowPopup(false); setCuentaEditando(null); }}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default PopupCuenta;
