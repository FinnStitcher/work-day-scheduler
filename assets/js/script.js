var hour = moment().startOf('hour');
var timeBlocks = $(".time-block");

function initializeTime() {
    // create moment object representing when the code is run
    var rightNow = moment();
    // create moment representing next hour
    var nextHour = moment().startOf('hour').add(1, 'hours');
    // calculate time between those two points
    // Math.abs because in this order the number will be negative
    var msecToNextHour = Math.abs(rightNow.diff(nextHour));

    // run setTimeStyles once to make sure things look correct on loading
    setTimeStyles();

    setTimeout(function () {
        // when this timeout ends, the interval will begin to call setTimeStyles() every hour
        setInterval(setTimeStyles(), 1000 * 60 * 60);
    }, msecToNextHour);
};

function setTimeStyles() {
    timeBlocks.each(function () {
        var currentId = parseInt($(this).attr("id"));
        // hour is currently a moment object
        // hour.hour() grabs only the, yknow, hour part of it
        var currentHour = hour.hour();

        if (currentId < currentHour) {
            $(this).addClass("past");
        } else if (currentId === currentHour) {
            $(this).addClass("present");
        } else if (currentId > currentHour) {
            $(this).addClass("future");
        };
    });    
};

function displayDate() {
    var date = moment().format("dddd, MMMM Do");
    $("#currentDay").text(`Today is ${date}.`);
};

initializeTime();
displayDate();