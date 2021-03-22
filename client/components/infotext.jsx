import React from 'react'
import styled from 'styled-components'

const Infotext = props => {
  const { pokemon, species } = props
  const gen = species.generation.name.split('-')[1].toUpperCase()
  const txt = species.flavor_text_entries[0].flavor_text
  const text = txt.replace('\n', ' ').replace('\f', ' ')
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
          <span className="text">{text}</span>
        </div>
      </div>
    </Info>
  )
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
	background-color: gainsboro;
	border: 1px solid black;
	border-radius: 0.3rem;
	margin: 1rem 0;
	z-index: 2;
	.window {
		width: 90%;
		height: 90%;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		font-size: 1.2rem;
		background-color: lightgreen;
		border: 1px solid green;
		border-radius: 0.3rem;
		.nameContainer {
			border-bottom: 1px solid black;
		}
		.infoContainer {
			width: 100%;
			display: flex;
			justify-content: space-evenly;
			margin: 0.5rem 0;
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
		}
	}
`
