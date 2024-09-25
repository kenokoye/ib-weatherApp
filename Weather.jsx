import { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './Weather.css/'


 const Weather =() => {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API;

    const [weatherData, setWeatherData] = useState(false);
    const [error, setError] = useState(false);
    const inputRef = useRef();
    
    
const search = async (city)=>{
    setError(false);
    setWeatherData(false);
    if (city === "") {
        alert("please enter a city")
        return;
    }
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        const response = await fetch(url);
        console.log(response)
        const data = await response.json();
        if(response.status == '400' || response.status == '404'){
            setError("City not found")
            return;
        }
        if(response.status == '200'){
           console.log(data);
        // const icon = allIcons[data.weather[0].icon];
            setWeatherData({
            humidity: data.main.humidity,
            temperature: Math.floor(data.main.temp),
            windSpeed: data.wind.speed,
            location: data.name,
            icon: data.weather[0].icon
        }); 
        }
        
    } catch (error) {
        setWeatherData(false);
        console.log(error);
    }
}
useEffect(()=>{
    console.log(API_KEY);
    search(weatherData.location);
}, []);
  return (
    <div className='weather'>
     <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='enter city name' />
        <div>
    <button onClick={() => search(inputRef.current.value)}>Search</button>
        </div>
        <div>
            {error != false && <div className="error-info">
                <p>{error}</p>
                </div>}
            {!weatherData && <div className="no-info">
                <p>Please enter a city to display the weather information</p>
                </div>}
            {weatherData && <div className='weather-details'>
            <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} className='weather-icon'/>
            <p className='temp'>{weatherData.temperature}<sup>o</sup>C</p>
            <p className='loc'>{weatherData.location}</p>

            <div className='weather-data'>
                <div className='col'><p className='hum'>Humidity {weatherData.humidity}%</p></div>
                
                <div className='col'><p className='win'>Wind Speed {weatherData.windSpeed} km/h</p></div>
            </div>
    
                        
                </div>}
        </div>
        
            </div>
        </div>
    

  )
}

export default Weather;
