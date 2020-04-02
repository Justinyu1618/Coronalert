import React, { Component } from 'react';
import AlertInterface from './AlertInterface/AlertInterface';
import { Card, Icon, Image, Header } from 'semantic-ui-react'
import "./AboutView.css"

class AboutView extends Component {
  
  constructor(props){
    super(props)

    this.state = {}

    // this.handleNavClick = this.handleNavClick.bind(this)
  }

  
  render() {
    return (
      <div className="SourcesView">
        <Header as='h1' className="main-title"> About
        </Header>
        <p >
          
          Although some cities have started working on their own text alert systems for Covid-19, the United States has <a href="https://www.washingtonpost.com/weather/2020/03/23/wireless-emergency-alerts-coronavirus/">yet to establish a national alert system</a> for Covid-19, seen in countries such as South Korea. 
        
          Coronalert is an SMS-based, "amber-alert" style app for alerting users of active Covid-19 cases in their area. The alerts are meant to reflect the most up to date data at a frequency chosen by the user.
          <br />
        </p>
        <p>
          The most susceptible population to the Covid-19 outbreak, members of the older generation, are also the least likely demographic to download the latest Covid-19 contact tracing app, or check <a href="https://covid19.health">online data visualizations</a> of Covid-19 cases.
          SMS is not only easy to use and ubiquitous, it's also the most accessible interface for the elderly population to keep up to date with cases of the disease in their area.
          <br/>
        </p>
        <p>
          This was a submission for the <a href="https://covid-global-hackathon.devpost.com">Covid-19 Global Hackathon</a>
        </p>
        
      </div>
    );
  }
}

export default AboutView
