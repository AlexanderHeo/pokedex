import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
// stylesheet
import './App.css';
// components
import Header from './Header';
import PokemonEvolutionChart from './Pokemon-Evolution-Chart';
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
        <Pokedex>
          <Header changePage={this.changePage}/>
            <Switch>
              <Route exact path="/" render={props => <PokemonPage {...props} arrow={this.state.arrow} changePage={this.changePage} />} />
              <Route path="/:id" render={props => <PokemonEvolutionChart {...props} />} />
            </Switch>
        </Pokedex>
      </Router>
    );
  }
}
export default App;

const Pokedex = styled.div`
  width: 100vw;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
