const apiKey = config.API_KEY;
const baseUrl = config.BASE_URL;

// get weather details from openweathermap api
const getCityWeather = (cityName) => {
    const fullUrl = `${baseUrl}${cityName}&appid=${apiKey}`
    return axios.get(fullUrl);
}

// weather app function
function weatherApp() {
    const cityName = document.getElementById('inputCity').value;
    getCityWeather(cityName)
    .then((res)=> {
        const d = new Date();
        let curTime = `${d.getHours()}:${d.getMinutes()}`;
        curTime = convertTime24to12(curTime);
        const temp = (res.data.main.temp - 273.15).toFixed(2) + "&#8451;";
        const desc = res.data.weather[0].description;
        const humidity = res.data.main.humidity;
        const feelslike = (res.data.main.feels_like - 273.15).toFixed(2) + "&#8451;";
        const minTemp = (res.data.main.temp_min - 273.15).toFixed(2) + "&#8451;";
        const maxTemp = (res.data.main.temp_max - 273.15).toFixed(2) + "&#8451;";
        document.getElementById('outputContainer').style.display = "block";
        console.log(cityName, curTime, temp, desc, feelslike, minTemp, maxTemp, humidity);
        document.getElementById('city').innerHTML = "<p>Current weather in </p><strong>"+ cityName.toUpperCase() +"</strong>";
        document.getElementById('time').innerText = curTime;
        document.getElementById('temp').innerHTML = temp;
        document.getElementById('desc').innerText = `${desc}`;
        document.getElementById('feelslike').innerHTML = feelslike;
        document.getElementById('minTemp').innerHTML = minTemp;
        document.getElementById('maxTemp').innerHTML = maxTemp;
        document.getElementById('humid').innerText = humidity;
    })
    .catch((err)=> {
        window.alert("Error ccured. Invalid City Name!!");
        window.location.href = 'https://anilraj.space/weather-app/';
    })
}

// converts time from 24hr to 12hr
convertTime24to12 = (curTime) => {
    let hh = curTime.split(':')[0];
    if( hh == 12) {
        return curTime + " PM";
    }
    else if(hh > 12) {
        hh = hh - 12;
        return hh + ":" + curTime.split(':')[1] + " PM";
    } else {
        return curTime + " AM";
    }
}