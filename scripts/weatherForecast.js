// JavaScript code to fetch and display weather data from OpenWeatherMap API
const locationInput = document.getElementById("location-input");
const locationList = document.getElementById("location-list");
const weatherForecast = document.getElementById("weather-forecast");
const weatherDisplay = document.getElementById("weather-display");
const API_KEY = '6b143eadb0173c9da911405423159d00';

//Listen for input events on the location input field
locationInput.addEventListener('input', async (event) => {
    const inputValue = event.target.value.trim();
    if (inputValue.length >= 3) {
        console.log('Input value:', inputValue); // For demonstration in the console
        //Send request to OpenWeatherMap API to get location suggestions
        const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${inputValue}&appid=${API_KEY}&units=metric`);
        //Check if the response is ok
        if (!response.ok) {
            console.error("Error fetching location data:", response.statusText);
            return;
        }
        //Parse the response data
        const data = await response.json();
        // const data = fetchWeatherData(inputValue);
        //Log the data to the console
        //Check if the data is empty
        if (!data) {
            //Log the error to the console
            console.error("No location data found.");
            locationList.innerHTML = '';
            return;
        }
        //Filter the locations based on the input value
        let filteredLocations = [];
        // Check if data and data.list are defined before filtering
        if (data && data.list) {
        filteredLocations = data.list.filter(location => {
            return location.name.toLowerCase().includes(inputValue.toLowerCase());
        });
        }
        //Display the filtered locations in the dropdown list
        displayLocations(filteredLocations);
    } else {
        locationList.innerHTML = '';
        return;
    }
})

//Function to display the filtered locations in the dropdown list
function displayLocations(locations) {
    //Clear the existing list
    locationList.innerHTML = '';

    //Create a list item for each location and append it to the dropdown list
    locations.forEach(location => {
        const latitude = location.coord.lat;
        const longitude = location.coord.lon;
        const city = location.name;
        const country = location.sys.country;
        const myCity = `${city}, ${country}`;
        //Create a list item for each location
        const listItem = document.createElement('li');
        listItem.className = 'location-item';
        listItem.textContent = `${myCity}`;
        listItem.style.listStyleType = 'none'; // Remove default list style
        listItem.style.padding = '5px'; // Add padding to the list item
        
        //Add event listener to each list item to change the cursor and background color on hover
        listItem.addEventListener('mouseover', function() {
            this.style.cursor = 'pointer'; // 'this' refers to listItem
            this.style.backgroundColor = '#000'; // Change background color on hover
            this.style.transition = 'background-color 0.3s'; // Add transition for smooth effect
            this.style.color = '#f0f0f0'; // Change text color on hover
        });
        listItem.addEventListener('mouseout', function() {
            this.style.cursor = ''; // Or 'default' to revert to the original cursor
            this.style.backgroundColor = ''; // Revert background color on mouse out
            this.style.color = ''; // Revert text color on mouse out
        // Add transition for smooth effect
            this.style.transition = 'background-color 0.3s'; // Add transition for smooth effect
        });
        
        //Add event listener to each list item to update the input field and hide the dropdown list
        listItem.addEventListener('click', () => {
            //locationInput.value = listItem.textContent;
            locationList.innerHTML = '';
            weatherForecast.style.display = 'block';
            getCityWeather(latitude, longitude);
        });
        locationList.appendChild(listItem);
    });
}
//Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(lat, lon) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        //Send request to OpenWeatherMap API to get weather data
        const response = await fetch(url);
        //Check if the response is ok
        if (!response.ok) {
            console.error("Error fetching location data:", response.statusText);
            return;
        }
        //Parse and return the response data
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        // Handle the fetch error appropriately
        return null;
    }
}

async function getCityWeather(lat, lon) {
    // Remove all children from the weather display
    // This will clear the previous weather data
    weatherDisplay.replaceChildren();
    // Call the fetchWeatherData function to get weather data
    // for the selected city
    const citiesWxData = await fetchWeatherData(lat, lon);
    // Check if the data is empty
    if (!citiesWxData) {
        // Log the error to the console
        console.error("No location data found.");
        return;
    }
    // Extract all the relevant data from the response
    // and display it in the weather display section
    const cityName = citiesWxData.city.name;
    const forecastArray = citiesWxData.list;
    for (let i = 0; i < 7; i++){
        const name = cityName;
        const date = forecastArray[i].dt_txt;
        const temperature = forecastArray[i].main.temp;
        const minimumTemp = forecastArray[i].main.temp_min;
        const maximumTemp = forecastArray[i].main.temp_max;
        const humidity = forecastArray[i].main.humidity;
        const weather = forecastArray[i].weather[0].main;
        const weatherDescript = forecastArray[i].weather[0].description;
        const weatherIcon = forecastArray[i].weather[0].icon;
        const gust = forecastArray[i].wind.gust;
        const windSpeed = forecastArray[i].wind.speed;
        const visibility = forecastArray[i].visibility;
        const winDirection = forecastArray[i].wind.deg;
        
        // Create elements to display the weather data
        // Create a div to hold the weather data
        const cityElement = document.createElement('h2');
        cityElement.textContent = name;
        weatherDisplay.appendChild(cityElement);

        const forecastDateTime = document.createElement('h3');
        forecastDateTime.textContent = `Forecast for ${date}`;

        const forecastTemp = document.createElement('p');
        const forecastTempMax = document.createElement('p');
        const forecastTempMin = document.createElement('p');
        const forecastHumidity = document.createElement('p');
        const forecastWeather = document.createElement('p');
        const forecastWindSpeed = document.createElement('p');
        const forecastGust = document.createElement('p');
        const forecastVisibility = document.createElement('p');
        const forecastWindDirection = document.createElement('p');

        // Set the text content of the elements to the weather data
        forecastTemp.textContent = `Temperature: ${temperature} °C`;
        forecastTempMin.textContent = `Minimum Temperature: ${minimumTemp} °C`;
        forecastTempMax.textContent = `Maximum Temperature: ${maximumTemp} °C`;
        forecastHumidity.textContent = `Humidity: ${humidity} %`;
        forecastWeather.textContent = `Weather: ${weather} (${weatherDescript})`;
        forecastWindSpeed.textContent = `Wind Speed: ${windSpeed} m/s`;
        forecastGust.textContent = `Wind Gust: ${gust} m/s`;
        forecastVisibility.textContent = `Visibility: ${visibility} m`;
        forecastWindDirection.textContent = `Wind Direction: ${windDirection(winDirection)}`;

        // Create a div to hold the weather icon and description
        const forecastWxCorner = document.createElement('div');
        forecastWxCorner.style.border = '1px solid #ccc';
        forecastWxCorner.style.padding = '10px';
        forecastWxCorner.style.margin = '0 auto';
        forecastWxCorner.style.display = 'flex';
        forecastWxCorner.style.flexDirection = 'column';
        forecastWxCorner.style.justifyContent = 'center';
        forecastWxCorner.style.textAlign = 'center';
        forecastWxCorner.style.alignItems = 'center';
        forecastWxCorner.style.backgroundColor = '#f0f0f0';
        forecastWxCorner.style.borderRadius = '5px';
        forecastWxCorner.style.width = '25%';

        const forecastWxImg = document.createElement('img');
        const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
        forecastWxImg.src = iconUrl;
        forecastWxImg.alt = weatherDescript;
        
        // Append the weather data to the weather display
        forecastWxCorner.appendChild(forecastWeather);
        forecastWxCorner.appendChild(forecastWxImg);
        
        weatherDisplay.appendChild(forecastDateTime);
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

function windDirection(deg) {
    // Initialize direction variable
    let direction = "";
    // Determine the wind direction based on the degree value
    if (deg > 338 && deg <= 360 || deg >= 0 && deg <= 23) {
        direction = "North";
    } else if (deg > 23 && deg <= 68) {
        direction = "North-East";
    } else if (deg > 68 && deg <= 113) {
        direction = "East";
    } else if (deg > 113 && deg <= 158) {
        direction = "South-East";
    } else if (deg > 158 && deg <= 223) {
        direction = "South";
    } else if (deg > 223 && deg <= 248) {
        direction = "South-West";
    } else if (deg > 248 && deg <= 293) {
        direction = "West";
    } else if (deg > 293 && deg <= 338) {
        direction = "North-West";
    } else {
        direction = "Invalid degree"; //Handle the invalid scenario
    }
    return direction;
}