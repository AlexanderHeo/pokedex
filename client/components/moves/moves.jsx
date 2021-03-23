import React, { Component } from 'react'
import Typist from 'react-typist'
import styled from 'styled-components'

class Moves extends Component {
	state = {
	  index: 0,
	  list: [],
	  moveURL: '',
	  moveData: {},
	  moveLoaded: false,
	  flavorTexts: [],
	  flavorIndex: 0,
	  flavorSet: false
	}

	componentDidMount() {
	  const ar = []
	  for (let i = 0; i < 10; i++) {
	    ar.push(this.props.moves[i].move.url)
	  }
	  this.setState({
	    list: ar,
	    moveURL: ar[0]
	  })
	  this.setNextFlavor()
	}

	componentDidUpdate = async (prevProps, prevState) => {
	  const { moveURL } = this.state
	  const texts = []
	  if (prevState.moveURL !== this.state.moveURL) {
	    try {
	      const response = await fetch(moveURL)
	      const data = await response.json()
	      if (data) {
	        data.flavor_text_entries.forEach(x => {
	          if (x.language.name === 'en') {
	            const text = x.flavor_text.replace('', ' ')
	            texts.push(text)
	          }
	        })
	      }
	      this.setState({
	        flavorTexts: texts,
	        flavorSet: true,
	        moveData: data,
	    		moveLoaded: true
	      })
	    } catch (err) {
	      console.error(err)
	    }
	  }
	}

	setNextFlavor = () => {
	  setInterval(() => {
	    this.setState({ flavorSet: false })
	    const { flavorTexts, flavorIndex } = this.state
	    if (flavorIndex >= flavorTexts.length - 1) {
	      this.setState({
	        flavorIndex: 0,
	        flavorSet: true
	      })
	    } else {
	      const inc = flavorIndex + 1
	      this.setState({
	        flavorIndex: inc,
	        flavorSet: true
	      })
	    }
	  }, 15000)
	}

	handleClick = e => {
	  const name = e.target.name
	  if (name === 'up') {
	    let index = this.state.index
	    if (index > 8) {
	      this.setState({
	        index: 0,
	        flavorIndex: 0,
	        flavorSet: false,
	        moveURL: this.state.list[0]
	      })
	    } else {
	      this.setState({
	        index: ++index,
	        flavorIndex: 0,
	        flavorSet: false,
	        moveURL: this.state.list[index]
	      })
	    }
	  } else if (name === 'down') {
	    let index = this.state.index
	    if (index < 1) {
	      this.setState({
	        index: 9,
	        flavorIndex: 0,
	        flavorSet: false,
	        moveURL: this.state.list[9]
	      })
	    } else {
	      this.setState({
	        index: --index,
	        flavorIndex: 0,
	        flavorSet: false,
	        moveURL: this.state.list[index]
	      })
	    }
	  }
	}

	render() {
	  let display
	  const { flavorTexts, flavorIndex, flavorSet, moveLoaded, moveData } = this.state
	  let flav = flavorTexts[flavorIndex]
	  if (!flav) flav = flavorTexts[0]
	  if (moveLoaded) {
	    const a = moveData.name
	    if (a.includes('-')) {
	      const ar = a.split('-')
	      display = `${ar[0].charAt(0).toUpperCase()}${ar[0].slice(1)}-${ar[1].charAt(0).toUpperCase()}${ar[1].slice(1)}`
	    } else {
	      display = `${a.charAt(0).toUpperCase()}${a.slice(1)}`
	    }
	  }
	  return (
	    <MovesContainer>
	      {
	        moveLoaded &&
					<>
					  <div className="windowContainer">
					    <div className="window">
					      <div className="moveContainer">
					        <span className="name">{display}</span>
					        <div className="move">
					          <span className="moveName">Accuracy</span>
					          <span className="moveStat">{moveData.accuracy}</span>
					        </div>
					        <div className="move">
					          <span className="moveName">Power</span>
					          <span className="moveStat">{moveData.power}</span>
					        </div>
					        <div className="move">
					          <span className="moveName">P.P.</span>
					          <span className="moveStat">{moveData.pp}</span>
					        </div>
					      </div>
					      <div className="statContainer">
					        <span className="type">{moveData.type.name.toUpperCase()}</span>
					        <span className="damageClass">Damage Class: {moveData.damage_class.name.charAt(0).toUpperCase() + moveData.damage_class.name.slice(1)}</span>
					        <div className="textContainer">
					          {
					            flavorSet &&
											<Typist>
											  {flav}
											</Typist>
					          }
					        </div>
					      </div>
					    </div>
					  </div>
					  <div className="buttonContainer">
					    <button className="button" onClick={this.handleClick} name="up"><span className="iconify" data-icon="ant-design:caret-up-filled" data-inline="false"></span></button>
					    <button className="button" onClick={this.handleClick} name="down"><span className="iconify" data-icon="ant-design:caret-down-filled" data-inline="false"></span></button>
					  </div>
					</>
	      }
	    </MovesContainer>
	  )
	}
}

export default Moves

const MovesContainer = styled.div`
	width: 400px;
	height: 115px;
	display: flex;
	border: 1px solid black;
	border-radius: 0.3rem;
	margin: 0 auto;
	background-color: gainsboro;
	.windowContainer {
		width: 85%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-family: 'VT323', monospace;
		.window {
			width: 90%;
			display: flex;
			border: 1px solid black;
			border-radius: 0.3rem;
			background-color: lightgreen;
			margin: 0.3rem;
			box-shadow: inset 2px 2px 4px darkgreen, inset -2px -2px 4px limegreen;
			.moveContainer,
			.statContainer {
				width: 50%;
				display: flex;
				flex-flow: column;
				align-items: center;
				margin: 1rem 0;
			}
			.moveContainer {
				.name {
					font-size: 1.3rem;
					border-bottom: 1px solid black;
				}
				.move {
					width: 80%;
					display: flex;
					justify-content: space-between;
				}
			}
			.statContainer {
				position: relative;
				margin: 0.5rem 0 0.2rem 0;
				.type {
					width: 50%;
					border: 1px solid black;
					border-radius: 1rem;
					text-align: center;
					margin-bottom: 0.4rem;
					padding: 0.3rem;
				}
				.textContainer {
					width: 123px;
					height: 16px;
					position: relative;
					bottom: 0;
					background-color: darkgreen;
					color: lightgreen;
					border-radius: 3px;
					margin: 0.1rem 0;
					padding: 0.5rem 0.6rem;
					overflow-y: hidden;
					.Typist {
						position: absolute;
						bottom: 0;
					}
				}
			}
		}
	}
	.buttonContainer {
		width: 17%;
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		.button {
			background-color: #ef0d24;
			border-radius: 50%;
			width: 40px;
			height: 40px;
			margin: 0.2rem;
		}
		.iconify {
			font-size: 1.5rem;
			pointer-events: none;
		}
	}
`
