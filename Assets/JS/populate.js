//Filter Handling
{
  var filterDiv = document.getElementById("filters"); //grab holder div by its id
  if (filterDiv != null) {
    var i, x;

    for (x = 0; x < filterNames.length; x++) {
      holderDiv = document.createElement("div");
      holderDiv.className = "filter dropdown-content";

      titleDiv = document.createElement("div");
      titleDiv.className = "filter-header dropdown-content";
      titleDiv.innerHTML = filterNames[x];

      //create the detail holder div
      detailDiv = document.createElement("div");
      detailDiv.className = "filter-details dropdown-content";
      //append holder div to filters
      filterDiv.appendChild(holderDiv);

      //append both divs to the holder div
      holderDiv.appendChild(titleDiv);
      holderDiv.appendChild(detailDiv);

      switch (x) {
        case 0:
          //create the buttons based on the array
          for (i = 0; i < filters.amenities.length; i++) {
            button = document.createElement("button"); //create button
            button.setAttribute("onclick", "filterButton()"); //make sure it is clickable by adding the onclick function
            button.className = "filterButton dropdown-content"; //give it the right classes
            button.id = filters.amenities[i]; //give it an id
            button.innerHTML = filters.amenities[i]; //display its name
            detailDiv.appendChild(button); //add to details
          }
          break;
        case 1:
          //create a select element
          select = document.createElement("select");
          select.className = "building dropdown-content";
          select.id = "building-select";
          detailDiv.appendChild(select);

          defaultOption = document.createElement("option");
          defaultOption.className = "dropdown-content";
          defaultOption.value = "none";
          defaultOption.innerHTML = "Any";
          select.appendChild(defaultOption);

          for (i = 0; i < filters.building.length; i++) {
            option = document.createElement("option"); //create a select option
            option.className = "dropdown-content"; //give it a class
            option.value = filters.building[i]; //set its value
            option.innerHTML = filters.building[i]; //set its text
            select.appendChild(option); //add it to the list
          }
          break;
        case 2:
          input = document.createElement("input"); //create input
          input.id = "time";
          input.setAttribute("type", "time"); //set it to type time
          input.setAttribute("min", "09:00"); //min time (9:00am is the earliest it will accept)
          input.setAttribute("max", "18:00"); //max time (6:00pm is the latest it will accept)
          input.setAttribute("step", "900"); //set step (15 min intervals)
          detailDiv.appendChild(input);
          break;
        default:
          break;
      }

      if (x === filterNames.length - 1) {
        detailDiv.className = "filter-details dropdown-content last";
      }
    }
  }
}

//          ╭─────────────────────────────────────────────────────────╮
//          │                     Event Handling                      │
//          ╰─────────────────────────────────────────────────────────╯

/**
 * Add a single event to the "Events Today" dropdown.
 *
 * Expects this DOM structure:
 * <div id="events-dropdown">
 *   <button onclick="showEvent()" class="dropbutton">Events Today</button>
 *   <div id="events" class="dropdown-box showEvents">
 *     <!-- new events get appended here -->
 *   </div>
 * </div>
 *
 * The function creates:
 * <div class="event dropdown-content">
 *   <div class="event-header dropdown-content">TITLE</div>
 *   <div class="event-details dropdown-content">START - END</div>
 * </div>
 *
 * @param {Object} event - Event data to render.
 * @param {string} event.title - Display title of the event.
 * @param {string} event.id - Unique identifier (not used but available).
 * @param {string[]} event.tags - Tags (not used but available).
 * @param {string} event.startTime - ISO 8601 start time string.
 * @param {string} event.endTime - ISO 8601 end time string.
 */
function addEventToDropdown(event) {
  const container = document.getElementById("events");
  if (!container) return;

  const start = new Date(event.startTime);
  const end = new Date(event.endTime);

  const opts = { hour: "numeric", minute: "2-digit" };
  const timeText =
    start.toLocaleTimeString([], opts) +
    " - " +
    end.toLocaleTimeString([], opts);

  const eventDiv = document.createElement("div");
  eventDiv.className = "event dropdown-content";

  const headerDiv = document.createElement("div");
  headerDiv.className = "event-header dropdown-content";
  headerDiv.textContent = event.title;

  const detailsDiv = document.createElement("div");
  detailsDiv.className = "event-details dropdown-content";
  detailsDiv.textContent = timeText;

  eventDiv.appendChild(headerDiv);
  eventDiv.appendChild(detailsDiv);
  container.appendChild(eventDiv);
}

// Add all events
for (const event of EVENTS) {
  // skip itf its a lecture
  if (event.tags.includes("lecture")) continue;

  addEventToDropdown(event);
}

//Room handling
{
  var availableDiv = document
    .getElementById("available-rooms")
    .querySelector(".scroll-container");
  var occupiedDiv = document
    .getElementById("occupied-rooms")
    .querySelector(".scroll-container");
  if (availableDiv != null && occupiedDiv != null) {
    var i;
    for (i = 0; i < rooms.length; i++) {
      roomWidget = document.createElement("div");
      roomWidget.className = "room-widget";

      roomHeader = document.createElement("div");
      roomHeader.className = "room-header";
      timeFormat =
        rooms[i].scheduleData[0].time +
        ":00 - " +
        rooms[i].scheduleData[1].time +
        ":00";
      roomHeader.innerHTML =
        rooms[i].buildingName + " " + rooms[i].roomNumber + "<br>" + timeFormat;

      roomDetails = document.createElement("div");
      roomDetails.className = "room-details";
      var x;
      for (x = 0; x < rooms[i].roomDescription.length; x++) {
        roomTag = document.createElement("div");
        roomTag.className = "room-tag";
        roomTag.innerHTML = rooms[i].roomDescription[x];

        roomDetails.appendChild(roomTag);
      }
      roomWidget.appendChild(roomHeader);
      roomWidget.appendChild(roomDetails);

      if (rooms[i].occupied) {
        occupiedDiv.appendChild(roomWidget);
      } else {
        availableDiv.appendChild(roomWidget);
      }
    }
  }
}
