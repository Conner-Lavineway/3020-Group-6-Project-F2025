/**
 * Abstract base class for all filter components.
 *
 * Responsibilities:
 *  1) Provide a UI element for configuring the filter.
 *     → implemented by createElement()
 *
 *  2) Given an item/event (e.g. a room object), decide whether it passes.
 *     → implemented by matches(item)
 *
 * Usage pattern:
 *
 *   const filter = new SomeConcreteFilter();
 *   const ui = filter.createElement();    // DOM for this filter's controls
 *   container.appendChild(ui);           // put it on the page
 *
 *   // later, when filtering:
 *   const visible = allRooms.filter((room) => filter.matches(room));
 *
 * The filter’s internal state (selected options, toggles, etc.) is stored
 * on the instance and updated via event listeners you attach in createElement().
 */
class FilterComponent {
    /**
     * @param {string} name - Identifier for this filter (e.g. "amenities", "building").
     */
    constructor(name) {
        // Make this class abstract: you should never call `new FilterComponent()` directly.
        if (new.target === FilterComponent) {
            throw new Error(
                "FilterComponent is abstract and cannot be instantiated directly."
            );
        }

        /**
         * Name/identifier for this filter.
         * use this to log or debug which filter is being applied.
         * @type {string}
         */
        this.name = name;
    }

    /**
     * Create and return the DOM subtree for this filter's UI.
     *
     * Requirements / expectations:
     *  - MUST be overridden in subclasses.
     *  - Should create and return a root HTMLElement (e.g. a <div> or <fieldset>).
     *  - Should NOT automatically attach it to the document; the caller decides where.
     *  - Attach any event listeners here that update the filter’s internal state.
     *
     *
     *
     * @returns {HTMLElement} Root element containing this filter's controls.
     */
    createElement() {
        throw new Error(
            "createElement() must be implemented by subclasses of FilterComponent."
        );
    }

    /**
     * Decide whether a given item passes this filter.
     *
     * This is the actual filter logic.
     * It uses the filter's current internal state (set via the UI) to return true/false.
     *
     * Requirements / expectations:
     *  - MUST be overridden in subclasses.
     *  - Should NOT mutate the item; just read it and return a boolean.
     *
     * Example for a "building" filter:
     *
     *   matches(room) {
     *     if (this.selectedBuilding === "none") return true;
     *     return room.buildingName === this.selectedBuilding;
     *   }
     *
     *   // Later, when filtering:
     *   const visibleRooms = allRooms.filter((room) => buildingFilter.matches(room));
     *
     * @param {any} item - A single item/event/room to check against this filter.
     * @returns {boolean} true if the item passes (should be kept), false otherwise.
     */
    matches(item) {
        throw new Error(
            "matches(item) must be implemented by subclasses of FilterComponent."
        );
    }

    /**
     * Reset this filter to its default state (e.g. no selections).
     */
    reset() {
        throw new Error(
            "reset() must be implemented by subclasses of FilterComponent."
        );
    }
}

// for resseting all filters at once
function resetFilterComponents(filterComponents = FILTERS) {
    for (const filter of filterComponents) {
        filter.reset();
    }
}
document.getElementById("reset-all-filters").addEventListener("click", () => {
    resetFilterComponents();
});
