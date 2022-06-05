function displayDate() {
    var date = moment().format("dddd, MMMM Do");
    $("#currentDay").text(`Today is ${date}.`);
};

displayDate();