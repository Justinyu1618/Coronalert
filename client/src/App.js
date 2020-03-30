import React, { Component} from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';

import HomeView from './components/HomeView'

class App extends Component {
  // componentDidMount() {
  //   const script = document.createElement("script");
  //   script.async = true;
  //   script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${process.env.REACT_APP_GMAPS_API_KEY}`;
  //   script.type = "text/javascript"
  //   document.head.appendChild(script);
  // }
  constructor(props){
    super(props)

    this.state = {}

    // this.handleNavClick = this.handleNavClick.bind(this)
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render(){
    const { activeItem } = this.state
    return (
      <div className="App">
        <Menu className="navbar" size={"massive"} secondary>
          <Menu.Menu position="right">
            <Menu.Item
              name='sources'
              active={activeItem === 'home'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name='about'
              active={activeItem === 'messages'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
        <HomeView />
        <div className="footer">
          <div className="footer-content">
            <a href="https://jsyu.me" 
              target="_blank">
              Justin Yu</a> 2020
            <a href="https://github.com/justinyu1618/Coronalert" 
              target="_blank" 
              style={{marginLeft:"10px"}}>
              <Icon 
                size={'large'} 
                name="github" 
                color="grey" 
                data-tip="Source Code"
                link={true}
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
