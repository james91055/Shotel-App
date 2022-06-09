console.log(date);

fetch('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=93pGEEPMzqYFAEUn3cg6mvaHS5XBAZPt&city=&localStartDateTime=')
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
  
 