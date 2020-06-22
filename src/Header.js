import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import arrowBlue from './pokemonArrowBlue.png';
import arrowRed from './pokemonArrowRed.png';
import logo from './PokemonLogoWhiteBackground.jpg';


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
  position: sticky;
  top: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  z-index: 4;

  .previous,
  .next {
    width: 20vw;
    max-width: 200px;
    height: calc(25vw / 3);
    max-height: 83.5px;
    border: none;
    background-color: #fff;
  }
  .previous {
    color: blue;
    transform: rotateY(180deg);
    margin-right: 10px;
  }
  .next {
    margin-left: 10px;
  }
  .arrow {
    width: 100%;
    height: 100%;
  }

  .App-logo {
    width: 50vw;
    min-width: 180px;
    max-width: 450px;
  }

  @media (min-width: 376px) {
    {
      width: 100vw;
    }
  }
  @media (min-width: 768px) {
    .previous {
      margin-left: 30px;
    }
    .next {
      margin-right: 30px;
    }
  }
`;

export default Header;
