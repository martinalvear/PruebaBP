import { useState } from "react";
import api from "../api";

const Reportes = () => {
  const [reporte, setReporte] = useState(null);

  const generarReporte = async () => {
    const response = await api.get("/reportes");
    setReporte(response.data);
  };

  return (
    <div>
      <h2>Reportes</h2>
      <button onClick={generarReporte}>Generar Reporte</button>
    </div>
  );
};

export default Reportes;
