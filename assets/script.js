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
var eventPostalCode;
var eventName;
var listItem;

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
      eventsList.innerHTML = "";
      //Alan: adding empty strign so that each time a new search is made the last one is cleared.
      // eventsList.innerHTML = "";
      eventZip = data._embedded.events[0]._embedded.venues[0].postalCode;

      //Alan: ticket master loop to make each event display as a list item (li).
      // Also set attribute "eventName" to each list item in order to store it in local storage
      // Also added on event listenrs to each list item

      for (var i = 0; i < data._embedded.events.length; i++) {
        listItem = document.createElement("li");
        eventName = data._embedded.events[i].name;
        listItem.textContent = eventName;
        var eventPostalCode =
          data._embedded.events[i]._embedded.venues[0].postalCode;
        eventsList.appendChild(listItem);
        console.log("postal code for ", eventName, " is ", eventPostalCode);
        listItem.addEventListener("click", onEventClick);
      }
    });
});

//Alan: made this function so that once the list item is clicked the event name and postal code is added to local storage
function onEventClick(event) {
  var listItem = event.target;
  var listItems = document.querySelectorAll("li");
  listItems.forEach(function (li) {
    if (li.classList.contains("active-event")) {
      li.classList.remove("active-event");
    }
  });
  listItem.classList.add("active-event");
  console.log(listItem.textContent);
  var eventName = listItem.textContent;
  // var postalCode = localStorage.getItem(eventName);
  localStorage.setItem("event", eventName);
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

      yelpList.innerHTML = "";
      for (var i = 0; i < 9; i++) {
        var yelpListItem = document.createElement("li");
        var restaurantName = data.businesses[i].alias;
        yelpListItem.textContent = restaurantName;
        yelpList.appendChild(yelpListItem);
        console.log("yelp");
      }
    });
  console.log(restaurantType);
});

function showLocalStorage() {
  if ("event" != null) {
    listItem = document.createElement("li");
    var preview = localStorage.getItem("event");
    eventsList.appendChild(listItem);
    listItem.textContent = preview;
    console.log(preview);
  }
}
showLocalStorage();
