import React, { Component } from 'react'
import styled from 'styled-components'

class Moves extends Component {
	state = {
	  move: {},
	  moveReady: false,
	  index: 0,
	  moveFlavor: ''
	}

	componentDidMount() {
	  if (this.props.ready) this.doTheThing()
	}

	componentDidUpdate = prevProps => {
	  if (prevProps.moves !== this.props.moves) {
	    this.setState({
	      move: this.props.moves[0]
	    })
	    this.doTheThing()
	  }
	  if (prevProps.ready !== this.props.ready) {
	    this.doTheThing()
	  }
	}

	doTheThing = () => {
	  const { moves } = this.props
	  let flav
	  let i = 0
	  while (i < moves.length) {
	    if (moves[0].flavor_text_entries[i].language.name === 'en') {
	      flav = moves[0].flavor_text_entries[i].flavor_text
	      break
	    } else {
	      i++
	    }
	  }
	  this.setState({
	    move: this.props.moves[0],
	    moveFlavor: flav,
	    moveReady: true
	  })
	}

	render() {
	  const { move, moveFlavor, moveReady } = this.state
	  let display
	  if (moveReady) {
	    const a = move.name
	    if (a.includes('-')) {
	      const ar = a.split('-')
	      display = `${ar[0].charAt(0).toUpperCase()}${ar[0].slice(1)}-${ar[1].charAt(0).toUpperCase()}${ar[1].slice(1)}`
	    } else {
	      display = `${a.charAt(0).toUpperCase()}${a.slice(1)}`
	    }
	  }
	  return (
	    <MovesContainer>
	      <div className="windowContainer">
	        <div className="window">
	          <div className="moveContainer">
	            <span className="name">{display}</span>
	            <div className="move">
	              <span className="moveName">Accuracy</span>
	              { moveReady && <span className="moveStat">{move.accuracy || '---'}</span> }
	            </div>
	            <div className="move">
	              <span className="moveName">Power</span>
	              { moveReady && <span className="moveStat">{move.power || '---'}</span> }
	            </div>
	            <div className="move">
	              <span className="moveName">P.P.</span>
	              { moveReady && <span className="moveStat">{move.pp || '---'}</span> }
	            </div>
	          </div>
	          <div className="statContainer">
	            {
	              moveReady && <>
	                <span className="type">{move.type.name.toUpperCase()}</span>
	                <span className="damageClass">Damage Class: {move.damage_class.name.charAt(0).toUpperCase() + move.damage_class.name.slice(1)}</span>
	                <div className="textContainer">
	                  <div>{moveFlavor}</div>
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
		}
		.iconify {
			font-size: 1.5rem;
			pointer-events: none;
		}
	}
`
