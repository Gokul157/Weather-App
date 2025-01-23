async function getWeather() {
    const city = document.getElementById('city').value;
    const apiUrl = `https://open-weather13.p.rapidapi.com/city/${city}/EN`;

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-rapidapi-ua': 'RapidAPI-Playground',
            'x-rapidapi-key': '9671395ef2msh541ec0fd891c4e8p183daejsnfce590dd6ed4',
            'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(apiUrl, options);
        const data = await response.json();

        if (data.status === 'fail') {
            document.getElementById('error-message').textContent = 'City not found!';
            document.getElementById('weather-info').style.display = 'none';
        } else {
            document.getElementById('error-message').textContent = '';
            document.getElementById('weather-info').style.display = 'block';

            const cityName = data.name;
            const tempFahrenheit = data.main.temp; // Assuming the temperature is in Fahrenheit
            const tempCelsius = fahrenheitToCelsius(tempFahrenheit); // Convert to Celsius
            const description = data.weather[0].description;
            const humidity = data.main.humidity;

            document.getElementById('city-name').textContent = `Weather in ${cityName}`;
            document.getElementById('temp').textContent = `Temperature: ${tempCelsius.toFixed(2)}°C`; // Display in Celsius
            document.getElementById('description').textContent = `Description: ${description}`;
            document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
        }
    } catch (error) {
        document.getElementById('error-message').textContent = 'Error fetching data!';
        document.getElementById('weather-info').style.display = 'none';
    }
}

// Function to convert Fahrenheit to Celsius
function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
