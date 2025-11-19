// ╭─────────────────────────────────────────────────────────╮
// │ Schedule view helper functions                          │
// ╰─────────────────────────────────────────────────────────╯

// Day runs from 06:00 to 24:00 (midnight).
const DAY_START_HOUR = 6;
const DAY_END_HOUR = 24;

/**
 * Add one event to the continuous day-view calendar.
 *
 * @param {Object} event - event object like:
 *   {
 *     title: "Exorcism",
 *     startTime: "2025-11-13T18:00:00",
 *     endTime:   "2025-11-13T19:00:00",
 *     ...
 *   }
 * @param {HTMLElement} scheduleEl - the root element with class "schedule"
 */
function addEventToDayView(
    event,
    scheduleEl = document.getElementById("schedule")
) {
    const trackEl = scheduleEl.querySelector(".schedule-track");
    if (!trackEl) return;

    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);

    const startDayMinutes = DAY_START_HOUR * 60;
    const endDayMinutes = DAY_END_HOUR * 60; // 24 * 60 = 1440
    const daySpanMinutes = endDayMinutes - startDayMinutes; // 18 hours = 1080 min

    const minutesSinceMidnight = (d) => d.getHours() * 60 + d.getMinutes();

    const clamp = (x, min, max) => Math.min(max, Math.max(min, x));

    let startMinutes = minutesSinceMidnight(startDate);
    let endMinutes = minutesSinceMidnight(endDate);

    // Clamp to the visible window (06:00–24:00)
    startMinutes = clamp(startMinutes, startDayMinutes, endDayMinutes);
    endMinutes = clamp(endMinutes, startDayMinutes, endDayMinutes);

    // Ensure a minimum visual size so tiny events are visible
    let durationMinutes = Math.max(endMinutes - startMinutes, 10);

    const startPercent =
        ((startMinutes - startDayMinutes) / daySpanMinutes) * 100;
    const durationPercent = (durationMinutes / daySpanMinutes) * 100;

    const eventEl = document.createElement("div");
    eventEl.className = "schedule-event";
    eventEl.style.setProperty("--start", startPercent);
    eventEl.style.setProperty("--duration", durationPercent);

    const titleEl = document.createElement("div");
    titleEl.className = "schedule-event-title";
    titleEl.textContent = event.title;

    const timeEl = document.createElement("div");
    timeEl.className = "schedule-event-time";
    timeEl.textContent = formatTimeRange(startDate, endDate);

    eventEl.appendChild(titleEl);
    eventEl.appendChild(timeEl);

    trackEl.appendChild(eventEl);
}

function formatTimeRange(start, end) {
    const opts = { hour: "numeric", minute: "2-digit" };
    const s = start.toLocaleTimeString([], opts);
    const e = end.toLocaleTimeString([], opts);
    return `${s} – ${e}`;
}

/**
 * Place the "now" line in the schedule based on minutes since midnight.
 *
 * @param {number} minutesSinceMidnight - e.g. 13 * 60 + 30 for 1:30 pm
 */
function updateScheduleNowLine(minutesSinceMidnight) {
    const track = document.querySelector("#schedule .schedule-track");
    const nowEl = document.getElementById("schedule-now");
    if (!track || !nowEl) return;

    const startDayMinutes = DAY_START_HOUR * 60;
    const endDayMinutes = DAY_END_HOUR * 60;
    const daySpanMinutes = endDayMinutes - startDayMinutes;

    // Clamp to visible window (06:00–24:00)
    const clamped = Math.min(
        endDayMinutes,
        Math.max(startDayMinutes, minutesSinceMidnight)
    );

    const offsetPercent = ((clamped - startDayMinutes) / daySpanMinutes) * 100;

    nowEl.style.top = offsetPercent + "%";
}

/* Optional helpers */

// From a Date object:
function minutesFromDate(date) {
    return date.getHours() * 60 + date.getMinutes();
}

// From "HH:MM" string like "13:30"
function minutesFromHHMM(hhmm) {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + (m || 0);
}

// ╭─────────────────────────────────────────────────────────╮
// │ Populate the page with a room                           │
// ╰─────────────────────────────────────────────────────────╯

/**
 * Create the room meta section for a room.
 *
 * Returns:
 * <section class="roundedBox" id="room-meta">
 *   <div class="room-meta-row">
 *     <p><strong>Building:&nbsp;</strong></p>
 *     <p id="building">...</p>
 *   </div>
 *   <div class="room-meta-row">
 *     <p><strong>Room:&nbsp;</strong></p>
 *     <p id="room">...</p>
 *   </div>
 *   <div class="room-meta-amenities">
 *     <p><strong>Amenities:</strong></p>
 *     <ul id="amenities">
 *       <li>...</li>
 *       ...
 *     </ul>
 *   </div>
 * </section>
 *
 * @param {Object} room
 * @param {string} room.buildingName
 * @param {number|string} room.roomNumber
 * @param {string[]} [room.amenities]
 * @param {boolean} [append=true] Whether to append to the DOM immediately.
 * @returns {HTMLElement} The <section> element.
 */
function createRoomMetaSection(room, append = true) {
    const section = document.createElement("section");
    section.className = "roundedBox";
    section.id = "room-meta";

    // --- Building row ---
    const buildingRow = document.createElement("div");
    buildingRow.className = "room-meta-row";

    const buildingLabel = document.createElement("p");
    buildingLabel.innerHTML = "<strong>Building:&nbsp;</strong>";

    const buildingValue = document.createElement("p");
    buildingValue.id = "building";
    buildingValue.textContent = room.buildingName || "";

    buildingRow.appendChild(buildingLabel);
    buildingRow.appendChild(buildingValue);

    // --- Room row ---
    const roomRow = document.createElement("div");
    roomRow.className = "room-meta-row";

    const roomLabel = document.createElement("p");
    roomLabel.innerHTML = "<strong>Room:&nbsp;</strong>";

    const roomValue = document.createElement("p");
    roomValue.id = "room";
    roomValue.textContent =
        room.roomNumber !== undefined && room.roomNumber !== null
            ? String(room.roomNumber)
            : "";

    roomRow.appendChild(roomLabel);
    roomRow.appendChild(roomValue);

    // --- Amenities list ---
    const amenitiesWrapper = document.createElement("div");
    amenitiesWrapper.className = "room-meta-amenities";

    const amenitiesLabel = document.createElement("p");
    amenitiesLabel.innerHTML = "<strong>Amenities:</strong>";

    const amenitiesList = document.createElement("ul");
    amenitiesList.id = "amenities";

    const amenitiesArray = Array.isArray(room.amenities) ? room.amenities : [];

    amenitiesArray.forEach((amenity) => {
        const li = document.createElement("li");
        li.textContent = amenity;
        amenitiesList.appendChild(li);
    });

    amenitiesWrapper.appendChild(amenitiesLabel);
    amenitiesWrapper.appendChild(amenitiesList);

    // Assemble section
    section.appendChild(buildingRow);
    section.appendChild(roomRow);
    section.appendChild(amenitiesWrapper);

    if (append) {
        // clear existing content
        const parent = document.getElementById("room-meta-column");
        const existing = document.getElementById("room-meta");
        parent.removeChild(existing);

        // append new content
        parent.appendChild(section);
    }

    return section;
}

/**
 * Create the room description section for a room.
 *
 * Returns:
 * <section class="room-description roundedBox" aria-labelledby="description-heading">
 *   <h3 id="description-heading" class="room-description-title">Description</h3>
 *   <p id="description">...</p>
 * </section>
 *
 * @param {Object} room
 * @param {string} [room.roomDescription]
 * @returns {HTMLElement} The <section> element.
 */
function createRoomDescriptionSection(room, append = true) {
    const section = document.createElement("section");
    section.className = "room-description roundedBox";
    section.setAttribute("aria-labelledby", "description-heading");

    const heading = document.createElement("h3");
    heading.id = "description-heading";
    heading.className = "room-description-title";
    heading.textContent = "Description";

    const desc = document.createElement("p");
    desc.id = "description";
    desc.textContent = room.roomDescription || "";

    section.appendChild(heading);
    section.appendChild(desc);

    if (append) {
        const parent = document.getElementById("room-main-column");
        // get everything with class "room-description"
        const existing = parent.querySelector(".room-description");
        if (existing) {
            parent.removeChild(existing);
        }

        parent.appendChild(section);
    }

    return section;
}

function populateRoomPage(roomID) {
    // get the room we are looking for
    const room = ROOMS.find((r) => {
        return r.id === roomID;
    });

    createRoomMetaSection(room);
    createRoomDescriptionSection(room);

    // add events to schedule view
    for (const event of room.events) {
        addEventToDayView(event);
        addEventToDropdown(event);
    }

    // Update title
    const title = `${room.buildingName} ${room.roomNumber} - Room Details`;
    document.title = title;
    document.getElementById("room-title").textContent = title;
}

// get room from url and populate page
const urlParams = new URLSearchParams(window.location.search);
const roomID = urlParams.get("id");
populateRoomPage(roomID);
updateScheduleNowLine(minutesFromDate(new Date()));

// ╭─────────────────────────────────────────────────────────╮
// │ Make the back button functionsl                         │
// ╰─────────────────────────────────────────────────────────╯

backButton = document.getElementById("back-button");
backButton.onclick = function () {
    // go to index.html
    const parentUrl = new URL("./..", window.location.href).href;
    window.location.href = parentUrl + "/index.html";
};
