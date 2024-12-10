export const obtenerDatosDocente = async () => {
    const url = "http://creativeharbor.tis.cs.umss.edu.bo/api/obtenerDatosDocente";
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
      return response
    } catch (error) {
      console.error("Error:", error);
    }
};

export const obtenerDatosEstudiante = async () => {
    const url = "http://creativeharbor.tis.cs.umss.edu.bo/api/obtenerDatosEstudiante";
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
      return response
    } catch (error) {
      console.error("Error:", error);
    }
};

export const updateDatosEstudiante = async (values) => {
    const url = "http://creativeharbor.tis.cs.umss.edu.bo/api/modificarDatosEstudiante";
    const bodyFetch = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    };

    try {
      const res = await fetch(url, bodyFetch);
      const response = res.json()
      return response
    } catch (error) {
      console.error("Error:", error);
    }
};

export const updateDatosDocente = async (values) => {
    const url = "http://creativeharbor.tis.cs.umss.edu.bo/api/modificarDatosDocente";
    const bodyFetch = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    };

    try {
      const res = await fetch(url, bodyFetch);
      const response = res.json()
      return response
    } catch (error) {
      console.error("Error:", error);
    }
};

export const updateDatosGenerico = async (url, values) => {
  const bodyFetch = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    credentials: "include",
  };

  try {
    const res = await fetch(url, bodyFetch);
    if (!res.ok) {
      throw new Error(`Error en la petición: ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error en la actualización:", error);
    throw error;
  }
};