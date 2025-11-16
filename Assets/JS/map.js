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

var buildingCoords = [
    [49.808631, -97.133646], //EITC
    [49.808043, -97.130245], //DRAKE
    [49.809773, -97.131039], //ISBISTER
    [49.811337, -97.131318]]; //UNI COLLEGE

for(i = 0; i < buildingCoords.length; i++)
{
    var markerClass;
    switch(i)
    {
        case 0:
            markerClass = 'text-label EITC';
        break;
        case 1:
            markerClass = 'text-label Drake-Centre';
        break;
        case 2:
            markerClass = 'text-label Isbister-Building';
        break;
        case 3:
            markerClass = 'text-label University-College';
        break;
        default:
        break;
    }
    var textLabel = L.divIcon(
    {
        className: markerClass,   // Set class for CSS styling
        html: 'Err loading rooms'
    });
    L.marker(buildingCoords[i], {icon:textLabel}).addTo(map);

}

var labels = document.getElementsByClassName('text-label');

function updateNumbers(rooms)
{
    let nameNums = [0, 0, 0, 0];
    for(var i = 0; i < rooms.length; i++)
    {
        console.log('Assigning Numbers')
        switch(rooms[i].buildingName)
        {
            case 'EITC':
                nameNums[0]++;
            break;
            case 'Drake Centre':
                nameNums[1]++;
            break;
            case 'Isbister Building':
                nameNums[2]++;
            break;
            case 'University College':
                nameNums[3]++;
            break;
            default:
            break;
        }
    }
    console.log(nameNums);
    console.log(rooms);

    for(var i = 0; i < labels.length; i++)
    {
        console.log(labels[i]);
        if(labels[i].classList.contains('EITC'))
        {
            labels[i].innerHTML = nameNums[0];
        }
        else if(labels[i].classList.contains('Drake-Centre'))
        {
            labels[i].innerHTML = nameNums[1];

        }
        else if(labels[i].classList.contains('Isbister-Building'))
        {
            labels[i].innerHTML = nameNums[2];
        }
        else
        {
            labels[i].innerHTML = nameNums[3];
        }
    }
}