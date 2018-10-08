import { APP_ID } from './.open-weather-config'
import React, { Component } from 'react';
import './App.css';

const BASE_URI = 'https://api.openweathermap.org/data/2.5/weather?'
const LATITUDE_KEY = 'lat='
const LONGTITUDE_KEY = 'lon='
const UNITS_KEY = 'units='
const METRIC_VALUE = 'metric'
const IMPERIAL_VALUE = 'imperial'
const APP_ID_KEY = 'appid='

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      apiUrl: '',
      units: 'metric',
      weatherDescription: '',
      location: '',
      temperature: ''
    }
  }

  getApiUrl ({latitude, longitude}) {
    return `${BASE_URI}${LATITUDE_KEY}${latitude}&${LONGTITUDE_KEY}${longitude}&${UNITS_KEY}${METRIC_VALUE}&${APP_ID_KEY}${APP_ID}`
  }

  getWeather() {
    fetch(this.state.apiUrl)
      .then((response) => response.json() )
      .then((data) => this.setState(
        {
          weatherDescription: data.weather[0].description,
          temperature: data.main.temp,
          location: data.name,
        }
      ))
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const apiUrl = this.getApiUrl(coords)
      this.setState({ apiUrl })
      this.getWeather()
    });
  }


  render() {
    return (
      <div className="App">
        <h1>What's the weather?</h1>
          {this.state.location && 
          <p>
            You are in {this.state.location}. The weather there is {this.state.weatherDescription}. 
            The temperature is {this.state.temperature}.
          </p>}
      </div>
    );
  }
}

export default App;
