export const publicarPlanificacion = async (idEmpresa) => {
    const response = await fetch("http://creativeharbor.tis.cs.umss.edu.bo/api/publicarPlanificacion", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        idEmpresa: idEmpresa,
      }),
      credentials: 'include'
    });
  
    const data = await response.json();
    return data;
  };
  