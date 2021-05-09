let personas = [];
let cursos = [];

const urlAlumnos = 'https://lucasezequielpereyra.github.io/coder-js/api/alumnos.json';
const urlCursos = 'https://lucasezequielpereyra.github.io/coder-js/api/cursos.json';


// Funcion para cargar select cursos por alumno
const cargarCursosAlumnos = () => {
    recuperarPersonas();

}

// Funcion para eliminar alumnos del local storage
const eliminarAlumnosLS = () => {
    localStorage.removeItem('arrayPersonas');
}

// Funcion para eliminar cursos del local storage
const eliminarCursosLS = () => {
    localStorage.removeItem('arrayCursos');
}

// Funcion para recuperar cursos del localstorage
const recuperarCursos = () => {
    let recuperoCursos = JSON.parse(localStorage.getItem('arrayCursos'));
    if (recuperoCursos) {
        cursos = recuperoCursos;
    }
}

// Funcion para recuperar alumnos del localstorage
const recuperarPersonas = () => {
    let recuperoPersonas = JSON.parse(localStorage.getItem('arrayPersonas'));
    if (recuperoPersonas) {
        personas = recuperoPersonas;
    }
}

// Funcion para cargar cursos desde archivo externo
const cargarCursos = (jsonObj) => {
    jsonObj.forEach(jsonItem => {
        const {_id, _nombre, _rubro} = jsonItem;
        cursos.push(new Cursos(jsonItem._id, jsonItem._nombre, jsonItem._rubro));
        localStorage.setItem('arrayCursos', JSON.stringify(cursos));
    });
}

// Funcion para cargar alumnos desde archivo externo
const cargarAlumnos = (jsonObj) => {
    jsonObj.forEach(jsonItem => {
        const {_dni, _nombre, _apellido, _edad, _curso} = jsonItem;
        personas.push(new Personas(jsonItem._dni, jsonItem._nombre, jsonItem._apellido, jsonItem._edad, jsonItem._curso));
        localStorage.setItem('arrayPersonas', JSON.stringify(personas));
    });
}

// Funcion para buscar cursos por ID
const buscarCursos = (id) =>{
    for(let curso of JSON.parse(localStorage.getItem('arrayCursos'))){
        if(id == curso._id){
            return curso._nombre;
        }
    }
}

// Funcion para buscar alumnos por dni
const buscarAlumnos = (dni) =>{
    for(let alumno of JSON.parse(localStorage.getItem('arrayPersonas'))){
        if(dni == alumno._dni){
            return alumno._nombre;
        }
    }
}

// Funcion para agregar alumnos
const agregarPersona = () => {
    recuperarPersonas();

    const dni = $('#input-dni').val()
    const nombre = $('#input-nombre').val()
    const apellido = $('#input-apellido').val()
    const edad = $('#input-edad').val()
    const curso = $('#select-curso').val();

    if(buscarAlumnos(dni)){
        alert('El dni ingresado ya se encuentra registrado');
    }

    else if (dni != "" && !(isNaN(dni)) && nombre != "" && apellido != "" && edad != "" && !(isNaN(edad))) {
        personas.push(new Personas(parseInt(dni), nombre, apellido, parseInt(edad), curso.substring(0, 3)));
        localStorage.setItem('arrayPersonas', JSON.stringify(personas));
        document.querySelector('#formPersonas').reset();
    } else {
        alert("Error al ingresar los datos");
    }
}

// Funcion para mostrar lista de alumnos
const mostrarPersona = () => {
    recuperarPersonas();

    if (document.querySelector('.list-group')) {
        let restabelecerLista = document.querySelector('.list-group');
        restabelecerLista.remove();
    }

    if (document.querySelector('.list-groupCursos')) {
        let listaCurso = document.querySelector('.list-groupCursos');
        listaCurso.remove();
    }

    if (JSON.parse(localStorage.getItem('arrayPersonas'))) {
        const ul = document.createElement('ul');
        ul.className = "list-group";
        $('.mostrar-alumnos').append(ul);
        for (let alumno of JSON.parse(localStorage.getItem('arrayPersonas'))) {
            const li = document.createElement('li');
            li.className = "list-group-item";
            li.innerHTML = `${alumno._nombre} ${alumno._apellido}`;

            const btn = document.createElement('button');
            btn.type = "button"
            btn.className = `${alumno._dni}`;
            btn.textContent = "Ver"
            li.appendChild(btn);

            $('ul').append(li);

            $(`.${alumno._dni}`).click(function (e) {
                e.preventDefault();
                modalPersona(alumno._dni, alumno._nombre, alumno._apellido);
            });
        }
    } else {
        alert("No hay personas en la lista");
    }
}

// Funcion para crear el modal de cada alumno
const modalPersona = (dni, nombre, apellido) => {
    let removeModal = document.querySelector("#modalPersona");
    if (removeModal) {
        removeModal.remove();
    }

    for (let persona of JSON.parse(localStorage.getItem('arrayPersonas'))) {
        if (persona._dni == dni) {
            const modalFade = document.createElement('div');
            modalFade.className = "modal fade";
            modalFade.setAttribute('id', 'modalPersona');
            modalFade.setAttribute('tabindex', '-1');
            modalFade.setAttribute('aria-labelledby', 'modalPersonaLabel');
            modalFade.setAttribute('aria-hidden', 'true');

            const modalDialog = document.createElement('div');
            modalDialog.className = 'modal-dialog';
            modalFade.appendChild(modalDialog);

            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            modalDialog.appendChild(modalContent);

            const modalHeader = document.createElement('div');
            modalHeader.className = 'modal-header';
            modalContent.appendChild(modalHeader);

            const modalH = document.createElement('h5');
            modalH.className = 'modal-title';
            modalH.setAttribute('id', 'modalPersona');
            modalH.innerHTML = `
                Alumno: <span id="spanAlumno">${persona._nombre} 
                ${persona._apellido} </span>
            `;
            modalHeader.appendChild(modalH);

            const btnModal = document.createElement('button');
            btnModal.className = 'close';
            btnModal.setAttribute('id', 'closeModal')
            btnModal.setAttribute('type', 'button');
            btnModal.setAttribute('data-dismiss', 'modal');
            btnModal.setAttribute('aria-label', 'Close');
            modalHeader.appendChild(btnModal);

            const spanButton = document.createElement('span');
            spanButton.setAttribute('aria-hidden', 'true');
            spanButton.innerHTML = `&times;`
            btnModal.appendChild(spanButton);

            const modalBody = document.createElement('div');
            modalBody.className = 'modal-body';
            modalBody.innerHTML = `
            <div>
                <label for="input-alumnoDni"> DNI: </label>
                <input type="text" id"input-alumnoDni" name="input-alumnoDni" value="${persona._dni}" readonly>
                </input>
            </div>

            <div>
                <label for="input-alumnoNombre"> Nombre: </label>
                <input type="text" id"input-alumnoNombre" name="input-alumnoNombre" value="${persona._nombre}">
                </input>
            </div>

            <div>
                <label for="input-alumnoApellido"> Apellido: </label>
                <input type="text" id"input-alumnoApellido" name="input-alumnoApellido" value="${persona._apellido}">
                </input>
            </div>
            
            <div>
                <label for="input-alumnoApellido"> Edad: </label>
                <input type="text" id"input-alumnoEdad" name="input-aliumnoEdad" value="${persona._edad}">
                </input>
            </div>

            <div id="contenedorCursosAlumno">
                <label for="select-alumnoCursos"> Cursos: </label>
                <select id"input-alumnoCursos" name="select-alumnoCursos" readonly>
                    <option>${buscarCursos(persona._curso)}</option>
                </select>
                <button type="button" id="btnEliminarCurso">Eliminar</button>
            </div>
            
            `;
            modalContent.appendChild(modalBody);

            const modalFooter = document.createElement('div');
            modalFooter.className = 'modal-footer';
            modalContent.appendChild(modalFooter);

            const btnFooterAgregar = document.createElement('button');
            btnFooterAgregar.className = 'btn btn-agregar';
            btnFooterAgregar.setAttribute('type', 'button');
            btnFooterAgregar.textContent = 'modificar';
            modalFooter.appendChild(btnFooterAgregar);

            const btnFooterEliminar = document.createElement('button');
            btnFooterEliminar.className = 'btn btn-eliminar';
            btnFooterEliminar.setAttribute('type', 'button');
            btnFooterEliminar.textContent = 'Eliminar';
            modalFooter.appendChild(btnFooterEliminar);

            const btnFooter = document.createElement('button');
            btnFooter.className = 'btn btn-cerrar';
            btnFooter.setAttribute('type', 'button');
            btnFooter.setAttribute('data-dismiss', 'modal');
            btnFooter.textContent = 'Cerrar';
            modalFooter.appendChild(btnFooter);

            const body = document.querySelector("#body");
            body.appendChild(modalFade);

            $('#modalPersona').modal('show');

            // Llamo la funcion para eliminar alumno
            $(`.btn-eliminar`).click(function (e) {
                e.preventDefault();
                $('#modalPersona').modal('hide');
                eliminarAlumnos(dni, nombre, apellido);
            });

            break;
        }
    }
}

const eliminarAlumnos = (dni, nombre, apellido) => {
    let boolAlumno = false;

    // ELimino el span para crearlo nuevamente si ya existe
    let removeSpan = document.querySelector('#spanAlumnos')
    if(removeSpan){
        removeSpan.remove();
    }

    let modalALumnosHeader = document.querySelector('.modalHA');
    let spanAlumnos = document.createElement('span');
    spanAlumnos.setAttribute('id', "spanAlumnos");
    spanAlumnos.textContent = ` ${nombre} ${apellido} - ${dni}`;
    modalALumnosHeader.appendChild(spanAlumnos);

    $('#modalEAlumnos').modal('show');
    $('.btn-confirmarAlumno').click( function (e) {
        e.preventDefault();
        boolAlumno = true;

        if (boolAlumno){
            eliminarAlumnosLS();
    
            let c = 0; // asigno variable contador para eliminar indice deseado
            for(let alumno of personas) {
                if(alumno._dni == dni){
                    personas.splice(c, 1);
                    break;
                }
                c++;
            }
            eliminarAlumnosLS();
            localStorage.setItem('arrayPersonas', JSON.stringify(personas));
            mostrarPersona();
        }

        $('#modalEAlumnos').modal('hide');
    });
}

// Funcion para llenar la lista de cursos disponibles
const rellenarSelectAlumnos = () => {
    let removeCursos = document.querySelector('#select-curso')
    if (removeCursos) {
        removeCursos.remove();
    }

    const recuperoCursos = JSON.parse(localStorage.getItem('arrayCursos'));

    const selectCursos = document.createElement('select');
    selectCursos.className = "form-control";
    selectCursos.id = "select-curso"

    $('#form-select').append(selectCursos);

    for (item of recuperoCursos) {
        let option = document.createElement('option');
        option.textContent = `${item._id};${item._nombre};${item._rubro}`
        $('#select-curso').append(option);
    }
}

// Funcion para agregar cursos
const agregarCurso = () => {
    recuperarCursos();

    const id = $('#input-id').val();
    const nombreCurso = $('#input-nombreCursos').val();
    const rubro = $('#input-rubro').val();

    if(id.length < 3) {
        alert('El id debe tener 3 numeros')
    } 

    else if(buscarCursos(id)){
        alert('El id del curso ya se encuentra registrado');
    }
    
    else if ((id != "" && nombreCurso != "" && rubro != "")) {
        cursos.push(new Cursos(id, nombreCurso, rubro));
        localStorage.setItem('arrayCursos', JSON.stringify(cursos));
        document.querySelector('#formularioCursos').reset();
    } 
    else {
        alert("Error al ingresar los datos");
    }
}

// Funcion para mostrar listas de cursos
const mostrarCurso = () => {
    if (document.querySelector('.list-groupCursos')) {
        let listaCurso = document.querySelector('.list-groupCursos');
        listaCurso.remove();
    }

    if (document.querySelector('.list-group')) {
        let restabelecerLista = document.querySelector('.list-group');
        restabelecerLista.remove();
    }

    recuperarCursos();

    if (JSON.parse(localStorage.getItem('arrayCursos'))) {
        const ul = document.createElement('ul');
        ul.className = "list-group list-groupCursos";
        $('.mostrar-curso').append(ul);
        for (let item of JSON.parse(localStorage.getItem('arrayCursos'))) {
            const li = document.createElement('li');
            li.className = "list-group-item";
            li.innerHTML = `${item._id} - ${item._nombre} (${item._rubro})`;

            const btnDelCur = document.createElement('button');
            btnDelCur.type = "button"
            btnDelCur.className = `${item._id}Curso`;
            btnDelCur.textContent = "eliminar"
            li.appendChild(btnDelCur);

            $('ul').append(li);

            // Llamo la funcion en caso de que quiera eliminar el curso
            $(`.${item._id}Curso`).click(function (e) {
                e.preventDefault();
                eliminarCurso(item._id, item._nombre);
            });
        }
    } else {
        alert("No hay cursos en la lista");
    }
}

// Funcion para eliminar cursos
const eliminarCurso = (id, nombre) => {
    let boolCurso = false;

    // ELimino el span para crearlo nuevamente si ya existe
    let removeSpan = document.querySelector('#spanCursos')
    if(removeSpan){
        removeSpan.remove();
    }

    let modalCursosHeader = document.querySelector('.modalHC');
    let spanCursos = document.createElement('span');
    spanCursos.setAttribute('id', "spanCursos");
    spanCursos.textContent = ` ${nombre}`;
    modalCursosHeader.appendChild(spanCursos);

    $('#modalCurso').modal('show');
    $('.btn-confirmar').click( function (e) {
        e.preventDefault();
        boolCurso = true;

        if (boolCurso){
            eliminarCursosLS();
    
            let c = 0; // asigno variable contador para eliminar indice deseado
            for(let curso of cursos) {
                if(curso._id == id){
                    cursos.splice(c, 1);
                    break;
                }
                c++;
            }
            eliminarCursosLS();
            localStorage.setItem('arrayCursos', JSON.stringify(cursos));
            mostrarCurso();
        }

        $('#modalCurso').modal('hide');
    });
}

const inicializar = () => {

    // Acciones de los botones en la interfaz general del sistema
    $('#menuCursos').click(function (e) {
        e.preventDefault();
        $('.contenedor-alumnos').slideUp();
        $('.mostrar-alumnos').slideUp();
        $('.agregar-alumno').slideUp();
        $('.contenedor-curso').toggle('slow');
    });

    $('#btnAgregarCursos').click(function (e) {
        e.preventDefault();
        $('.mostrar-curso').slideUp();
        $('.agregar-curso').toggle('fast');
    });

    $('#agregarCurso').click(function (e) {
        e.preventDefault();
        agregarCurso();
    });

    $('#btnMostrarCursos').click(function (e) {
        e.preventDefault();
        $('.agregar-curso').slideUp();
        $('.mostrar-curso').toggle('fast');
        mostrarCurso();
    });

    $('#menuAlumnos').click(function (e) {
        e.preventDefault();
        $('.contenedor-curso').slideUp();
        $('.mostrar-curso').slideUp();
        $('.agregar-curso').slideUp();
        $('.contenedor-alumnos').toggle('slow');
    });

    $('#btnAgregarAlumno').click(function (e) {
        e.preventDefault();
        $('.mostrar-alumnos').slideUp();
        $('.agregar-alumno').toggle('fast');
        rellenarSelectAlumnos();
    });

    $('#agregarPersona').click(function (e) {
        e.preventDefault();
        agregarPersona();
    });

    $('#btnMostrarAlumnos').click(function (e) {
        e.preventDefault();
        $('.agregar-alumno').slideUp();
        $('.mostrar-alumnos').toggle('fast');
        mostrarPersona();
    });

    // Acciones con los cursos del alumno
    $('#btnAgregarCurso').click( function (e) {
        e.preventDefault();

    });

    // Acciones para precarga de datos
    if (!JSON.parse(localStorage.getItem('arrayCursos')) || !JSON.parse(localStorage.getItem('arrayPersonas')) ){
        $('#precargaDatos').toggle('fast');
    }

    $('#precargaDatos').click(function (e){
        e.preventDefault();

        fetch(`${urlCursos}`)
        .then((res)=> res.json())
        .then((obj)=> cargarCursos(obj))
        .catch((err)=> alert(err + " Algo salio mal "))

        fetch(`${urlAlumnos}`)
        .then((res)=> res.json())
        .then((obj)=> cargarAlumnos(obj))
        .catch((err)=> alert(err + " Algo salio mal "))

        $('#precargaDatos').toggle('slow');
    });
}

$(() => inicializar()); // Cargo el documento utilizando selector de jQuery
