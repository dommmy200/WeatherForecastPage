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