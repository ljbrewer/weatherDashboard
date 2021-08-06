console.log('I workin')

function getweatherData() {
    var endPoint = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=b1034edd48bb8721bfd5c43b5819c1c1"
    fetch(endPoint)
        .then(function (response) {
           // console.log(response);
            return response.json();
        })
        .then(function (data) {
        console.log(data);
        })
}
getweatherData()


var headers = new Headers();
headers.append("X-CSCAPI-KEY", "API_KEY");

var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};

fetch("https://api.countrystatecity.in/v1/countries/IN/states/MH/cities", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
