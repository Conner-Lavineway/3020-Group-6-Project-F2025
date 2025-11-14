const key = 'n5fcPKvJWw4kPlY87b89'
const tile = '019a1752-72aa-797d-a3c7-b3c094cf97e3'
const map = L.map('map').setView([49.808773, -97.13208],17);

    const mtLayer = L.maptiler.maptilerLayer({
    apiKey: key,
    style: L.maptiler.$tile, //optional
    }).addTo(map);

map.setMaxBounds([
    [49.80725, -97.15431],
    [49.808108, -97.124505],
    [49.814727, -97.129269],
    [49.802597, -97.148924]
]);


map.setMinZoom(16);
map.setMaxZoom(19);
var textLabel = L.divIcon(
    {
        className: 'text-label',   // Set class for CSS styling
        html: 'test'
    });
Quad = [49.808803, -97.13208]
L.marker(Quad, {icon:textLabel}).addTo(map);

function onMapClick(e) {
    L.marker(e.latlng, {icon:textLabel}).addTo(map)
    labels = document.getElementsByClassName('text-label');
}

function highlightLayer(layerID) {
    map._layers['name'+LayerID].setStyle(highlight);
}

map.on('click', onMapClick);
