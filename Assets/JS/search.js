/**
 * Take a dictionary corresponding to a room and return the html string to be presented
 * @param {Object} room - The room dictionary
 * @returns {string} - The HTML string representing the room
 */
/*
function roomToHTML(room) {
  const occupancyText = room.occupied
    ? "Currently occupied"
    : "Currently available";

  const scheduleHTML = `<p class="room-schedule">${room.scheduleData
    .map((slot) => `${slot.time}:00 ${slot.status}`)
    .join(" • ")}</p>`;

  return `
    <div class="room-result"
         data-building="${room.buildingName}"
         data-room="${room.roomNumber}">
      
      <div class="room-header">
        <h3>${room.buildingName} ${room.roomNumber}</h3>
        <span class="room-occupancy">
          ${occupancyText}
        </span>
      </div>

      <p class="room-description">
        ${room.roomDescription}
      </p>

      <ul class="room-schedule">
        ${scheduleHTML}
      </ul>
    </div>
  `;
}
*/
/**
 * Apply a list of filter functions to an array of rooms.
 *
 * @param {Array} rooms   - The original list of room objects.
 * @param {Array} filters - An array of functions; each takes a room and
 *                          returns true (keep) or false (discard).
 * @returns {Array} A new array containing only rooms that pass all filters.
 */
function applyFilters(filters, rooms = DATA.rooms) {
  // Start with the full list of rooms
  let result = rooms;

  // Sequentially apply each filter function
  for (const filterFunc of filters) {
    result = result.filter((room) => filterFunc(room));
  }

  // Return the rooms that passed every filter
  return result;
}

/**
 * Search room data using optional hard filters + fuzzy text search.
 *
 * 1. Start from `rooms` (defaults to DATA.rooms).
 * 2. Apply each filter in `filters` (each filter: (room) => boolean).
 * 3. Run Fuse.js fuzzy search on building name + room number.
 *
 * @param {string} query                - The text to search for.
 * @param {Array<function>} [filters]   - List of filter functions.
 * @param {Array} [rooms=DATA.rooms]    - Rooms array to search in.
 * @returns {Array} Fuse.js search results.
 */
function searchData(query, filters = [], rooms = DATA.rooms) {
  // Apply hard filters first (if any)
  const filteredRooms =
    filters.length > 0 ? applyFilters(filters, rooms) : rooms;

  // Configure Fuse options

  const fuseOptions = {
    isCaseSensitive: false,
    includeScore: true,
    includeMatches: false, // set true if you want highlighting
    shouldSort: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
    keys: [
      { name: "buildingName", weight: 0.45 },
      { name: "roomNumber", weight: 0.45 },
      { name: "roomDescription", weight: 0.1 },
    ],
  };

  const fuse = new Fuse(filteredRooms, fuseOptions);

  // Return search results from Fuse.js
  return fuse.search(query);
}

// TESTING

function updateResults(query) {
  resultblock.innerHTML = "";
  results = searchData(query);
  for (const result of results) {
    resultblock.innerHTML += roomToHTML(result.item);
  }
}

searchBtn = document.getElementById("search-btn");
searchbar = document.getElementById("search-box");

// get content from search bar when button is clicked
searchBtn.addEventListener("click", () => {
  console.log("Click")
  //query = searchbar.value;
  //updateResults(query);
});
