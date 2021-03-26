import React, { Component } from 'react'
import styled from 'styled-components'
import TypeButtons from '../../../server/public/images/PokemonTypes.png'
import StatsList from './statsList'
import TypesList from './typesList'

class StatsComponent extends Component {
  render() {
    return (
      <Stats>
        <div className="typesContainer">
          <div className="typesTitle"><span className="title">TYPES</span></div>
          <div className="types">
            {
              this.props.types.map(x => <TypesList key={x.slot} props={x} />)
            }
          </div>

        </div>
        <div className="statsContainer">
          {
            this.props.stats.map(x => <StatsList key={x.stat.url} stat={x} />)
          }
        </div>
      </Stats>
    )
  }
}

export default StatsComponent

const Stats = styled.div`
	width: 400px;
	height: 188px;
	display: flex;
	justify-content: space-evenly;
	position: relative;
	margin: 20px auto;
	border-radius: 0.3rem;
	pointer-events: none;
	.typesContainer {
		width: 38%;
		position: relative;
		background-color: lightgreen;
		border: 1px solid black;
		border-radius: 0.2rem;
		margin: 0.5rem 0.3rem;
		box-shadow: inset 2px 2px 4px darkgreen, inset -2px -2px 4px limegreen;
		.typesTitle {
			font-size: 1.7rem;
			text-align: center;
			margin: 0.6rem;
			.title {
				border-bottom: 1px solid black;
			}
		}
		.types {
			display: flex;
			flex-flow: column;
			align-items: center;
			margin: 0.6rem;
			button {
				margin: 0;
				padding: 0;
				border: none;
				border-width: 0;
			}
			.type {
				width: 134px;
				height: 45px;
				margin: 0.3rem 0;
				background-image: url(${TypeButtons});
				background-size: 1547px 189px;
			}
			.bug { background-position: -5px -7px; }
			.dark { background-position: -160px -7px; }
			.dragon { background-position: -315px -7px; }
			.electric { background-position: -470px -7px; }
			.fairy { background-position: -625px -7px; }
			.fighting { background-position: -780px -7px; }
			.fire { background-position: -937px -7px; }
			.flying { background-position: -1093px -7px; }
			.ghost { background-position: -1248px -7px; }
			.grass { background-position: -1404px -7px; }
			.ground { background-position: -3px -72px; }
			.ice { background-position: -160px -72px; }
			.normal { background-position: -315px -72px; }
			.poison { background-position: -470px -72px; }
			.psychic { background-position: -625px -72px; }
			.rock { background-position: -780px -72px; }
			.steel { background-position: -937px -72px; }
			.water { background-position: -1093px -72px; }
			.shadow { background-position: -1248px -72px; }
			.light { background-position: -1404px -72px; }
			.cool { background-position: -625px -137px; }
			.beautiful { background-position: -780px -137px; }
			.cute { background-position: -937px -137px; }
			.clever { background-position: -1093px -137px; }
			.tough { background-position: -1248px -137px; }
		}
	}

	.statsContainer {
		width: 57%;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		background-color: lightgreen;
		font-family: 'VT323', monospace;
		font-size: 1.2rem;
		border: 1px solid green;
		border-radius: 0.3rem;
		box-shadow: inset 2px 2px 4px darkgreen, inset -2px -2px 4px limegreen;
		margin: 0.5rem 0.3rem 0.5rem 0;
		.stats {
			width: 80%;
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
	@media(max-width: 446px) and (orientation: portrait) {
		width: auto;
		margin: 0;
		.type {
			transform: scale(0.7);
		}
	}
`
