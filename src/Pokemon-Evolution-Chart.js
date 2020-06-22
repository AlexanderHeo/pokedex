import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PokemonEvolutionDetail from './Pokemon-Evolution-Detail';

class PokemonEvolutionChart extends Component {
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
      // console.log(pokemonChain.chain)
      // pokemonChain.chain{evolves_to:[{}], is_baby: boolean, id: XX}

      let pokemonBaby = [];
      let pokemonLow = [];
      let pokemonMid = [];
      let pokemonHigh = [];

      // could be refactored to be single await/fetch set, with dynamic variables
      // maybe recursion for evolution chain
      if(pokemonChain.chain.is_baby) {
        // baby form
        const babyURL = pokemonChain.chain.species.url;
        const resPokemonBabySpecies = await fetch(babyURL);
        const pokemonBabySpecies = await resPokemonBabySpecies.json();
        const resPokemonBaby = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonBabySpecies.id}`);
        pokemonBaby.push(await resPokemonBaby.json());

        // low form of baby
        if(pokemonChain.chain.evolves_to) {
          for (var h = 0; h < pokemonChain.chain.evolves_to.length; h ++) {
            const lowURL = pokemonChain.chain.evolves_to[h].species.url;
            const resPokemonLowSpecies = await fetch(lowURL);
            const pokemonLowSpecies = await resPokemonLowSpecies.json();
            const resPokemonLow = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonLowSpecies.id}`);
            pokemonLow.push(await resPokemonLow.json());
          }

          // middle form of baby
          if(pokemonChain.chain.evolves_to[0]) {
            for (var k = 0; k < pokemonChain.chain.evolves_to[0].evolves_to.length; k ++) {
              const midURL = pokemonChain.chain.evolves_to[0].evolves_to[k].species.url;
              const resPokemonMidSpecies = await fetch(midURL);
              const pokemonMidSpecies = await resPokemonMidSpecies.json();
              const resPokemonMid = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonMidSpecies.id}`);
              pokemonMid.push(await resPokemonMid.json());
            }

            // checks if high form is available. most baby form pokemons do not have a high form
            // if (pokemonChain.chain.evolves_to[0].evolves_to) {
            //   const resPokemonHighSpecies = await fetch(pokemonChain.chain.evolves_to[0].evolves_to[0].evolves_to[0].species.url);
            //   const pokemonHighSpecies = await resPokemonHighSpecies.json();
            //   const resPokemonHigh = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonHighSpecies.id}`);
            //   pokemonHigh.push(await resPokemonHigh.json());
            // }
          }
        }


        this.setState({
          pokemonBaby: pokemonBaby,
          pokemonLow: pokemonLow,
          pokemonMid: pokemonMid,
          // pokemonHigh: pokemonHigh,
        })
      } else if(!pokemonChain.chain.is_baby) {
        // refactor here as well, conditional in original await/fetch?

        // low form, not baby
        const lowURL = pokemonChain.chain.species.url;
        const resPokemonLowSpecies = await fetch(lowURL);
        const pokemonLowSpecies = await resPokemonLowSpecies.json();
        const resPokemonLow = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonLowSpecies.id}`);
        pokemonLow.push(await resPokemonLow.json());

        // middle form, not baby
        if (pokemonChain.chain.evolves_to) {
          for (var i = 0; i < pokemonChain.chain.evolves_to.length; i ++) {
            const midURL = pokemonChain.chain.evolves_to[i].species.url;
            const resPokemonMedSpecies = await fetch (midURL);
            const pokemonMedSpecies = await resPokemonMedSpecies.json();
            const resPokemonMid = await fetch(`http://pokeapi.co/api/v2/pokemon/${pokemonMedSpecies.id}`);
            pokemonMid.push(await resPokemonMid.json());
          }

          // high form, not baby
          if (pokemonChain.chain.evolves_to[0]) {
            for (var j = 0; j < pokemonChain.chain.evolves_to[0].evolves_to.length; j ++) {
              const resPokemonHighSpecies = await fetch(pokemonChain.chain.evolves_to[0].evolves_to[j].species.url);
              const pokemonHighSpecies = await resPokemonHighSpecies.json();
              const resPokemonHigh = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonHighSpecies.id}`);
              pokemonHigh.push(await resPokemonHigh.json());
            }
          }
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
    // refactor to render dynamic sections
    // classname (baby, low, med, high), (pokemonBaby, pokemonLow, pokemonMid, pokemonHigh)
    // could be constructed dynamically and separated into own component
    const { pokemonBaby, pokemonLow, pokemonMid, pokemonHigh } = this.state;
    // console.log('state:', this.state)
    // console.log(pokemonMid);
    return pokemonLow.length === 0
      ? <h1>loading...</h1>
      : (
        <Pokemon>
          <div className='container'>
            {
              pokemonBaby.length !== 0
                && pokemonBaby.map(baby => <PokemonEvolutionDetail pokemon={baby} className="baby"/>)
            }
            {
              pokemonLow.length !== 0
                && pokemonLow.map(low => <PokemonEvolutionDetail pokemon={low} className="low"/>)
            }
            {
              pokemonMid.length !== 0
                && pokemonMid.map(mid => <PokemonEvolutionDetail pokemon={mid} className="middle"/>)
            }
            {
              pokemonHigh.length !== 0
                && pokemonHigh.map(high => <PokemonEvolutionDetail pokemon={high} className="high" />)
            }
            <Link to="/">
              <button>Return</button>
            </Link>
          </div>
        </Pokemon>
      )
  }
}
export default PokemonEvolutionChart;

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
