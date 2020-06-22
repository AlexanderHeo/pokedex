import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class PokemonChainDetail extends Component {
  state = {
    pokemonBaby: [],
    pokemonLow: [],
    pokemonMid: [],
    pokemonHigh: [],
  }

  async componentDidMount() {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${this.props.match.params.id}`);
      const pokemonChain = await res.json();
      // pokemonChain.chain{evolves_to:[{}], is_baby: boolean, id: XX}
      let pokemonBaby = [];
      let pokemonLow = [];
      let pokemonMid = [];
      let pokemonHigh = [];

      if(pokemonChain.chain.is_baby) {
        const resPokemonBabySpecies = await fetch(pokemonChain.chain.species.url);
        const pokemonBabySpecies = await resPokemonBabySpecies.json();
        // console.log(pokemonBabySpecies);
        const resPokemonBaby = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonBabySpecies.id}`);
        pokemonBaby = await resPokemonBaby.json();

        const resPokemonLowSpecies = await fetch(pokemonChain.chain.evolves_to[0].species.url);
        const pokemonLowSpecies = await resPokemonLowSpecies.json();
        // console.log(pokemonLowSpecies);
        const resPokemonLow = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonLowSpecies.id}`);
        pokemonLow = await resPokemonLow.json();

        const resPokemonMidSpecies = await fetch(pokemonChain.chain.evolves_to[0].evolves_to[0].species.url);
        const pokemonMidSpecies = await resPokemonMidSpecies.json();
        // console.log(pokemonMidSpecies);
        const resPokemonMid = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonMidSpecies.id}`);
        pokemonMid = await resPokemonMid.json();

        // console.log(pokemonChain.chain.evolves_to[0].evolves_to[0].evolves_to[0])
        if (pokemonChain.chain.evolves_to[0].evolves_to[0].evolves_to[0]) {
          const resPokemonHighSpecies = await fetch(pokemonChain.chain.evolves_to[0].evolves_to[0].evolves_to[0].species.url);
          const pokemonHighSpecies = await resPokemonHighSpecies.json();
          // console.log(pokemonHighSpecies);
          const resPokemonHigh = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonHighSpecies.id}`);
          pokemonHigh = await resPokemonHigh.json();
          // chain.evolves_to[0].evolves_to[0].species.url
        }
        this.setState({
          pokemonBaby: pokemonBaby,
          pokemonLow: pokemonLow,
          pokemonMid: pokemonMid,
          pokemonHigh: pokemonHigh,
        })
      } else if(!pokemonChain.chain.is_baby) {
        const resPokemonLowSpecies = await fetch(pokemonChain.chain.species.url);
        const pokemonLowSpecies = await resPokemonLowSpecies.json();
        // console.log(pokemonLowSpecies);
        const resPokemonLow = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonLowSpecies.id}`);
        pokemonLow = await resPokemonLow.json();

        const resPokemonMidSpecies = await fetch(pokemonChain.chain.evolves_to[0].species.url);
        const pokemonMidSpecies = await resPokemonMidSpecies.json();
        // console.log(pokemonMidSpecies);
        const resPokemonMid = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonMidSpecies.id}`);
        pokemonMid = await resPokemonMid.json();
console.log(pokemonChain)
        if (pokemonChain.chain.evolves_to[0].evolves_to[0]) {
          const resPokemonHighSpecies = await fetch(pokemonChain.chain.evolves_to[0].evolves_to[0].species.url);
          const pokemonHighSpecies = await resPokemonHighSpecies.json();
          // console.log(pokemonHighSpecies);
          const resPokemonHigh = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonHighSpecies.id}`);
          pokemonHigh = await resPokemonHigh.json();
        }

        this.setState({
          pokemonLow: pokemonLow,
          pokemonMid: pokemonMid,
          pokemonHigh: pokemonHigh,
        })
      }
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const { pokemonBaby, pokemonLow, pokemonMid, pokemonHigh } = this.state;

    return pokemonLow.length === 0
      ? <h1>loading...</h1>
      : (
        <Pokemon>
          <div className='container'>
            {
              pokemonBaby.length !== 0
                && <div className='baby'>
                    <h3>Baby Form: {pokemonBaby.name.charAt(0).toUpperCase() + pokemonBaby.name.slice(1)}</h3>
                    <div>{pokemonBaby.weight}grams</div>
                    <div>{pokemonBaby.height}decimeters</div>
                    <img src={pokemonBaby.sprites.front_default} alt={pokemonBaby.name} />
                  </div>
            }
            <div className='Low'>
              <h3>Low Form: {pokemonLow.name.charAt(0).toUpperCase() + pokemonLow.name.slice(1)}</h3>
              <div>{pokemonLow.weight}grams</div>
              <div>{pokemonLow.height}decimeters</div>
              <img src={pokemonLow.sprites.front_default} alt={pokemonLow.name} />
            </div>
            <div className='Mid'>
              <h3>Mid Form: {pokemonMid.name.charAt(0).toUpperCase() + pokemonMid.name.slice(1)}</h3>
              <div>{pokemonMid.weight}grams</div>
              <div>{pokemonMid.height}decimeters</div>
              <img src={pokemonMid.sprites.front_default} alt={pokemonMid.name} />
            </div>
            {
              pokemonHigh.length !== 0
                && <div className='High'>
                    <h3>High Form: {pokemonHigh.name.charAt(0).toUpperCase() + pokemonHigh.name.slice(1)}</h3>
                    <div>{pokemonHigh.weight} grams</div>
                    <div>{pokemonHigh.height} decimeters</div>
                    <img src={pokemonHigh.sprites.front_default} alt={pokemonHigh.name} />
                  </div>
            }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Fira Mono", monospace;

  .container {
    width: 80%;
    max-width: 800px;
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
  @media (min-width: 376px) {
    width: 100vw;
  }
  @media (min-width: 768px) {
    max-width: 1200px;
    img {
      width: 100%;
    }
  }
`;

export default PokemonChainDetail;
