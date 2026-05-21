/**
 * AvailabilityFilter
 *
 * Lets the user pick:
 *  - a date via <input type="date">
 *  - a time range from 06:00 to 24:00 using:
 *      * two <input type="time"> fields (start/end)
 *      * a single double-thumb slider (one track, two thumbs, middle highlighted)
 *
 * Filtering:
 *  - If no date is selected -> matches() returns true (no restriction).
 *  - Otherwise, for each event in room.events:
 *      If event.hardOccupancy === true AND
 *         the event overlaps the selected time range on the chosen date,
 *         then the room is unavailable -> matches() returns false.
 *  - If no blocking events are found -> matches() returns true.
 */
class AvailabilityFilter extends FilterComponent {
    constructor() {
        super("availability");

        // Selected date in "YYYY-MM-DD" or null if no date chosen yet
        this.selectedDate = "2025-11-13"; // Example date

        // Time range in minutes from midnight, clamped to [06:00, 24:00]
        this.MIN_MINUTES = 6 * 60; // 06:00
        this.MAX_MINUTES = 24 * 60; // 24:00

        // Default range: minimal span
        this.startMinutes = this.MIN_MINUTES;
        this.endMinutes = this.MIN_MINUTES;

        // DOM refs
        this.dateInput = null;
        this.startTimeInput = null;
        this.endTimeInput = null;

        // Slider DOM refs
        this._rangeEl = null;
        this._highlightEl = null;
        this._thumbStartEl = null;
        this._thumbEndEl = null;

        // deactivated by default
        this.isActive = false;

        //
        this.setNow();
    }

    /**
     * Clear selected date/time and deactivate this filter.
     */
    reset() {
        this.selectedDate = null;
        this.startMinutes = this.MIN_MINUTES;
        this.endMinutes = this.MIN_MINUTES;
        this.isActive = false;

        if (this.dateInput) {
            this.dateInput.value = "";
        }

        this.updateTimeInputsFromState();
        this.updateSliderUIFromState();
    }

    setNow() {
        const date = new Date();
        date.setFullYear(2025, 10, 13); // Nov 13, 2025
        this.selectedDate = date.toISOString().split("T")[0];
        this.startMinutes = this.timeStringToMinutes(
            date.getHours().toString().padStart(2, "0") +
                ":" +
                date.getMinutes().toString().padStart(2, "0")
        );
        this.endMinutes = this.startMinutes + 60; // 1 hour later
        this.isActive = true;

        this.updateTimeInputsFromState();
        this.updateSliderUIFromState();
    }

    /**
     * Convert minutes-from-midnight -> "HH:MM" string.
     *
     * Ex: minutesToTimeString(90) -> "01:30"
     */
    minutesToTimeString(totalMinutes) {
        let minutes = Math.max(
            this.MIN_MINUTES,
            Math.min(this.MAX_MINUTES, totalMinutes)
        );
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        const hh = String(hours).padStart(2, "0");
        const mm = String(mins).padStart(2, "0");
        return hh + ":" + mm;
    }

    /**
     * Parse "HH:MM" -> minutes-from-midnight, clamped to [MIN_MINUTES, MAX_MINUTES].
     * Returns null if invalid.
     *
     * Ex: timeStringToMinutes("10:30") -> 630
     */
    timeStringToMinutes(str) {
        if (typeof str !== "string" || !str.includes(":")) return null;
        const [hhStr, mmStr] = str.split(":");
        const hh = Number(hhStr);
        const mm = Number(mmStr);

        let total = hh * 60 + mm;
        total = Math.max(this.MIN_MINUTES, Math.min(this.MAX_MINUTES, total));
        return total;
    }

    /**
     * Convert minutes to percentage along the slider [0, 100].
     */
    minutesToPercent(minutes) {
        const span = this.MAX_MINUTES - this.MIN_MINUTES;
        const clamped = Math.max(
            this.MIN_MINUTES,
            Math.min(this.MAX_MINUTES, minutes)
        );
        return ((clamped - this.MIN_MINUTES) / span) * 100;
    }

    /**
     * Sync the time <input type="time"> fields from internal minutes.
     */
    updateTimeInputsFromState() {
        // When the filter is inactive, show empty time fields.
        if (!this.isActive) {
            if (this.startTimeInput) {
                this.startTimeInput.value = "";
            }
            if (this.endTimeInput) {
                this.endTimeInput.value = "";
            }
            return;
        }

        if (this.startTimeInput) {
            this.startTimeInput.value = this.minutesToTimeString(
                this.startMinutes
            );
        }
        if (this.endTimeInput) {
            this.endTimeInput.value = this.minutesToTimeString(this.endMinutes);
        }
    }
    /**
     * Sync slider thumbs + highlight from internal minutes.
     */
    updateSliderUIFromState() {
        if (
            !this._rangeEl ||
            !this._thumbStartEl ||
            !this._thumbEndEl ||
            !this._highlightEl
        ) {
            return;
        }

        const startPct = this.minutesToPercent(this.startMinutes);
        const endPct = this.minutesToPercent(this.endMinutes);

        this._thumbStartEl.style.left = startPct + "%";
        this._thumbEndEl.style.left = endPct + "%";

        this._highlightEl.style.left = startPct + "%";
        this._highlightEl.style.width = endPct - startPct + "%";
    }

    /**
     * Build and return the DOM for the availability filter UI.
     */
    createElement() {
        const wrapper = document.createElement("div");
        wrapper.className = "filter dropdown-content availability-filter";

        const header = document.createElement("div");
        header.className = "filter-header dropdown-content";

        const titleSpan = document.createElement("span");
        titleSpan.textContent = "Available Between:";

        const resetBtn = document.createElement("button");
        resetBtn.type = "button";
        resetBtn.className = "filter-reset-button dropdown-content";
        resetBtn.textContent = "Reset";
        resetBtn.addEventListener("click", () => {
            this.reset();
        });

        const nowBtn = document.createElement("button");
        nowBtn.type = "button";
        nowBtn.className = "filter-now-button dropdown-content";
        nowBtn.textContent = "Now";
        nowBtn.addEventListener("click", () => {
            this.setNow();
        });

        header.appendChild(titleSpan);
        header.appendChild(resetBtn);
        header.appendChild(nowBtn);
        wrapper.appendChild(header);

        const details = document.createElement("div");
        details.className = "filter-details dropdown-content availability-body";
        wrapper.appendChild(details);

        // Row 1: Date picker
        const rowDate = document.createElement("div");
        rowDate.className = "availability-row";

        const dateLabel = document.createElement("label");
        dateLabel.textContent = "Day:";
        rowDate.appendChild(dateLabel);

        const dateInput = document.createElement("input");
        dateInput.type = "date";
        dateInput.className = "availability-date";
        rowDate.appendChild(dateInput);

        // details.appendChild(rowDate);

        // Row 2: Start / end time fields
        const rowTimes = document.createElement("div");
        rowTimes.className = "availability-row";

        const timeLabel = document.createElement("label");
        timeLabel.textContent = "Time:";
        rowTimes.appendChild(timeLabel);

        const startTimeInput = document.createElement("input");
        startTimeInput.type = "time";
        startTimeInput.className =
            "availability-time availability-time-start dropdown-content";
        startTimeInput.min = "06:00";
        startTimeInput.max = "24:00";
        startTimeInput.step = 900; // 15 minutes

        const separator = document.createElement("span");
        separator.textContent = " - ";

        const endTimeInput = document.createElement("input");
        endTimeInput.type = "time";
        endTimeInput.className =
            "availability-time availability-time-end dropdown-content";
        endTimeInput.min = "06:00";
        endTimeInput.max = "24:00";
        endTimeInput.step = 900;

        rowTimes.appendChild(startTimeInput);
        rowTimes.appendChild(separator);
        rowTimes.appendChild(endTimeInput);

        details.appendChild(rowTimes);

        // Row 3: Custom double-thumb slider
        const rowSliders = document.createElement("div");
        rowSliders.className =
            "availability-row availability-sliders dropdown-content";

        const range = document.createElement("div");
        range.className = "availability-range";

        const track = document.createElement("div");
        track.className = "availability-range-track";

        const highlight = document.createElement("div");
        highlight.className = "availability-range-highlight";

        const thumbStart = document.createElement("div");
        thumbStart.className =
            "availability-range-thumb availability-range-thumb-start dropdown-content";

        const thumbEnd = document.createElement("div");
        thumbEnd.className =
            "availability-range-thumb availability-range-thumb-end dropdown-content";

        range.appendChild(track);
        range.appendChild(highlight);
        range.appendChild(thumbStart);
        range.appendChild(thumbEnd);

        rowSliders.appendChild(range);
        details.appendChild(rowSliders);

        // Store refs
        this.dateInput = dateInput;
        this.startTimeInput = startTimeInput;
        this.endTimeInput = endTimeInput;
        this._rangeEl = range;
        this._highlightEl = highlight;
        this._thumbStartEl = thumbStart;
        this._thumbEndEl = thumbEnd;

        // Initialize UI from internal state
        this.updateTimeInputsFromState();
        this.updateSliderUIFromState();

        // --- Event wiring ---

        // Date change -> update selectedDate and mark filter active
        dateInput.addEventListener("change", () => {
            this.selectedDate = dateInput.value || null;
            this.isActive = !!this.selectedDate;
        });

        // Time field changes -> update minutes, clamp, sync slider + other input
        startTimeInput.addEventListener("change", () => {
            const mins = this.timeStringToMinutes(startTimeInput.value);
            if (mins !== null) {
                this.startMinutes = mins;
                if (this.startMinutes > this.endMinutes) {
                    this.endMinutes = this.startMinutes;
                }
                this.isActive = true;
                this.updateTimeInputsFromState();
                this.updateSliderUIFromState();
            }
        });

        endTimeInput.addEventListener("change", () => {
            const mins = this.timeStringToMinutes(endTimeInput.value);
            if (mins !== null) {
                this.endMinutes = mins;
                if (this.endMinutes < this.startMinutes) {
                    this.startMinutes = this.endMinutes;
                }
                this.isActive = true;
                this.updateTimeInputsFromState();
                this.updateSliderUIFromState();
            }
        });

        // Double-thumb slider dragging logic
        let activeThumb = null;

        const onPointerMove = (event) => {
            if (!activeThumb || !this._rangeEl) return;

            const rect = this._rangeEl.getBoundingClientRect();
            const x = event.clientX;
            const ratio = (x - rect.left) / rect.width;
            const clampedRatio = Math.max(0, Math.min(1, ratio));

            const minutesRange = this.MAX_MINUTES - this.MIN_MINUTES;
            let minutes = this.MIN_MINUTES + clampedRatio * minutesRange;

            // Snap to 30-minute increments
            const step = 30;
            minutes = Math.round(minutes / step) * step;

            if (activeThumb === this._thumbStartEl) {
                this.startMinutes = Math.min(minutes, this.endMinutes);
            } else if (activeThumb === this._thumbEndEl) {
                this.endMinutes = Math.max(minutes, this.startMinutes);
            }

            this.isActive = true;
            this.updateTimeInputsFromState();
            this.updateSliderUIFromState();
        };

        const onPointerUp = () => {
            if (!activeThumb) return;
            activeThumb = null;
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
        };

        const onPointerDown = (thumb, event) => {
            event.preventDefault();
            activeThumb = thumb;
            window.addEventListener("pointermove", onPointerMove);
            window.addEventListener("pointerup", onPointerUp);
        };

        this._thumbStartEl.addEventListener("pointerdown", (e) =>
            onPointerDown(this._thumbStartEl, e)
        );
        this._thumbEndEl.addEventListener("pointerdown", (e) =>
            onPointerDown(this._thumbEndEl, e)
        );

        return wrapper;
    }

    /**
     * Determine whether a given room passes this availability filter.
     *
     * @param {Object} room
     * @param {Array} room.events - List of events with startTime, endTime, and hardOccupancy.
     * @returns {boolean} true if room is available, false if blocked.
     */
    matches(room) {
        // if not active, pass all rooms
        if (!this.isActive) {
            return true;
        }

        // No date chosen -> no restriction
        if (!this.selectedDate) {
            return true;
        }

        const [yearStr, monthStr, dayStr] = this.selectedDate.split("-");
        const year = Number(yearStr);
        const monthIndex = Number(monthStr) - 1; // JS Date month is 0-based
        const day = Number(dayStr);

        if (
            !Number.isFinite(year) ||
            !Number.isFinite(monthIndex) ||
            !Number.isFinite(day)
        ) {
            // Bad date -> treat as no restriction
            return true;
        }

        // Build Date objects for selected interval in local time.
        const selStart = new Date(year, monthIndex, day, 0, 0, 0, 0);
        selStart.setHours(
            Math.floor(this.startMinutes / 60),
            this.startMinutes % 60,
            0,
            0
        );

        const selEnd = new Date(year, monthIndex, day, 0, 0, 0, 0);
        selEnd.setHours(
            Math.floor(this.endMinutes / 60),
            this.endMinutes % 60,
            0,
            0
        );

        for (const event of room.events) {
            // skip non-hard-occupancy events
            if (!event || event.hardOccupancy !== true) {
                continue;
            }

            const evStart = new Date(event.startTime);
            const evEnd = new Date(event.endTime);

            // Only consider events that start on the selected day.
            const sameDay =
                evStart.getFullYear() === year &&
                evStart.getMonth() === monthIndex &&
                evStart.getDate() === day;

            if (!sameDay) {
                continue;
            }

            // Check for interval overlap: [evStart, evEnd) vs [selStart, selEnd)
            const overlaps = evStart < selEnd && evEnd > selStart;

            if (overlaps) {
                // Blocked by a hard-occupancy event -> room unavailable.
                return false;
            }
        }

        // No blocking events found -> room is available.
        return true;
    }
}
