import React, { Component } from 'react';
import NumberInput from "./NumberInput"
import AlertForm from "./AlertForm"
import "./AlertInterface.css"

class AlertInterface extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayForm: true
    }
    this.displayForm = this.displayForm.bind(this)
  }

  displayForm(value) {
    this.setState({ displayForm: value})
  }

  render() {
    console.log(this.state.displayForm)
    return (
      <div className="AlertInterface">
        <NumberInput 
          displayForm={this.displayForm}
        />
        {this.state.displayForm 
          ? <AlertForm />
          : null
        }
        
      </div>
    );
  }
}

export default AlertInterface