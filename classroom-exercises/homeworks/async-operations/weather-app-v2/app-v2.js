const app = document.getElementById('app');
const apiKey = config.API_KEY;
const baseUrl = config.BASE_URL;

app.innerHTML = `
<div class="search-bar">
    <form onSubmit="return false">
        <input type="text" placeholder="Enter City Name" id="city"/>
        <button type="submit" id="submit" onclick="getWeather();">Get Weather</button>
    </form>
</div>
<div class="weather-card hide"></div>
`;

const city = app.querySelector('#city');
const submitBtn = app.querySelector('#submit');
const weatherCard = app.querySelector('.weather-card');

const date = new Date();
const day = date.toString().slice(0, 15);

function getCityWeather(cityName) {
    const fullUrl = `${baseUrl}${cityName}&appid=${apiKey}`;
    return axios.get(fullUrl);
}

const weather = {};

async function getWeather() {
    try {
        const res = await getCityWeather(city.value);
        weather.temp = (res.data.main.temp - 273.15).toFixed(2);
        weather.feels = (res.data.main.feels_like - 273.15).toFixed(2);
        weather.humidity = res.data.main.humidity;
        weather.city = res.data.name;
        weatherCard.classList.remove('hide');
        render();
    } catch (err) {
        weatherCard.classList.add('hide');
        alert('Invalid City!');
        // throw('Error Occured!');
    }
}

const render = () => {
    weatherCard.innerHTML = `
    <div class="card-container">
        <div class="card-header">
            Current Weather in ${weather.city}
        </div>
        <div class="card-content">
            <div class="row">${weather.temp} &degC</div>
            <div class="row">Feels like ${weather.feels} &degC</div>
            <div class="row">Humidity ${weather.feels} &degC</div>
        </div>
        <div class="card-footer">
        </div>        
    </div>
    `;
}

