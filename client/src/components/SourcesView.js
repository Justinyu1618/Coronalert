import React, { Component } from 'react';
import AlertInterface from './AlertInterface/AlertInterface';
import { Card, Icon, Image, Header } from 'semantic-ui-react'
import "./SourcesView.css"

class SourcesView extends Component {
  
  constructor(props){
    super(props)

    this.state = {}

    // this.handleNavClick = this.handleNavClick.bind(this)
  }

  
  render() {
    return (
      <div className="SourcesView">
        <Header as='h1' className="main-title"> Sources
        </Header>
        <p>
            Coronalert pulls from open source datasets that are regularly updated.<br/>Currently, the highest resolution data available is at the <b>county-level</b>.
        </p>
        <Card.Group className="source-card">
        <Card fluid href="https://github.com/CSSEGISandData/COVID-19" target="_blank" link>
          <Image src='https://systems.jhu.edu/wp-content/uploads/2020/02/Dashboard_screenshot-1024x456.png' wrapped ui={false} />
          <Card.Content>
            <Card.Header>Johns Hopkins University CSSE</Card.Header>
            <Card.Meta>
              <span className='date'>Center for Systems Science and Engineering</span>
            </Card.Meta>
            <Card.Description>
              The Johns Hokins Center for Systems Science and Engineering collects data from a variety of sources
              and compiles them daily into one github repository.

              More information can be found<a href="https://systems.jhu.edu/research/public-health/ncov/"> here.</a>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='clock' />
              Updated Daily
            </a>
          </Card.Content>
        </Card>
        <Card fluid href="https://github.com/nytimes/covid-19-data" target="_blank" link>
          <Image src='https://static01.nyt.com/images/2020/03/03/us/coronavirus-us-cases-map-promo-1583277425489/coronavirus-us-cases-map-promo-1583277425489-superJumbo-v164.png' wrapped ui={false} />
          <Card.Content>
            <Card.Header>New York Times</Card.Header>
            <Card.Meta>
              <span className='date'></span>
            </Card.Meta>
            <Card.Description>
              Database compiled by the New York Times to track Covid-19 on the county level.

              More information can be found<a href="https://www.nytimes.com/article/coronavirus-county-data-us.html"> here.</a>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='clock' />
              Updated Regularly
            </a>
          </Card.Content>
        </Card>
        </Card.Group>
      </div>
    );
  }
}

export default SourcesView
