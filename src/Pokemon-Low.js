import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// image
import pokeball from './pokeballOpenT.png';

class PokemonLow extends Component {
  state = {
    pokemon: {}
  }

  async componentDidMount() {
    try {
      // https://pokeapi.co/api/v2/evolution-chain/ID/
      const res = await fetch(`${this.props.pokemon.url}`);
      const pokeEvolution = await res.json();
      // pokeEvolution: {chain: {}, id: XX}

      let pokeSpecies = '';
      if (!pokeEvolution.chain.is_baby) {
        pokeSpecies = pokeEvolution.chain.species.url;
      } else if (pokeEvolution.chain.is_baby) {
        pokeSpecies = pokeEvolution.chain.evolves_to[0].species.url;
      }

      const resPokeSpecies = await fetch(`${pokeSpecies}`);
      const pokeSpecs = await resPokeSpecies.json();
      const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeSpecs.id}`)
      const pokemon = await resPokemon.json();
      const pokename = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      this.setState({
        pokemon: {
          chainId: pokeEvolution.id,
          evolution: pokeEvolution,
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
      <Link to={{
          pathname: `/${pokemon.chainId}`,
          state: {
            evolution: pokemon.evolution,
          }
        }}>
        <PokeGrid>
          <img src={pokeball} alt="pokeball" className="pokeball" />
          <img src={pokemon.url} alt="pokemon" />
        </PokeGrid>
      </Link>
    )
  }
}
export default PokemonLow;

const PokeGrid = styled.div`
  position: relative;
  width: 20vw;
  margin: 7px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  overflow: hidden;

  img {
    z-index: 2;
  }
  &:hover img:nth-of-type(1) {
    animation: pokeball 0.2s ease-in 0.3s forwards;
  }
  @keyframes pokeball {
    to {
      transform: scale(0);
      opacity: 0;
    }
  }
  &:hover img:nth-of-type(2) {
    animation: pokemon 0.35s ease-in 0.3s forwards;
  }
  @keyframes pokemon {
    to {
      transform: scale(1.65);
    }
  }
  .pokeball {
    position: absolute;
    width: 60%;
    height: 60%;
    opacity: 0.7;
  }
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("./pokeballOpen.png");
    z-index: 2;
  }
  @media (min-width: 768px) {
    width: calc(87vw / 6);
    max-width: 182px;
    img {
      width: 100%;
    }
  }
`;
