
export const getPlanificacionesSinValidar   = async () => {
  
      const response = await fetch(`http://creativeharbor.tis.cs.umss.edu.bo/api/planificacionesSinValidar`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      const responseData = await response.json();  
      return responseData;
  };