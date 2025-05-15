const locationInput = document.getElementById("location-input");
const locationList = document.getElementById("location-list");
const weatherForecast = document.getElementById("weather-forecast");
const API_KEY = '6b143eadb0173c9da911405423159d00';

//Listen for input events on the location input field
locationInput.addEventListener('input', async (event) => {
    const inputValue = event.target.value.trim();

    //Send request to OpenWeatherMap API to get location suggestions
    const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${inputValue}&appid=${API_KEY}&units=metric`);
    //Check if the response is ok
    //If not, log the error and return
    if (!response.ok) {
        console.error("Error fetching location data:", response.statusText);
        return;
    }
    //Parse the response data
    const data = await response.json();

    // const data = fetchWeatherData(inputValue, API_KEY);

    //Filter the locations based on the input value
    const filteredLocations = data.list.filter(location => {
        return location.name.toLowerCase().includes(inputValue.toLowerCase());
    });

    //Display the filtered locations in the dropdown list
    displayLocations(filteredLocations);
})

//Function to display the filtered locations in the dropdown list
function displayLocations(locations) {
    //Clear the existing list
    locationList.innerHTML = '';

    //Create a list item for each location and append it to the dropdown list
    locations.forEach(location => {
        const listItem = document.createElement('li');
        listItem.textContent = `${location.name}, ${location.sys.country}`;
        listItem.addEventListener('click', () => {
            locationInput.value = listItem.textContent;
            locationList.innerHTML = '';
            weatherForecast.style.display = 'block';
        });
        locationList.appendChild(listItem);
    });
}
//Hide the weather forecast section by default
weatherForecast.style.display = 'none';
// //Add event listener to the location input field to hide the dropdown list when clicked outside
// locationInput.addEventListener('blur', () => {
//     setTimeout(() => {
//         locationList.innerHTML = '';
//     }
//     , 200);
// });
//Add event listener to the weather forecast section to hide it when clicked outside
weatherForecast.addEventListener('click', (event) => {
    event.stopPropagation();
});
//Add event listener to the location input field to show the dropdown list when focused
locationInput.addEventListener('focus', () => {
    if (locationInput.value.trim() !== '') {
        locationList.style.display = 'block';
    }
});
//Add event listener to the location input field to hide the dropdown list when clicked outside
locationInput.addEventListener('blur', () => {
    setTimeout(() => {
        locationList.style.display = 'none';
    }
    , 200);
});

function windDirection(deg) {
    const direction = " ";
    switch (deg) {
        case (deg > 337.5 && deg <= 360):
            direction = "North";
            break;
        case (deg > 0 && deg <= 22.5):
            direction = "North";
            break;
        case (deg > 22.5 && deg <= 67.5):
            direction = "North-East";
            break;
        case (deg > 67.5 && deg <= 112.5):
            direction = "East";
            break;
        case (deg > 112.5 && deg <= 157.5):
            direction = "South-East";
            break;
        case (deg > 157.5 && deg <= 222.5):
            direction = "South";
            break;
        case (deg > 222.5 && deg <= 247.5):
            direction = "South-West";
            break;
        case (deg > 247.5 && deg <= 292.5):
            direction = "West";
            break;
        case (deg > 292.5 && deg <= 337.5):
            direction = "North-West";
            break;
    }
    return direction;
}

async function fetchWeatherData(city, apiKey) {
    //Send request to OpenWeatherMap API to get location suggestions
    const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${city}&appid=${apiKey}&units=metric`);
    //Check if the response is ok
    //If not, log the error and return
    if (!response.ok) {
        console.error("Error fetching location data:", response.statusText);
        return;
    }
    //Parse and return the response data
    return data = await response.json();
}

function getCityWeather(myCity) {
    const citiesWxData = fetchWeatherData(inputValue, API_KEY);
    for (const cityData in citiesWxData) {
        if (cityData.includes(myCity)) {
            const forecastArray = cityData.list;
            for (let i = 0; i < 5; i++){
                const name = forecastArray[i].city.temp;
                const date = forecastArray[i].dt_txt;
                const temperature = forecastArray[i].main.temp;
                const minimumTemp = forecastArray[i].main.temp_min;
                const maximumTemp = forecastArray[i].main.temp_max;
                const humidity = forecastArray[i].main.humidity;
                const weather = forecastArray[i].weather.main;
                const weatherDescript = forecastArray[i].weather.description;
                const weatherIcon = forecastArray[i].weather.icon;
                const gust = forecastArray[i].wind.gust;
                const windSpeed = forecastArray[i].wind.speed;
                const visibility = forecastArray[i].visibility;
                const windDirection = forecastArray[i].wind.direction;

                const weatherDisplay = document.getElementById('weather-display');
                
                const cityElement = document.createElement('h4');
                cityElement.textContent = name;
                weatherDisplay.appendChild(cityElement);

                const forecastDateTime = document.createElement('h5');
                forecastDateTime.textContent = `Forecast for ${date}`;
                weatherDisplay.appendChild(forecastDateTime);

                const forecastTemp = document.createElement('p');
                const forecastTempMax = document.createElement('p');
                const forecastTempMin = document.createElement('p');
                const forecastHumidity = document.createElement('p');
                const forecastWeather = document.createElement('p');
                const forecastWindSpeed = document.createElement('p');
                const forecastGust = document.createElement('p');
                const forecastVisibility = document.createElement('p');
                const forecastWindDirection = document.createElement('p');

                forecastTemp.textContent = temperature;
                forecastTempMin.textContent = minimumTemp;
                forecastTempMax.textContent = maximumTemp;
                forecastHumidity.textContent = humidity;
                forecastWeather.textContent = weather;
                forecastGust.textContent = gust;
                forecastWindSpeed.textContent = windSpeed;
                forecastVisibility.textContent = visibility;
                forecastWindDirection.textContent = windDirection(parseFloat(windDirection));

                const forecastWxCorner = document.createElement('div');

                const forecastWxImg = document.createElement('img');
                const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
                forecastWxImg.src = iconUrl;
                forecastWxImg.alt = weatherDescript;

                forecastWxCorner.appendChild(forecastWeather);
                forecastWxCorner.appendChild(forecastWxImg);

                weatherDisplay.appendChild(forecastWxCorner);
                weatherDisplay.appendChild(forecastTemp);
                weatherDisplay.appendChild(forecastTempMax);
                weatherDisplay.appendChild(forecastTempMin);
                weatherDisplay.appendChild(forecastHumidity);
                weatherDisplay.appendChild(forecastWindSpeed);
                weatherDisplay.appendChild(forecastGust);
                weatherDisplay.appendChild(forecastVisibility);
                weatherDisplay.appendChild(forecastWindDirection);

            }
        }
    }
}