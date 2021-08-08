let cityData=[];
var lat ;
var lon ;

function cityInfo(cityName = "Dixon") {
    let endPoint = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&&appid=b1034edd48bb8721bfd5c43b5819c1c1"
    fetch(endPoint)
        .then(function (response) {
            //console.log(response)
            return response.json();
        })
        .then(function (data) {
            cityData[0] = data[0];
            console.log(cityData);
            lat = data[0].lat;
            console.log(lat);
            lon = data[0].lon;
            console.log(lon);
            return (cityData);
        
        })   
}



//cityInfo();


document.querySelector('#search').addEventListener('submit', function (event) {
    event.preventDefault();
    cityInfo(document.querySelector('input').value.trim());
});


function getweatherData() {
       let endPoint = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon=" + lon+"&appid=b1034edd48bb8721bfd5c43b5819c1c1"
console.log(endPoint);    
    fetch(endPoint)
        .then(function (response) {
            console.log("Fetch2");
            console.log(response);
            return response.json();
        })
        .then(function (data) {
         console.log(data);
        })
}


getweatherData();
cityInfo();
