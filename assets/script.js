var date = $("#datepicker").val();
$(function () {
  $("#datepicker").datepicker();
  console.log(date);
});

console.log(date);
fetch('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=93pGEEPMzqYFAEUn3cg6mvaHS5XBAZPt&city=OklahomaCity&localStartDateTime=2022-10-07T14:00:00')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
