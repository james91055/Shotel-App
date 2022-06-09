console.log(date);

fetch('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=93pGEEPMzqYFAEUn3cg6mvaHS5XBAZPt&city=Oklahoma City&localStartDateTime=2022-10-07T14:00:00')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
  
  
  fetch('https://api.yelp.com/v3/businesses/search', {
    headers: {
    Authorization: "Bearer <>"
    }
    })
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });


 var date = $("#datepicker").val();
  $(function () {
    $("#datepicker").datepicker();
    console.log(date);
  });
  
