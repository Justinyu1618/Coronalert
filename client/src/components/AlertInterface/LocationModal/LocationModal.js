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
      selection: null,
      fips: null
    }
    this.handleSelection = this.handleSelection.bind(this)
    this.getFIPS = this.getFIPS.bind(this)
  }
  
  componentDidMount() {
    if(this.props.data != null){
      this.setState({
        selection: this.props.data.data,
        fips: this.props.data.fips
      })
    }
  }

  handleSelection(selection){
    this.setState({selection: selection})
    this.props.retrieveLocInfo(this.props.id, selection, "location")
  }
  
  getFIPS(fips){
    this.setState({fips: fips})
    this.props.retrieveLocInfo(this.props.id, fips, "fips")
  }

  render(){
    console.log("bruh " + this.props.id)
    const locStats = this.state.selection === null
                      ? null
                      : <LocationStats />
    return (
      <div className="LocationModal">
        <LocationInput onSelect={this.handleSelection}/>
        <LocationStats data={this.state.selection} getFIPS={this.getFIPS} />
      </div>
    );
  }
}

export default LocationModal;