import React from 'react';
import styled from 'styled-components';
// import pokemonSpeciesData from '../../data/pokemon-species.json';
import pokemonData from '../../data/pokemon.json';
import ImageComponent from './image';
import StatsComponent from './stats/stats';

export default class App extends React.Component {
  state = {
    pokemonData: {},
    dataReady: false
  }

  componentDidMount() {
    this.setState({
      pokemonData: pokemonData,
      dataReady: true
    })
  }

  // componentDidMount = async () => {
  //   try {
  //     const response = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=40')
  //     const json = await response.json()
  //     if (json) {
  //       console.log(json)
  //       this.setState({
  //         data: json.results,
  //         dataReady: true
  //       })
  //     }
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  render() {
    const { pokemonData } = this.state
    return (
      <Main>
        {
          this.state.dataReady &&
					<>
					  <ImageComponent sprites={pokemonData.sprites} />
					  <StatsComponent stats={pokemonData.stats} types={pokemonData.types} />
					</>
        }
      </Main>
    )
  }
}

const Main = styled.div`
	font-family: 'Open Sans', sans-serif;
`