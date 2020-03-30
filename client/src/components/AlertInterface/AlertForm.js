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
      settings: null,
      error: false,
      data: null
    }

    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleSubmit  = this.handleSubmit.bind(this)
    this.retrieveSettings = this.retrieveSettings.bind(this)
    this.retrieveLocInfo = this.retrieveLocInfo.bind(this)
  }
  
  componentDidMount() {
    if(this.state.data == null){
      User.getData(this.props.number)
      .then(resp => {
        console.log(resp)
        if(resp.success){
          var locData = {}, locModals = []
          resp.data.places.map((val, i) => {
            locData[i] = val
            locModals.push(
              <Segment key={i}>
                <LocationModal 
                  id={i} 
                  retrieveLocInfo={this.retrieveLocInfo}
                  data={val}
                  />
              </Segment>
            )
          })
          this.setState({
            data: resp.data,
            settings: resp.data.settings
          })
        }
      })
    }
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
    
    if(allData.places[0].fips == null){
      this.setState({
        errorMsg: "Must enter a location!",
        error: true
      })
      return null
    }

    User.submit(allData)
    .then(resp => {
      this.props.completeSubmit()
      this.setState({error: false})
    })
    .catch(error => {
      console.log(error)
      this.setState({error: true, errorMsg: "Could not submit! Please try again later"})
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
        <SettingsBar retrieveSettings={this.retrieveSettings} data={this.state.settings}/>
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
          <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
            <Button color="blue" onClick={this.handleSubmit}>
              Submit
            </Button>
            {this.state.error ? <p>{this.state.errorMsg}</p> : null}
          </div>
        </div>
      </div>

    );
  }
}

export default AlertForm;