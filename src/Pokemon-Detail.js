import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class PokemonDetail extends Component {
  state = {
    pokemon: {},
    url: ''
  }

  async componentDidMount() {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`);
      const pokemon = await res.json();
      const pokename = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      this.setState({
        url: pokemon.sprites.front_default,
        pokemon: pokemon,
        pokename: pokename,
      });
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const { pokemon } = this.state;

    return(
      <Pokemon>
        <div className='container'>
          <h1>{this.state.pokename}</h1>
          <img src={this.state.url} alt={pokemon.name}/>
          <p>id: {pokemon.id}</p>
          <p>{pokemon.weight} grams</p>
          <p>{pokemon.height} decimeters</p>
          <Link to="/">
            <button>Return</button>
          </Link>
        </div>
      </Pokemon>
    )
  }
}

const Pokemon = styled.div`
  width: 375px;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Fira Mono", monospace;
  background-color: #282c34;

  .container {
    width: 80%;
    height: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 5px;
    background-color: gainsboro;
    margin-block-start: 25px;
    margin-block-end: 25px;
  }
  h1 {
    color: black;
  }
  h1:link {
    text-decoration: none;
  }
  button {
    margin-block-end: 1.5em;
  }
`;

export default PokemonDetail;
