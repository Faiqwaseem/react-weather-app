import React, { useState } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'





const Header = () => {
  const API_KEY = 'bb0be5469f7916c48e67510346c3f1aa';
  const [city, setCity] = useState("");
  const [allData, setData] = useState(null);
  async function search() {
    if (!city) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a city name',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      return;
    }
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await res.json()
      if (data.cod !== 200) {
        Swal.fire({
          title: 'Error!',
          text: data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });

        return;
      }
      setData(data)
      console.log(data)





    }
    catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }






    setCity("")
  }



  let date = "";
  let time = "";
  let visibilityResult = ""
  if (allData) {
    // set Date and Timing/

    const optionDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const optionTime = { hour: '2-digit', minute: '2-digit' }
    const timeMili = allData.dt;
    const timeZone = allData.timezone;
    const localTime = new Date((timeMili + timeZone) * 1000)
    date = localTime.toLocaleDateString('en-PK', optionDate)
    time = localTime.toLocaleTimeString('en-PK', optionTime)

    const visibilityChech = allData.visibility;
    visibilityResult = (visibilityChech / 1000).toFixed(1)
    console.log(visibilityResult)

  }




  return (
    <div>
      <div className="current-weather">
        <div className="weather-header">
          <div className="location-time">
            <div className="location">{allData?.name}</div>
            <div className="time">{allData ? `${date}  ${time}` : "Weather"}</div>
          </div>
          <div className="current-weather-main">
            <div className="weather-icon-temp">
              <img src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png" className="weather-icon" alt="Weather Icon" />
              <div className="current-temp">{allData?.main.temp}</div>
            </div>
            <div className="weather-info">
              <div className="weather-condition">Sunny</div>
              <div className="weather-description">Feels like {allData?.main.feels_like}° • Max: {allData?.main.temp_max}° Low: {allData?.main.temp_min}°</div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Search Section --> */}
      <div className="search-section">
        <div className="search-container">
          <input type="text" className="search-input" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Search for a city..." />
          <button className="search-btn" onClick={search}><i className="fas fa-search"></i> Search</button>
        </div>
      </div>

      <div className="weather-details">
        <div className="details-grid">
          <div className="detail-card">
            <i className="fas fa-wind detail-icon"></i>
            <div className="detail-label">Wind Speed</div>
            <div className="detail-value">{allData?.wind.speed}</div>
          </div>
          <div className="detail-card">
            <i className="fas fa-tint detail-icon"></i>
            <div className="detail-label">Humidity</div>
            <div className="detail-value">{allData?.main.humidity}%</div>
          </div>
          <div className="detail-card">
            <i className="fas fa-cloud-rain detail-icon"></i>
            <div className="detail-label">Precipitation</div>
            <div className="detail-value">{allData?.current?.uvi || "no"}</div>
          </div>
          <div className="detail-card">
            <i className="fas fa-eye detail-icon"></i>
            <div className="detail-label">Visibility</div>
            <div className="detail-value">{allData ? visibilityResult : "%"}</div>
          </div>
          <div className="detail-card">
            <i className="fas fa-sun detail-icon"></i>
            <div className="detail-label">UV Index</div>
            <div className="detail-value">{allData?.current?.uvi || "no"}</div>
          </div>
          <div className="detail-card">
            <i className="fas fa-cloud detail-icon"></i>
            <div className="detail-label">Cloud Cover</div>
            <div className="detail-value">{allData?.clouds.all}%</div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Header