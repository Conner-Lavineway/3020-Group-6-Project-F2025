
const key = 'Redacted';
const map = L.map('map').setView([49.808773, -97.13208],17);


map.setMaxBounds([
    [49.80725, -97.15431],
    [49.808108, -97.124505],
    [49.814727, -97.129269],
    [49.802597, -97.148924]
]);


map.setMinZoom(15);
map.setMaxZoom(19);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

function highlightLayer(layerID) {
    map._layers['name'+LayerID].setStyle(highlight);
}

map.on('click', onMapClick);

