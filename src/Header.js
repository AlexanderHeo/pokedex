import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from './logo.jpg';
import arrowBlue from './pokemonArrowBlue.png';
import arrowRed from './pokemonArrowRed.png';


class Header extends Component {

  render() {
    return(
      <AppHeader>
        <button type="button" className="previous" value="previous" onClick={event => this.props.changePage(event.currentTarget.value)}>
          <img className="arrow" src={arrowBlue} alt="arrow" />
        </button>
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <button type="button" className="next" value="next" onClick={event => this.props.changePage(event.currentTarget.value)}>
          <img className="arrow" src={arrowRed} alt="arrow" />
        </button>
      </AppHeader>
    )
  }
}

const AppHeader = styled.div`
  width: 375px;
  height: 100px;
  position: sticky;
  top: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  background-color: #282c34;

  a {
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .previous,
  .next {
    width: 55px;
    height: 25px;
    margin: 0 10px;
  }
  .previous {
    color: blue;
    transform: rotateY(180deg);
  }
  .arrow {
    width: 100%;
    height: 100%;
  }
  .App-logo {
    width: 100%;
    height: 100%;
  }
  .App-link {
    color: #61dafb;
  }

  @media (min-width: 376px) {
    {
      width: 100vw;
      height: 125px;
    }
    a {
      height: 125px;
    }
  }
  @media (min-width: 600px) {
    {
      width: 100vw;
      height: 145px;
    }
    a {
      width: 500px;
      height: 145px;
    }
  }

`;

export default Header;
