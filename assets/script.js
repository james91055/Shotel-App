var dateEl = $("#datepicker");
var dateEndEl = $("#datepicker-end");
var cityEl = $("#city-input");
var searchBtn = $("#search-button");

$(function () {
  $("#datepicker").datepicker();
  $("#datepicker-end").datepicker();
});
//Search Button listn to click event
searchBtn.click(function () {
  //change date to the format match ticket master
  var startDate = moment(dateEl.val()).format("YYYY-MM-DD");
  var endDate = moment(dateEndEl.val()).format("YYYY-MM-DD");

  var city = cityEl.val();
  console.log(startDate);
  console.log(city);

  //fetch data with city variable and date variable
  fetch(
    "https://app.ticketmaster.com/discovery/v2/events.json?size=6&apikey=93pGEEPMzqYFAEUn3cg6mvaHS5XBAZPt&city=" +
      city +
      "&startDateTime=" +
      startDate +
      "T00:00:00Z" +
      "&endDateTime=" +
      endDate +
      "T00:00:00Z"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data._embedded.events[0].name);
      console.log(data._embedded.events[0]._embedded.venues[0].postalCode);
      console.log(data._embedded.events[0].dates.start.localDate);
    });
});
