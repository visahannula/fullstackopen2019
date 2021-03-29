import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WEATHERMAP_APIKEY = process.env.REACT_APP_WEATHER_APPID;

if (!WEATHERMAP_APIKEY) throw new Error("NO WEATHER API KEY PROVIDED.");

class OpenWeatherMap {
    config = {
        API_KEY: WEATHERMAP_APIKEY,
        weatherBaseURL: 'https://api.openweathermap.org/data/2.5',
        weatherPath: '/weather',
        units: 'metric'
    };

    axiosOptions = {
        responseType: 'json',
        headers: { "Accept": "application/json" },
        timeout: 1000
    };

    createGetCityReqConfig = (city, options) => Object.assign(
        {
            method: 'GET',
            baseURL: this.config.weatherBaseURL,
            url: this.config.weatherPath,
            params:
            {
                q: city,
                units: this.config.units,
                appid: this.config.API_KEY
            }
        },
        options || this.axiosOptions
    );

    getWeatherData = async (city, callback) => {
        if (!city) {
            console.error("No city provided for the weather response.");
            return false;
        }

        try {
            console.log("Going to get weather: ", this.createGetCityReqConfig(city))
            const response = await axios
                .request(this.createGetCityReqConfig(city))
            console.info("Weather response 1.: ", response);
            callback(response.data);
        } catch (error) {
            console.error('Cannot get weather data for ' + city + ': ', error);
            return false;
        }
    }
}

export const WeatherMapContainer = ({ city }) => {
    const [weather, setWeather] = useState(undefined);

    useEffect(() => {
        const openWeather = new OpenWeatherMap()
        openWeather.getWeatherData(city, setWeather);
    }, [setWeather, city]);

    console.info("Weather response 2.: ", weather);

    let elList = [];

    if (weather) {
        elList = Object.entries(weather['main']).map(
            ([key, value]) => {
                console.log(`${key}: ${value}`);
                return (<li key={key}><b>{key}</b>: {value}</li>);
            }
        );

        elList.push(<li key="utc_offset"><b>UTC Offset</b>: {weather.timezone / 60 / 60} hours</li>)
    }
    /**/

    // {resp || 'Cannot get weather data.'}
    return (
        <div className='weatherInfo'>
            Here is info for weather:
            <ul>{elList || "NO."}</ul>
        </div>
    );
}