class Personas {
    constructor(dni, nombre, apellido, edad, idCurso) {
        this._dni = dni;
        this._nombre = nombre;
        this._apellido = apellido;
        this._edad = edad;
        this._curso = idCurso;
    }

    saludar = () => {
        return `Hola!! Mi nombre es ${this.nombre} y tengo ${this.edad} años`;
    }
}