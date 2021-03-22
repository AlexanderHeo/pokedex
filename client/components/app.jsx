import React from 'react';
import styled from 'styled-components';
import pokemonSpecies from '../../data/pokemon-species.json';
import pokemonData from '../../data/pokemon.json';
// import Evolution from './evolution/evolutions';
import ImageComponent from './image';
import Infotext from './infotext';
// import MovesComponent from './moves/moves';
// import StatsComponent from './stats/stats';
// import BlueButtons from './ui/blue';
import Buttons from './ui/buttons';
import TopFrame from './ui/topFrame';

export default class App extends React.Component {
  state = {
    pokemonData: {},
    dataReady: false
  }

  componentDidMount() {
    this.setState({
      pokemonData: pokemonData,
      pokemonSpecies: pokemonSpecies,
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
    const { pokemonData, pokemonSpecies } = this.state
    return (
      <Main>
        {
          this.state.dataReady &&
					<>
					  <div className="section left">
					    <TopFrame />
					    <div className="leftPanel">
					      <div className="components">
					        <ImageComponent sprites={pokemonData.sprites} />
					        <Infotext pokemon={pokemonData} species={pokemonSpecies} />
					        <Buttons />
					      </div>
					    	<div className="middleHinge">
					        <div className="hingeShort top"></div>
					        <div className="hingeLong"></div>
					        <div className="hingeShort bottom"></div>
					      </div>
					    </div>
					  </div>
					  {/* <div className="section right">
					    <StatsComponent stats={pokemonData.stats} types={pokemonData.types} />
					    <MovesComponent moves={pokemonData.moves} />
					    <BlueButtons />
					    <Evolution evo={pokemonSpecies.evolution_chain} />
					  </div> */}
					</>
        }
      </Main>
    )
  }
}

const Main = styled.div`
	font-family: 'Open Sans', sans-serif;
	display: flex;
	justify-content: center;
	margin: 5rem;
	.section {
		margin: auto 1rem;
	}
	.left {
		display: flex;
		flex-flow: column;
		align-items: flex-start;
		border: 1px solid black;
		border-radius: 1rem;
		.leftPanel {
			width: 420px;
			display: flex;
			position: relative;
			margin: 0 0 0.7rem 0.7rem;
		}
		.components {
			padding: 0.8rem;
			border-bottom-left-radius: 0.5rem;
			box-shadow: inset 4px -3px 1px black;
		}
		.middleHinge {
			width: 50px;
			height: 110%;
			position: absolute;
			bottom: 0;
			right: -4px;
			border: 1px solid black;
			background-color: black;
			.hingeShort {
				height: 9%;
				border: 1px solid black;
				background-color: #ef0d24;
			}
			.hingeLong {
				height: calc(82% - 6px);
				border: 1px solid black;
				background-color: #ef0d24;
			}
			.top {
				border-top-left-radius: 15px;
				border-top-right-radius: 15px;
			}
			.bottom {
				border-bottom-left-radius: 15px;
				border-bottom-right-radius: 15px;
			}
		}
	}
	.right {

	}
`
