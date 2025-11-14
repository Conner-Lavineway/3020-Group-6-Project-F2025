/**
Template And Standardization for our Data 

ROOM Object:
{
    buildingName: String,
    roomNumber: int,
    roomImage: String (URI),
    roomDescription: String, // Incase we feel like we need a blurb about the room
    amenities: [String],    // just a list of words,
    events: [ EVENT ]        // EVENTS must be formatted as described below
    occupancy: [int]         // Array of integers representing each hour slot in the day 6am to 12pm (18 slots) : integer represents number of people in the room that hour
}

EVENT Object:
{
    title: String,
    id: String,        // for searching later maybe doesn't hurt
    tags: [String],    // optional incase want to do something fancy later
    startTime: DateTime, // date times look like standard ISO 8601 strings "2024-06-01T14:30:00"
    endTime: DateTime
    hardOccupancy: boolean // true if during this event the room is unavailable
    publicity: String //describes if event is public, private, exclusive etc. we'll decide the keywords later
}
*/

// NOTE: For this mock data, we assume everything happens on 2025-11-13,
// with time slots of 1 hour each. Times:
//   9,10,11,12  => 09:00–13:00
//   1,2,3,4,5,6 => 13:00–19:00

const ROOMS = [
  {
    buildingName: "EITC",
    roomNumber: 105,
    roomImage: "",
    roomDescription: "This is a prototype description for room EITC 105.",
    amenities: ["Projector/TV", "Whiteboard", "Food Allowed"],
    events: [
      {
        title: "Lecture",
        id: "eitc-105-1-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T11:00:00",
        endTime: "2025-11-13T14:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "Chess Club",
        id: "eitc-105-2-chess-club",
        tags: ["club", "chess"],
        startTime: "2025-11-13T17:00:00",
        endTime: "2025-11-13T19:00:00",
        hardOccupancy: false,
        publicity: "club-members",
      },
    ],
    occupancy: [0, 0, 2, 4, 6, 24, 28, 26, 5, 4, 6, 16, 14, 3, 1, 0, 0, 0],
  },
  {
    buildingName: "EITC",
    roomNumber: 215,
    roomImage: "",
    roomDescription: "This is a prototype description for room EITC 215.",
    amenities: ["Projector/TV", "Food Allowed"],
    events: [
      {
        title: "Lecture",
        id: "eitc-215-1-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T09:00:00",
        endTime: "2025-11-13T11:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "Lecture",
        id: "eitc-215-2-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T12:00:00",
        endTime: "2025-11-13T14:00:00",
        hardOccupancy: true,
        publicity: "public-lecture",
      },
    ],
    occupancy: [0, 0, 1, 22, 24, 5, 20, 18, 6, 4, 3, 2, 1, 0, 0, 0, 0, 0],
  },
  {
    buildingName: "EITC",
    roomNumber: 220,
    roomImage: "",
    roomDescription: "This is a prototype description for room EITC 220.",
    amenities: ["Projector/TV", "Whiteboard", "Ritual Circle"],
    events: [
      {
        title: "Lecture",
        id: "eitc-220-1-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T09:00:00",
        endTime: "2025-11-13T13:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "Lecture",
        id: "eitc-220-2-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T15:00:00",
        endTime: "2025-11-13T17:00:00",
        hardOccupancy: true,
        publicity: "seminar",
      },
      {
        title: "D&D",
        id: "eitc-220-3-dnd",
        tags: ["dnd", "games"],
        startTime: "2025-11-13T17:00:00",
        endTime: "2025-11-13T19:00:00",
        hardOccupancy: false,
        publicity: "club-members",
      },
    ],
    occupancy: [0, 0, 2, 30, 32, 28, 25, 10, 8, 22, 24, 18, 16, 4, 2, 1, 0, 0],
  },
  {
    buildingName: "EITC",
    roomNumber: 320,
    roomImage: "",
    roomDescription: "This is a prototype description for room EITC 320.",
    amenities: ["Whiteboard", "Moveable Tables", "Food Allowed"],
    events: [
      {
        title: "Lecture",
        id: "eitc-320-1-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T09:00:00",
        endTime: "2025-11-13T14:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "Meeting",
        id: "eitc-320-2-meeting",
        tags: ["meeting"],
        startTime: "2025-11-13T14:00:00",
        endTime: "2025-11-13T15:00:00",
        hardOccupancy: false,
        publicity: "invite-only",
      },
      {
        title: "Study Group",
        id: "eitc-320-3-study-group",
        tags: ["study-group"],
        startTime: "2025-11-13T17:00:00",
        endTime: "2025-11-13T18:00:00",
        hardOccupancy: false,
        publicity: "open-study",
      },
    ],
    occupancy: [0, 0, 3, 26, 28, 30, 27, 24, 15, 8, 7, 14, 6, 2, 1, 0, 0, 0],
  },
  {
    buildingName: "Drake Centre",
    roomNumber: 104,
    roomImage: "",
    roomDescription:
      "This is a prototype description for room Drake Centre 104.",
    amenities: ["Projector/TV"],
    events: [
      {
        title: "Lecture",
        id: "drake-centre-104-1-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T11:00:00",
        endTime: "2025-11-13T13:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "Dragon Taming",
        id: "drake-centre-104-2-dragon-taming",
        tags: ["event"],
        startTime: "2025-11-13T15:00:00",
        endTime: "2025-11-13T16:00:00",
        hardOccupancy: true,
        publicity: "public",
      },
      {
        title: "Pillow Fort Competition",
        id: "drake-centre-104-3-pillow-fort-competition",
        tags: ["event"],
        startTime: "2025-11-13T18:00:00",
        endTime: "2025-11-13T19:00:00",
        hardOccupancy: true,
        publicity: "public-competition",
      },
    ],
    occupancy: [0, 0, 1, 3, 5, 20, 22, 6, 5, 16, 7, 5, 18, 4, 1, 0, 0, 0],
  },
  {
    buildingName: "Drake Centre",
    roomNumber: 112,
    roomImage: "",
    roomDescription:
      "This is a prototype description for room Drake Centre 112.",
    amenities: [
      "Projector/TV",
      "Whiteboard",
      "Moveable Tables",
      "Food Allowed",
      "Ritual Circle",
    ],
    events: [
      {
        title: "Lecture",
        id: "drake-centre-112-1-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T09:00:00",
        endTime: "2025-11-13T13:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "Board Games",
        id: "drake-centre-112-2-board-games",
        tags: ["games", "board-games"],
        startTime: "2025-11-13T15:00:00",
        endTime: "2025-11-13T18:00:00",
        hardOccupancy: false,
        publicity: "public-drop-in",
      },
    ],
    occupancy: [0, 0, 2, 28, 30, 26, 24, 9, 8, 18, 20, 19, 7, 3, 1, 0, 0, 0],
  },
  {
    buildingName: "Drake Centre",
    roomNumber: 128,
    roomImage: "",
    roomDescription:
      "This is a prototype description for room Drake Centre 128.",
    amenities: ["Projector/TV", "Whiteboard", "Food Allowed"],
    events: [
      {
        title: "Lecture",
        id: "drake-centre-128-1-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T09:00:00",
        endTime: "2025-11-13T11:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "Study Group",
        id: "drake-centre-128-2-study-group",
        tags: ["study-group"],
        startTime: "2025-11-13T11:00:00",
        endTime: "2025-11-13T14:00:00",
        hardOccupancy: false,
        publicity: "open-study",
      },
      {
        title: "Lecture",
        id: "drake-centre-128-3-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T14:00:00",
        endTime: "2025-11-13T17:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
    ],
    occupancy: [0, 0, 2, 24, 26, 18, 20, 19, 22, 24, 23, 10, 4, 1, 0, 0, 0, 0],
  },
  {
    buildingName: "Drake Centre",
    roomNumber: 310,
    roomImage: "",
    roomDescription:
      "This is a prototype description for room Drake Centre 310.",
    amenities: ["Whiteboard", "Food Allowed"],
    events: [
      {
        title: "Lecture",
        id: "drake-centre-310-1-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T09:00:00",
        endTime: "2025-11-13T17:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
    ],
    occupancy: [0, 0, 3, 30, 32, 34, 33, 31, 29, 28, 26, 12, 6, 2, 1, 0, 0, 0],
  },
  {
    buildingName: "Isbister Building",
    roomNumber: 103,
    roomImage: "",
    roomDescription:
      "This is a prototype description for room Isbister Building 103.",
    amenities: ["Whiteboard", "Moveable Tables", "Food Allowed"],
    events: [
      {
        title: "Meeting",
        id: "isbister-building-103-1-meeting",
        tags: ["meeting"],
        startTime: "2025-11-13T09:00:00",
        endTime: "2025-11-13T10:00:00",
        hardOccupancy: true,
        publicity: "invite-only",
      },
      {
        title: "Nap Time",
        id: "isbister-building-103-2-nap-time",
        tags: ["relax"],
        startTime: "2025-11-13T15:00:00",
        endTime: "2025-11-13T17:00:00",
        hardOccupancy: false,
        publicity: "quiet-space",
      },
    ],
    occupancy: [0, 0, 1, 10, 4, 3, 2, 2, 3, 8, 8, 3, 1, 0, 0, 0, 0, 0],
  },
  {
    buildingName: "Isbister Building",
    roomNumber: 107,
    roomImage: "",
    roomDescription:
      "This is a prototype description for room Isbister Building 107.",
    amenities: ["Whiteboard", "Moveable Tables"],
    events: [
      {
        title: "Study Group",
        id: "isbister-building-107-1-study-group",
        tags: ["study-group"],
        startTime: "2025-11-13T09:00:00",
        endTime: "2025-11-13T10:00:00",
        hardOccupancy: false,
        publicity: "open-study",
      },
      {
        title: "Lecture",
        id: "isbister-building-107-2-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T12:00:00",
        endTime: "2025-11-13T13:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "Lecture",
        id: "isbister-building-107-3-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T15:00:00",
        endTime: "2025-11-13T17:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "Bowling",
        id: "isbister-building-107-4-bowling",
        tags: ["competition"],
        startTime: "2025-11-13T17:00:00",
        endTime: "2025-11-13T19:00:00",
        hardOccupancy: true,
        publicity: "public-competition",
      },
    ],
    occupancy: [0, 0, 1, 12, 3, 3, 18, 5, 6, 20, 21, 14, 15, 4, 1, 0, 0, 0],
  },
  {
    buildingName: "Isbister Building",
    roomNumber: 207,
    roomImage: "",
    roomDescription:
      "This is a prototype description for room Isbister Building 207.",
    amenities: ["Projector/TV", "Moveable Tables", "Food Allowed"],
    events: [
      {
        title: "Lecture",
        id: "isbister-building-207-1-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T09:00:00",
        endTime: "2025-11-13T10:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "Lecture",
        id: "isbister-building-207-2-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T11:00:00",
        endTime: "2025-11-13T13:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "Dance Party",
        id: "isbister-building-207-3-dance-party",
        tags: ["party"],
        startTime: "2025-11-13T14:00:00",
        endTime: "2025-11-13T15:00:00",
        hardOccupancy: true,
        publicity: "public",
      },
      {
        title: "Lecture",
        id: "isbister-building-207-4-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T16:00:00",
        endTime: "2025-11-13T17:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "Fingerboarding Finals",
        id: "isbister-building-207-5-fingerboarding-finals",
        tags: ["competition", "sports"],
        startTime: "2025-11-13T18:00:00",
        endTime: "2025-11-13T19:00:00",
        hardOccupancy: true,
        publicity: "exclusive-tournament",
      },
    ],
    occupancy: [0, 0, 1, 20, 5, 22, 23, 8, 16, 7, 19, 8, 17, 4, 1, 0, 0, 0],
  },
  {
    buildingName: "Isbister Building",
    roomNumber: 307,
    roomImage: "",
    roomDescription:
      "This is a prototype description for room Isbister Building 307.",
    amenities: ["Whiteboard", "Food Allowed", "Ritual Circle"],
    events: [
      {
        title: "Meeting",
        id: "isbister-building-307-1-meeting",
        tags: ["meeting"],
        startTime: "2025-11-13T10:00:00",
        endTime: "2025-11-13T11:00:00",
        hardOccupancy: false,
        publicity: "invite-only",
      },
      {
        title: "Lecture",
        id: "isbister-building-307-2-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T13:00:00",
        endTime: "2025-11-13T16:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "LAN Party",
        id: "isbister-building-307-3-lan-party",
        tags: ["party", "gaming"],
        startTime: "2025-11-13T17:00:00",
        endTime: "2025-11-13T18:00:00",
        hardOccupancy: true,
        publicity: "club-event",
      },
    ],
    occupancy: [0, 0, 1, 4, 14, 5, 4, 20, 22, 21, 7, 16, 6, 3, 1, 0, 0, 0],
  },
  {
    buildingName: "University College",
    roomNumber: 302,
    roomImage: "",
    roomDescription:
      "This is a prototype description for room University College 302.",
    amenities: [
      "Projector/TV",
      "Whiteboard",
      "Moveable Tables",
      "Food Allowed",
    ],
    events: [
      {
        title: "Lecture",
        id: "university-college-302-1-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T09:00:00",
        endTime: "2025-11-13T11:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "Lecture",
        id: "university-college-302-2-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T13:00:00",
        endTime: "2025-11-13T15:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "Lecture",
        id: "university-college-302-3-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T17:00:00",
        endTime: "2025-11-13T19:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
    ],
    occupancy: [0, 0, 1, 22, 24, 5, 5, 20, 19, 7, 6, 18, 17, 4, 1, 0, 0, 0],
  },
  {
    buildingName: "University College",
    roomNumber: 305,
    roomImage: "",
    roomDescription:
      "This is a prototype description for room University College 305.",
    amenities: ["Whiteboard", "Moveable Tables", "Food Allowed"],
    events: [
      {
        title: "Lecture",
        id: "university-college-305-1-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T10:00:00",
        endTime: "2025-11-13T13:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "Potluck",
        id: "university-college-305-2-potluck",
        tags: ["social", "food"],
        startTime: "2025-11-13T15:00:00",
        endTime: "2025-11-13T16:00:00",
        hardOccupancy: false,
        publicity: "residents-only",
      },
    ],
    occupancy: [0, 0, 1, 4, 21, 23, 20, 6, 7, 16, 8, 5, 3, 1, 0, 0, 0, 0],
  },
  {
    buildingName: "University College",
    roomNumber: 306,
    roomImage: "",
    roomDescription:
      "This is a prototype description for room University College 306.",
    amenities: ["Whiteboard", "Food Allowed"],
    events: [
      {
        title: "Lecture",
        id: "university-college-306-1-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T09:00:00",
        endTime: "2025-11-13T11:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "D&D",
        id: "university-college-306-2-dnd",
        tags: ["dnd", "games"],
        startTime: "2025-11-13T14:00:00",
        endTime: "2025-11-13T17:00:00",
        hardOccupancy: false,
        publicity: "club-members",
      },
    ],
    occupancy: [0, 0, 1, 18, 20, 5, 4, 5, 17, 19, 18, 6, 3, 1, 0, 0, 0, 0],
  },
  {
    buildingName: "University College",
    roomNumber: 310,
    roomImage: "",
    roomDescription:
      "This is a prototype description for room University College 310.",
    amenities: ["Ritual Circle"],
    events: [
      {
        title: "Lecture",
        id: "university-college-310-1-lecture",
        tags: ["lecture"],
        startTime: "2025-11-13T10:00:00",
        endTime: "2025-11-13T11:00:00",
        hardOccupancy: true,
        publicity: "course-only",
      },
      {
        title: "Arts and Crafts",
        id: "university-college-310-2-arts-and-crafts",
        tags: ["creative"],
        startTime: "2025-11-13T13:00:00",
        endTime: "2025-11-13T14:00:00",
        hardOccupancy: false,
        publicity: "public",
      },
      {
        title: "Seance",
        id: "university-college-310-3-seance",
        tags: ["event", "spooky"],
        startTime: "2025-11-13T17:00:00",
        endTime: "2025-11-13T18:00:00",
        hardOccupancy: true,
        publicity: "exclusive",
      },
      {
        title: "Exorcism",
        id: "university-college-310-4-exorcism",
        tags: ["event", "spooky"],
        startTime: "2025-11-13T18:00:00",
        endTime: "2025-11-13T19:00:00",
        hardOccupancy: true,
        publicity: "exclusive",
      },
    ],
    occupancy: [0, 0, 1, 3, 16, 4, 3, 12, 4, 3, 4, 14, 15, 5, 2, 0, 0, 0],
  },
];

/**
 * Return all events whose START TIME falls on the same calendar date
 * as the given `date` (using local time).
 *
 * @param {Date} date - The day we care about (e.g. `new Date()` for today).
 * @param {Array} rooms - Room data, each with an `events` array.
 *                        Defaults to global ROOMS.
 */
function extractEvents(date = new Date(), rooms = ROOMS) {
  const extractedEvents = [];
  for (const room of rooms) {
    const eventList = room.events;
    for (const event of eventList) {
      const startTime = new Date(event.startTime);

      // check year, month, day
      const sameDay =
        startTime.getFullYear() === date.getFullYear() &&
        startTime.getMonth() === date.getMonth() &&
        startTime.getDate() === date.getDate();

      if (sameDay) {
        extractedEvents.push(event);
      }
    }
  }

  return extractedEvents;
}

/**
 * Return all possible amenities across all rooms.
 *
 *
 * @param {Array} rooms - Room data, each with an `amenities` array.
 **/
function extractamenities(rooms = ROOMS) {
  const amenitiesSet = new Set();
  for (const room of rooms) {
    for (const amenity of room.amenities) {
      amenitiesSet.add(amenity);
    }
  }
  return Array.from(amenitiesSet);
}

/**
 * Return all possible buildingNames across all rooms.
 *
 *
 * @param {Array} rooms - Room data, each with an `amenities` array.
 **/
function extractbuildingNames(rooms = ROOMS) {
  const buildingsSet = new Set();
  for (const room of rooms) {
    buildingsSet.add(room.buildingName);
  }

  return Array.from(buildingsSet);
}

// Give easy access to useful data
const date = new Date("2025-11-13T12:00:00");
const EVENTS = extractEvents(date);
const AMENITIES = extractamenities();
const BUILDINGS = extractbuildingNames();
