import React, { Component } from 'react'
import Typist from 'react-typist'
import styled from 'styled-components'

class Infotext extends Component {
	state = {
	  flavorTexts: [],
	  flavorDisplay: '',
	  flavorSet: false
	}

	componentDidMount = () => {
	  const fT = []
	  this.props.species.flavor_text_entries.forEach(x => {
	    if (x.language.name === 'en') {
	      fT.push(x.flavor_text)
	    }
	  })
	  this.setState({
	    flavorTexts: fT,
	    flavorDisplay: fT[0],
	    flavorSet: true
	  })
	}

	render() {
	  const { pokemon, species } = this.props
	  const { flavorDisplay, flavorSet } = this.state
	  const gen = species.generation.name.split('-')[1].toUpperCase()
	  return (
	    <Info>
	      <div className="window">
	        <div className="nameContainer">
	          <span className="name">{`${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`}</span>
	          <span className="number">no. {pokemon.id}</span>
	          <span className="gen">Gen. {gen}</span>
	        </div>
	        <div className="infoContainer">
	          <div className="stats">
	            <span className="statname">height:</span>
	            <span className="stat">{pokemon.height}</span>
	          </div>
	          <div className="stats">
	            <span className="statname">weight:</span>
	            <span className="stat">{pokemon.weight}</span>
	          </div>
	        </div>
	        <div className="textContainer">
	          {
	            flavorSet &&
							<Typist>
							  <Typist.Delay ms={1000} />
							  {flavorDisplay}
							</Typist>
	          }
	        </div>
	      </div>
	    </Info>
	  )
	}
}

export default Infotext

const Info = styled.div`
	width: 350px;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	font-family: 'VT323', monospace;
	border-radius: 0.3rem;
	margin: 1rem 0;
	z-index: 2;
	.window {
		width: 90%;
		height: 90%;
		display: flex;
		flex-flow: column;
		justify-content: flex-start;
		align-items: center;
		font-size: 1.2rem;
		background-color: lightgreen;
		border: 1px solid green;
		border-radius: 0.3rem;
		box-shadow: inset 2px 2px 4px darkgreen, inset -2px -2px 4px limegreen;
		.nameContainer {
			border-bottom: 1px solid black;
			margin: 1.5rem 0 0.5rem;
		}
		.infoContainer {
			margin-bottom: 0.5rem;
			.stats {
				display: flex;
				justify-content: space-between;
				.stat {
					margin: 0 0.3rem;
				}
			}
		}
		.nameContainer,
		.infoContainer {
			width: 80%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.name {
				width: 50%;
				font-size: 1.4rem;
			}
			.number {
				width: 25%;
			}
		}
		.textContainer {
			width: 70%;
			height: 38px;
			position: relative;
			margin: 1rem;
			overflow-y: hidden;
			.Typist {
				position: absolute;
				bottom: 0;
			}
		}
	}
`
