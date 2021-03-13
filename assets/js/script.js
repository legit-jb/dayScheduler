// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar

// The consts are the parameters of the schedule. this allows the hours to be easily changed if needed NOTE hour fot the constatnts are in 24 hour format to ease the math

const startSched = 9;
const endSched = 17;
const numHours = endSched - startSched;

// elements
var currentDate = document.getElementById("currentDate");
var currentTime = document.getElementById("currentTime");
var timeRows = [];
var lastCheckedHour = moment().format("k");

// gets each time-row element do we can change it
for (i = 0; i <= numHours; i++) {
    timeRows[i] = document.getElementById(i);
}

// showCurrentDay function uses moment.js to pull the current date and dispaly in the #currentDate and #currentTime elements showing the live date and time in the sub nav bar
function showCurrentDay() {

    var getCurrentDay = function () {
        currentDate.innerHTML = moment().format("dddd, MMMM do YYYY");
        currentTime.innerHTML = moment().format("LT");

        // checks the current hour and determines if it needs to be updated. This is so it only checks every second rather updating the current hour every second
        if (lastCheckedHour != moment().format("k")) {
            lastCheckedHour = moment().format("k");
            changeHours();
        }
    }

    getCurrentDay();
    setInterval(getCurrentDay, 1000);

}
// end showCurrentDay function

function getCurrentHour() {

}

function changeHours() {
    // change the colors before current hour
    var i = 0;
    for (i; i < lastCheckedHour - startSched; i++) {
        document.getElementById(i).classList.remove = ("afterHour", "currentHour");
        document.getElementById(i).classList.add("beforeHour");
    }
    // if checks if the current is within the scheduled hours and updates the colors if it is
    if (lastCheckedHour >= startSched && lastCheckedHour <= endSched) {


        // change the current hour
        console.log(i);
        document.getElementById(i).classList.remove("beforeHour", "afterHour");
        document.getElementById(i).classList.add("currentHour");
        i++;

        // change the color of the hours after current hour
        for (i; i < numHours; i++) {
            document.getElementById(i).classList.remove("beforeHour", "currentHour");
            document.getElementById(i).classList.add("afterHour");
        }
    }

}
// document.getElementById("span_trav_emer_med_insur").style.backgroundColor




// init function launches the following functions on page load showCurrentDay and 
function init() {
    showCurrentDay();
    changeHours();
}
init();
// WHEN I scroll down
// THEN I am presented with timeblocks for standard business hours
// WHEN I view the timeblocks for that day
// THEN each timeblock is color coded to indicate whether it is in the past, present, or future
// WHEN I click into a timeblock
// THEN I can enter an event
// WHEN I click the save button for that timeblock
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persists