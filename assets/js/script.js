var hour = 0;

function initializeTime() {
    // set hour to current hour
    hour = moment().hour();
    console.log(hour);

    // calculate how long until the next hour
    var minutesToNextHour = 60 - moment().minute();

    setTimeout(function () {
        // update hour again - this is necessary to properly initialize things
        hour = moment().hour()
        console.log(hour);
        // call the function that handles hourly updates
        updateHourly();
    }, 1000 * 60 * minutesToNextHour);
};

function displayDate() {
    var date = moment().format("dddd, MMMM Do");
    $("#currentDay").text(`Today is ${date}.`);
};

function updateHourly() {
    setInterval(function () {
        console.log("This is working!");
    }, 5000);
};

initializeTime();
displayDate();