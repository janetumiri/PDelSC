// ============================================================
// APP.JS - LOGICA PRINCIPAL
// ============================================================

// Importa funciones de apiFetch
import * as apiFetch from './apiFetch.js';
// Importa funciones de apiAxios
import * as apiAxios from './apiAxios.js';

// Obtiene el display de operacion
const operacionDisplay = document.getElementById('operacion-display');
// Obtiene el display de resultado
const resultadoDisplay = document.getElementById('resultado-display');
// Obtiene la lista del historial
const listaHistorial = document.getElementById('lista-historial');
// Obtiene el contenedor de estadisticas
const estadisticasDiv = document.getElementById('estadisticas');
// Obtiene el boton de tema
const btnTema = document.getElementById('btn-tema');
// Obtiene el contenedor de notificaciones
const notificacion = document.getElementById('notificacion');
// Obtiene el boton limpiar historial
const btnLimpiarHistorial = document.getElementById('btn-limpiar-historial');

// Numero que se escribe actualmente
let numeroActual = '0';
// Primer numero de la operacion
let numero1 = null;
// Operador seleccionado
let operador = null;
// Indica si espera el segundo numero
let esperandoNumero2 = false;

// Carga el tema guardado
function cargarTema() {
    // Obtiene el tema
    const tema = localStorage.getItem('tema');
    // Si es claro
    if (tema === 'claro') {
        // Agrega clase claro
        document.body.classList.add('claro');
        // Texto del boton
        btnTema.textContent = 'Modo Claro';
    // Si no
    } else {
        // Texto del boton
        btnTema.textContent = 'Modo Oscuro';
    }
}

// Listener del boton de tema
btnTema.addEventListener('click', function() {
    // Alterna la clase
    document.body.classList.toggle('claro');
    // Si tiene la clase
    if (document.body.classList.contains('claro')) {
        // Texto
        btnTema.textContent = 'Modo Claro';
        // Guarda
        localStorage.setItem('tema', 'claro');
    // Si no
    } else {
        // Texto
        btnTema.textContent = 'Modo Oscuro';
        // Guarda
        localStorage.setItem('tema', 'oscuro');
    }
});

// Muestra notificacion flotante
function mostrarNotificacion(mensaje, tipo) {
    // Establece el texto
    notificacion.textContent = mensaje;
    // Aplica clases
    notificacion.className = 'notificacion visible ' + tipo;
    // Oculta a los 3 segundos
    setTimeout(function() {
        // Resetea clases
        notificacion.className = 'notificacion';
    }, 3000);
}

// Actualiza la pantalla
function actualizarPantalla() {
    // Si hay operador
    if (operador !== null && numero1 !== null) {
        // Muestra la operacion
        operacionDisplay.textContent = numero1 + ' ' + operador + ' ' + (esperandoNumero2 ? '' : numeroActual);
    // Si no
    } else {
        // Solo el numero
        operacionDisplay.textContent = numeroActual;
    }
    // Muestra el resultado
    resultadoDisplay.textContent = '= ' + numeroActual;
}

// Agrega digito al numero
function agregarNumero(digito) {
    // Si espera el segundo
    if (esperandoNumero2) {
        // Reinicia
        numeroActual = digito;
        // Ya no espera
        esperandoNumero2 = false;
    // Si es 0
    } else if (numeroActual === '0') {
        // Reemplaza
        numeroActual = digito;
    // Si no
    } else {
        // Concatena
        numeroActual = numeroActual + digito;
    }
    // Actualiza
    actualizarPantalla();
}

// Agrega punto decimal
function agregarPunto() {
    // Si espera el segundo
    if (esperandoNumero2) {
        // Inicia con 0.
        numeroActual = '0.';
        // Ya no espera
        esperandoNumero2 = false;
    // Si no tiene punto
    } else if (!numeroActual.includes('.')) {
        // Agrega
        numeroActual = numeroActual + '.';
    }
    // Actualiza
    actualizarPantalla();
}

// Selecciona operador
function seleccionarOperador(op) {
    // Si ya hay operador
    if (operador !== null && !esperandoNumero2) {
        // Calcula parcial
        calcularParcial();
    }
    // Primer numero
    numero1 = parseFloat(numeroActual);
    // Operador
    operador = op;
    // Espera segundo
    esperandoNumero2 = true;
    // Actualiza
    actualizarPantalla();
}

// Calcula parcial
async function calcularParcial() {
    // Primer numero
    const n1 = numero1;
    // Segundo numero
    const n2 = parseFloat(numeroActual);
    // Valida
    if (!isNaN(n1) && !isNaN(n2)) {
        // Try
        try {
            // Llama con Fetch
            const data = await apiFetch.calcularFetch(n1, n2, operador);
            // Actualiza numero actual
            numeroActual = String(data.datos.resultado);
        // Catch
        } catch (error) {
            // Error
            numeroActual = 'Error';
        }
    }
}

// Calcula resultado final
async function calcularResultado() {
    // Valida operador
    if (operador === null || numero1 === null) return;
    // Primer numero
    const n1 = numero1;
    // Segundo numero
    const n2 = parseFloat(numeroActual);
    // Valida
    if (isNaN(n1) || isNaN(n2)) {
        // Error
        mostrarNotificacion('Numeros invalidos', 'error');
        // Sale
        return;
    }
    // Try
    try {
        // Llama con Axios
        const data = await apiAxios.calcularAxios(n1, n2, operador);
        // Resultado
        const resultado = data.datos.resultado;
        // Muestra en pantalla
        operacionDisplay.textContent = n1 + ' ' + operador + ' ' + n2 + ' =';
        // Muestra resultado
        resultadoDisplay.textContent = resultado;
        // Actualiza numero
        numeroActual = String(resultado);
        // Reinicia primer numero
        numero1 = null;
        // Reinicia operador
        operador = null;
        // Reinicia espera
        esperandoNumero2 = false;
        // Notifica
        mostrarNotificacion('Calculo realizado con Axios', 'exito');
        // Recarga historial
        cargarHistorial();
    // Catch
    } catch (error) {
        // Error
        mostrarNotificacion(error.message, 'error');
    }
}

// Limpia toda la calculadora
function limpiarTodo() {
    // Reinicia numero
    numeroActual = '0';
    // Reinicia primer
    numero1 = null;
    // Reinicia operador
    operador = null;
    // Reinicia espera
    esperandoNumero2 = false;
    // Actualiza
    actualizarPantalla();
}

// Borra ultimo digito
function borrarUltimo() {
    // Si tiene mas de 1
    if (numeroActual.length > 1) {
        // Elimina
        numeroActual = numeroActual.slice(0, -1);
    // Si tiene 1
    } else {
        // Vuelve a 0
        numeroActual = '0';
    }
    // Actualiza
    actualizarPantalla();
}

// Listener de clicks en el teclado
document.querySelector('.teclado').addEventListener('click', function(event) {
    // Boton clickeado
    const boton = event.target.closest('.tecla');
    // Si no es tecla
    if (!boton) return;
    // Si es numero
    if (boton.dataset.numero !== undefined) {
        // Agrega
        agregarNumero(boton.dataset.numero);
    // Si es operador
    } else if (boton.dataset.operador) {
        // Selecciona
        seleccionarOperador(boton.dataset.operador);
    // Si es accion
    } else if (boton.dataset.accion) {
        // Switch
        switch (boton.dataset.accion) {
            // Limpiar
            case 'limpiar':
                limpiarTodo();
                break;
            // Borrar
            case 'borrar':
                borrarUltimo();
                break;
            // Punto
            case 'punto':
                agregarPunto();
                break;
            // Calcular
            case 'calcular':
                calcularResultado();
                break;
        }
    }
});

// Listener de teclado fisico
document.addEventListener('keydown', function(event) {
    // Tecla
    const tecla = event.key;
    // Si es numero
    if (/^[0-9]$/.test(tecla)) {
        // Agrega
        agregarNumero(tecla);
    // Si es operador
    } else if (['+', '-', '*', '/', '%'].includes(tecla)) {
        // Selecciona
        seleccionarOperador(tecla);
    // Si es Enter o =
    } else if (tecla === 'Enter' || tecla === '=') {
        // Previene
        event.preventDefault();
        // Calcula
        calcularResultado();
    // Si es Escape o Delete
    } else if (tecla === 'Escape' || tecla === 'Delete') {
        // Limpia
        limpiarTodo();
    // Si es Backspace
    } else if (tecla === 'Backspace') {
        // Previene
        event.preventDefault();
        // Borra
        borrarUltimo();
    // Si es punto
    } else if (tecla === '.' || tecla === ',') {
        // Agrega
        agregarPunto();
    }
});

// Carga el historial
async function cargarHistorial() {
    // Try
    try {
        // Llama con Fetch
        const data = await apiFetch.obtenerHistorialFetch();
        // Renderiza
        renderizarHistorial(data.datos);
        // Carga estadisticas
        cargarEstadisticas();
    // Catch
    } catch (error) {
        // Error
        mostrarNotificacion(error.message, 'error');
    }
}

// Carga estadisticas
async function cargarEstadisticas() {
    // Try
    try {
        // Llama con Axios
        const data = await apiAxios.obtenerEstadisticasAxios();
        // Renderiza
        renderizarEstadisticas(data.datos);
    // Catch
    } catch (error) {
        // Error
        console.error(error);
    }
}

// Renderiza historial
function renderizarHistorial(operaciones) {
    // Si no hay
    if (operaciones.length === 0) {
        // Mensaje
        listaHistorial.innerHTML = '<p class="historial-vacio">No hay operaciones en el historial</p>';
        // Sale
        return;
    }
    // HTML
    let html = '';
    // Recorre al reves
    operaciones.slice().reverse().forEach(function(op) {
        // Fecha formateada
        const fecha = new Date(op.fecha).toLocaleString('es-AR');
        // Abre item
        html += '<div class="item-historial">';
        // Info
        html += '<div class="item-info">';
        // Expresion
        html += '<div class="item-expresion">' + op.expresion + '</div>';
        // Resultado
        html += '<div class="item-resultado">= ' + op.resultado + '</div>';
        // Fecha
        html += '<div class="item-fecha">' + fecha + '</div>';
        // Cierra info
        html += '</div>';
        // Boton eliminar
        html += '<button class="btn-eliminar-item" data-id="' + op.id + '">×</button>';
        // Cierra item
        html += '</div>';
    });
    // Inserta
    listaHistorial.innerHTML = html;
}

// Renderiza estadisticas
function renderizarEstadisticas(stats) {
    // HTML
    let html = '';
    // Total
    html += '<div class="stat"><div class="stat-num">' + stats.total + '</div><div class="stat-label">Total</div></div>';
    // Sumas
    html += '<div class="stat"><div class="stat-num">' + stats.sumas + '</div><div class="stat-label">Sumas</div></div>';
    // Restas
    html += '<div class="stat"><div class="stat-num">' + stats.restas + '</div><div class="stat-label">Restas</div></div>';
    // Multiplicaciones
    html += '<div class="stat"><div class="stat-num">' + stats.multiplicaciones + '</div><div class="stat-label">Multiplic.</div></div>';
    // Divisiones
    html += '<div class="stat"><div class="stat-num">' + stats.divisiones + '</div><div class="stat-label">Divisiones</div></div>';
    // Inserta
    estadisticasDiv.innerHTML = html;
}

// Listener de clicks en historial
listaHistorial.addEventListener('click', async function(event) {
    // Boton
    const boton = event.target.closest('.btn-eliminar-item');
    // Si no es boton
    if (!boton) return;
    // ID
    const id = boton.dataset.id;
    // Try
    try {
        // Elimina con Axios
        await apiAxios.eliminarOperacionAxios(id);
        // Notifica
        mostrarNotificacion('Operacion eliminada', 'exito');
        // Recarga
        cargarHistorial();
    // Catch
    } catch (error) {
        // Error
        mostrarNotificacion(error.message, 'error');
    }
});

// Listener del boton limpiar historial
btnLimpiarHistorial.addEventListener('click', async function() {
    // Try
    try {
        // Limpia con Fetch
        await apiFetch.limpiarHistorialFetch();
        // Notifica
        mostrarNotificacion('Historial limpiado correctamente', 'exito');
        // Recarga
        cargarHistorial();
    // Catch
    } catch (error) {
        // Error
        mostrarNotificacion(error.message, 'error');
    }
});

// Listener DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Carga tema
    cargarTema();
    // Actualiza pantalla
    actualizarPantalla();
    // Carga historial
    cargarHistorial();
});