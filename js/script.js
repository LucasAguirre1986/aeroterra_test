// Arreglo de puntos de interes
var ListaDePuntos = [
    {
        nombre: 'AEROTERRA S.A.',
        direccion: 'Av. Eduardo Madero 1020, C1001 CABA',
        telefono: '54 9 11 5272 0900)',
        categoria: 'Comercial',
        coordenada: [-34.555990, -58.474466]
    },
    {
        nombre: 'MERCADOLIBRE S.A.',
        direccion: 'Av. Eduardo Madero 1020, C1001 CABA',
        telefono: '54 9 11 5272 0900)',
        categoria: 'Comercial',
        coordenada: [-34.561645, -58.479444]
    },
    {
        nombre: 'PLATAFORMA 5 S.A.',
        direccion: 'Av. Eduardo Madero 1020, C1001 CABA',
        telefono: '54 9 11 5272 0900)',
        categoria: 'Comercial',
        coordenada: [-34.57197, -58.46649]
    },
    {
        nombre: 'FARMACITY S.A.',
        direccion: 'Av. Eduardo Madero 1020, C1001 CABA',
        telefono: '54 9 11 5272 0900)',
        categoria: 'Residencial',
        coordenada: [-34.5437, -58.52348]
    }
];

// Setea el map inicial
var map = L.map('map').setView([-34.555990, -58.474466], 13);

L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20, // Setea el zoom maximo 
    }).addTo(map); // Define a map => Div del html

// Recorre cada uno de los puntos del objeto "ListaDePuntos"
ListaDePuntos.forEach(punto => {
    // Construye el card por cada punto
    let card = `
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <img src="https://www.pcactual.com/medio/2017/06/30/google-maps_51b78e0b.jpg" class="imgPopUp"/>
        <h5>${punto.nombre}</h5>
        <strong>Dirección: </strong>${punto.direccion}<br>
        <strong>Categoria: </strong>${punto.categoria}<br>
        <strong>Teléfono: </strong>${punto.telefono}<br>
        <strong>Coordenadas: </strong>${punto.coordenada[0]}, ${punto.coordenada[1]}<br>
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

var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
// Evento al presionar click en el mapa
map.on('click', onMapClick);
// // Genera un circulo en el mapa ( Area )
L.circle([-34.555990, -58.474466], 1100, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2
}).addTo(map);
     //.bindPopup("I am a circle."); para agregar un comentario