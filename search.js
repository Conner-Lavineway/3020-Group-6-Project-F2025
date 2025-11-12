/**
 * Take a dictionary corresponding to a room and return the html string to be presented
 * @param {Object} room - The room dictionary
 * @returns {string} - The HTML string representing the room
 */
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

// TESTING
const room1 = DATA.rooms[0];
const resultblock = document.getElementById("search-results");
const roomHTML = roomToHTML(room1);

resultblock.innerHTML += roomHTML;

/** Factory: returns a filter function for a specific building name */
function makeBuildingFilter(buildingName) {
  return function (room) {
    return room.buildingName === buildingName;
  };
}
