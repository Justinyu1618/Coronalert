import React from 'react';
import ReactDOM from 'react-dom';
import Geosuggest from 'react-geosuggest';
import "./LocationInput.css"
import { Segment } from 'semantic-ui-react'

// add current location: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

class LocationInput extends React.Component {

  constructor(props){
    super(props)

    this.onSuggestSelect = this.onSuggestSelect.bind(this)
  }
  /**
   * When the input receives focus
   */
  onFocus(): void {
    console.log('onFocus');
  }

  /**
   * When the input loses focus
   */
  onBlur(value?: string): void {
    console.log('onBlur', value);
  }

  /**
   * When the input got changed
   */
  onChange(value: string) {
    console.log('input changes to :' + value);
  }

  /**
   * When a suggest got selected
   */
  onSuggestSelect(suggest: any) {
    this.props.onSelect(suggest)
    console.log(suggest);
  }

  /**
   * When there are no suggest results
   */
  onSuggestNoResults(userInput: string) {
    console.log('onSuggestNoResults for :' + userInput);
  }

  /**
   * Render the example app
   * @return {Function} React render function
   */
  render(){
    const fixtures = [  // TODO: Get actual location for these counties
      {label: 'New York City', location: {lat: 40.7033127, lng: -73.979681}},
      {label: 'Santa Clara', location: {lat: -22.066452, lng: -42.9232368}},
      {label: 'King County, Washington', location: {lat: 35.673343, lng: 139.710388}}
    ];

    return (
      <div className="LocationInput">
        <Geosuggest
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onSuggestSelect={this.onSuggestSelect}
          onSuggestNoResults={this.onSuggestNoResults}
          location={new window.google.maps.LatLng(53.558572, 9.9278215)}
          country="us"
          radius="20"
          placeholder="Enter zipcode or address"
        />
      </div>
    );
  }
}

export default LocationInput;