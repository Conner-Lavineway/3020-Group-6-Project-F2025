var filterDivs = document.getElementsByClassName('filter dropdown-content'); //grab holder div by its classes


var i, x;
var skip = 1;

for(x = 0; x < filterDivs.length - skip; x++)
{     
    titleDiv = document.createElement('div');
    titleDiv.className = 'filter-header dropdown-content';
    titleDiv.innerHTML = filterNames[x];

    //create the detail holder div
    detailDiv = document.createElement('div');
    detailDiv.className = 'filter-details dropdown-content'
    
    //append both divs to the holder div
    filterDivs[x].appendChild(titleDiv);
    filterDivs[x].appendChild(detailDiv);
    

    switch(x)
    {
        case 0:
            //create the buttons based on the array
            for(i = 0; i < filters.amenities.length; i++)
            {
                button = document.createElement('button'); //create button
                button.setAttribute("onclick", "filterButton()"); //make sure it is clickable by adding the onclick function
                button.className = 'filterButton dropdown-content'; //give it the right classes
                button.id = filters.amenities[i]; //give it an id
                button.innerHTML = filters.amenities[i]; //display its name
                detailDiv.appendChild(button); //add to details
            }
        break;
        case 1:
            //create a select element
            select = document.createElement('select');
            select.className = 'building dropdown-content'
            detailDiv.appendChild(select);

            for(i = 0; i < filters.building.length; i++)
            {
                option = document.createElement('option'); //create a select option
                option.className = 'dropdown-content'; //give it a class
                option.value = i + 1; //set its value
                option.innerHTML = filters.building[i]; //set its text
                select.appendChild(option) //add it to the list
            }
        break;
    }
}
