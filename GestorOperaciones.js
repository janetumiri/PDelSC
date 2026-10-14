// ============================================================
// MODULO: GESTOR DE OPERACIONES
// ============================================================
//
// DESCRIPCION:
// Maneja un ARRAY (vector) de instancias de la clase Operacion.
//
// ============================================================

// Importa la clase Operacion
import { Operacion } from './Operacion.js';

// Exporta la clase GestorOperaciones
export class GestorOperaciones {
    
    // CONSTRUCTOR
    constructor() {
        // Crea un array vacio para las operaciones
        this.operaciones = [];
        // Inicia el contador de IDs en 1
        this.siguienteId = 1;
        // Carga datos de ejemplo
        this.cargarDatosEjemplo();
    }

    // METODO: carga operaciones de ejemplo
    cargarDatosEjemplo() {
        // Array de objetos de ejemplo
        const ejemplos = [
            // Primer ejemplo
            { numero1: 10, numero2: 5, operador: '+' },
            // Segundo ejemplo
            { numero1: 20, numero2: 8, operador: '-' },
            // Tercer ejemplo
            { numero1: 6, numero2: 7, operador: '*' }
        ];

        // Guarda la referencia "this"
        const self = this;
        // Recorre cada ejemplo
        ejemplos.forEach(function(ej) {
            // Crea una nueva Operacion
            const op = new Operacion(
                // ID autoincremental
                self.siguienteId++,
                // Numero 1
                ej.numero1,
                // Numero 2
                ej.numero2,
                // Operador
                ej.operador
            );
            // Agrega al array
            self.operaciones.push(op);
        });
    }

    // METODO: calcula y guarda una operacion
    calcular(numero1, numero2, operador) {
        // Crea la operacion
        const op = new Operacion(
            // ID
            this.siguienteId++,
            // Numero 1
            numero1,
            // Numero 2
            numero2,
            // Operador
            operador
        );
        // Agrega al array
        this.operaciones.push(op);
        // Devuelve en JSON
        return op.toJSON();
    }

    // METODO: devuelve todas las operaciones
    obtenerTodas() {
        // Recorre y convierte cada una a JSON
        return this.operaciones.map(function(op) {
            // Convierte a JSON
            return op.toJSON();
        });
    }

    // METODO: busca una operacion por ID
    obtenerPorId(id) {
        // Busca en el array
        const op = this.operaciones.find(function(o) {
            // Compara IDs
            return o.id === id;
        });
        // Devuelve JSON o null
        return op ? op.toJSON() : null;
    }

    // METODO: elimina una operacion
    eliminar(id) {
        // Busca el indice
        const index = this.operaciones.findIndex(function(o) {
            // Compara IDs
            return o.id === id;
        });
        // Si no existe
        if (index === -1) return false;
        // Elimina 1 elemento
        this.operaciones.splice(index, 1);
        // Exito
        return true;
    }

    // METODO: limpia todo el historial
    limpiarHistorial() {
        // Vacia el array
        this.operaciones = [];
        // Reinicia el ID
        this.siguienteId = 1;
        // Exito
        return true;
    }

    // METODO: calcula estadisticas
    obtenerEstadisticas() {
        // Total de operaciones
        const total = this.operaciones.length;
        // Contadores por tipo
        let sumas = 0, restas = 0, multiplicaciones = 0, divisiones = 0, modulos = 0;
        // Recorre cada operacion
        this.operaciones.forEach(function(op) {
            // Si es suma
            if (op.operador === '+') sumas++;
            // Si es resta
            if (op.operador === '-') restas++;
            // Si es multiplicacion
            if (op.operador === '*') multiplicaciones++;
            // Si es division
            if (op.operador === '/') divisiones++;
            // Si es modulo
            if (op.operador === '%') modulos++;
        });
        // Devuelve el objeto
        return {
            // Total
            total: total,
            // Sumas
            sumas: sumas,
            // Restas
            restas: restas,
            // Multiplicaciones
            multiplicaciones: multiplicaciones,
            // Divisiones
            divisiones: divisiones,
            // Modulos
            modulos: modulos
        };
    }
}