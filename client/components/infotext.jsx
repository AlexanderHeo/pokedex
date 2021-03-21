import React from 'react';
import styled from 'styled-components';

const Infotext = props => {
  const { pokemon, species } = props
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
            <span className="stat">7</span>
          </div>
          <div className="stats">
            <span className="statname">weight:</span>
            <span className="stat">69</span>
          </div>
        </div>
        <div className="textContainer">
          <span className="text">A strange seed was planted on it&apos;s back at birth. The plant sprouts and grows with this Pok&eacute;mon</span>
        </div>
      </div>
    </Info>
  )
}

export default Infotext

const Info = styled.div`
	font-family: 'VT323', monospace;
	width: 350px;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	margin: 1rem auto;
	background-color: gainsboro;
	border: 1px solid black;
	border-radius: 0.3rem;
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
