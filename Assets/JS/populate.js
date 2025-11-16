//          ╭─────────────────────────────────────────────────────────╮
//          │               Search and Filter Handling                │
//          ╰─────────────────────────────────────────────────────────╯

// Kepp a list of all filters
const FILTERS = [];

// get the dropdown div
const dropdown = document.getElementById("filters");

// add the amenities filter
const AMENITY_FILTER = new AmenitiesFilter(AMENITIES);
dropdown.appendChild(AMENITY_FILTER.createElement());
FILTERS.push(AMENITY_FILTER);

// add the building filter
const BUILDING_FILTER = new BuildingFilter(BUILDINGS);
dropdown.appendChild(BUILDING_FILTER.createElement());
FILTERS.push(BUILDING_FILTER);

// add availability filter
const AVAILABILITY_FILTER = new AvailabilityFilter();
dropdown.appendChild(AVAILABILITY_FILTER.createElement());
FILTERS.push(AVAILABILITY_FILTER);



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

//          ╭─────────────────────────────────────────────────────────╮
//          │                  Handle Room Rendering                  │
//          ╰─────────────────────────────────────────────────────────╯

/**
 * Create a super concise DOM element for a room search result.
 *
 * Structure:
 * <article class="room-result">
 *   <div class="room-result-main">
 *     <h3 class="room-result-title">University College 310</h3>
 *     <p class="room-result-description">Short description…</p>
 *   </div>
 *   <div class="room-result-footer">
 *     <span class="room-result-meta">4 events \n\n1 amenity</span>
 *     <div class="room-result-amenities">
 *       <span class="room-tag">Ritual Circle</span>
 *       <!-- +N more if needed -->
 *     </div>
 *   </div>
 * </article>
 *
 * @param {Object} room - The room object to represent.
 * @returns {HTMLElement} The constructed room result element.
 */
function createRoomResultElement(room) {
  const card = document.createElement("article");
  card.className = "room-result";

  // Main info (title + short description)
  const main = document.createElement("div");
  main.className = "room-result-main";

  const title = document.createElement("h3");
  title.className = "room-result-title";
  title.textContent = room.buildingName + " " + room.roomNumber;

  const desc = document.createElement("p");
  desc.className = "room-result-description";
  desc.textContent = room.roomDescription || "";

  main.appendChild(title);
  main.appendChild(desc);
  card.appendChild(main);

  // Footer: tiny meta + a few amenities tags
  const footer = document.createElement("div");
  footer.className = "room-result-footer";

  const amenitiesIterable = room.amenities || [];
  const amenitiesArray = Array.isArray(amenitiesIterable)
    ? amenitiesIterable
    : Array.from(amenitiesIterable);

  const meta = document.createElement("span");
  meta.className = "room-result-meta";
  const eventCount = Array.isArray(room.events) ? room.events.length : 0;
  //meta.textContent =
  //  eventCount + " events " + amenitiesArray.length + " amenities";

  const tagsContainer = document.createElement("div");
  tagsContainer.className = "room-result-amenities";

  const maxTagsToShow = 3;
  amenitiesArray.slice(0, maxTagsToShow).forEach(function (amenity) {
    const tag = document.createElement("span");
    tag.className = "room-tag";
    tag.textContent = amenity;
    tagsContainer.appendChild(tag);
  });

  if (amenitiesArray.length > maxTagsToShow) {
    const remaining = amenitiesArray.length - maxTagsToShow;
    const moreTag = document.createElement("span");
    moreTag.className = "room-tag room-tag-more";
    moreTag.textContent = "+" + remaining + " more";
    tagsContainer.appendChild(moreTag);
  }

  footer.appendChild(meta);
  footer.appendChild(tagsContainer);
  card.appendChild(footer);

  return card;
}

function renderAvailableRooms(rooms = ROOMS) {
  // Find the scroll container inside #available-rooms
  const container = document.querySelector(
    "#available-rooms .scroll-container",
  );

  // Clear old results
  container.innerHTML = "";

  // Add one concise card per room
  rooms.forEach(function (room) {
    const card = createRoomResultElement(room);
    container.appendChild(card);
  });
}

//          ╭─────────────────────────────────────────────────────────╮
//          │          Final Rendering and applying filters           │
//          ╰─────────────────────────────────────────────────────────╯
const searchInput = document.getElementById("search-box");

function updateRoomResults() {
  // get the search query
  const query = searchInput ? searchInput.value : "";

  // if it's empty just render filtered rooms
  if (!query || query.trim() === "") {
    renderAvailableRooms(applyFilters(FILTERS, ROOMS));
  }

  // if there's a query, do a full search
  else {
    const results = searchData(query, FILTERS, ROOMS);

    // turn the fuse results into room list. this is where sorting happens
    const rooms = results.map((result) => result.item);
    updateNumbers(rooms);
    renderAvailableRooms(rooms);
  }
}

// Add document event listeners for updating on interaction
document.addEventListener("DOMContentLoadeed", updateRoomResults);
document.addEventListener("input", updateRoomResults);
document.addEventListener("click", updateRoomResults);
searchInput.addEventListener('keydown', updateRoomResults)

// update initial results
updateRoomResults();
//update map
updateNumbers(ROOMS);
