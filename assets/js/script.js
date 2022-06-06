var hour;
var timeBlocks = $(".time-block");

function initializeTime() {
    // set hour to current hour, with no additional minutes etc.
    hour = moment().startOf('hour');
    
    // create moment object representing when the code is run
    var rightNow = moment();
    // create moment representing next hour
    var nextHour = moment().startOf('hour').add(1, 'hours');
    // calculate time between those two points
    // Math.abs because in this order the number will be negative
    var msecToNextHour = Math.abs(rightNow.diff(nextHour));

    setTimeout(function () {
        // update hour again - this is necessary to properly initialize things
        hour = moment().hour()
        // call the function that handles hourly updates
        updateHourly();
    }, msecToNextHour);
};

function displayDate() {
    var date = moment().format("dddd, MMMM Do");
    $("#currentDay").text(`Today is ${date}.`);
};

function updateHourly() {
    setInterval(function () {
        timeBlocks.each(function (index) {
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
    }, 1000 * 60 * 60);
};

initializeTime();
displayDate();