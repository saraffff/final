function searchWeather() {
    const apiKey = 'e8179d115e8d6ac0785d3d1599df9765'; 
    const searchInput = document.getElementById('searchInput').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}`;
  
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfo.innerHTML = '<p>City not found</p>';
        return;
    }

    const cityName = data.name;
    const country = data.sys.country;
    const temperature = Math.round(data.main.temp - 273.15);

    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

    weatherInfo.innerHTML = `
        <h2>${cityName}, ${country}</h2>
        <p>${description}</p>
        <p>${temperature}°C</p>
        <img src="${iconUrl}" alt="${description} icon">
    `;
}
