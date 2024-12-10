export const getEmpresaData = async (idEmpresa) => {
  try {
    const response = await fetch(
      `http://creativeharbor.tis.cs.umss.edu.bo/api/empresa/${idEmpresa}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los datos de la empresa");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getEmpresaCalificaciones = async (idEmpresa) => {
  try {
    const response = await fetch(
      `http://creativeharbor.tis.cs.umss.edu.bo/api/empresas/notasSprint/${idEmpresa}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener las calificaciones de la empresa");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getSprintsEntregables = async (idEmpresa) => {
  try {
    const response = await fetch(
      `http://creativeharbor.tis.cs.umss.edu.bo/api/empresa/${idEmpresa}/sprintsEntregables`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los sprints y entregables");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getSprintConEntregables = async (idSprint) => {
  try {
    const response = await fetch(
      `http://creativeharbor.tis.cs.umss.edu.bo/api/empresa/sprintConEntregables/${idSprint}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los sprints y entregables");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getSemanasTareas = async (idEmpresa) => {
  try {
    const response = await fetch(
      `http://creativeharbor.tis.cs.umss.edu.bo/api/empresa/${idEmpresa}/semanasTareas`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      }
    );

    if (!response.ok) {
      throw new Error(
        "Error al obtener los datos de los sprints, semanas y tareas"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getSemanaActualTareas= async (idEmpresa) => {
  try {
    const response = await fetch(
      `http://creativeharbor.tis.cs.umss.edu.bo/api/empresa/${idEmpresa}/sprintSemanaActualTareas`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      }
    );

    if (!response.ok) {
      throw new Error(
        "Error al obtener los datos de los sprints, semanas y tareas"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getEmpresasPorGrupo = async (idGrupo) => {
  try {
    const response = await fetch(
      `http://creativeharbor.tis.cs.umss.edu.bo/api/grupo/${idGrupo}/empresas`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener las empresas del grupo");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const getSprintsYEstudiantesPorEmpresa = async (idEmpresa) => {
  try {
    const response = await fetch(
      `http://creativeharbor.tis.cs.umss.edu.bo/api/empresa/${idEmpresa}/sprints-estudiantes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      }
    );

    if (!response.ok) {
      throw new Error(
        "Error al obtener los sprints y estudiantes de la empresa"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};
