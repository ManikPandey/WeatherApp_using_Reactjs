import SearchBox from './SearchBox'
import InfoBox from './InfoBox'
import { useState } from 'react';

export default function WeatherApp(){
    const [weatherInfo, setWeatherInfo] = useState({
        city:"Lohagaht",
        feelsLike : 17.76,
        humidity : 95,
        temp : 17.48,
        tempMax : 17.48,
        tempMin : 17.48,
        weather : "overcast clouds",
    });
    let updateInfo = (newInfo)=>{
        setWeatherInfo(newInfo);
    }
    return (
        <div className="weatherApp" style={{textAlign :"center"}}>
            <h2>Weather App using react</h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    );
}