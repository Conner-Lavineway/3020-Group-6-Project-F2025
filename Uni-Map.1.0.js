
options = {
    maxBounds: [[0.1, 0.2],[0, 0]],
    maxBoundsViscosity: 1.0,
}
const map = L.map('map', options).setView([0,0],10);



var image = 'UniMap.png',
    imagebounds = [[0.1, 0.2],
    [0, 0]];
L.imageOverlay(image, imagebounds).addTo(map);
map.setMinZoom(14.25);
map.setMaxZoom(18);


function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

function highlightLayer(layerID) {
    map._layers['name'+LayerID].setStyle(highlight);
}

map.on('click', onMapClick);

