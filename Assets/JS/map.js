const key = "n5fcPKvJWw4kPlY87b89"
const tile = "019a1752-72aa-797d-a3c7-b3c094cf97e3"

/*Versions to try:
    base-v4
    streets-v4
    hybrid
    streets
    winter-v2
    landscape-v4

Custom Map:
    019a1752-72aa-797d-a3c7-b3c094cf97e3
*/
const map = L.map("map").setView([49.809375, -97.134458],17);

    const mtLayer = L.maptiler.maptilerLayer({
    apiKey: key,
    style: "https://api.maptiler.com/maps/" + tile + "/style.json?key=" + key, //optional
    }).addTo(map);

map.setMaxBounds([
    [49.80725, -97.15431],
    [49.808108, -97.124505],
    [49.814727, -97.129269],
    [49.802597, -97.148924]
]);


map.setMinZoom(16);
map.setMaxZoom(19);

const ACTIVEICONS = [];

var labels = document.getElementsByClassName("text-label");

function updateNumbers(rooms)
{
    let nameNums = [0, 0, 0, 0];
    for(var i = 0; i < rooms.length; i++)
    {
        switch(rooms[i].buildingName)
        {
            case "EITC":
                nameNums[0]++;
            break;
            case "Drake Centre":
                nameNums[1]++;
            break;
            case "Isbister Building":
                nameNums[2]++;
            break;
            case "University College":
                nameNums[3]++;
            break;
            default:
            break;
        }
    }

    for(var i = 0; i < labels.length; i++)
    {
        if(labels[i].classList.contains("EITC"))
        {
            if(ACTIVEICONS.includes("EITC"))
            {
                //if the filter needs to be active activate it
                labels[i].classList.add("activeFilter");
            }
            else
            {
                //otherwise remove it
                labels[i].classList.remove("activeFilter");
            }
            labels[i].innerHTML = "EITC: " + nameNums[0];
        }
        else if(labels[i].classList.contains("Drake-Centre"))
        {
            if(ACTIVEICONS.includes("Drake Centre"))
            {
                //if the filter needs to be active activate it
                labels[i].classList.add("activeFilter");
            }
            else
            {
                //otherwise remove it
                labels[i].classList.remove("activeFilter");
            }
            labels[i].innerHTML = "Drake Centre: " + nameNums[1];
        }
        else if(labels[i].classList.contains("Isbister-Building"))
        {
            if(ACTIVEICONS.includes("Isbister Building"))
            {
                //if the filter needs to be active activate it
                labels[i].classList.add("activeFilter");
            }
            else
            {
                //otherwise remove it
                labels[i].classList.remove("activeFilter");
            }
            labels[i].innerHTML = "Isbister Building: " + nameNums[2];
        }
        else
        {
            if(ACTIVEICONS.includes("University College"))
            {
                //if the filter needs to be active activate it
                labels[i].classList.add("activeFilter");
            }
            else
            {
                //otherwise remove it
                labels[i].classList.remove("activeFilter");
            }
            labels[i].innerHTML = "University College: " +nameNums[3];
        }
    }
}


var personPos = [49.809375, -97.134458];

var person = L.divIcon({
    className: "person",
    html: " "
});

L.marker(personPos, {icon: person}).addTo(map);