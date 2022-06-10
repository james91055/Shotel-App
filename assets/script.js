console.log(date);

fetch('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&apikey=93pGEEPMzqYFAEUn3cg6mvaHS5XBAZPt&city=Oklahoma City&localStartDateTime=2022-10-07T14:00:00')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
  
  
fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=US', {
  headers: { 
    "Authorization": "Bearer N6Skfd21VaE0zmjYVT-rOZVHwzPzmZj4QHBmzZs27iK8Yctlg_UGniBPqkk5VBA5Tb45MsoTiTR2YxypBzuvbyQ-axQ_nU4V6Q8b07tcDK2iDaADLFpPjVejhG2iYnYx"
   location +
   term + 
   
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
  
