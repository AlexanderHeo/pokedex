import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
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
const POKE_NAME = 'Pokémon'

export default class App extends React.Component {
  state = {
    pokeIndex: POKE_INDEX,
    pokeData: {
      name: POKE_NAME,
      id: '--',
      height: '--',
      weight: '--',
      types: [],
      stats: []
    },
    pokeDataReady: false,
    pokeSpecies: {
      flavor_text_entries: '',
      generation: {
        name: '--'
      }
    },
    pokeSpeciesReady: false,
    pokeMoves: [
      {
        name: 'N/A',
        accuracy: '--',
        power: '--',
        pp: '--',
        flavor_text_entries: [
          {
            flavor_text: '------',
            language: 'en'
          }
        ],
        type: {
          name: '--'
        },
        damage_class: {
          name: '--'
        }
      }
    ],
    pokeMovesReady: false,
    setOne: [],
    setOneReady: false,
    setTwo: [],
    setTwoReady: false,
    setThree: [],
    setThreeReady: false,
    current: POKE_NAME,
    ready: false,
    errorMessage: ''
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

      // fetch pokemon info
      const url = `${POKEAPI_ROOT_URL}${pokeIndex}`
      const response = await fetch(url)
      const pokeData = await response.json()
      if (pokeData) {
        this.setState({
          pokeData: pokeData,
          pokeDataReady: true,
          current: pokeData.name
        })

        // check for moves - necessary for missing Gen 8 data
        if (pokeData.moves[0]) {
          // fetch moves
          const pokeMoves = await Promise.all(
            pokeData.moves.map(async x => {
              const moveRes = await fetch(x.move.url)
              return moveRes.json()
            })
          )
          if (pokeMoves) {
            this.setState({
              pokeMoves: pokeMoves,
              pokeMovesReady: true
            })
          }
        }
        const urlSpecies = pokeData.species.url
        const resSpecies = await fetch(urlSpecies)
        const pokeSpeciesData = await resSpecies.json()
        if (pokeSpeciesData) {
          this.setState({
            pokeSpecies: pokeSpeciesData,
            pokeSpeciesReady: true
          })

          // EVOLUTION CHAIN START
          // fetch evo chain info
          const urlEvo = pokeSpeciesData.evolution_chain.url
          const resEvo = await fetch(urlEvo)
          const dataEvo = await resEvo.json()

          // fetch first evo species info
          const urlOneSpecies = dataEvo.chain.species.url
          const resOneSpecies = await fetch(urlOneSpecies)
          const dataOneSpecies = await resOneSpecies.json()
          if (dataOneSpecies) {

            // fetch first evo pokemon info
            const resOnePokemon = await fetch(`${POKEAPI_ROOT_URL}${dataOneSpecies.id}`)
            const dataOnePokemon = await resOnePokemon.json()

            const ichi = {
              name: dataOnePokemon.name,
              sprite: dataOnePokemon.sprites.front_default,
              isBaby: dataOneSpecies.is_baby,
              isLegendary: dataOneSpecies.is_legendary,
              isMythical: dataOneSpecies.is_mythical
            }

            // check for second evolution
            if (!dataEvo.chain.evolves_to[0]) {
              this.setState({
                setOne: [ichi],
                setOneReady: true,
                ready: true
              })
            } else if (dataEvo.chain.evolves_to[0]) {
              // wait till the Promises.all() of the
              // mapped species fetch datas is fulfilled
              const secondEvoSpecies = await Promise.all(
                dataEvo.chain.evolves_to.map(async x => {
                  const secondEvoSpeciesResponse = await fetch(x.species.url)
                  return secondEvoSpeciesResponse.json()
                })
              )
              if (secondEvoSpecies) {
                // wait till the Promises.all() of the
                // mapped pokeman fetch datas is fulfilled
                const secondEvoData = await Promise.all(
                  secondEvoSpecies.map(async x => {
                    const secondEvoDataResponse = await fetch(`${POKEAPI_ROOT_URL}${x.id}`)
                    return secondEvoDataResponse.json()
                  })
                )
                if (secondEvoData) {
                  // set state for second evolution
                  this.setState({
                    setOne: [ichi],
                    setOneReady: true,
                    setTwo: {
                      data: secondEvoData,
                      species: secondEvoSpecies
                    },
                    setTwoReady: true
                  })
                }
              }
              // check for third evolution, and do same
              if (!dataEvo.chain.evolves_to[0].evolves_to[0]) {
                this.setState({ ready: true })
              } else if (dataEvo.chain.evolves_to[0].evolves_to[0]) {
                const thirdEvoSpecies = await Promise.all(
                  dataEvo.chain.evolves_to[0].evolves_to.map(async x => {
                    const thirdEvoSpeciesRes = await fetch(x.species.url)
                    return thirdEvoSpeciesRes.json()
                  })
                )
                if (thirdEvoSpecies) {
                  const thirdEvoData = await Promise.all(
                    thirdEvoSpecies.map(async x => {
                      const thirdEvoDataRes = await fetch(`${POKEAPI_ROOT_URL}${x.id}`)
                      return thirdEvoDataRes.json()
                    })
                  )
                  if (thirdEvoData) {
                    this.setState({
                      setThree: {
                        data: thirdEvoData,
                        species: thirdEvoSpecies
                      },
                      setThreeReady: true,
                      ready: true
                    })
                  }
                }
              }
            }
          }
          // END OF EVOLUTION CHAIN
        }
      }
    } catch (err) {
      console.error('208:', err)
    }
  }

	handleDpad = e => {
	  this.resetState()
	  const { name } = e.target
	  if (name === 'up' || name === 'right') {
	    this.pokeIndexUP()
	  } else if (name === 'down' || name === 'left') {
	    this.pokeIndexDOWN()
	  }
	}

	handleKeyDown = (key, e) => {
	  this.resetState()
	  if (key === 'up' || key === 'right') {
	    this.pokeIndexUP()
	  } else if (key === 'down' || key === 'left') {
	    this.pokeIndexDOWN()
	  }
	}

	pokeIndexUP = () => {
	  const { pokeIndex } = this.state
	  if (pokeIndex === 898) {
	    this.setState({ pokeIndex: 1 })
	  } else {
	    this.setState({ pokeIndex: pokeIndex + 1 })
	  }
	}

	pokeIndexDOWN = () => {
	  const { pokeIndex } = this.state
	  if (pokeIndex === 0) {
	    this.setState({ pokeIndex: 898 })
	  } else {
	    this.setState({ pokeIndex: pokeIndex - 1 })
	  }
	}

	handleInputChange = id => {
	  if (isNaN(id)) {
	    this.setState({ errorMessage: 'Pokédex Index must be a number.' })
	  } else if (id < 1 || id > 898) {
	    this.setState({ errorMessage: 'Pokédex Index must be between 1 and 898.' })
	  }	else {
	    this.setState({ pokeIndex: id })
	  }
	}

	resetError = () => {
	  this.setState({ errorMessage: '' })
	}

	resetState = () => {
	  this.setState({
	    pokeIndex: this.state.pokeIndex,
	    pokeData: {
	      name: POKE_NAME,
	      id: '--',
	      height: '--',
	      weight: '--',
	      types: [],
	      stats: []
	    },
	    pokeDataReady: false,
	    pokeSpecies: {
	      flavor_text_entries: '',
	      generation: {
	        name: '--'
	      }
	    },
	    pokeSpeciesReady: false,
	    pokeMoves: [
	      {
	        name: 'N/A',
	        accuracy: '--',
	        power: '--',
	        pp: '--',
	        flavor_text_entries: [
	          {
	            flavor_text: '------',
	            language: 'en'
	          }
	        ],
	        type: {
	          name: '--'
	        },
	        damage_class: {
	          name: '--'
	        }
	      }
	    ],
	    pokeMovesReady: false,
	    setOne: [],
	    setOneReady: false,
	    setTwo: [],
	    setTwoReady: false,
	    setThree: [],
	    setThreeReady: false,
	    current: POKE_NAME,
	    ready: false
	  })
	}

	render() {
	  const {
	    pokeData, pokeDataReady,
	    pokeSpecies, pokeSpeciesReady,
	    pokeMoves, pokeMovesReady,
	    setOne, setOneReady,
	    setTwo, setTwoReady,
	    setThree, setThreeReady,
	    current, ready,
	    errorMessage
	  } = this.state
	  const badge = {
	    isBaby: pokeSpecies.is_baby,
	    isLegendary: pokeSpecies.is_legendary,
	    isMythical: pokeSpecies.is_mythical
	  }
	  return (
	    <Main>
	      <div className="section left">
	        <TopFrame />
	        <div className="leftPanel">
	          <div className="components">
	            <ImageComponent sprites={pokeData.sprites} badge={badge} ready={pokeDataReady} />
	            <Infotext
	              pokemon={pokeData}
	              flavors={pokeSpecies.flavor_text_entries}
	              generation={pokeSpecies.generation.name}
	              ready={pokeSpeciesReady}
	            />
	            <Buttons
	              name={pokeData.name}
	              id={pokeData.id}
	              handleDpad={this.handleDpad}
	              ready={ready}
	              errorMessage={errorMessage}
	              resetError={this.resetError}
	              handleInputChange={this.handleInputChange}
	            />
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
	          <StatsComponent stats={pokeData.stats} types={pokeData.types} ready={pokeDataReady} />
	          <MovesComponent moves={pokeMoves} ready={pokeMovesReady} />
	          <BlueButtons />
	          <Evolution
	            setOne={setOne}
	            setOneReady={setOneReady}
	            setTwo={setTwo}
	            setTwoReady={setTwoReady}
	            setThree={setThree}
	            setThreeReady={setThreeReady}
	            current={current}
	          />
	        </div>
	      </div>
	      <KeyboardEventHandler
	        handleKeys={['up', 'down', 'left', 'right', 's']}
	        onKeyEvent={(key, e) => this.handleKeyDown(key, e)}
	        iDisabled={!ready}
	      />
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
