fetch('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=93pGEEPMzqYFAEUn3cg6mvaHS5XBAZPt&city=&localStartDateTime=')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

//   fetch('')

//   _embedded.events[_embedded 22].venues.postalCode.val()
// function fetchData('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=93pGEEPMzqYFAEUn3cg6mvaHS5XBAZPt&city input '){
//     const response = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=93pGEEPMzqYFAEUn3cg6mvaHS5XBAZPt&city=&localStartDateTime=');
//     const data = await response.json();

//     return data;
// }