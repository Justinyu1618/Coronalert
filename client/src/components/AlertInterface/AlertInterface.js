import React, { Component } from 'react';
import NumberInput from "./NumberInput"
import AlertForm from "./AlertForm"
import "./AlertInterface.css"

class AlertInterface extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayForm: true,
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
          : null
        }
        
      </div>
    );
  }
}

export default AlertInterface