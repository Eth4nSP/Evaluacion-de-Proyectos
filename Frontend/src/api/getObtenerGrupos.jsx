export const getTodosLosGrupos = async () => {
    try {
      const response = await fetch('http://creativeharbor.tis.cs.umss.edu.bo/api/grupos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
  
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else if (response.status === 404) {
        console.log('No se encontraron grupos.');
        return null;
      } else {
        throw new Error(`Error inesperado, código de estado: ${response.status}`);
      }
  
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  };
  