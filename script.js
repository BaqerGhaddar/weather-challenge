const searchHistory = JSON.parse(localStorage.getItem("cities")) || [];

// load from localstorage and create li elements below search button
for (let i = 0; i < searchHistory.length; i++) {
    saveSearch(searchHistory[i])
}

const searchButton = document.querySelector("#search-btn");

function getWeather(event) {
    console.log(event);
   if(event){
    event.preventDefault();

   }
    
    const APIkey = "ebaf7d0145cd123517122f32a5940c75"

    const cityName = document.querySelector("#cityInput").value;
    const alreadyExist = searchHistory.includes(cityName);

    if(alreadyExist){
        console.log("alreadyExist")
    }
    else{
        searchHistory.push(cityName);

        // save to local storage
        localStorage.setItem("cities", JSON.stringify(searchHistory))

        saveSearch(cityName)
    }
    
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
                    const icon1 = document.createElement("img")
                    const code1 = data.daily[0].weather[0].icon
                    icon1.src =`http://openweathermap.org/img/wn/${code1}@2x.png`
                    document.querySelector("#day1-icon").innerHTML = ""
                    document.querySelector("#day1-icon").appendChild(icon1)
                    const convertedTempDay1 = Math.round((data.daily[0].temp.morn - 273.15) * 9 / 5 + 32)
                    document.querySelector("#day1-temp").textContent = convertedTempDay1;
                    document.querySelector("#day1-wind").textContent = data.daily[0].wind_speed;
                    document.querySelector("#day1-humidity").textContent = data.daily[0].humidity;
    
                    // DAY 2
                    const day2Date = moment().add(2, 'd').format("MM/DD/YYYY")
                    document.querySelector("#day2-date").textContent = day2Date;
                    const icon2 = document.createElement("img")
                    const code2 = data.daily[1].weather[0].icon
                    icon2.src =`http://openweathermap.org/img/wn/${code2}@2x.png`
                    document.querySelector("#day2-icon").innerHTML = ""
                    document.querySelector("#day2-icon").appendChild(icon2)
                    const convertedTempDay2 = Math.round((data.daily[1].temp.morn - 273.15) * 9 / 5 + 32)
                    document.querySelector("#day2-temp").textContent = convertedTempDay2;
                    document.querySelector("#day2-wind").textContent = data.daily[1].wind_speed;
                    document.querySelector("#day2-humidity").textContent = data.daily[1].humidity;
    
                    // DAY 3
                    const day3Date = moment().add(3, 'd').format("MM/DD/YYYY")
                    document.querySelector("#day3-date").textContent = day3Date;
                    const icon3 = document.createElement("img")
                    const code3 = data.daily[2].weather[0].icon
                    icon3.src =`http://openweathermap.org/img/wn/${code3}@2x.png`
                    document.querySelector("#day3-icon").innerHTML = ""
                    document.querySelector("#day3-icon").appendChild(icon3)
                    const convertedTempDay3 = Math.round((data.daily[2].temp.morn - 273.15) * 9 / 5 + 32)
                    document.querySelector("#day3-temp").textContent = convertedTempDay3;
                    document.querySelector("#day3-wind").textContent = data.daily[2].wind_speed;
                    document.querySelector("#day3-humidity").textContent = data.daily[2].humidity;
    
                    // DAY 4
                    const day4Date = moment().add(4, 'd').format("MM/DD/YYYY")
                    document.querySelector("#day4-date").textContent = day4Date;
                    const icon4 = document.createElement("img")
                    const code4 = data.daily[3].weather[0].icon
                    icon4.src =`http://openweathermap.org/img/wn/${code4}@2x.png`
                    document.querySelector("#day4-icon").innerHTML = ""
                    document.querySelector("#day4-icon").appendChild(icon4)
                    const convertedTempDay4 = Math.round((data.daily[3].temp.morn - 273.15) * 9 / 5 + 32)
                    document.querySelector("#day4-temp").textContent = convertedTempDay4;
                    document.querySelector("#day4-wind").textContent = data.daily[3].wind_speed;
                    document.querySelector("#day4-humidity").textContent = data.daily[3].humidity;
    
                    // DAY 5
                    const day5Date = moment().add(5, 'd').format("MM/DD/YYYY")
                    document.querySelector("#day5-date").textContent = day5Date;
                    const icon5 = document.createElement("img")
                    const code5 = data.daily[4].weather[0].icon
                    icon5.src =`http://openweathermap.org/img/wn/${code5}@2x.png`
                    document.querySelector("#day5-icon").innerHTML = ""
                    document.querySelector("#day5-icon").appendChild(icon5)
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