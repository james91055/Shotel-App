var dateEl = $("#datepicker");
var dateEndEl = $("#datepicker-end");
var cityEl = $("#city-input");
var searchBtn = $("#search-button");

var eventsList = document.querySelector(".event-list");
var yelpList = document.querySelector(".yelp-list");
var eventZip;
var li;
var typeDropdownEl = $("#restaurant-dropdown");
var restaurantSearchBtn = $("#restaurant-search-button");


$(function () {
  $("#datepicker").datepicker();
  $("#datepicker-end").datepicker();
});
$(function () {
  $("#restaurant-dropdown").selectmenu();
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
      //Alan: adding empty strign so that each time a new search is made the last one is cleared. 
      eventsList.innerHTML = "";
      console.log(data._embedded.events[0]._embedded.venues[0].postalCode);
      eventZip = data._embedded.events[0]._embedded.venues[0].postalCode;
      console.log(eventZip);
      console.log(data._embedded.events[0].dates.start.dateTime);
      console.log(data._embedded.events[0].dates.start.localDate);

      //Alan: ticket master loop to make each event display as a list item (li). 
      // Also set attribute "eventName" to each list item in order to store it in local storage
      // Also added on event listenrs to each list item 

      for (var i = 0; i < data._embedded.events.length; i++) {
        var listItem = document.createElement("li");
        var eventName = data._embedded.events[i].name;
        listItem.textContent = eventName;
        var eventPostalCode = data._embedded.events[i]._embedded.venues[0].postalCode;
        listItem.setAttribute("eventName", eventName);
        localStorage.setItem(eventName, eventPostalCode);
        eventsList.appendChild(listItem);
        listItem.addEventListener("click", onEventClick);
      }
    });
});

//Alan: made this function so that once the list item is clicked the event name and postal code is added to local storage
function onEventClick(event) {
  var listItem = event.target;
  var eventName = listItem.getAttribute("eventName");
  var postalCode = localStorage.getItem(eventName);
  console.log("postal code for ", eventName, " is ", postalCode);
}


//yelp api

restaurantSearchBtn.click(function () {
  var restaurantType = typeDropdownEl.val().toLowerCase();

  fetch(
    "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" +
      eventZip +
      "&size=9&categories=" +
      restaurantType,
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

      for (var i = 0; i < 9; i++) {
        var yelpListItem = document.createElement("li");
        var restaurantName = data.businesses[i].alias;
        yelpListItem.textContent = restaurantName;
        yelpList.appendChild(yelpListItem);
      }

    });
  console.log(restaurantType);
});

