import React, { Component } from 'react'
import styled from 'styled-components'

class StatsComponent extends Component {
  render() {
    return (
      <Stats>
        <div className="typesContainer">
          <div className="typesTitle"><div className="title">TYPES</div></div>
          <div className="types">
            <div className="type grass"><span>Grass</span></div>
            <div className="type poison"><span>Poison</span></div>
          </div>

        </div>
        <div className="statsContainer">
          <div className="stats">
            <span className="ellipse">............................</span>
            <span className="statsName">HP</span>
            <span className="statsStat">45</span>
          </div>
          <div className="stats">
            <span className="ellipse">............................</span>
            <span className="statsName">Attack</span>
            <span className="statsStat">49</span>
          </div>
          <div className="stats">
            <span className="ellipse">............................</span>
            <span className="statsName">Defense</span>
            <span className="statsStat">49</span>
          </div>
          <div className="stats">
            <span className="ellipse">............................</span>
            <span className="statsName">Special-Attack</span>
            <span className="statsStat">65</span>
          </div>
          <div className="stats">
            <span className="ellipse">............................</span>
            <span className="statsName">Special-Defense</span>
            <span className="statsStat">65</span>
          </div>
          <div className="stats">
            <span className="ellipse">............................</span>
            <span className="statsName">Speed</span>
            <span className="statsStat">45</span>
          </div>
        </div>
      </Stats>
    )
  }
}

export default StatsComponent

const Stats = styled.div`
	width: 400px;
	display: flex;
	justify-content: space-evenly;
	position: relative;
	margin: 20px auto;
	border: 1px solid black;
	background-color: gainsboro;
	border-radius: 0.3rem;

	.typesContainer {
		width: 38%;
		position: relative;
		background-color: #ef0d24;
		border: 1px solid black;
		border-radius: 0.2rem;
		margin: 0.5rem 0.3rem;
		.typesTitle {
			background-color: gainsboro;
			font-size: 2rem;
			text-align: center;
			border: 1px solid black;
			border-radius: 0.3rem;
			margin: 0.6rem;
			.title {
			}
		}
		.types {
			background-color: gainsboro;
			text-align: center;
			margin: 0.6rem;
			border: 1px solid black;
			border-radius: 0.2rem;
			.type {
				width: 100px;
				display: flex;
				justify-content: center;
				text-align: center;
				border: 1px solid black;
				border-radius: 1rem;
				margin: 0.3rem auto;
				padding: 0.5rem 0.4rem;
			}
		}
	}

	.grass {
		background: green;
		color: lightgreen;
	}
	.poison {
		background: rebeccapurple;
		color: white;
	}

	.statsContainer {
		width: 57%;
		margin: 0.5rem 0.3rem 0.5rem 0;
		font-family: 'VT323', monospace;
		border: 1px solid green;
		border-radius: 0.3rem;
		background-color: lightgreen;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		.stats {
			width: 79%;
			display: flex;
			justify-content: space-between;
			position: relative;
			margin: 0.05rem 0;
			.ellipse {
				position: absolute;
				top: 0;
				left: 0;
			}
			.statsName,
			.statsStat {
				position: relative;
				background-color: lightgreen;
			}
		}
	}
`
