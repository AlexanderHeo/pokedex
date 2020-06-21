import React, { Component } from 'react';
import styled from 'styled-components';
import Pokemon from './Pokemon';

class PokemonPage extends Component {
  state = {
    pokemons: []
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=80&offset=0/');
      const pokemons = await res.json();
      this.setState({
        pokemons: pokemons.results
      })
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { pokemons } = this.state;
    return (
      <PokeContainer>
        {pokemons.map(pokemon => <Pokemon key={pokemon.url} pokemon={pokemon} />)}
      </PokeContainer>
    );
  }
}

export default PokemonPage;

const PokeContainer = styled.div`
  width: 375px;
  text-align: center;
  background-color: #282c34;
  font-family: "Fira Code", monospace;
  a {
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 700;
    color: black;
    margin-block-start: 2px;
  }
`;
