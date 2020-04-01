import React from 'react';
import ReactDOM from 'react-dom';
import Geosuggest from 'react-geosuggest';
import { Segment } from 'semantic-ui-react'

import LocationInput from './LocationInput'
import LocationStats from './LocationStats'
import "./LocationModal.css"

// add current location: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

class LocationModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selection: null,
      fips: null,
      defaultVal: null
    }
    this.handleSelection = this.handleSelection.bind(this)
    this.getFIPS = this.getFIPS.bind(this)
    this.update = this.update
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.data !== this.props.data && this.props.data != null){
      this.update()
    }
  }
  
  componentDidMount() {
    this.update()
  }
  
  update(){
    if(this.props.data != null){
      this.setState({
        defaultVal: this.props.data.data.description,
        selection: this.props.data.data,
        fips: this.props.data.data.fips
      })
      console.log(this.props.data)
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
    const locStats = this.state.selection === null
                      ? null
                      : <LocationStats />
    return (
      <div className="LocationModal">
        <LocationInput default={this.state.defaultVal} onSelect={this.handleSelection}/>
        <LocationStats default={this.state.fips} data={this.state.selection} getFIPS={this.getFIPS} />
      </div>
    );
  }
}

export default LocationModal;