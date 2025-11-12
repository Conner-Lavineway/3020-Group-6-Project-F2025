//Filter Handling
{
    var filterDiv = document.getElementById('filters'); //grab holder div by its id
    var i, x;

    for(x = 0; x < filterNames.length; x++)
    {     
        holderDiv = document.createElement('div');
        holderDiv.className = 'filter dropdown-content';
        
        titleDiv = document.createElement('div');
        titleDiv.className = 'filter-header dropdown-content';
        titleDiv.innerHTML = filterNames[x];

        //create the detail holder div
        detailDiv = document.createElement('div');
        detailDiv.className = 'filter-details dropdown-content'
        //append holder div to filters
        filterDiv.appendChild(holderDiv);
        
        //append both divs to the holder div
        holderDiv.appendChild(titleDiv);
        holderDiv.appendChild(detailDiv);

        

        switch(x)
        {
            case 0:
                //create the buttons based on the array
                for(i = 0; i < filters.amenities.length; i++)
                {
                    button = document.createElement('button'); //create button
                    button.setAttribute('onclick', 'filterButton()'); //make sure it is clickable by adding the onclick function
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
            case 2:
                input = document.createElement('input'); //create input
                input.id = 'time';
                input.setAttribute('type', 'time'); //set it to type time
                input.setAttribute('min', '09:00'); //min time (9:00am is the earliest it will accept)
                input.setAttribute('max', '18:00'); //max time (6:00pm is the latest it will accept)
                input.setAttribute('step', '900'); //set step (15 min intervals)
                detailDiv.appendChild(input);
            break;
            default:
            break;
        }

        if(x === filterNames.length - 1)
        {
            detailDiv.className = 'filter-details dropdown-content last';
        }
    }
}

//Event Handling
{
    var eventDiv = document.getElementById('events');

    var i;
    for(i = 0; i < events.length; i++)
    {
        eventHolder = document.createElement('div');
        eventHeader = document.createElement('div');
        eventDetails = document.createElement('div');

        eventHolder.className = 'event dropdown-content';
        eventHeader.className = 'event-header dropdown-content';
        eventDetails.className = 'event-details dropdown-content';

        eventHeader.innerHTML = events[i][0];
        eventDetails.innerHTML = events[i][1];

        eventHolder.appendChild(eventHeader);
        eventHolder.appendChild(eventDetails);

        eventDiv.appendChild(eventHolder);

        if(i === events.length - 1)
        {
          eventDetails.className = 'event-details dropdown-content last';  
        }
    }
}

//Room handling
{
    var availableDiv = document.getElementById('available-rooms').querySelector('.scroll-container');
    var occupiedDiv = document.getElementById('occupied-rooms').querySelector('.scroll-container');

    var i;
    for(i = 0; i < rooms.length; i++)
    {   
        //TODO: Later
    }    
}
