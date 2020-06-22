import React, { Component } from 'react';
import styled from 'styled-components';
import PokemonLow from './Pokemon-Low';

class PokemonPage extends Component {
  state = {
    totalCount: '',
    previousURL: '',
    nextURL: '',
    currentURL: 'https://pokeapi.co/api/v2/evolution-chain?limit=36&offset=0/',
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
      });
    } catch (e) {
      console.log(e);
    }
  }

  async UNSAFE_componentWillReceiveProps(props) {
    try {
      if (props.arrow === 'previous') {
        this.setState({
          currentURL: this.state.previousURL
        });
        props.changePage('');
      } else if (props.arrow === 'next') {
        this.setState({
          currentURL: this.state.nextURL
        });
        props.changePage('');
      }
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
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { pokemonEvolutions } = this.state;
    return (
      <PokeContainer>
        {pokemonEvolutions.map(pokemon => <PokemonLow key={pokemon.url} pokemon={pokemon} />)}
      </PokeContainer>
    );
  }
}
export default PokemonPage;

const PokeContainer = styled.div`
  width: 375px;
  text-align: center;
  font-family: "Fira Code", monospace;

  @media (min-width: 376px) {
    width: 100vw;
    max-width: 1200px;
  }
`;
