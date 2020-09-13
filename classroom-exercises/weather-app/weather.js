// Menu driven cli app with Javascript that fetches weather report in console

const readLineSync = require("readline-sync");
const axios = require("axios");

const apiKey = config.API_KEY;
const baseUrl = config.BASE_URL;

const getCityWeather = (cityName) => {
    const fullUrl = `${baseUrl}${cityName}&appid=${apiKey}`
    return axios.get(fullUrl);
}

function weatherApp() {
    // console.clear();
    const cityName = readLineSync.question("\nEnter the city name : ");
    getCityWeather(cityName)
    .then((res)=> {
        const temp = (res.data.main.temp - 273.15).toFixed(2); //converting kelvin to celsius
        const weather = res.data.weather[0].description;
        const humidity = res.data.main.humidity;
        console.log({temp, weather, humidity});
        console.log(res.data);
        const repeat = readLineSync.question("\nDo you want to know another city weather (y/n) ? ");
        if(repeat === 'y' || repeat === 'Y') {
            weatherApp();
        } else {
            console.log("\nAdios!!");
        }
    })
    .catch((err)=> {
        console.log("\nError occured!");
    })
}

weatherApp();




