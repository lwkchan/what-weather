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

  getApiUrl () {
    const unitsValue = this.state.useMetric? this.state.units.apiValue.metric : this.state.units.apiValue.imperial
    const { latitude, longitude } = this.state.coords
    return `${BASE_URI}${LATITUDE_KEY}${latitude}&${LONGTITUDE_KEY}${longitude}&${UNITS_KEY}${unitsValue}&${APP_ID_KEY}${APP_ID}`
  }

  getWeather() {
    const apiUrl = this.getApiUrl();
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({
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
      {useMetric: !this.state.useMetric},
      () => this.getWeather()
    )
  }


  render() {
    return (
      <div className="App">
        <h1>What's the weather?</h1>
          {this.state.location && 
          <div>
            <p>
              You are in {this.state.location}. The weather there is {this.state.weatherDescription}. 
              The temperature is {this.state.temperature} {this.state.useMetric? this.state.units.unitSymbol.metric : this.state.units.unitSymbol.imperial  }.
            </p>
            <button onClick={this.changeUnit}>
              See the weather in {this.state.useMetric? this.state.units.name.imperial : this.state.units.name.metric}
            </button>
          </div>
          }
      </div>
    );
  }
}

export default App;
