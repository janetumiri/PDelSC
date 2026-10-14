// ============================================================
// MODULO: OPERACION
// ============================================================
//
// DESCRIPCION:
// Define la clase Operacion que representa un calculo matematico.
//
// ============================================================

// Exporta la clase Operacion para poder importarla
export class Operacion {
    
    // CONSTRUCTOR: se ejecuta al crear "new Operacion(...)"
    constructor(id, numero1, numero2, operador) {
        // Guarda el ID unico
        this._id = id;
        // Guarda el primer numero
        this._numero1 = numero1;
        // Guarda el segundo numero
        this._numero2 = numero2;
        // Guarda el operador (+, -, *, /, %)
        this._operador = operador;
        // Calcula el resultado al instante
        this._resultado = this.calcularResultado();
        // Guarda fecha y hora
        this._fecha = new Date().toISOString();
    }

    // GETTER: devuelve el ID
    get id() {
        // Retorna el valor privado
        return this._id;
    }

    // GETTER: devuelve el numero1
    get numero1() {
        // Retorna el valor privado
        return this._numero1;
    }

    // GETTER: devuelve el numero2
    get numero2() {
        // Retorna el valor privado
        return this._numero2;
    }

    // GETTER: devuelve el operador
    get operador() {
        // Retorna el valor privado
        return this._operador;
    }

    // GETTER: devuelve el resultado
    get resultado() {
        // Retorna el valor privado
        return this._resultado;
    }

    // GETTER: devuelve la fecha
    get fecha() {
        // Retorna el valor privado
        return this._fecha;
    }

    // SETTER: modifica numero1 con validacion
    set numero1(valor) {
        // Valida que sea numero
        if (isNaN(valor)) {
            // Lanza error si no es numero
            throw new Error('El primer numero debe ser valido');
        }
        // Asigna el valor
        this._numero1 = valor;
        // Recalcula el resultado
        this._resultado = this.calcularResultado();
    }

    // SETTER: modifica numero2 con validacion
    set numero2(valor) {
        // Valida que sea numero
        if (isNaN(valor)) {
            // Lanza error si no es numero
            throw new Error('El segundo numero debe ser valido');
        }
        // Asigna el valor
        this._numero2 = valor;
        // Recalcula el resultado
        this._resultado = this.calcularResultado();
    }

    // SETTER: modifica el operador con validacion
    set operador(valor) {
        // Lista de operadores permitidos
        const operadoresValidos = ['+', '-', '*', '/', '%'];
        // Valida que este en la lista
        if (!operadoresValidos.includes(valor)) {
            // Lanza error si no es valido
            throw new Error('Operador invalido');
        }
        // Asigna el operador
        this._operador = valor;
        // Recalcula el resultado
        this._resultado = this.calcularResultado();
    }

    // METODO: calcula el resultado segun el operador
    calcularResultado() {
        // Evalua el operador
        switch (this._operador) {
            // Si es suma
            case '+':
                // Devuelve la suma
                return this._numero1 + this._numero2;
            // Si es resta
            case '-':
                // Devuelve la resta
                return this._numero1 - this._numero2;
            // Si es multiplicacion
            case '*':
                // Devuelve la multiplicacion
                return this._numero1 * this._numero2;
            // Si es division
            case '/':
                // Valida division por cero
                if (this._numero2 === 0) {
                    // Devuelve mensaje de error
                    return 'Error: Division por cero';
                }
                // Devuelve la division
                return this._numero1 / this._numero2;
            // Si es modulo
            case '%':
                // Valida modulo por cero
                if (this._numero2 === 0) {
                    // Devuelve mensaje
                    return 'Error: Modulo por cero';
                }
                // Devuelve el resto
                return this._numero1 % this._numero2;
            // Si no es ninguno
            default:
                // Devuelve 0
                return 0;
        }
    }

    // METODO: devuelve la expresion formateada
    getExpresion() {
        // Concatena numero1 + operador + numero2
        return this._numero1 + ' ' + this._operador + ' ' + this._numero2;
    }

    // METODO: convierte el objeto a JSON
    toJSON() {
        // Devuelve un objeto plano
        return {
            // ID
            id: this._id,
            // Numero1
            numero1: this._numero1,
            // Numero2
            numero2: this._numero2,
            // Operador
            operador: this._operador,
            // Resultado
            resultado: this._resultado,
            // Expresion formateada
            expresion: this.getExpresion(),
            // Fecha
            fecha: this._fecha
        };
    }
}