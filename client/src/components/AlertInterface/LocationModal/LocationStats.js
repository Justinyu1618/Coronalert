import React, { Component } from 'react';
import { Header, Loader } from 'semantic-ui-react';
import Data from '../../../api/data';
import axios from 'axios';
import "./LocationStats.css"

//https://github.com/zcreativelabs/react-simple-maps/issues/22

// https://www.react-simple-maps.io/examples/usa-counties-choropleth-quantile/

const testStats = {Confirmed: "110", Deaths: "4"}
const source = "JHU CSSE"
const time = "10:02 AM 3/29/20"

class LocationStats extends Component {
  constructor(props){
    super(props)
    this.state = {
      stats: null,
      errorMsg: null,
      loading: false
    }

    this.getStats = this.getStats.bind(this)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.data !== this.props.data && this.props.data != null){
      this.getStats()
    }
  }

  getStats(){
    Data.get_data(this.props.data)
    .then(response => {
      console.log(response)
      const {data, source, last_updated} = response.data
      this.setState({
        stats: data,
        source: source,
        lastUpdated: last_updated,
        errorMsg: null,
        loading: false
      })
      this.props.getFIPS(response.data.fips)
    })
    .catch(error => {
      console.log(error)
      if(error.data != null){
        this.setState({errorMsg: error.data.msg})
      }
      this.setState({
        stats: null,
        loading: false
      })
      
    })
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
    if (this.state.loading){
      return <Loader active inline='centered' />
    }
    console.log(this.props.data)
    const addrComponents = this.props.data.gmaps.address_components
    const [countyName, stateName] = this.parseAddress(addrComponents)
    
    const statsList = []
    if(this.state.stats != null){
      for (var entry of Object.entries(this.state.stats)){
        statsList.push(<p key={entry[0]}><strong>{entry[0]}:</strong> {entry[1]}</p>)
      }
    }

    return (
      <div className="LocationStats">
        <h3>{this.state.errorMsg}</h3>
        <h3>{countyName}, {stateName}</h3>
        {statsList}
        <div className="source-block">
          <p>Source: {this.state.source}</p>
          <p>Last Updated: {this.state.lastUpdated}</p>
        </div>
      </div>
    );
  }
}

export default LocationStats;