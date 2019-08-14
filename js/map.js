// MAPA  ===============================================================
// Setea el map inicial
var map = L.map('map').setView([-34.555990, -58.474466], 14);

L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20, // Setea el zoom maximo 
    }).addTo(map); // Define a map => Div del html

// Ejecuta la funcion para crear los marcadores en el mapa
crearMarcadoresMap(ListaDePuntos)



// AGREGAR SOBRE EL MAPA ===========================================================
var popup = L.popup();
function onMapClick(e) {
    // Limpiar los inputs
    nombreForm.value = "";
    direccionForm.value = "";
    telefonoForm.value = "";
    categoriaForm.value = "";
    latitudForm.textContent = "";
    longitudForm.textContent = "";
    divAlert.classList.remove('show') // Elimina si hay alertas
    document.getElementById("listaResultado").innerHTML = "" // Limpia los LI

    $('#modalAgregar').modal('show'); // Activa el modal
    activarTabs(1) // Se posiciona en el primer tab

    // busca la direccion => Funcion en modal.js
    buscarDireccionXCoordenada(e.latlng.lat, e.latlng.lng)
        .then((data)=>{
            direccionForm.value = data.display_name;
            latitudForm.textContent = e.latlng.lat;
            longitudForm.textContent = e.latlng.lng;
        })
}
// Evento al presionar click en el mapa
map.on('click', onMapClick);


// CIRCULO EN EL MAPA ===============================================================
// // Genera un circulo en el mapa ( Area )
L.circle([-34.555990, -58.474466], 1100, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2
}).addTo(map);


// CONSTRUCCION DE LOS MARCADORES =========================================================
// Recorre cada uno de los puntos del objeto "ListaDePuntos"
function crearMarcadoresMap(ListaDePuntos) {
    // ListaDePuntos se encuentra en el script map
    ListaDePuntos.forEach(punto => {
        // Construye el card por cada punto
        let card = `
        <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <img src="https://www.pcactual.com/medio/2017/06/30/google-maps_51b78e0b.jpg" class="imgPopUp"/>
            <h5>${punto.nombre}</h5>
            <strong>Dirección: </strong><span class="nombrePropio">${punto.direccion}</span><br><hr>
            <strong>Categoria: </strong>${punto.categoria}<br>
            <strong>Teléfono: </strong>${punto.telefono}<br>
            <strong>Coordenadas: </strong>${Math.round(punto.coordenada[0] * 1000) / 1000}, ${Math.round(punto.coordenada[1] * 1000) / 1000}<br>
            </div>
        </div>`;

        // Crea los puntos en el mapa
        marker = new L.marker([
            punto.coordenada[0], // Latitud 
            punto.coordenada[1] // Longitud
        ])
            .bindPopup(card) // Card => Armado de estructura para mostrar
            .addTo(map);
    });
}