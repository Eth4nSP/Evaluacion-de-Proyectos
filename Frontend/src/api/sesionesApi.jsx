import Cookies from 'js-cookie';
export const logout = async () => {
    try {
        await fetch('http://creativeharbor.tis.cs.umss.edu.bo/api/logout', {
            method: 'POST',
            headers: {
                'Authorization': true,
            },
            credentials: 'include'
        });
        Cookies.remove('random', { path: '/' });
        Cookies.remove('laravel_sesion', { path: '/' });
        localStorage.clear();
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
};