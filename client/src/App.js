import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';

import LocationInput from './components/LocationInput'


class App extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places";
    document.head.appendChild(script);
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <LocationInput />
      </div>
    );
  }
}

export default App;
