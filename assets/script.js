var dateEl = $("#datepicker");
var cityEl = $("#city-input");
var searchBtn = $("#search-button");

$(function () {
  $("#datepicker").datepicker();
  console.log(dateEl);
});
//Search Button listn to click event
searchBtn.click(function () {
  //change date to the format match ticket master
  var date = moment(dateEl.val()).format("YYYY-MM-DD");
  var city = cityEl.val();
  console.log(date);
  console.log(city);

  //fetch data with city variable and date variable
  fetch(
    "https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=93pGEEPMzqYFAEUn3cg6mvaHS5XBAZPt&city=" +
      city +
      "&startDateTime=" +
      date +
      "T00:00:00Z"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
});
