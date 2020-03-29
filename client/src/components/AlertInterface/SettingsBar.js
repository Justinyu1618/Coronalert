import React, { Component } from 'react';
import { Segment, Radio, Header, Input } from 'semantic-ui-react'

// https://www.npmjs.com/package/rc-slider
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import './SettingsBar.css'

const marks = {
  0: 'ASAP',
  1: 'Daily',
  2: 'Weekly',
  3: 'Custom'
}

const marksMap = {
  0: 0,
  1: 1,
  2: 7
}

class SettingsBar extends Component {
  constructor(props){
    super(props)

    this.state = {
      showCustomFreq: false,
      freqValue: 0,
      reportChangesValue: true
    }
    
    this.handleSliderChange = this.handleSliderChange.bind(this)
    this.handleCustomChange = this.handleCustomChange.bind(this)
    this.handleRadioChange = this.handleRadioChange.bind(this)
  }
  
  handleSliderChange(value){
    if(value === 3){
      this.setState({
        showCustomFreq: true,
        freqValue: 0,
        reportChangesValue: true
      })
    }
    else {
      this.setState({
        freqValue: marksMap[value],
        showCustomFreq: false
      })
    }
    this.props.retrieveSettings(this.state)
  }

  handleCustomChange(event){
    this.setState({
      freqValue: event.target.value
    })
    this.props.retrieveSettings(this.state)
  }

  handleRadioChange(event){
    this.setState({
      reportChangesValue: !this.state.reportChangesValue
    })
    this.props.retrieveSettings(this.state)
  }

  render() {
    
    return (
      <div className="settings-bar">
        <Segment className="settings-container">
          <div className="alert-freq-wrap">
            <div className="setting-wrap">
              <Header as="h5" className="settings-label">Alert Frequency</Header>
              <Slider className="slider" 
                      marks={marks} 
                      min={0} 
                      max={3} 
                      defaultValue={0} 
                      step={null} 
                      onChange={this.handleSliderChange}/>
            </div>
            {this.state.showCustomFreq 
              ? <Input
                label={{content: 'days' }}
                labelPosition='right'
                placeholder='Every...'
                className="custom-freq"
                transparent
                onChange={this.handleCustomChange}
            />
            : null }
          </div>
          <div className="setting-wrap">
            <Header as="h5" className="settings-label">Only Report Changes</Header>
            <Radio toggle defaultChecked onChange={this.handleRadioChange}/>
          </div>
        </Segment>
      </div>
    );
  }
}

export default SettingsBar