var buildingName = localStorage.getItem('buildingName');
var roomNumber = Number(localStorage.getItem('roomNumber'));

//buildingName = "Isbister Building";
//roomNumber = 207;

const currentRoom = ROOMS.find(room =>
    room.buildingName === buildingName &&
    room.roomNumber === roomNumber
);


const scheduleData = [
    { time: 9, status: "Available" },
    { time: 10, status: "Class" },
    { time: 11, status: "Available" },
    { time: 12, status: "Available" },
    { time: 1, status: "Available" },
    { time: 2, status: "Potluck" },
    { time: 3, status: "Potluck" },
    { time: 4, status: "Available" },
    { time: 5, status: "Available" },
    { time: 6, status: "Available" },
    { time: 7, status: "Available" },
];

const schedule = document.getElementById("schedule");

scheduleData.forEach(({ time, status }) => {

    const timeBlock = document.createElement("div");

    timeBlock.className = "time";
    timeBlock.textContent = time;

    const availBlock = document.createElement("div");

    if (status === "Available") {
        availBlock.className = "block " + "available";
    }
    else {
        availBlock.className = "block " + "event";
    }
    availBlock.textContent = status;

    schedule.append(timeBlock, availBlock);

});

document.getElementById("roomTitle").textContent = currentRoom.buildingName + " " + currentRoom.roomNumber;

document.getElementById("description").textContent = currentRoom.roomDescription;

document.getElementById("building").textContent = currentRoom.buildingName;

document.getElementById("room").textContent = currentRoom.roomNumber;

const amenities = currentRoom.amenities;

const amenitiesList = document.getElementById("amenities");

amenities.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    amenitiesList.appendChild(li);
});


const backButton = document.getElementById("backButton");

backButton.addEventListener("click", function () {
    window.location.href = "../index.html";
})
