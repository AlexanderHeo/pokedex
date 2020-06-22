import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Header';
import PokemonChainDetail from './Pokemon-Chain-Detail';
import PokemonPage from './Pokemon-Page';

class App extends Component {
  state = {
    arrow: ''
  }

  changePage = (value) => {
    this.setState({
      arrow: value
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header changePage={this.changePage}/>
            <Switch>
              <Route exact path="/" render={props => <PokemonPage {...props} arrow={this.state.arrow} changePage={this.changePage} />} />
              <Route path="/:id" render={props => <PokemonChainDetail {...props} />} />
            </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
