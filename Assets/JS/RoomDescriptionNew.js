const urlParams = new URLSearchParams(window.location.search);
const roomID = urlParams.get("id");

const currentRoom = ROOMS.find((r) => {
    return r.id === roomID;
});

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


for (const event of currentRoom.events) {
    addEventToDayView(event);
    addEventToDropdown(event);
}
//Rest of stuff
document.getElementById("room-title").textContent = currentRoom.buildingName + " " + currentRoom.roomNumber;
document.getElementById("description").textContent = currentRoom.roomDescription;
document.getElementById("building").textContent = currentRoom.buildingName;
document.getElementById("room").textContent = currentRoom.roomNumber;
const amenities = currentRoom.amenities;
const amenitiesList = document.getElementById("amenities");

amenities.forEach(item => {
    const li = document.createElement("p");
    li.textContent = item;
    li.setAttribute("class", "room-description-amenities");
    amenitiesList.appendChild(li);
});


const backButton = document.getElementById("backButton");
backButton.addEventListener("click", function () {
    const parentUrl = new URL("./..", window.location.href).href;
    window.location.href = parentUrl + "/index.html";
})