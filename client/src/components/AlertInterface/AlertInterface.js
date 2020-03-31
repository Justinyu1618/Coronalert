import React, { Component } from 'react';
import NumberInput from "./NumberInput"
import AlertForm from "./AlertForm"
import "./AlertInterface.css"
import User from "../../api/user"

class AlertInterface extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayForm: false,
      number: null,
      data: null,
      submitted: false
    }
    
    this.displayForm = this.displayForm.bind(this)
    this.retrieveNumber = this.retrieveNumber.bind(this)
    this.completeSubmit = this.completeSubmit.bind(this)
  }

  displayForm(value) {
    this.setState({ displayForm: value, submitted: false})
  }
  
  retrieveNumber(value){
    this.setState({
      number: value
    })
  }

  completeSubmit(){
    this.setState({displayForm: false, submitted: true})
  }

  render() {
    return (
      <div className="AlertInterface">
        <NumberInput 
          displayForm={this.displayForm}
          retrieveNumber={this.retrieveNumber}
        />
        {this.state.displayForm 
          ? <AlertForm number={this.state.number} completeSubmit={this.completeSubmit} />
          : <h5 className="label">Put in your phone number to get started</h5>
        }
        {this.state.submitted
          ? <h4 style={{color:'grey'}}>Thanks for submitting! To edit any settings, simply re-fill out this form</h4>
          : null }
      </div>
    );
  }
}

export default AlertInterface