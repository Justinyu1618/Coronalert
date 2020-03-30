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
        
      </div>
    );
  }
}

export default AlertInterface