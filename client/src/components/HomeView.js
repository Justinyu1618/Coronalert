import React, { Component } from 'react';
import AlertInterface from './AlertInterface/AlertInterface';
import { Header, Menu, Input } from 'semantic-ui-react'
import "./HomeView.css"
class HomeView extends Component {
  
  constructor(props){
    super(props)

    this.state = {}

    // this.handleNavClick = this.handleNavClick.bind(this)
  }

  
  render() {
    return (
      <div className="HomeView">
        <Header as='h1' id="main-title"> Coronalert 
          <Header.Subheader style={{fontSize: '0.5em'}}>
            An Amber Alert system for Covid-19 cases in your area.
          </Header.Subheader>
        </Header>
        <AlertInterface />
      </div>
    );
  }
}

export default HomeView
