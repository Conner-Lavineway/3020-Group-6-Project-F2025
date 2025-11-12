var filterDivs = document.getElementsByClassName('filter dropdown-content');

var titleDiv = document.createElement('div');
titleDiv.className = 'filter-header dropdown-content';
titleDiv.innerHTML = filterNames[0];

var detailDiv = document.createElement('div');
detailDiv.className = 'filter-details dropdown-content'

filterDivs[0].appendChild(titleDiv);
filterDivs[0].appendChild(detailDiv);

var i;
for(i = 0; i < filters.amenities.length; i++)
{
    var button = document.createElement('button');
    button.setAttribute("onclick", "filterButton()");
    button.className = 'filterButton dropdown-content';
    button.id = filters.amenities[i];
    button.innerHTML = filters.amenities[i];
    detailDiv.appendChild(button);
}
