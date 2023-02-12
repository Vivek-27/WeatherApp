import React from 'react';
import './Main.css';
import { useState } from 'react';
import axios from 'axios';

const Main = () => {
  const [location, setLocation] = useState({
    location: ''
  });

  const [city, setCity] = useState({
    name: 'Enter city name📍',
    temp: '',
    wind: '',
    con_text: ''
  });

  const [icon, setIcon] = useState({
    icon: ''
  });

  const [loading, setLoading] = useState(false);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setLocation({
      [name]: value
    });
  };

  const search = async (e) => {
    setLoading(true);

    const { data } = await axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=cd25bc2669e34c48a6f133357230302&q=${location.location}&aqi=yes`
      )
      .catch((error) => {
        if (error) alert('Enter valid location !');
        setLoading(false);
      });
    setCity({
      name: data.location.name + `📍`,
      temp: data.current.temp_c + `° C`,
      wind: `Wind Speed: ` + data.current.wind_kph + `Kph`,
      con_text: data.current.condition.text
    });
    setIcon({
      icon: data.current.condition.icon
    });
    setLoading(false);
  };

  const spinner = (
    <>
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </>
  );

  const render = (
    <>
      <div className="wrapper">
        <h1>Weather Today</h1>
        <div>
          <img alt="" src={icon.icon} />
          <h4>{city.con_text}</h4>
        </div>
        <div className="detail">
          <h2>{city.name}</h2>
          <h3>{city.temp}</h3>
          <h4>{city.wind}</h4>
        </div>
        <input
          type="text"
          name="location"
          value={location.location}
          placeholder="Location📍"
          onChange={handelChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              search();
            }
          }}
        />
        <button className="button btn" onClick={() => search()}>
          Search
        </button>
      </div>
    </>
  );

  return (
    // <div className='container'>
    //   {loading ? <p style={{display:'flex', justifyContent:'center', alignItems:'center' }}>loading</p> : render}
    // </div>

    <div className="container">
      {/* <div className='ef ef1'></div> */}

      {loading ? spinner : render}

      {/* <div className='ef ef2'></div> */}
      <img
        className="bac"
        alt=""
        src={`https://source.unsplash.com/random/1200x750/?+${location.location}`}
      />
    </div>
  );
};

export default Main;
