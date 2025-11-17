/**
 * Apply a list of filter functions to an array of rooms.
 *
 * @param {Array} rooms   - The original list of room objects.
 * @param {Array} filters - An array of class filterComponents
 * @returns {Array} A new array containing only rooms that pass all filters.
 */
function applyFilters(filters = FILTERS, rooms = ROOMS) 
{
  // Start with the full list of rooms
  let result = rooms;

  // Sequentially apply each filter function
  for (const filter of filters) {
    result = result.filter((room) => filter.matches(room));
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
 * @param {Array} [rooms=ROOMS]         - Rooms array to search in.
 * @returns {Array} Fuse.js search results.
 */

searchbar = document.getElementById('search-box');
function searchData(query, filters = FILTERS, rooms = ROOMS) 
{
  // Apply hard filters first (if any)
  const filteredRooms = applyFilters(filters, rooms);

  // Configure Fuse options
  const fuseOptions = {
    isCaseSensitive: false,
    includeScore: true,
    includeMatches: false, // set true if you want highlighting
    shouldSort: true,
    minMatchCharLength: 2,
    ignoreLocation: true,
    keys: [
      { name: "buildingName", weight: 0.5 },
      { name: "roomNumber", weight: 0.5 },
      { name: "roomDescription", weight: 0.1 },
      { name: "amenities", weight: 0.3 },
    ],
  };

  const fuse = new Fuse(filteredRooms, fuseOptions);

  // Return search results from Fuse.js
  return fuse.search(query);
}
