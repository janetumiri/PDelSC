// ============================================================
// SERVIDOR EXPRESS - CALCULADORA BASICA
// ============================================================
//
// DESCRIPCION:
// Servidor Express con API REST para calculos matematicos.
//
// ============================================================

// Importa express para crear el servidor
import express from 'express';
// Importa path para rutas de archivos
import path from 'path';
// Importa cors para peticiones cruzadas
import cors from 'cors';
// Importa fileURLToPath para convertir URL
import { fileURLToPath } from 'url';
// Importa la clase GestorOperaciones
import { GestorOperaciones } from './modules/GestorOperaciones.js';

// Convierte la URL a ruta del sistema
const __filename = fileURLToPath(import.meta.url);
// Obtiene el directorio del archivo
const __dirname = path.dirname(__filename);

// Crea la aplicacion Express
const app = express();
// Define el puerto del servidor
const PORT = 3008;

// Crea una instancia del gestor
const gestor = new GestorOperaciones();

// Habilita CORS
app.use(cors());
// Permite procesar JSON
app.use(express.json());
// Sirve archivos estaticos de public
app.use(express.static(path.join(__dirname, 'public')));

// RUTA: OBTENER TODAS LAS OPERACIONES
app.get('/api/operaciones', function(req, res) {
    // Envia respuesta JSON
    res.json({
        // Exito
        exito: true,
        // Total de operaciones
        total: gestor.operaciones.length,
        // Array de operaciones
        datos: gestor.obtenerTodas()
    });
});

// RUTA: OBTENER ESTADISTICAS
app.get('/api/estadisticas', function(req, res) {
    // Envia respuesta
    res.json({
        // Exito
        exito: true,
        // Datos de estadisticas
        datos: gestor.obtenerEstadisticas()
    });
});

// RUTA: OBTENER OPERACION POR ID
app.get('/api/operaciones/:id', function(req, res) {
    // Convierte el ID
    const id = parseInt(req.params.id);
    // Busca la operacion
    const op = gestor.obtenerPorId(id);
    // Si no existe
    if (!op) {
        // Devuelve error 404
        return res.status(404).json({
            // Error
            exito: false,
            // Mensaje
            mensaje: 'Operacion no encontrada'
        });
    }
    // Devuelve la operacion
    res.json({
        // Exito
        exito: true,
        // Datos
        datos: op
    });
});

// RUTA: REALIZAR CALCULO
app.post('/api/calcular', function(req, res) {
    // Bloque try
    try {
        // Extrae datos del body
        const { numero1, numero2, operador } = req.body;
        // Convierte a float
        const num1 = parseFloat(numero1);
        // Convierte a float
        const num2 = parseFloat(numero2);
        // Valida numeros
        if (isNaN(num1) || isNaN(num2)) {
            // Error 400
            return res.status(400).json({
                // Error
                exito: false,
                // Mensaje
                mensaje: 'Los numeros no son validos'
            });
        }
        // Realiza el calculo
        const resultado = gestor.calcular(num1, num2, operador);
        // Devuelve 201 (creado)
        res.status(201).json({
            // Exito
            exito: true,
            // Mensaje
            mensaje: 'Calculo realizado correctamente',
            // Datos
            datos: resultado
        });
    // Bloque catch
    } catch (error) {
        // Error 400
        res.status(400).json({
            // Error
            exito: false,
            // Mensaje
            mensaje: error.message
        });
    }
});

// RUTA: ELIMINAR OPERACION
app.delete('/api/operaciones/:id', function(req, res) {
    // Convierte el ID
    const id = parseInt(req.params.id);
    // Elimina
    const eliminado = gestor.eliminar(id);
    // Si no se elimino
    if (!eliminado) {
        // Error 404
        return res.status(404).json({
            // Error
            exito: false,
            // Mensaje
            mensaje: 'Operacion no encontrada'
        });
    }
    // Exito
    res.json({
        // Exito
        exito: true,
        // Mensaje
        mensaje: 'Operacion eliminada correctamente'
    });
});

// RUTA: LIMPIAR HISTORIAL
app.delete('/api/operaciones', function(req, res) {
    // Limpia el historial
    gestor.limpiarHistorial();
    // Exito
    res.json({
        // Exito
        exito: true,
        // Mensaje
        mensaje: 'Historial limpiado correctamente'
    });
});

// INICIAR SERVIDOR
app.listen(PORT, function() {
    // Separador
    console.log('========================================');
    // Titulo
    console.log('  CALCULADORA BASICA');
    // Separador
    console.log('========================================');
    // URL servidor
    console.log('  Servidor: http://localhost:' + PORT);
    // URL API
    console.log('  API:      http://localhost:' + PORT + '/api/operaciones');
    // Separador
    console.log('========================================');
});