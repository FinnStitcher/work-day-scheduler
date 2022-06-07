var savedTasks = {
    9: "Free space",
    10: "Free space",
    11: "Free space",
    12: "Free space",
    13: "Free space",
    14: "Free space",
    15: "Free space",
    16: "Free space",
    17: "Free space"
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

function loadSchedule() {
    // retrieve and reformat data
    var tasksFromStorage = localStorage.getItem("workscheduler");
    // this only runs if there IS saved data, because otherwise, we want the dummy text to print
    if (tasksFromStorage) {
        savedTasks = JSON.parse(tasksFromStorage);
    };

    timeBlocks.each(function (index) {
        var rowId = $(this).attr("id");
        // get the description paragraph in this time block
        var paragraphEl = $("#" + rowId).find(".description p");
        // make a new paragraph
        var newParagraphEl = $("<p>").text(savedTasks[rowId]);
        // replace the original paragraph with it
        paragraphEl.replaceWith(newParagraphEl);
    });
};

$(".container").on("click", ".description", function () {
    var text = $(this).text().trim();
    var textInput = $("<textarea>").addClass("col-12 col-md-8 form-control").val(text);

    $(this).replaceWith(textInput);

    textInput.trigger("focus");
});

// TEMPORARY - NEEDS TO BE REVISED AFTER SAVING AND LOADING ARE IMPLEMENTED
// $(".container").on("blur", "textarea", function () {
//     var text = $(this).val().trim();
//     var paragraph = $("<p>").text(text);
//     var div = $("<div>").addClass("col-12 col-md-8 description");

//     div.append(paragraph);

//     $(this).replaceWith(div);
// });

$(".container").on("click", ".saveBtn i", function () {
    var rowId = $(this).closest(".row").attr("id");
    var textArea = $("#" + rowId).find("textarea");
    var textToSave;

    // check if there is, in fact, a textarea
    if (textArea.length !== 0) {
        // get the text
        textToSave = textArea.val();
    } else {
        // there isn't a textarea, so there must be a .description
        // get the text 
        textToSave = $("#" + rowId).find(".description p").text();
    };

    savedTasks[rowId] = textToSave;
    localStorage.setItem("workscheduler", JSON.stringify(savedTasks));
});

loadSchedule();
initializeTime();
displayDate();