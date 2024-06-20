import React, { useState } from 'react'
import axios from 'axios'

import clouds from './assets/clouds.png';
import clear from './assets/clear.png';
import rain from './assets/rain.png';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  //pass in location
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=82f2b9ee374d22eef2468e4ad07393d1`

  //connect to API when using search function
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  //set weather icons
  const icons = [clear,clouds,rain]
  const getIcon = (data) => {
    switch (data) {
      case "Clear":
        return icons[0]
        break;
      case "Clouds":
        return icons[1]
        break;
      default:
        return icons[2]
    }
  }

  //elements of APP
  return (
    //set background image with different classes
    <div className={ (data.name == undefined) ? "App clouds" : (
      (data.weather[0].main == 'Clear') ? ("App") : (data.weather[0].main == 'Clouds' ? "App Clouds" : "App Rain")
  )}>
      <div className="Search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>


      {(data.name !== undefined && data.weather) && 
      //no reponse if city not found or data not fetched
      
        <div className="Container">
          <div className="Top">
            <div className="Location">
              <p>{data.name}</p>
            </div>
            <div className="Temp">
              <h1>{data.main.temp.toFixed()}°C</h1>
            </div>
            <div className="Description">
              <p>{data.weather[0].main}</p>
              <img className="Icon" src={getIcon(data.weather[0].main)}/>
            </div>
          </div>

          
          <div className="Bottom">
            <div className="Humidity">
                <p>Humidity</p>
                <p className='Bold'>{data.main.humidity}%</p>
            </div>
            <div className="WindSpeed">
                <p>Wind Speed</p>
                <p className='Bold'>{data.wind.speed.toFixed()} MPH</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
