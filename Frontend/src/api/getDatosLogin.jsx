export const getOriginDocente = async () => {
    const url = "http://creativeharbor.tis.cs.umss.edu.bo/api/docente/getGrupo";
    const bodyFetch = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };

    try {
      const res = await fetch(url, bodyFetch);
      const response = await res.json();
      console.log(response)  
      localStorage.setItem('idGrupo', response.idGrupo);
      localStorage.setItem('nombreCompleto', response.nombreCompleto);
      localStorage.setItem('gestion', response.gestion);
      localStorage.setItem("fechaIniGestion", response.fechaIniGestion);
      localStorage.setItem("fechaLimiteEntregaEmpresa", response.fechaLimiteEntregaEmpresa);
      localStorage.setItem("fechaLimiteEntregaPlanificacion", response.fechaLimiteEntregaPlanificacion);
      localStorage.setItem("fechaFinPlanificacion", response.fechaFinPlanificacion);
      localStorage.setItem("fechaFinGestion", response.fechaFinGestion);
      localStorage.setItem('numEstudiantes', response.numEstudiantes);
      localStorage.setItem('numEmpresas', response.numEmpresas);
      localStorage.setItem("fechaEvaluacion", response.fechaEvaluacion);
      localStorage.setItem("tipoEvaluacion", response.tipoEvaluacion);
    } catch (error) {
      console.error("Error:", error);
    }
  
};