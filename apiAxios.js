// ============================================================
// MODULO: API CON AXIOS
// ============================================================
//
// DESCRIPCION:
// Funciones que consumen la API usando axios.
//
// ============================================================

// URL base de la API
const BASE_URL = '/api';

// FUNCION: obtener historial con Axios
export async function obtenerHistorialAxios() {
    // Peticion GET
    const respuesta = await axios.get(BASE_URL + '/operaciones');
    // Devuelve data
    return respuesta.data;
}

// FUNCION: calcular con Axios (POST)
export async function calcularAxios(numero1, numero2, operador) {
    // Bloque try
    try {
        // Peticion POST
        const respuesta = await axios.post(BASE_URL + '/calcular', {
            // Primer numero
            numero1: numero1,
            // Segundo numero
            numero2: numero2,
            // Operador
            operador: operador
        });
        // Devuelve data
        return respuesta.data;
    // Bloque catch
    } catch (error) {
        // Lanza error con mensaje
        throw new Error(error.response && error.response.data ? error.response.data.mensaje : 'Error al calcular');
    }
}

// FUNCION: obtener estadisticas con Axios
export async function obtenerEstadisticasAxios() {
    // Peticion GET
    const respuesta = await axios.get(BASE_URL + '/estadisticas');
    // Devuelve data
    return respuesta.data;
}

// FUNCION: eliminar operacion con Axios
export async function eliminarOperacionAxios(id) {
    // Try
    try {
        // Peticion DELETE
        const respuesta = await axios.delete(BASE_URL + '/operaciones/' + id);
        // Devuelve data
        return respuesta.data;
    // Catch
    } catch (error) {
        // Lanza error
        throw new Error(error.response && error.response.data ? error.response.data.mensaje : 'Error al eliminar');
    }
}

// FUNCION: limpiar historial con Axios
export async function limpiarHistorialAxios() {
    // Try
    try {
        // Peticion DELETE
        const respuesta = await axios.delete(BASE_URL + '/operaciones');
        // Devuelve data
        return respuesta.data;
    // Catch
    } catch (error) {
        // Lanza error
        throw new Error(error.response && error.response.data ? error.response.data.mensaje : 'Error al limpiar');
    }
}