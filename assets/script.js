var dateEl = $("#datepicker");
var dateEndEl = $("#datepicker-end");
var cityEl = $("#city-input");
var searchBtn = $("#search-button");
var eventsList = document.querySelector('ul');
// var termEl = 


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

  //Ticketmaster api
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
      for (var i = 0; i < data.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = data[i].events;
        eventsList.appendChild(listItem);
      }
    });
});

//yelp api
var location = cityEl.val();
// var term = 

fetch(
  "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + 
  location,
  {
    headers: {
      Authorization:
        "Bearer N6Skfd21VaE0zmjYVT-rOZVHwzPzmZj4QHBmzZs27iK8Yctlg_UGniBPqkk5VBA5Tb45MsoTiTR2YxypBzuvbyQ-axQ_nU4V6Q8b07tcDK2iDaADLFpPjVejhG2iYnYx",
    },
  }
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
