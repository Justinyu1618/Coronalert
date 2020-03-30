import React, { Component } from 'react';
import LocationModal from './LocationModal/LocationModal'
import SettingsBar from './SettingsBar'
import { Button, Segment, Header, Label } from 'semantic-ui-react'
import User from '../../api/user'
import './AlertForm.css'

class AlertForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      locModals: [],
      locData: {},
      settings: {},
      error: false
    }

    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleSubmit  = this.handleSubmit.bind(this)
    this.retrieveSettings = this.retrieveSettings.bind(this)
    this.retrieveLocInfo = this.retrieveLocInfo.bind(this)
  }

  handleAdd(){
    const { locModals, locData } = this.state
    var key = locModals.length
    locData[key] = {}
    this.setState({
      locModals: locModals.concat(
        <Segment key={key}>
          <LocationModal 
            id={key} 
            retrieveLocInfo={this.retrieveLocInfo}
            />
        </Segment>
        ),
      locData: locData
    })
  }
  
  handleRemove(){
    var {locModals, locData} = this.state 
    var popped = locModals.pop()
    delete locData[popped.key]
    this.setState({
      locModals: locModals
    })
  }
  
  handleSubmit(){
    const allData = {
      places: Object.values(this.state.locData),
      settings: this.state.settings,
      phone_number: this.props.number
    }

    User.submit(allData)
    .then(resp => {
      this.props.completeSubmit()
      this.setState({error: false})
    })
    .catch(error => {
      console.log(error)
      this.setState({error: true})
    })


  }
  
  retrieveLocInfo(key, data, type){
    const {locData} = this.state
    if(type == "fips"){
      locData[key].fips = data
    }
    else {
      locData[key].data = data
    }
    this.setState({
      locData: locData
    })
  }

  retrieveSettings(data){
    this.setState({
      settings: data
    })
  }

  render() {
    if(this.state.locModals.length === 0){
      this.handleAdd()
    }
    console.log(this.state)
    return (
      <div className="AlertForm">
        <SettingsBar retrieveSettings={this.retrieveSettings} />
        <Header as='h5'>
          Locations to Track
        </Header>
        <Segment.Group>
          {this.state.locModals}
        </Segment.Group>
        <div className="button-group">
          <div className="edit-buttons-group">
            <Button basic onClick={this.handleAdd} content="Add Location" icon="add" />
            {this.state.locModals.length > 1 
              ? <Button basic onClick={this.handleRemove} content="Remove Location" icon="minus" />
              : null }
          </div>
          <div style={{display:"flex", flexDirection:"column"}}>
            <Button color="blue" onClick={this.handleSubmit}>
              Submit
            </Button>
            
          </div>
        </div>
      </div>

    );
  }
}

export default AlertForm;