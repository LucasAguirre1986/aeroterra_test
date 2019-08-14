// Controla / Manipula el dom del modal
let btnAgregar = document.querySelector('#nuevo'); //Boton de modal "Agregar nuevo"
let btnSiguiente = document.querySelector('#siguiente'); // Botones de siguiente
let btnAnterior = document.querySelector('#anterior'); // Botones de anterior

// Tabs
let tab1 = document.querySelector('#paso1-tab')
let tab2 = document.querySelector('#paso2-tab')
let tabPaso1 = document.querySelector('#paso1')
let tabPaso2 = document.querySelector('#paso2')

// Input de form
let nombreForm = document.querySelector('#nombre')
let telefonoForm = document.querySelector('#telefono')
let categoriaForm = document.querySelector('#categoria')
let direccionForm = document.querySelector('#direccion')
let latitudForm = document.querySelector('#latitud')
let longitudForm = document.querySelector('#longitud')
let agregarForm = document.querySelector('#agregar')
let btnBuscar = document.querySelector('#buscar')

// TABS ===============================================================
function activarTabs(numeroTab){
    if(numeroTab==1){
        tabPaso1.classList.add('show')
        tabPaso1.classList.add('active')
        tabPaso2.classList.remove('show')
        tabPaso2.classList.remove('active')
        tab1.classList.add('active')
        tab2.classList.remove('active')
    }else{
        tabPaso1.classList.remove('show')
        tabPaso1.classList.remove('active')
        tabPaso2.classList.add('show')
        tabPaso2.classList.add('active')
        tab1.classList.remove('active')
        tab2.classList.add('active')
    }
}


// MODAL ==============================================================
btnAgregar.addEventListener('click', function () {

    // Limpiar los inputs
    nombreForm.value = "";
    direccionForm.value = "";
    telefonoForm.value = "";
    categoriaForm.value = "";
    latitudForm.textContent = "";
    longitudForm.textContent = "";
    document.getElementById("listaResultado").innerHTML = "" // Limpia los LI

    $('#modalAgregar').modal('show'); // Activa el modal
    $('.nav-tabs a[href="#home"]').click(); // Se posiciona en el primer tab
    // Asigna por defecto el tab 1
    activarTabs(1)

})

btnSiguiente.addEventListener('click', function () {
    activarTabs(2)
})

btnAnterior.addEventListener('click', function () {
    activarTabs(1)
})

// AGREGAR PUNTO ==============================================================
agregarForm.addEventListener('click', function () {

    ListaDePuntos.push(
        {
            nombre: (nombreForm.value).toUpperCase(),
            direccion: direccionForm.value,
            telefono: telefonoForm.value,
            categoria: categoriaForm.value,
            coordenada: [Number(latitudForm.textContent), Number(longitudForm.textContent)]
        }
    )

    // Ejecuta la funcion para crear los marcadores en el mapa
    crearMarcadoresMap(ListaDePuntos)
    
    $('#modalConfirmacion').modal('show'); // Activa el modal de confirmacion   
})

// BUSCAR COORDENADAS ==============================================================
btnBuscar.addEventListener('click', function () {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=15&q=${direccionForm.value}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (obj) {
            document.getElementById("listaResultado").innerHTML = "" // Limpia los LI

            for (var i = 0; i < obj.length; i++) {
                let ul = document.getElementById("listaResultado"); // Selecciona la ul                
                let li = document.createElement('li'); // Crea un li
                li.setAttribute('class', 'list-group-item'); // Asigna la clase
                li.setAttribute('data-lat', obj[i].lat); // Asigna un atributo id al li para saber la latitud.
                li.setAttribute('data-lng', obj[i].lon); // Asigna un atributo id al li para saber la longitud.
                li.appendChild(document.createTextNode(obj[i].display_name)); // Asigna el nombre de la calle
                ul.appendChild(li);
            }
        })
        .then(() => {
            // Agrega evento a todos los li para que al presionarlo agregue la direccion y coordenadas
            let li = document.querySelectorAll('#listaResultado li')
            for (var i = 0; i < li.length; i++) {
                li[i].addEventListener('click', function () {
                    direccionForm.value = this.textContent;  // Seteo el valor del input
                    latitudForm.textContent = this.getAttribute('data-lat'); // Seteo el valor del input
                    longitudForm.textContent = this.getAttribute('data-lng'); // Seteo el valor del input
                })
            }
        });
})


// Funcion para buscar la direccion a partir de las coordenadas
function buscarDireccionXCoordenada(lat, long) {
    // busca la direccion en funcion de la direccion
    return fetch(`https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${long}&format=json`)
        .then(function (response) {
            return response.json();
        })
        .then(function (obj) {
            return obj // Retorna el valor encontrado
        });
}