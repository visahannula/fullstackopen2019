import axios from 'axios';

const WEATHERMAP_APIKEY = process.env.REACT_APP_WEATHER_APPID;

if (!WEATHERMAP_APIKEY) throw new Error("NO WEATHER API KEY PROVIDED. Set environment variable REACT_APP_WEATHER_APPID.");

export class OpenWeatherMap {
    config = {
        API_KEY: WEATHERMAP_APIKEY,
        weatherBaseURL: 'https://api.openweathermap.org/data/2.5',
        weatherPath: '/weather',
        weatherUnits: 'metric'
    };

    axiosOptions = {
        responseType: 'json',
        headers: { "Accept": "application/json" },
        timeout: 5000
    };

    createGetCityReqConfig = (city, options) => Object.assign(
        {
            method: 'GET',
            baseURL: this.config.weatherBaseURL,
            url: this.config.weatherPath,
            params:
            {
                q: city,
                units: this.config.weatherUnits,
                appid: this.config.API_KEY
            },
        },
        options || this.axiosOptions
    );

    getWeatherData = async (city, callback = () => console.log("Weather: No callback provided!")) => {
        if (!city) {
            console.error("No city provided for the weather response.");
            return false;
        }

        try {
            console.log("Going to get weather: ", this.createGetCityReqConfig(city))
            const response = await axios
                .request(this.createGetCityReqConfig(city))
            console.info("Weather response, full: ", response);
            callback(response.data);
        } catch (error) {
            console.error('Cannot get weather data for ' + city + ': ', error);
            return false;
        }
    }
}

export default OpenWeatherMap; 