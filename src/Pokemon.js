import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class Pokemon extends Component {
  state = {
    pokemon: {}
  }

  async componentDidMount() {
    try {
      // console.log(this.props.pokemon)
      // https://pokeapi.co/api/v2/evolution-chain/ID/
      const res = await fetch(`${this.props.pokemon.url}`);
      const pokeEvolution = await res.json();
      // console.log(pokeEvolution);

      let pokeSpecies = '';
      if (!pokeEvolution.chain.is_baby) {
        console.log(pokeEvolution.id, 'is not baby')
        pokeSpecies = pokeEvolution.chain.species.url;
      } else if (pokeEvolution.chain.is_baby) {
        console.log(pokeEvolution.id, 'is baby')
        pokeSpecies = pokeEvolution.chain.evolves_to[0].species.url;
      }

      const resPokeSpecies = await fetch(`${pokeSpecies}`);
      const pokeSpecs = await resPokeSpecies.json();
      const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeSpecs.id}`)
      const pokemon = await resPokemon.json();

      const pokename = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      this.setState({
        pokemon: {
          name: pokename,
          id: pokemon.id,
          url: pokemon.sprites.front_default
        }
      })
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const {pokemon} = this.state;
    return(
      <Link to={`/${pokemon.id}`}>
        <PokeGrid>
          <img src={pokemon.url} alt="pokemon" />
        </PokeGrid>
      </Link>
    )
  }
}

const PokeGrid = styled.div`
  width: 77px;
  margin: 7px;
  height: 110px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  background-color: gainsboro;
  span {
    margin-top: 15px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  &:hover img {
    transform: scale(1.35);
  }
  @media (min-width: 376px) {
    width: 145px;
    height: 200px;
  }
`;

export default Pokemon;
