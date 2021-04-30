let personas = [];
let cursos = [];
const miURL = '../api/personas.json';

const mostrarPersona = () => {
    if (document.querySelector('.list-group')) {
        let restabelecerLista = document.querySelector('.list-group');
        restabelecerLista.remove();
    }

    if (JSON.parse(localStorage.getItem('arrayPersonas'))) {
        const ul = document.createElement('ul');
        ul.className = "list-group";
        $('.mostrar-alumnos').append(ul);
        for (let item of JSON.parse(localStorage.getItem('arrayPersonas'))) {
            const li = document.createElement('li');
            li.className = "list-group-item";
            li.textContent = `${item._nombre} ${item._apellido} - DNI: ${item._dni} - ${item._edad} años`;
            $('ul').append(li);
        }
    } else {
        alert("No hay personas en la lista");
    }
}

const mostrarApi = (jsonObj) => {
    if (document.querySelector('.list-group')) {
        let restabelecerLista = document.querySelector('.list-group');
        restabelecerLista.remove();
    }

    const ulApi = document.createElement('ul');
    ulApi.className = "list-group";
    $('#contenedorApi').append(ulApi);
    jsonObj.forEach(jsonItem => {
        const { _dni, _nombre, _apellido, _edad } = jsonItem;
        const liApi = document.createElement('li');
            liApi.className = "list-group-item";
            liApi.textContent = `${_nombre} ${_apellido} - DNI: ${_dni} - ${_edad} años`;
            $('ul').append(liApi);
    });

    $('#contenedorApi').slideDown();
    $('#btnMostrarApi').hide();
    $('#btnOcultarApi').fadeIn("fast");
}

const agregarPersona = () => {

    let recuperoPersonas = JSON.parse(localStorage.getItem('arrayPersonas'));
    if (recuperoPersonas) {
        personas = recuperoPersonas;
    }

    const dni = $('#input-dni').val()
    const nombre = $('#input-nombre').val()
    const apellido = $('#input-apellido').val()
    const edad = $('#input-edad').val()
    const curso = $('#select-curso').val();

    if (dni != "" && !(isNaN(dni)) && nombre != "" && apellido != "" && edad != "" && !(isNaN(edad))) {
        personas.push(new Personas(parseInt(dni), nombre, apellido, parseInt(edad), curso.substring(0, 3)));
        localStorage.setItem('arrayPersonas', JSON.stringify(personas));
        document.querySelector('#formPersonas').reset();
    } else {
        alert("Error al ingresar los datos");
    }
}

const agregarCurso = () => {

    let recuperoCursos = JSON.parse(localStorage.getItem('arrayCursos'));
    if (recuperoCursos) {
        cursos = recuperoCursos;
    }

    const id = $('#input-id').val();
    const nombreCurso = $('#input-nombreCursos').val();
    const rubro = $('#input-rubro').val();

    if ((id != "" && nombreCurso != "" && rubro != "")) {
        cursos.push(new Cursos(id, nombreCurso, rubro));
        localStorage.setItem('arrayCursos', JSON.stringify(cursos));
        document.querySelector('#formularioCursos').reset();
    } else {
        alert("Error al ingresar los datos");
    }
}

const mostrarCurso = () => {
    if (document.querySelector('.list-groupCursos')) {
        let listaCurso = document.querySelector('.list-groupCursos');
        listaCurso.remove();
    }

    if (JSON.parse(localStorage.getItem('arrayCursos'))) {
        const ul = document.createElement('ul');
        ul.className = "list-group list-groupCursos";
        $('.mostrar-curso').append(ul);
        for (let item of JSON.parse(localStorage.getItem('arrayCursos'))) {
            const li = document.createElement('li');
            li.className = "list-group-item";
            li.textContent = `${item._id} - ${item._nombre} (${item._rubro})`;
            $('ul').append(li);
        }
    } else {
        alert("No hay cursos en la lista");
    }
}

const rellenarSelectAlumnos = () => {
    let recuperoCursos = JSON.parse(localStorage.getItem('arrayCursos'));
    if (document.querySelector('#select-curso')) {
        let selectCursos = document.querySelector('#select-curso');
        selectCursos.remove();
    }

    let selectCursos = document.createElement('select');
    selectCursos.className = "form-control";
    selectCursos.id = "select-curso"

    $('#form-select').append(selectCursos);

    for(item of recuperoCursos){
        let option = document.createElement('option');
        option.textContent = `${item._id};${item._nombre};${item._rubro}`
        $('#select-curso').append(option);
    }
}

const inicializar = () => {

    $('#menuCursos').click(function (e) {
        e.preventDefault();
        $('.contenedor-alumnos').slideUp();
        $('.contenedor-curso').toggle('slow');
    });

    $('#btnAgregarCursos').click(function (e) {
        e.preventDefault();
        $('.agregar-curso').toggle('slow');
        $('.mostrar-curso').slideUp();
    });

    $('#agregarCurso').click(function (e) {
        e.preventDefault();
        agregarCurso();
    });

    $('#btnMostrarCursos').click(function (e) {
        e.preventDefault();
        mostrarCurso();
        $('.mostrar-curso').toggle('slow');
        $('.agregar-curso').slideUp();
    });

    $('#menuAlumnos').click(function (e) {
        e.preventDefault();
        $('.contenedor-curso').slideUp();
        $('.contenedor-alumnos').toggle('slow');
    });

    $('#btnAgregarAlumno').click(function (e) {
        e.preventDefault();
        $('.mostrar-alumnos').slideUp();
        $('.agregar-alumno').toggle('slow');
        rellenarSelectAlumnos(); 
    });

    $('#agregarPersona').click(function (e) {
        e.preventDefault();
        agregarPersona();
    });

    $('#btnMostrarAlumnos').click(function (e) {
        e.preventDefault();
        $('.agregar-alumno').slideUp();
        $('.mostrar-alumnos').toggle('slow');
        mostrarPersona();
    });
    
}

$(() => inicializar()); // Cargo el documento utilizando selector de jQuery
