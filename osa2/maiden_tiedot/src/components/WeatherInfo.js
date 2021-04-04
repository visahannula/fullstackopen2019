import React, { useEffect, useState } from 'react';
import { OpenWeatherMap } from '../OpenWeatherMap';

export const WeatherInfoListItem = ({ itemText, value, unit = "" }) => (
    <li><b>{itemText}:</b> {value} {unit}</li>
);

export const WeatherInfoDescription = ({ descText, icon }) => (
    <p>{descText}
        <img src={icon} alt="Icon for weather"></img>
    </p>
);

export const WeatherInfoElements = (weather) => {
    const { temp, feels_like, pressure, humidity } = weather.main;
    const windSpeed = weather.wind.speed;
    const degC = '\u00b0C';
    const weatherIconURL = 'https://openweathermap.org/img/wn/' + weather['weather'][0]['icon'] + '.png';
    const timeZoneDeltaHours = weather['timezone'] / 60 / 60;
    const timeOfObservationUTC = new Date(weather.dt * 1000).toUTCString(); //from Unix time

    return (
        <>
            <WeatherInfoDescription descText={weather['weather'][0]['description']} icon={weatherIconURL} />
            <ul>
                <WeatherInfoListItem key="temp" itemText="Temperature" value={temp} unit={degC} />
                <WeatherInfoListItem key="feels_like" itemText="Feels like" value={feels_like} unit={degC} />
                <WeatherInfoListItem key="wind_speed" itemText="Wind speed" value={windSpeed} unit="m/s" />
                <WeatherInfoListItem key="pressure" itemText="Pressure" value={pressure} unit="hPa" />
                <WeatherInfoListItem key="humidity" itemText="Humidity" value={humidity} unit="% (RH)" />
                <WeatherInfoListItem key="dt" itemText="Observation time" value={timeOfObservationUTC} />
                <WeatherInfoListItem key="utc_offset" itemText="City UTC Offset" value={timeZoneDeltaHours} unit="hours" />
            </ul>
        </>
    )
}

export const WeatherMapContainer = ({ city }) => {
    const [weather, setWeather] = useState(undefined);

    console.info("City for weather info: ", city);

    if (!city) {
        console.warn("No city provided!");
    }

    useEffect(() => {
        const openWeather = new OpenWeatherMap()
        openWeather.getWeatherData(city, setWeather);
    }, [setWeather, city]);

    console.info("Weather data available: ", weather);

    return (
        <div className='weatherInfo'>
            { weather ? WeatherInfoElements(weather) : "Weather info not available."}
        </div>
    );
}