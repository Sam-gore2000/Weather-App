import React, { useState } from 'react';
import './Weather.css';
import search_icon from '../Asset/search.png';
import clear_icon from '../Asset/clear.png';
import cloud_icon from '../Asset/cloud.png';
import drizzle_icon from '../Asset/drizzle.png';
import humidity_icon from '../Asset/humidity.png';
import rain_icon from '../Asset/rain.png';
import snow_icon from '../Asset/snow.png';
import wind_icon from '../Asset/wind.png';


const Weather = () => {
const[wicon,setWicon]=useState(cloud_icon);

    let api_key = "6b6d03ca2b743fc7bb966630b6ba6af3";
    let search = async () => {
        const element = document.getElementsByClassName('cityInput')[0];
        if (element.value === '') {
            return;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=metric&appid=${api_key}`;
        try {
            let response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await response.json();
            updateWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            // Handle error - e.g., display an error message to the user
        }
    }

    const updateWeatherData = (data) => {
        const humidity = document.getElementsByClassName('humidity-percent')[0];
        const wind = document.getElementsByClassName('wind-rate')[0];
        const temperature = document.getElementsByClassName('weather-temp')[0];
        const location = document.getElementsByClassName('weather-location')[0];

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
            setWicon(snow_icon);
        }
        else{
            setWicon(clear_icon)
        }

        if (humidity && wind && temperature && location) {
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${data.wind.speed} km/h`;
            temperature.innerHTML = `${data.main.temp}°C`;
            location.innerHTML = data.name;
        }
    }

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className='cityInput' placeholder='Search' />
                <div className='search-icon' onClick={search}>
                    <img src={search_icon} className='weather' alt='search icon' />
                </div>
            </div>

            <div className='weather-icon'>
                <img src={wicon} className='weather' alt='cloud icon' />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} className='weather' alt='humidity icon' />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} className='weather' alt='wind icon' />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather;
