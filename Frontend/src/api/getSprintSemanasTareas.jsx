export const getSprintSemanasTareas = async (idSprint) => {
    try {
        const response = await fetch(`http://creativeharbor.tis.cs.umss.edu.bo/api/sprint/${idSprint}/semanas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos del sprint');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};