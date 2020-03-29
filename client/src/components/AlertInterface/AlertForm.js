import React, { Component } from 'react';
import LocationModal from './LocationModal/LocationModal'
import SettingsBar from './SettingsBar'
import { Button, Segment, Header } from 'semantic-ui-react'

import './AlertForm.css'

class AlertForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      locModals: []
    }

    this.handleAdd = this.handleAdd.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleAdd(){
    const { locModals } = this.state
    this.setState({
      locModals: locModals.concat(
        <Segment><LocationModal /></Segment>
        )
    })
  }
  
  handleRemove(){
    var {locModals} = this.state 
    locModals.pop()
    console.log(locModals)
    this.setState({
      locModals: locModals
    })
  }

  render() {
    if(this.state.locModals.length === 0){
      this.handleAdd()
    }

    return (
      <div className="AlertForm">
        <SettingsBar />
{/*        <Header as='h5'>
          Locations to Track
        </Header>*/}
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
          <Button color="blue" onClick={this.handleSubmit} content="Submit"/>
        </div>
      </div>

    );
  }
}

export default AlertForm;