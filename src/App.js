import { APP_ID } from './.open-weather-config'
import React, { Component } from 'react';
import './App.css';

const BASE_URI = 'https://api.openweathermap.org/data/2.5/weather?'
const LATITUDE_PARAM = 'lat='
const LONGTITUDE_PARAM = 'lon='
const APP_ID_PARAM = 'appid='

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      apiUrl: ''
    }
  }

  getApiUrl ({latitude, longitude}) {
    return `${BASE_URI}${LATITUDE_PARAM}${latitude}&${LONGTITUDE_PARAM}${longitude}&${APP_ID_PARAM}${APP_ID}`
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const apiUrl = this.getApiUrl(coords)
      this.setState({ apiUrl })
      fetch(apiUrl)
        .then((response) => response.json() )
        .then((data) => { console.log(data)})
    });
  }


  render() {
    return (
      <div className="App">
      <h1>{console.log(this.state)}</h1>
      </div>
    );
  }
}

export default App;
