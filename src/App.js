import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import logo from './logo.jpg';
import PokemonDetail from './Pokemon-Detail';
import PokemonPage from './Pokemon-Page';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
        </header>
          <Switch>
            <Route exact path="/" component={PokemonPage} />
            <Route path="/:id" component={PokemonDetail} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
