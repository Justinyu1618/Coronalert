import React from 'react';
import ReactDOM from 'react-dom';
import Geosuggest from 'react-geosuggest';
import { Segment } from 'semantic-ui-react'

import LocationInput from './LocationInput'
import LocationStats from './LocationStats'
import "./LocationInput.css"

// add current location: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

class LocationModal extends React.Component {

  constructor(props){
    super(props)
    
    this.state = {
      selection: null
    }
    this.handleSelection = this.handleSelection.bind(this)
  }

  handleSelection(selection){
    this.setState({selection: selection})
  }

  render(){
    const locStats = this.state.selection === null
                      ? null
                      : <LocationStats />
    return (
      <div className="LocationModal">
        <LocationInput onSelect={this.handleSelection}/>
        <LocationStats data={this.state.selection} />
      </div>
    );
  }
}

export default LocationModal;