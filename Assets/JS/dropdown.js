var dropdowns = document.getElementsByClassName("dropdown-box");

function showEvent()
{
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

function showSort()
{
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

function showFilter()
{
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
    
    document.getElementById("filters").classList.toggle("showFilters");
}

function sortFilter()
{
    var buttons = document.getElementsByClassName("sortButton");
    var i;
    for(i = 0; i < buttons.length; i++)
    {
        if(buttons[i].classList.contains('activeSort'))
        {
            buttons[i].classList.remove('activeSort');
        }
    }

    (event.target).classList.toggle("activeSort");
}

function filterButton()
{
    if((event.target).classList.contains("activeFilter"))
    {
        (event.target).classList.remove("activeFilter");
    }
    else
    {
        (event.target).classList.toggle("activeFilter");
    }

}

window.onclick = function(event) 
{
    if (!event.target.matches('.dropbutton') && !event.target.matches('.dropdown-content') && !event.target.matches('select2-selection__rendered')) 
    {

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