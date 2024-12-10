export const fechasSubmit = async (valores) => {
        const response = await fetch('http://creativeharbor.tis.cs.umss.edu.bo/api/grupo/actualizar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(valores),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el grupo');
        }
        const data = await response.json();
        return data
};
