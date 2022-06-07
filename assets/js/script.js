var savedTasks = {
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
    14: null,
    15: null,
    16: null,
    17: null
};

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

function updateDate() {
    var rightNow = moment();
    var midnight = moment().startOf('day').add(1, 'days');
    var msecToNextDay = Math.abs(rightNow.diff(midnight)) + 1;
    
    setTimeout(function () {
        setInterval(displayDate(), 1001 * 60 * 60 * 24)
    }, msecToNextDay);
};

function displayDate() {
    var date = moment().format("dddd, MMMM Do");
    $("#currentDay").text(`Today is ${date}.`);
};

$(".container").on("click", ".description", function () {
    var text = $(this).text().trim();
    var textInput = $("<textarea>").addClass("col-12 col-md-8 form-control").val(text);

    $(this).replaceWith(textInput);

    textInput.trigger("focus");
});

// TEMPORARY - NEEDS TO BE REVISED AFTER SAVING IS IMPLEMENTED
$(".container").on("blur", "textarea", function () {
    var text = $(this).val().trim();
    var paragraph = $("<p>").text(text);
    var div = $("<div>").addClass("col-12 col-md-8 description");

    div.append(paragraph);

    $(this).replaceWith(div);
});

$(".container").on("click", ".saveBtn i", function () {
    var rowId = $(this).closest(".row").attr("id");
    var descText = $(`#${rowId} .description p`).text();

    savedTasks[rowId] = descText;
    localStorage.setItem("workscheduler", JSON.stringify(savedTasks));
});

initializeTime();
displayDate();