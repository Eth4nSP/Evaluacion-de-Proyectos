// definir la url inicial de la api
const BASE_URL = 'http://creativeharbor.tis.cs.umss.edu.bo/api';

/**
 * Obtiene los datos de un sprint específico por su ID
 * @param {number} idSprint El ID del sprint
 * @returns {Promise<Object>} Los datos del sprint
 */
export async function getSprintPorId(idSprint) {
    try {
        const response = await fetch(`${BASE_URL}/getSprintPorId?idSprint=${idSprint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener los datos del sprint');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error en la API getSprintPorId:', error);
        throw error;
    }
}

/**
 * Obtiene una lista de sprints para una empresa específica
 * @param {number} idEmpresa El ID de la empresa
 * @returns {Promise<Array>} Lista de sprints de la empresa
 */
export async function getListaSprintsPorIdEmpresa(idEmpresa) {
    try {
        const response = await fetch(`${BASE_URL}/getListaSprintsPorIdEmpresa?idEmpresa=${idEmpresa}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener la lista de sprints');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error en la API getListaSprintsPorIdEmpresa:', error);
        throw error;
    }
}