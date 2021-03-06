// The consts are the parameters of the schedule. this allows the hours to be easily changed if needed NOTE hour fot the constatnts are in 24 hour format to ease the math
const startSched = 9;
const endSched = 17;
const numHours = endSched - startSched;

// elements
var currentDate = document.getElementById("currentDate");
var currentTime = document.getElementById("currentTime");
var timeRows = [];
var textRows = [];
var loadDate = moment();
var lastCheckedHour = loadDate.format("k");
var todayDate = loadDate.format("dddd LL");
currentDate.innerHTML = loadDate.format("dddd LL");

// gets each time-row element do we can change it
for (i = 0; i <= numHours; i++) {
    timeRows[i] = document.getElementById(i);

}

// loads local storage to page on load or refresh
function loadStorage() {
    for (i = 0; i <= numHours; i++) {
        timeRows[i].children[1].value = localStorage.getItem("hourStorage" + i);
    }
}
// showCurrentDay function uses moment.js to pull the current date and dispaly in the #currentDate and #currentTime elements showing the live date and time in the sub nav bar
function showCurrentDay() {

    var getCurrentDay = function () {
        // currentDate.innerHTML = moment().format("dddd, MMMM do YYYY");
        currentTime.innerHTML = moment().format("LT");

        // checks the current hour and determines if it needs to be updated. This is so it only checks every second rather updating the current hour every second
        if (lastCheckedHour != moment().format("k")) {
            lastCheckedHour = moment().format("k");

            changeHours();
        }

        if (todayDate != moment().format("dddd LL")) {
            todayDate = moment().format("dddd LL");
        }

        // for loop to automatically save items may be used later

        // for (i = 0; i <= numHours; i++) {
        //     if (timeRows[i].children[1].value != localStorage.getItem("hourStorage" + i)) {
        //         localStorage.setItem("hourStorage" + i, timeRows[i].children[1].value);
        //     }
        // }

    }
    // end getCuttentDay function


    getCurrentDay();
    setInterval(getCurrentDay, 1000);
}
// end showCurrentDay function

// changeHours changes the color of each time row depending on wether that row is before after or during the current hour
function changeHours() {
    // change the colors before current hour
    var i = 0;
    if (lastCheckedHour >= startSched && lastCheckedHour <= endSched) {
        for (i; i < lastCheckedHour - startSched; i++) {
            timeRows[i].children[1].removeAttribute("id");
            timeRows[i].classList.remove("beforeHour", "currentHour");
            timeRows[i].classList.add("afterHour");
        }

        // change the current hour
        timeRows[i].classList.remove("beforeHour", "afterHour");
        timeRows[i].children[1].id = "currentHour";
        i++;

        // change the color of the hours after current hour
        for (i; i <= numHours; i++) {
            timeRows[i].classList.remove("afterHour", "currentHour");
            timeRows[i].classList.add("beforeHour");
        }
    }
    // end change colors if
    else {
        if (lastCheckedHour < startSched) {
            for (j = 0; j <= numHours; j++) {
                timeRows[j].children[1].removeAttribute("id");
                timeRows[j].classList.remove("afterHour", "currentHour");
                timeRows[j].classList.add("beforeHour");
            }
        } else {
            for (k = 0; k <= numHours; k++) {
                timeRows[k].children[1].removeAttribute("id");
                timeRows[k].classList.remove("beforeHour", "currentHour");
                timeRows[k].classList.add("afterHour");
            }
        }
    }
    // end else 
}
// end changeHours function

// event listener for buttons
var container = document.getElementById("rowWrapper");
container.addEventListener('click', (event) => {
    console.log(event.target.tagName == "BUTTON")
    if (event.target.tagName == "BUTTON") {
        localStorage.setItem("hourStorage" + event.target.parentElement.id, event.target.parentElement.children[1].value);
    }

})
// end listener

// init function launches the following functions on page load showCurrentDay and 
function init() {
    showCurrentDay();
    changeHours();
    loadStorage();
}
init();