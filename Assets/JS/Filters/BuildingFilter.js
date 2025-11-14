/**
 * BuildingFilter
 *
 * - availableKeywords: Set of all building names we can filter on.
 * - selectedKeywords:  Set of currently selected building names.
 *
 * UI:
 *  <div class="filter dropdown-content">
 *    <div class="filter-header dropdown-content">Buildings:</div>
 *    <div class="filter-details dropdown-content">
 *      <button class="filterButton dropdown-content">EITC</button>
 *      <button class="filterButton dropdown-content">Drake Centre</button>
 *      ...
 *    </div>
 *  </div>
 *
 * Behavior:
 *  - Clicking a button toggles that building in selectedKeywords.
 *  - Selected buttons get the "activeFilter" CSS class.
 *
 * Filtering:
 *  - matches(room) returns true if:
 *      * no buildings are selected, OR
 *      * room.buildingName is one of the selectedKeywords.
 */
class BuildingFilter extends FilterComponent {
  /**
   * @param {Iterable<string>} availableKeywordsIterable
   *        All building names this filter can show.
   *        e.g. ["EITC", "Drake Centre", "Isbister Building", ...]
   */
  constructor(availableKeywordsIterable) {
    super("buildings");

    // All possible buildings this filter can handle.
    this.availableKeywords = new Set(availableKeywordsIterable || []);

    // Buildings currently selected by the user.
    this.selectedKeywords = new Set();

    // Lookup so we can update button classes if needed later.
    this._buttonByKeyword = new Map();
  }

  /**
   * Build and return the DOM for the building filter UI.
   *
   * Structure:
   *  <div class="filter dropdown-content">
   *    <div class="filter-header dropdown-content">Buildings:</div>
   *    <div class="filter-details dropdown-content">
   *      <!-- one button per building -->
   *    </div>
   *  </div>
   *
   * Clicking a button toggles its building name in this.selectedKeywords.
   */
  createElement() {
    // Outer wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "filter dropdown-content";

    // Header label
    const header = document.createElement("div");
    header.className = "filter-header dropdown-content";
    header.textContent = "Buildings:";
    wrapper.appendChild(header);

    // Container for the buttons
    const details = document.createElement("div");
    details.className = "filter-details dropdown-content";
    wrapper.appendChild(details);

    // Create one button per available building name
    this.availableKeywords.forEach((keyword) => {
      const button = document.createElement("button");
      button.className = "filterButton dropdown-content";
      button.id = keyword;
      button.textContent = keyword;

      // If this keyword is currently selected, reflect it in the UI.
      if (this.selectedKeywords.has(keyword)) {
        button.classList.add("activeFilter");
      }

      // Toggle selection on click
      button.addEventListener("click", () => {
        if (this.selectedKeywords.has(keyword)) {
          this.selectedKeywords.delete(keyword);
          button.classList.remove("activeFilter");
        } else {
          this.selectedKeywords.add(keyword);
          button.classList.add("activeFilter");
        }
      });

      details.appendChild(button);
      this._buttonByKeyword.set(keyword, button);
    });

    return wrapper;
  }

  /**
   * Determine whether a given room passes this building filter.
   *
   * A room passes if:
   *  - No buildings are selected  → returns true (no restriction), OR
   *  - room.buildingName is one of the selected building names.
   *
   * @param {Object} room
   * @param {string} room.buildingName - Name of the building this room is in.
   * @returns {boolean}
   */
  matches(room) {
    // If nothing is selected, everything passes.
    if (this.selectedKeywords.size === 0) {
      return true;
    }

    if (!room || typeof room.buildingName !== "string") {
      return false;
    }

    // Room passes if its buildingName is one of the selected ones.
    return this.selectedKeywords.has(room.buildingName);
  }
}
