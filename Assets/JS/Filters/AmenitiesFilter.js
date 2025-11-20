/**
 * AmenitiesFilter
 *
 * - availableKeywords: Set of all amenity names we can filter on.
 * - selectedKeywords:  Set of currently selected amenity names.
 *
 * UI:
 *  <div class="filter dropdown-content">
 *    <div class="filter-header dropdown-content">
 *      <span>Amenities:</span>
 *      <button class="filter-reset-button">Reset</button>
 *    </div>
 *    <div class="filter-details dropdown-content">
 *      <button class="filterButton dropdown-content">Projector/TV</button>
 *      ...
 *    </div>
 *  </div>
 */
class AmenitiesFilter extends FilterComponent {
    /**
     * @param {Iterable<string>} availableKeywordsIterable
     *        All amenity keywords this filter can show.
     *        e.g. ["Projector/TV", "Whiteboard", "Food Allowed", ...]
     */
    constructor(availableKeywordsIterable) {
        super("amenities");

        // All possible amenities this filter can handle.
        this.availableKeywords = new Set(availableKeywordsIterable || []);

        // Amenities currently selected by the user.
        this.selectedKeywords = new Set();

        // We keep a small lookup so we can update button classes if needed later.
        this._buttonByKeyword = new Map();
    }
    /**
     * Build and return the DOM for the amenities filter UI.
     *
     * Structure:
     *  <div class="filter dropdown-content">
     *    <div class="filter-header dropdown-content">
     *      <span>Amenities:</span>
     *      <button class="filter-reset-button">Reset</button>
     *    </div>
     *    <div class="filter-details dropdown-content">
     *      <!-- one button per amenity -->
     *    </div>
     *  </div>
     */
    createElement() {
        // Outer wrapper
        const wrapper = document.createElement("div");
        wrapper.className = "filter dropdown-content";

        // Header row: label + Reset button
        const header = document.createElement("div");
        header.className = "filter-header dropdown-content";

        const titleSpan = document.createElement("span");
        titleSpan.textContent = "Amenities:";

        const resetBtn = document.createElement("button");
        resetBtn.type = "button";
        resetBtn.className = "filter-reset-button dropdown-content";
        resetBtn.textContent = "Reset";

        resetBtn.addEventListener("click", () => {
            this.reset();
        });

        header.appendChild(titleSpan);
        header.appendChild(resetBtn);
        wrapper.appendChild(header);

        // Container for the buttons
        const details = document.createElement("div");
        details.className = "filter-details dropdown-content";
        wrapper.appendChild(details);

        // Create one button per available amenity keyword
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
     * Determine whether a given room passes this amenities filter.
     *
     * A room passes if:
     *  - No amenities are selected  → returns true (no restriction), OR
     *  - room.amenities contains ALL currently selected keywords.
     *
     * @param {Object} room
     * @param {string[]} room.amenities - List of amenity names for this room.
     * @returns {boolean}
     */
    matches(room) {
        // If nothing is selected, everything passes.
        if (this.selectedKeywords.size === 0) {
            return true;
        }

        // Require that every selected keyword be present in room.amenities.
        for (const keyword of this.selectedKeywords) {
            if (!room.amenities.includes(keyword)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Reset this filter:
     *  - clear all selected amenities
     *  - remove "activeFilter" from all amenity buttons
     */
    reset() {
        // Clear internal selection state
        this.selectedKeywords.clear();

        // Update UI: remove "activeFilter" from all known buttons
        this._buttonByKeyword.forEach((button) => {
            if (button && button.classList) {
                button.classList.remove("activeFilter");
            }
        });
    }
}
