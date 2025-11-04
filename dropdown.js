function eventButton()
{
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) 
    {
        var openDropdown = dropdowns[i];
        if(openDropdown.classList.contains('show')) 
        {
            openDropdown.classList.remove('show');
        }
        else
        {
            openDropdown.classList.remove('showSort');
        }
    }  

    document.getElementById("events").classList.toggle("show");
}

function sortButton()
{
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) 
    {
        var openDropdown = dropdowns[i];
        if(openDropdown.classList.contains('show')) 
        {
            openDropdown.classList.remove('show');
        }
        else
        {
            openDropdown.classList.remove('showSort');
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
        if(openDropdown.classList.contains('show')) 
        {
            openDropdown.classList.remove('show');
        }
        else
        {
            openDropdown.classList.remove('showSort');
        }
    }  
    
    document.getElementById("filters").classList.toggle("show")
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
            if(openDropdown.classList.contains('show')) 
            {
                openDropdown.classList.remove('show');
            }        
            else
            {
                openDropdown.classList.remove('showSort');
            }
        }
    }
}