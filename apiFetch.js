// ============================================================
// MODULO: API CON FETCH
// ============================================================
//
// DESCRIPCION:
// Funciones que consumen la API usando fetch nativo.
//
// ============================================================

// URL base de la API
const BASE_URL = '/api';

// FUNCION: obtener historial con Fetch
export async function obtenerHistorialFetch() {
    // Peticion GET
    const respuesta = await fetch(BASE_URL + '/operaciones');
    // Si falla
    if (!respuesta.ok) throw new Error('Error al obtener historial');
    // Devuelve JSON
    return await respuesta.json();
}

// FUNCION: calcular con Fetch (POST)
export async function calcularFetch(numero1, numero2, operador) {
    // Peticion POST
    const respuesta = await fetch(BASE_URL + '/calcular', {
        // Metodo POST
        method: 'POST',
        // Headers JSON
        headers: { 'Content-Type': 'application/json' },
        // Body con los datos
        body: JSON.stringify({ numero1: numero1, numero2: numero2, operador: operador })
    });
    // Convierte respuesta
    const data = await respuesta.json();
    // Si falla
    if (!respuesta.ok) throw new Error(data.mensaje || 'Error al calcular');
    // Devuelve datos
    return data;
}

// FUNCION: obtener estadisticas con Fetch
export async function obtenerEstadisticasFetch() {
    // Peticion GET
    const respuesta = await fetch(BASE_URL + '/estadisticas');
    // Si falla
    if (!respuesta.ok) throw new Error('Error al obtener estadisticas');
    // Devuelve JSON
    return await respuesta.json();
}

// FUNCION: eliminar operacion con Fetch
export async function eliminarOperacionFetch(id) {
    // Peticion DELETE
    const respuesta = await fetch(BASE_URL + '/operaciones/' + id, {
        // Metodo DELETE
        method: 'DELETE'
    });
    // Convierte
    const data = await respuesta.json();
    // Si falla
    if (!respuesta.ok) throw new Error(data.mensaje || 'Error al eliminar');
    // Devuelve
    return data;
}

// FUNCION: limpiar historial con Fetch
export async function limpiarHistorialFetch() {
    // Peticion DELETE
    const respuesta = await fetch(BASE_URL + '/operaciones', {
        // Metodo DELETE
        method: 'DELETE'
    });
    // Convierte
    const data = await respuesta.json();
    // Si falla
    if (!respuesta.ok) throw new Error(data.mensaje || 'Error al limpiar');
    // Devuelve
    return data;
}