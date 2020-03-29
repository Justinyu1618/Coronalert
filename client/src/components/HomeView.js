import React, { Component } from 'react';
import AlertInterface from './AlertInterface/AlertInterface';
import { Header, Menu, Input } from 'semantic-ui-react'

class HomeView extends Component {
  
  constructor(props){
    super(props)

    this.state = {}

    // this.handleNavClick = this.handleNavClick.bind(this)
  }

  
  render() {
    return (
      <div>
        <Header as='h1'> Coronalert 
          <Header.Subheader>
            An Amber Alert system for Covid-19 cases in your area.
          </Header.Subheader>
        </Header>
        
        <AlertInterface />
      </div>
    );
  }
}

export default HomeView
