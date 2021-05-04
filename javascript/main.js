let personas = [];
let cursos = [];

const urlAlumnos = 'https://lucasezequielpereyra.github.io/coder-js/api/alumnos.json';
const urlCursos = 'https://lucasezequielpereyra.github.io/coder-js/api/cursos.json';

const cargarCursos = (jsonObj) => {
    jsonObj.forEach(jsonItem => {
        const {_id, _nombre, _rubro} = jsonItem;
        cursos.push(new Cursos(jsonItem._id, jsonItem._nombre, jsonItem._rubro));
        localStorage.setItem('arrayCursos', JSON.stringify(cursos));
    });
}

const cargarAlumnos = (jsonObj) => {
    jsonObj.forEach(jsonItem => {
        const {_dni, _nombre, _apellido, _edad, _curso} = jsonItem;
        personas.push(new Personas(jsonItem._dni, jsonItem._nombre, jsonItem._apellido, jsonItem._edad, jsonItem._curso));
        localStorage.setItem('arrayPersonas', JSON.stringify(personas));
    });
}

const buscarCursos = (id) =>{
    for(curso of JSON.parse(localStorage.getItem('arrayCursos'))){
        if(id == curso._id){
            return curso._nombre;
        }
    }
}

const modalPersona = (dni) => {

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

            <div>
                <label for="input-alumnoCursos"> Cursos: </label>
                <input type="text" id"input-alumnoCursos" name="input-alumnoCursos" value="${buscarCursos(persona._curso)} readonly">
                </input>
            </div>
            
            `;
            modalContent.appendChild(modalBody);

            const modalFooter = document.createElement('div');
            modalFooter.className = 'modal-footer';
            modalContent.appendChild(modalFooter);

            const btnFooter = document.createElement('button');
            btnFooter.className = 'btn btn-secondary';
            btnFooter.setAttribute('type', 'button');
            btnFooter.setAttribute('data-dismiss', 'modal');
            btnFooter.textContent = 'Cerrar';
            modalFooter.appendChild(btnFooter);

            const body = document.querySelector("#body");
            body.appendChild(modalFade);

            $('#modalPersona').modal('show');

            break;
        }
    }
}


const mostrarPersona = () => {
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
        for (let item of JSON.parse(localStorage.getItem('arrayPersonas'))) {
            const li = document.createElement('li');
            li.className = "list-group-item";
            li.innerHTML = `${item._nombre} ${item._apellido}`;

            const btn = document.createElement('button');
            btn.type = "button"
            btn.className = `${item._dni}`;
            btn.textContent = "Ver"
            li.appendChild(btn);

            $('ul').append(li);

            $(`.${item._dni}`).click(function (e) {
                e.preventDefault();
                modalPersona(item._dni);
            });
        }
    } else {
        alert("No hay personas en la lista");
    }
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

    if (document.querySelector('.list-group')) {
        let restabelecerLista = document.querySelector('.list-group');
        restabelecerLista.remove();
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

const inicializar = () => {

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
