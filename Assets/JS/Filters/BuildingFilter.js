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
      let subClass = keyword.replace(" ", "-");
      const button = document.createElement("button");
      button.className = "filterButton dropdown-content " + subClass;
      button.id = keyword;
      button.textContent = keyword;

      // If this keyword is currently selected, reflect it in the UI.
      if (this.selectedKeywords.has(keyword)) {
        button.classList.add("activeFilter");
      }

      // Toggle selection on click
      button.addEventListener("click", () => {
        var filters = document.getElementsByClassName(subClass);
        console.log(filters);
        if(this.selectedKeywords.has(keyword))
        {
          for(var i = 0; i < filters.length; i++)
          {
            if(filters[i].id == keyword)
            {
              filters[i].classList.remove("activeFilter");
            }
          }
          this.selectedKeywords.delete(keyword);
        }
        else
        {
          for(var i = 0; i < filters.length; i++)
          {
            if(filters[i].id == keyword)
            {
              filters[i].classList.add("activeFilter");
            }
          }
          this.selectedKeywords.add(keyword);
        }
        console.log(filters);
        console.log(this.selectedKeywords);
      });

      details.appendChild(button);
      this._buttonByKeyword.set(keyword, button);
    });

    return wrapper;
  }

  createMapElement()
  {
    var buildingCoords = [
    [49.808631, -97.133646], //EITC
    [49.808043, -97.130245], //DRAKE
    [49.809773, -97.131039], //ISBISTER
    [49.811337, -97.131318]]; //UNI COLLEGE
    var markers = [];
    this.availableKeywords.forEach(keyword => 
    {
      var subClass = keyword.replace(" ", "-");
      let x = -1;
      switch(keyword)
      {
        case "EITC":
          x = 0;
          break;
        case "Drake Centre":
          x = 1;
          break;
        case "Isbister Building":
          x = 2;
          break;
        case "University College":
          x = 3;
          break;
      }
      let markerClass = "text-label " + subClass;

      var textLabel = L.divIcon(
      {
          className: markerClass,   // Set class for CSS styling
          id: keyword, //to find it later
          html: "Err loading rooms"
      });
      
      var marker = L.marker(buildingCoords[x], {icon:textLabel});

      if (this.selectedKeywords.has(keyword)) 
      {
        marker.classList.add("activeFilter");
        console.log(keyword);
      }


      marker.addTo(map).addEventListener("click", () =>
      {
        var filters = document.getElementsByClassName(subClass);
        console.log(subClass);
        console.log(filters);
        if(this.selectedKeywords.has(keyword))
        {
          for(var i = 0; i < filters.length; i++)
          {
            if(filters[i].id == keyword)
            {
              filters[i]._icon.classList.remove("activeFilter");
            }
          }
          this.selectedKeywords.delete(keyword);
        }
        else
        {
          for(var i = 0; i < filters.length; i++)
          {
            if(filters[i].id == keyword)
            {
              filters[i].classList.add("activeFilter");
            }
          }
          this.selectedKeywords.add(keyword);
        }
      });

      this._buttonByKeyword.set(keyword, marker);
      markers.push(marker);
    });

    return markers;
  };

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
