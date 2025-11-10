var dropdowns = document.getElementsByClassName("dropdown-content");
document.getElementById("relevance").classList.toggle("active");

function eventButton()
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

function sortButton()
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

function filterButton()
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
        if(buttons[i].classList.contains('active'))
        {
            buttons[i].classList.remove('active');
        }
    }

    (event.target).classList.toggle("active");
}

window.onclick = function(event) 
{
    if (!event.target.matches('.dropbutton')) 
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