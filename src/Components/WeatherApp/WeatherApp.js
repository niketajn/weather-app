import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {

    let api_key='0f45a72510680bea46d00034972d2e72';
     
    const [weatherIcon, setWeatherIcon] = useState(cloud_icon);

    const search = async() => {
        let cityInput = document.getElementById('cityInput').value;
        if( cityInput === ""){
            return;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=Metric&appid=${api_key}`
        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementById('humidity-percent');
        const wind_rate = document.getElementById('wind-rate');
        const location = document.getElementsByClassName('weather-location');
        const temp = document.getElementsByClassName('weather-temp');
        let weatherIconData = data.weather[0].icon;

        humidity.innerHTML = data.main.humidity+"%";
        wind_rate.innerHTML = Math.floor(data.wind.speed)+"km/hr";
        location[0].innerHTML = data.name;
        temp[0].innerHTML = Math.floor(data.main.temp)+"°C";

        if(weatherIconData === "01d" || weatherIconData === "01n"){
            setWeatherIcon(clear_icon);
        }else if(weatherIconData === "02d" || weatherIconData === "02n"){
            setWeatherIcon(cloud_icon);
        }else if(weatherIconData === "10d" || weatherIconData === "10n" || weatherIconData === "09d" || weatherIconData === "09n"){
            setWeatherIcon(rain_icon);
        }else if(weatherIconData === "13d" || weatherIconData === "13n"){
            setWeatherIcon(snow_icon)
        }else if(weatherIconData === "03d" || weatherIconData === "03n" || weatherIconData === "04d" || weatherIconData === "04n"){
            setWeatherIcon(drizzle_icon)
        }else{
            setWeatherIcon(clear_icon);
        }
    }
    
    
    return(
        <div className='container'>
            <div className='top-bar'>
                <input type="text" placeholder="search" id='cityInput'/>
                <div className='search-icon'>
                    <img src={search_icon} alt="search" onClick={search}/>
                </div>
            </div>
            <div className='weather-image'>
                <img src={weatherIcon} alt=""/>
            </div>
            <div className='weather-temp'>24C</div>
            <div className='weather-location'>London</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} alt="" className='icon'/>
                    <div className='data'>
                        <div id='humidity-percent'>64%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind_icon} alt=""/>
                    <div className='data'>
                        <div id='wind-rate'>18km/hr</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;
