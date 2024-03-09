import { useEffect, useState } from 'react';
import { Weather } from './types';
import weatherConfig from "./weatherapi-config.json";
import './App.css'

function getCurrentWeather (): Promise<Response> {
    const location = encodeURIComponent("Lisboa, Portugal");
    const lang = "pt";
    const apiKey = weatherConfig.API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?q=${location}&lang=${lang}&key=${apiKey}`;

    return fetch(url);
}

function useWeather (): [boolean, boolean, Weather | undefined] {
    const [weather, setWeather] = useState<Weather>();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getCurrentWeather()
            .then((resp: Response) => resp.json())
            .then((weatherData: Weather) => {
                if (weatherData.current) {
                    setWeather(weatherData);
                    setIsLoading(false);
                } else {
                    setIsError(true);
                    setIsLoading(false);
                }
            });
    }, []);

    return [isLoading, isError, weather];
}

function App () {
    const [isLoading, isError, weather] = useWeather();

    if (isLoading) {
        return (
            <div className='widget-weather'>Loading weather...</div>
        )
    }

    if (isError) {
        return (
            <div className='widget-weather'>Sorry, something went wrong.<br />Please try again later...</div>
        )
    }

    if (weather) {
        return (
            <div className="widget-weather">
                <img className='widget-weather__icon' width={64} height={64} src={weather.current.condition.icon} alt={weather.current.condition.text} />
                <div className='widget-weather__group'>
                    <div className='widget-weather__temperature'>{weather.current.temp_c} ºC</div>
                    <div className='widget-weather__condition'>{weather.current.condition.text}</div>
                </div>
            </div>
        )
    }
}

export default App
