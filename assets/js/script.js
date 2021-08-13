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

         let endPoint = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=b1034edd48bb8721bfd5c43b5819c1c1";
           // console.log(endPoint);
            fetch(endPoint)
            .then(function (response) {
               return response.json();
            })
            .then(function (data) {
                cityData=data;    
               console.log(cityData)
                //variables used for the current City
                const temp=cityData.current.temp;
                const date= cityData.current.dt;
                const wind = cityData.current.wind_speed;
                const humidity=cityData.current.humidity
                const uvi=cityData.current.uvi;
                const dateString = moment.unix(date).format("MM/DD/YYYY");
                const icon=cityData.current.weather[0].icon;
                const description = cityData.current.weather[0].description;
                console.log(icon);



                //create the City & Date String for current Chosen City and Date
                const chosenCityDate = cityName+"   ("+ dateString+")";
                document.getElementById("cCity").innerHTML = chosenCityDate;
                
                //create Temp String
                const todayTemp = "Temp: " + temp +" F";
                document.getElementById("cTemp").innerHTML = todayTemp;
               
                //create Wind String
                const todayWind = "Wind: " + wind+" mph";
                document.getElementById("cWind").innerHTML = todayWind;

            

               
                document.getElementById("cdescription").innerHTML = description;
                const todayIcon = document.createElement("img");
                todayIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
                console.log(todayIcon);
                document.getElementById("cIcon").innerHTML="";
                document.getElementById("cIcon").append(todayIcon);

                //create Humidity String
                const todayHumidity = "Humidity: " + humidity+ "%";
                document.getElementById("cHumidity").innerHTML = todayHumidity;

                //create UVI String

                const todayUVI = "UVI: " + uvi;
                document.getElementById("cUVI").innerHTML = todayUVI;
                console.log(uvi);
              if (uvi<3){  
                  document.getElementById("cUVI").style.backgroundColor = "lightgreen";
              } else if (uvi>=8){
                  document.getElementById("cUVI").style.backgroundColor = "pink";
              } else 
                  document.getElementById("cUVI").style.backgroundColor = "lightorange";



                //five day forcast
                for (let i = 1; i < 6; i++) {
                    //creating the ids of the days
                    let dayof5=i;
                    let id="day"+dayof5;
                    let idTemp=id+"Temp";
                    let idWind=id+"Wind";
                    let idHumidity=id+"Humidity"
                    let idDate=id+"Date"
                    let idIcon=id+"Icon";
                   //set element array to citydata.daily
                    const element = cityData.daily[i];
                   
                    //set the value of the element types
                    const dTemp = element.temp.day;
                    const dDate = element.dt;
                    const dWind = element.wind_speed;
                    const dHumidity = element.humidity;
                    const dIcon = element.weather[0].icon;

                    // construct the date string
                    const dDateString = moment.unix(dDate).format("MM/DD/YYYY");
                    const dayDate = "Date: " + dDateString;
                    document.getElementById(idDate).innerHTML = dayDate;

                    //construct the Temperature String
                    const dayTemp = "Temp: " + dTemp + " F";          
                    document.getElementById(idTemp).innerHTML= dayTemp;

                    //get the weather Icon
                    const dayIcon = document.createElement("img");
                    dayIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + dIcon + "@2x.png");
                    document.getElementById(idIcon).innerHTML="";
                    document.getElementById(idIcon).appendChild(dayIcon);

                    //construct the Wind String
                    const dayWind = "Wind: " + dWind + " mph";
                    document.getElementById(idWind).innerHTML =dayWind;

                    //construct the Humidity String
                    const dayHumidity = "Humidity: " + dHumidity + "%";
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
cityInfo();
