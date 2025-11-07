function eventButton()
{
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) 
    {
        var openDropdown = dropdowns[i];
        if(openDropdown.classList.contains('showEvents')) 
        {
            openDropdown.classList.remove('showEvents');
        }
        else if(openDropdown.classList.contains('showSort')) 
        {
            openDropdown.classList.remove('showSort');
        }
        else if(openDropdown.classList.contains('showFilters'))
        {
            openDropdown.classList.remove('showFilters');            
        } 
    }  

    document.getElementById("events").classList.toggle("showEvents");
}

function sortButton()
{
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) 
    {
        var openDropdown = dropdowns[i];
        if(openDropdown.classList.contains('showEvents')) 
        {
            openDropdown.classList.remove('showEvents');
        }
        else if(openDropdown.classList.contains('showSort')) 
        {
            openDropdown.classList.remove('showSort');
        }
        else if(openDropdown.classList.contains('showFilters'))
        {
            openDropdown.classList.remove('showFilters');            
        } 
    }  

    document.getElementById("sorting").classList.toggle("showSort");
}

function filterButton()
{
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) 
    {
        var openDropdown = dropdowns[i];
        if(openDropdown.classList.contains('showEvents')) 
        {
            openDropdown.classList.remove('showEvents');
        }
        else if(openDropdown.classList.contains('showSort')) 
        {
            openDropdown.classList.remove('showSort');
        }
        else if(openDropdown.classList.contains('showFilters'))
        {
            openDropdown.classList.remove('showFilters'); 
        } 
    }  
    
    document.getElementById("filters").classList.toggle("showFilters")
}

window.onclick = function(event) 
{
    if (!event.target.matches('.dropbutton')) 
    {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) 
        {
            var openDropdown = dropdowns[i];
            if(openDropdown.classList.contains('showEvents')) 
            {
                openDropdown.classList.remove('showEvents');
            }
            else if(openDropdown.classList.contains('showSort')) 
            {
                openDropdown.classList.remove('showSort');
            }
            else if(openDropdown.classList.contains('showFilters'))
            {
                openDropdown.classList.remove('showFilters');            
            } 
        }
    }
}