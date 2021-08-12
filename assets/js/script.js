let cityData=[];
var today = moment();

function cityInfo(cityName = "Dixon") {
    let endPoint = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&&appid=b1034edd48bb8721bfd5c43b5819c1c1"
    fetch(endPoint)
        .then(function (response) {
            //console.log(response)
            return response.json();
        })
        .then(function (data) {
            cityData[0] = data[0];
            lat = data[0].lat;
            lon = data[0].lon;
            getweatherData(lat,lon,cityName);
            return (lat,lon);
            
        }) 
        
    function getweatherData(lat,lon,cityName) {

         let endPoint = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=b1034edd48bb8721bfd5c43b5819c1c1"
           // console.log(endPoint);
            fetch(endPoint)
            .then(function (response) {
               return response.json();
            })
            .then(function (data) {
                cityData=data;
                
                //console.log(cityData);          
               
                //variables used for the current City
                const temp=cityData.current.temp;
                const date= cityData.current.dt;
                const wind = cityData.current.wind_speed;
                const humidity=cityData.current.humidity
                const uvi=cityData.current.uvi
                const dateString = moment.unix(date).format("MM/DD/YYYY");
                
                
                const chosenCityDate = cityName+"   ("+ dateString+")";
                document.getElementById("cCity").innerHTML = chosenCityDate;
                
                const todayTemp = "Temp: " + temp +" F";
                document.getElementById("cTemp").innerHTML = todayTemp;
               
                const todayWind = "Wind: " + wind+" mph";
               // console.log(todayWind);
                document.getElementById("cWind").innerHTML = todayWind;

                const todayHumidity = "Humidity: " + humidity+ "%";
               // console.log(todayHumidity);
                document.getElementById("cHumidity").innerHTML = todayHumidity;

                const todayUVI = "UVI: " + uvi;
                // console.log(todayUVI);
                document.getElementById("cUVI").innerHTML = todayUVI;

                //five day forcast
                console.log("Starting 5 day Forcast")
                for (let i = 1; i < 6; i++) {
                    //console.log(i);
                    let dayof5=i;
                    //console.log(dayof5)
                    let id="day"+dayof5;
                   // console.log(id);
                    let idTemp=id+"Temp";
                   // console.log(idTemp);
                    let idWind=id+"Wind";
                   // console.log(idWind)
                    let idHumidity=id+"Humidity"
                   // console.log(idHumidity);
                    let idDate=id+"Date"
                   // console.log(idDate);
                    let idIcon=id+"Icon";
                   // console.log(idIcon);
                    const element = cityData.daily[i];
                   // console.log(element);
                   
                    const dTemp = element.temp.day;
                    const dDate = element.dt;
                    const dWind = element.wind_speed;
                    const dHumidity = element.humidity;
                    const dIcon = element.weather[0].icon;
                   
                    const dDateString = moment.unix(dDate).format("MM/DD/YYYY");
                    //console.log(dDateString);
                    const dayDate = "Date: " + dDateString;
                    //console.log(dayDate)
                    document.getElementById(idDate).innerHTML = dayDate;

                    const dayTemp = "Temp: " + dTemp + " F";    
                    //console.log(dayTemp)           
                    document.getElementById(idTemp).innerHTML= dayTemp;

                    //const dayIcon = dIcon;
                    //console.log(dayIcon)

                    const dayIcon = document.createElement("img");
                    dayIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + dIcon + "@2x.png");
                    // console.log("Icon");
                    // console.log(dayIcon);
                    document.getElementById(idIcon).innerHTML="";
                    document.getElementById(idIcon).appendChild(dayIcon);


                    const dayWind = "Wind: " + dWind + " mph";
                    // console.log(dayWind);
                    document.getElementById(idWind).innerHTML =dayWind;

                    const dayHumidity = "Humidity: " + dHumidity + "%";
                    // console.log(dayHumidity);
                    document.getElementById(idHumidity).innerHTML = dayHumidity;

                 
                }
            }
        )
    }
};
    




document.querySelector('#search').addEventListener('submit', function (event) {
    event.preventDefault();
    console.log(1);
    cityName = document.querySelector('input').value.trim();
    cityInfo(cityName);
    console.log(cityName);
});

document.querySelector('#cityContainer').addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.matches("button")){
        console.log(1);
        cityName = event.target.dataset.value.trim();
        cityInfo(cityName);
        console.log(cityName);
    }
   
});

// function cityFunction(event){
   
//     cityInfo(cityName = document.querySelector('.btn').value);
//     console.log(cityName);

// }



cityInfo();
