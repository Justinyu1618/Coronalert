import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';


import LocationInput from './components/LocationInput/LocationInput'
// import LocationInput2 from './components/LocationInput2'


class App extends Component {
  // componentDidMount() {
  //   const script = document.createElement("script");
  //   script.async = true;
  //   script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${process.env.REACT_APP_GMAPS_API_KEY}`;
  //   script.type = "text/javascript"
  //   document.head.appendChild(script);
  // }

  render(){
    console.log(process.env)
    return (
      <div className="App">
        <LocationInput /> 
      </div>
    );
  }
}

export default App;
