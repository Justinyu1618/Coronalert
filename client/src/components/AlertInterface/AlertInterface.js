import React, { Component } from 'react';
import NumberInput from "./NumberInput"
import AlertForm from "./AlertForm"
import "./AlertInterface.css"

class AlertInterface extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayForm: false,
      number: null
    }
    
    this.displayForm = this.displayForm.bind(this)
    this.retrieveNumber = this.retrieveNumber.bind(this)
  }

  displayForm(value) {
    this.setState({ displayForm: value})
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
    console.log(this.state.displayForm)
    return (
      <div className="AlertInterface">
        <NumberInput 
          displayForm={this.displayForm}
          retrieveNumber={this.retrieveNumber}
        />
        {this.state.displayForm 
          ? <AlertForm number={this.state.number} />
          : <h5 className="label">Put in your phone number to get started!</h5>
        }
        {this.state.submitted
          ? <h3>Thanks for submitting! To edit any settings, simple re-fill out this form</h3>
          : null }
      </div>
    );
  }
}

export default AlertInterface