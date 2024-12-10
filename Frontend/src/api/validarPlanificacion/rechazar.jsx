export const rechazar = async (idEmpresa) => {
    const rechazarResponse = await fetch("http://creativeharbor.tis.cs.umss.edu.bo/api/rechazar", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idEmpresa }),
      credentials: 'include'
    });
  
    const data = await rechazarResponse.json();
  
    return data;
  };
  