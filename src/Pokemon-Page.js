import React, { Component } from 'react';
import styled from 'styled-components';
import Pokemon from './Pokemon';

class PokemonPage extends Component {
  state = {
    totalCount: '',
    previousURL: '',
    nextURL: '',
    currentURL: 'https://pokeapi.co/api/v2/evolution-chain?limit=20&offset=20/',
    pokemonEvolutions: []
  }

  async componentDidMount() {
    try {
      const res = await fetch(this.state.currentURL);
      const pokemons = await res.json();

      const total = pokemons.count;
      const previousURL = pokemons.previous;
      const nextURL = pokemons.next;

      this.setState({
        totalCount: total,
        previousURL: previousURL,
        nextURL: nextURL,
        pokemonEvolutions: pokemons.results
      })
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { pokemonEvolutions } = this.state;
    return (
      <PokeContainer>
        {pokemonEvolutions.map(pokemon => <Pokemon key={pokemon.url} pokemon={pokemon} />)}
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
  @media (min-width: 376px) {
    width: 100vw;
  }
`;
