import React from 'react';
import styled from 'styled-components';
import Evolution from './evolution/evolutions';
import ImageComponent from './image';
import Infotext from './infotext';
import MovesComponent from './moves/moves';
import StatsComponent from './stats/stats';
import BlueButtons from './ui/blue';
import Buttons from './ui/buttons';
import TopFrame from './ui/topFrame';

const POKEAPI_ROOT_URL = 'https://pokeapi.co/api/v2/pokemon/'
const POKE_INDEX = 1

export default class App extends React.Component {
  state = {
    pokeIndex: POKE_INDEX,
    pokeData: {},
    pokeSpecies: {},
    pokeMoves: [],
    evoChain: {},
    dataReady: false
  }

  componentDidMount = () => {
    this.handlePokemonChange()
  }

	componentDidUpdate = (prevProps, prevState) => {
	  if (prevState.pokeIndex !== this.state.pokeIndex) {
	    this.handlePokemonChange()
	  }
	}

  handlePokemonChange = async () => {
    const { pokeIndex } = this.state
    try {
      const req = `${POKEAPI_ROOT_URL}${pokeIndex}`
      const response = await fetch(req)
      const pokeData = await response.json()
      if (pokeData) {
        const len = pokeData.moves.length
        const maxIndex = Math.min(10, len)
        const pokeMoves = []
        for (let i = 0; i < maxIndex; i++) {
          const url = pokeData.moves[i].move.url
          const resMoves = await fetch(url)
          const dataMoves = await resMoves.json()
          if (dataMoves) {
            pokeMoves.push(dataMoves)
          }
        }

        this.setState({ pokeData: pokeData })
        const reqSpecies = pokeData.species.url
        const resSpecies = await fetch(reqSpecies)
        const pokeSpeciesData = await resSpecies.json()
        if (pokeSpeciesData) {
          this.setState({
            pokeData: pokeData,
            pokeSpecies: pokeSpeciesData,
            pokeMoves: pokeMoves,
            evoChain: pokeSpeciesData.evolution_chain.url,
            dataReady: true
          })
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

	handleDpad = e => {
	  const { name } = e.target
	  const { pokeIndex } = this.state
	  if (name === 'up' || name === 'right') {
	    if (pokeIndex === 898) {
	      this.setState({ pokeIndex: 1 })
	    } else {
	      const inc = pokeIndex + 1
	      this.setState({ pokeIndex: inc })
	    }
	  } else if (name === 'left' || name === 'down') {
	    if (pokeIndex === 0) {
	      this.setState({ pokeIndex: 898 })
	    } else {
	      const dec = pokeIndex - 1
	      this.setState({ pokeIndex: dec })
	    }
	  }
	}

	render() {
	  const { pokeData, pokeSpecies, pokeMoves, evoChain } = this.state
	  const badge = {
	    isBaby: pokeSpecies.is_baby,
	    isLegendary: pokeSpecies.is_legendary,
	    isMythical: pokeSpecies.is_mythical
	  }
	  return (
	    <Main>
	      {
	        this.state.dataReady &&
					<>
					  <div className="section left">
					    <TopFrame />
					    <div className="leftPanel">
					      <div className="components">
					        <ImageComponent sprites={pokeData.sprites} badge={badge} />
					        <Infotext
					          pokemon={pokeData}
					          flavors={pokeSpecies.flavor_text_entries}
					          generation={pokeSpecies.generation.name}
					        />
					        <Buttons name={pokeData.name} id={pokeData.id} handleDpad={this.handleDpad}/>
					      </div>
					    	<div className="middleHinge">
					        <div className="hingeShort top"></div>
					        <div className="hingeLong"></div>
					        <div className="hingeShort bottom"></div>
					      </div>
					    </div>
					  </div>
					  <div className="section right">
					    <div className="cut" />
					    <div className="cut2" />
					    <div className="rightPanel">
					      <StatsComponent stats={pokeData.stats} types={pokeData.types} />
					      <MovesComponent moves={pokeMoves} />
					      <BlueButtons />
					      <Evolution evo={evoChain} pokemon={pokeData.name} />
					    </div>
					  </div>
					</>
	      }
	    </Main>
	  )
	}
}

const Main = styled.div`
	font-family: 'VT323', monospace;
	display: flex;
	justify-content: center;
	color: darkgreen;
	margin: 5rem;
	.left {
		display: flex;
		flex-flow: column;
		align-items: center;
		border: 3px solid black;
		border-radius: 1rem;
		.leftPanel {
			width: 425px;
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
			border-right: none;
			border-left: 6px solid black;
			border-top-right-radius: 15px;
			border-bottom-right-radius: 15px;
			background-color: black;
			z-index: 100;
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
		display: flex;
		flex-flow: column;
		align-self: flex-end;
		position: relative;
		border: 3px solid black;
		margin-bottom: 22px;
		border-top-right-radius: 1rem;
		border-bottom-right-radius: 1rem;
		z-index: 10;
		.cut {
			width: 140px;
			height: 47px;
			position: absolute;
			top: -50px;
			left: 0;
			background-color: #ef0d24;
			border-top: 3px solid black;
			border-right: 4px solid black;
			transform: skewX(45deg);
			z-index: -10;
		}
		.cut2 {
			width: 63px;
			height: 50px;
			position: absolute;
			top: -47px;
			left: -2px;
			background-color: #ef0d24;
			border-left: 2px solid black;
		}
		.rightPanel {
			margin: 0.7rem 0.7rem 0.7rem 1rem;
		}
	}
`
