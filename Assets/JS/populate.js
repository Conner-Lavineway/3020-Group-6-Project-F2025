var filterDivs = document.getElementsByClassName('filter dropdown-content'); //grab holder div by its classes

//create the filter title div
var titleDiv = document.createElement('div');
titleDiv.className = 'filter-header dropdown-content';
titleDiv.innerHTML = filterNames[0];
//this can be done in a for loop for more div creations

//create the detail holder div
var detailDiv = document.createElement('div');
detailDiv.className = 'filter-details dropdown-content'

//append both divs to the holder div
filterDivs[0].appendChild(titleDiv);
filterDivs[0].appendChild(detailDiv);

//create the buttons based on the array
var i;
for(i = 0; i < filters.amenities.length; i++)
{
    var button = document.createElement('button'); //create button
    button.setAttribute("onclick", "filterButton()"); //make sure it is clickable by adding the onclick function
    button.className = 'filterButton dropdown-content'; //give it the right classes
    button.id = filters.amenities[i]; //give it an id
    button.innerHTML = filters.amenities[i]; //display its name
    detailDiv.appendChild(button); //add to details
}
