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
      isLoading: true,
      useMetric: true,
      units: {
        name: {
          metric: 'celsius',
          imperial: 'farenheit'
        },
        unitSymbol: {
          metric: '°C',
          imperial: '°F'
        },
        apiValue: {
          metric: METRIC_VALUE,
          imperial: IMPERIAL_VALUE
        },
      },
      weatherDescription: '',
      location: '',
      coords: {
        latitude: '',
        longitude: ''
      },
      temperature: ''
    }
    this.changeUnit = this.changeUnit.bind(this)
  }

  getApiUrl() {
    const unitsValue = this.state.useMetric? this.state.units.apiValue.metric : this.state.units.apiValue.imperial
    const { latitude, longitude } = this.state.coords
    return `${BASE_URI}${LATITUDE_KEY}${latitude}&${LONGTITUDE_KEY}${longitude}&${UNITS_KEY}${unitsValue}&${APP_ID_KEY}${APP_ID}`
  }

  getWeather() {
    const apiUrl = this.getApiUrl();
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({
        isLoading: false,
        weatherDescription: data.weather[0].description,
        location: data.name,
        temperature: data.main.temp,
      }))
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { longitude, latitude } = coords
      this.setState({ coords: { longitude, latitude } })
      this.getWeather()
    });
  }

  changeUnit() {
    this.setState(
      {useMetric: !this.state.useMetric, isLoading: true },
      () => this.getWeather()
    )
  }


  render() {
    const { 
      isLoading,
      useMetric,
      units,
      location,
      weatherDescription,
      temperature
    } = this.state
    return (
      <div className="App">
        <h1>What's the weather?</h1>
          {temperature && 
            <ul>
              <li>You are in {location}. The weather is {weatherDescription}.</li>
              {!isLoading &&
              <li> The temperature is {temperature} {useMetric? units.unitSymbol.metric : units.unitSymbol.imperial  }</li>}
            </ul>}
          {!isLoading &&
            <button onClick={this.changeUnit}>
              See the weather in {useMetric? units.name.imperial : units.name.metric}
            </button>}
      </div>
    );
  }
}

export default App;
