import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

class LocationStats extends Component {
  constructor(props){
    super(props)
  }
  
  parseAddress(address){
    var county = "", state = ""
    for (var comp of address){
      if(comp.types.includes("administrative_area_level_2")){
        county = comp.long_name
      }
      if(comp.types.includes("administrative_area_level_1")){
        state = comp.short_name
      }
    }
    return [county, state]
  }

  render() {
    if (this.props.data == null){
      return null
    }
    console.log(this.props.data)
    const addrComponents = this.props.data.gmaps.address_components
    const [countyName, stateName] = this.parseAddress(addrComponents) 
    return (
      <div>
        <h3>{countyName}, {stateName}</h3>
      </div>
    );
  }
}

export default LocationStats;