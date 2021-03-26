import React, { Component } from 'react'
import styled from 'styled-components'

class Moves extends Component {
	state = {
	  movesIndex: 0
	}

	handleClick = e => {
	  const { movesIndex } = this.state
	  const { moves } = this.props
	  const name = e.target.name
	  if (name === 'up') {
	    if (movesIndex === moves.length - 1) this.setState({ movesIndex: 0 })
	    else this.setState({ movesIndex: movesIndex + 1 })
	  }
	  if (name === 'down') {
	    if (movesIndex === 0) this.setState({ movesIndex: moves.length - 1 })
	    else this.setState({ movesIndex: movesIndex - 1 })
	  }
	}

	render() {
	  let dsp = '----'
	  let acc = '--'
	  let pow = '--'
	  let pp = '--'
	  let typ = '----'
	  let dmg = ''
	  let flv = ''
	  const { moves, ready } = this.props
	  const { movesIndex } = this.state
	  if (ready) {
	    const n = moves[movesIndex].name
	    const t = moves[movesIndex].type.name
	    const d = moves[movesIndex].damage_class.name
	    dsp = `${n.charAt(0).toUpperCase()}${n.slice(1)}`
	    acc = moves[movesIndex].accuracy
	    pow = moves[movesIndex].power
	    pp = moves[movesIndex].pp
	    typ = `${t.charAt(0).toUpperCase()}${t.slice(1)}`
	    dmg = `${d.charAt(0).toUpperCase()}${d.slice(1)}`
	    let i = 0
	    while (i < moves.length) {
	      if (moves[movesIndex].flavor_text_entries[i].language.name === 'en') {
	        flv = moves[movesIndex].flavor_text_entries[i].flavor_text
	        break
	      } else {
	        i++
	      }
	    }
	  }
	  return (
	    <MovesContainer>
	      <div className="windowContainer">
	        <div className="window">
	          <div className="moveContainer">
	            <span className="name">{dsp}</span>
	            <div className="move">
	              <span className="moveName">Accuracy</span>
	              { ready && <span className="moveStat">{acc}</span> }
	            </div>
	            <div className="move">
	              <span className="moveName">Power</span>
	              { ready && <span className="moveStat">{pow}</span> }
	            </div>
	            <div className="move">
	              <span className="moveName">P.P.</span>
	              { ready && <span className="moveStat">{pp}</span> }
	            </div>
	          </div>
	          <div className="statContainer">
	            {
	              ready && <>
	                <span className="type">{typ}</span>
	                <span className="damageClass">Damage Class: {dmg}</span>
	                <div className="textContainer">
	                  <div>{flv}</div>
	                </div>
	              </>
	            }
	          </div>
	        </div>
	      </div>
	      <div className="buttonContainer">
	        <button className="button" onClick={this.handleClick} name="up"><span className="iconify" data-icon="ant-design:caret-up-filled" data-inline="false"></span></button>
	        <button className="button" onClick={this.handleClick} name="down"><span className="iconify" data-icon="ant-design:caret-down-filled" data-inline="false"></span></button>
	      </div>
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
	pointer-events: none;
	.windowContainer {
		width: 85%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-family: 'VT323', monospace;
		.window {
			width: 90%;
			height: 105px;
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
					height: 32px;
					position: relative;
					bottom: 0;
					background-color: darkgreen;
					color: lightgreen;
					border-radius: 3px;
					margin: 0.1rem 0;
					padding: 0.2rem 0.4rem;
					overflow-y: hidden;
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
			pointer-events: initial;
			cursor: pointer;
		}
		.button:hover {
			background: rgb(239,13,36);
			background: linear-gradient(30deg, rgba(239,13,36,1) 25%, rgba(249,162,171,1) 50%, rgba(239,13,36,1) 75%);
			transform: scale(1.2);
			transition: transform 0.2s ease;
		}
		.iconify {
			font-size: 1.5rem;
			pointer-events: none;
		}
	}
`
