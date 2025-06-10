import TextField from '@mui/material/TextField';
import "./SearchBox.css"
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function SearchBox({updateInfo}){
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const API_Url = "http://api.openweathermap.org/geo/1.0/direct" ;
    const API_key = "77f07c803373ad908bc39b78c23523ee" ;

    let getCityweather = async ()=>{
        try{
            let res1 = await fetch(`${API_Url}?q=${city}&limit=5&appid=${API_key}`);
            let jsonres1 = await res1.json();
            let weatherres = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${jsonres1[0].lat}&lon=${jsonres1[0].lon}&appid=${API_key}&units=metric`);
            let jsonweatherres = await weatherres.json();
            let result= {
                city : city,
                temp: jsonweatherres.main.temp,
                tempMax: jsonweatherres.main.temp_max,
                tempMin: jsonweatherres.main.temp_min,
                humidity: jsonweatherres.main.humidity,
                feelsLike: jsonweatherres.main.feels_like,
                weather: jsonweatherres.weather[0].description,
            }
            console.log(result);
            return result;
        }
        catch(error){
            throw(error);
        }
    }

    let handelInput = (evt) =>{
        setCity(evt.target.value);
    }
    let handelSubmit = async (evt) =>{
        try{
            evt.preventDefault();
            console.log(city);
            setCity("");
            let info = await getCityweather();
            updateInfo(info);
        }
        catch(err){
            setError(true);            
        }
    }
    return (
        <div className="SearchBox">
            <br />
            <form action="">
                <TextField id="cityName" label="City Name" variant="outlined" value={city} onChange={handelInput} required/>
                <br /><br />
                <Button variant="contained" type='submit' onClick={handelSubmit}>Search</Button>
                {error &&  <p style={{color: "red"}}>No Such place exist in our API    </p>}
            </form>
        </div>
    );
}