const searchButton = document.querySelector("#search-btn");

function getWeather(event) {
   if(event){
    event.preventDefault();

   }
    
    const APIkey = "ebaf7d0145cd123517122f32a5940c75"

    const cityName = document.querySelector("#cityInput").value;
    saveSearch(cityName)
    
    const firstURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
    
    fetch(firstURL)
        .then(res => res.json())
        .then(data1 => {
            console.log(data1)
    
            const lat = data1.coord.lat;
            const lon = data1.coord.lon;
            const secondURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey
    
    
    
            console.log(secondURL)
    
            fetch(secondURL)
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
    
                    // CURRENT DAY
                    document.querySelector("#cityName").textContent = cityName;
                    const currentDate = moment().format("MM/DD/YYYY")
                    document.querySelector("#current-date").textContent = currentDate;
                    const convertedTemp = Math.round((data.current.temp - 273.15) * 9 / 5 + 32)
                    document.querySelector("#current-day-temp").textContent = convertedTemp;
                    document.querySelector("#current-day-wind").textContent = data.current.wind_speed;
                    document.querySelector("#current-day-humidity").textContent = data.current.humidity;
    
    
                    // FIVE DAY FORECAST SECTIONS
    
                    // DAY 1
                    const day1Date = moment().add(1, 'd').format("MM/DD/YYYY")
                    document.querySelector("#day1-date").textContent = day1Date;
                    const icon = document.createElement("img")
                    const code = data.daily[0].weather[0].icon
                    icon.src =`http://openweathermap.org/img/wn/${code}@2x.png`
                    document.querySelector("#day1-icon").appendChild(icon)
                    const convertedTempDay1 = Math.round((data.daily[0].temp.morn - 273.15) * 9 / 5 + 32)
                    document.querySelector("#day1-temp").textContent = convertedTempDay1;
                    document.querySelector("#day1-wind").textContent = data.daily[0].wind_speed;
                    document.querySelector("#day1-humidity").textContent = data.daily[0].humidity;
    
                    // DAY 2
                    const day2Date = moment().add(2, 'd').format("MM/DD/YYYY")
                    document.querySelector("#day2-date").textContent = day2Date;
                    const convertedTempDay2 = Math.round((data.daily[1].temp.morn - 273.15) * 9 / 5 + 32)
                    document.querySelector("#day2-temp").textContent = convertedTempDay2;
                    document.querySelector("#day2-wind").textContent = data.daily[1].wind_speed;
                    document.querySelector("#day2-humidity").textContent = data.daily[1].humidity;
    
                    // DAY 3
                    const day3Date = moment().add(3, 'd').format("MM/DD/YYYY")
                    document.querySelector("#day3-date").textContent = day3Date;
                    const convertedTempDay3 = Math.round((data.daily[2].temp.morn - 273.15) * 9 / 5 + 32)
                    document.querySelector("#day3-temp").textContent = convertedTempDay3;
                    document.querySelector("#day3-wind").textContent = data.daily[2].wind_speed;
                    document.querySelector("#day3-humidity").textContent = data.daily[2].humidity;
    
                    // DAY 4
                    const day4Date = moment().add(4, 'd').format("MM/DD/YYYY")
                    document.querySelector("#day4-date").textContent = day4Date;
                    const convertedTempDay4 = Math.round((data.daily[3].temp.morn - 273.15) * 9 / 5 + 32)
                    document.querySelector("#day4-temp").textContent = convertedTempDay4;
                    document.querySelector("#day4-wind").textContent = data.daily[3].wind_speed;
                    document.querySelector("#day4-humidity").textContent = data.daily[3].humidity;
    
                    // DAY 5
                    const day5Date = moment().add(5, 'd').format("MM/DD/YYYY")
                    document.querySelector("#day5-date").textContent = day5Date;
                    const convertedTempDay5 = Math.round((data.daily[4].temp.morn - 273.15) * 9 / 5 + 32)
                    document.querySelector("#day5-temp").textContent = convertedTempDay5;
                    document.querySelector("#day5-wind").textContent = data.daily[4].wind_speed;
                    document.querySelector("#day5-humidity").textContent = data.daily[4].humidity;
    
                })
    
        })
    
}

function saveSearch(cityName){
    // <li class="list-group-item mb-3">An item</li>
    const listItem = document.createElement("li")
    listItem.className = "list-group-item mb-3"
    listItem.textContent = cityName
    listItem.addEventListener("click", function(){
        const cityInput = document.querySelector("#cityInput")
        cityInput.value = cityName
        getWeather()
    })

    const ul = document.querySelector(".list-group")
    ul.append(listItem)
}


searchButton.addEventListener("click", getWeather)


// setTimeout(function() {
//     alert("This message happens after 5 seconds!");
//   }, 5000);

// setInterval(function() {
//     alert("This alert shows up every five seconds!");
//   }, 5000);