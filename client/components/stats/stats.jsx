import React, { Component } from 'react'
import styled from 'styled-components'
import StatsList from './statsList'
import TypesList from './typesList'

class StatsComponent extends Component {
  render() {
    return (
      <Stats>
        <div className="typesContainer">
          <div className="typesTitle"><div className="title">TYPES</div></div>
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
	display: flex;
	justify-content: space-evenly;
	position: relative;
	margin: 20px auto;
	/* border: 1px solid black;
	background-color: gainsboro; */
	border-radius: 0.3rem;

	.typesContainer {
		width: 38%;
		position: relative;
		background-color: gainsboro;
		border: 1px solid black;
		border-radius: 0.2rem;
		margin: 0.5rem 0.3rem;
		.typesTitle {
			background-color: white;
			font-size: 2rem;
			text-align: center;
			border: 1px solid black;
			border-radius: 0.3rem;
			margin: 0.6rem;
			.title {
			}
		}
		.types {
			background-color: white;
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
		font-size: 1.2rem;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
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
`
