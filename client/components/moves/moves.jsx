import React, { Component } from 'react'
import styled from 'styled-components'
import move from '../../../data/moves.json'

class Moves extends Component {
	state = {
	  index: 0,
	  list: [],
	  moveURL: '',
	  moveData: {},
	  moveLoaded: false
	}

	componentDidMount() {
	  const ar = []
	  for (let i = 0; i < 10; i++) {
	    ar.push(this.props.moves[i].move.url)
	  }
	  this.setState({
	    list: ar,
	    moveData: move,
	    moveLoaded: true
	  })
	}

	// componentDidMount = () => {
	//   this.setState({ moveURL: this.props.moves[0].move.url })
	// }

	componentDidUpdate = async (prevProps, prevState) => {
	  const { moveURL } = this.state
	  if (prevState.moveURL !== this.state.moveURL) {
	    try {
	      const response = await fetch(moveURL)
	      const data = await response.json()
	      this.setState({ moveData: data })
	    } catch (err) {
	      console.error(err)
	    }
	  }
	}

	handleClick = e => {
	  const name = e.target.name
	  if (name === 'up') {
	    let index = this.state.index
	    if (index > 8) {
	      this.setState({
	        index: 0,
	        moveURL: this.state.list[0]
	      })
	    } else {
	      this.setState({
	        index: ++index,
	        moveURL: this.state.list[index]
	      })
	    }
	  } else if (name === 'down') {
	    let index = this.state.index
	    if (index < 1) {
	      this.setState({
	        index: 9,
	        moveURL: this.state.list[9]
	      })
	    } else {
	      this.setState({
	        index: --index,
	        moveURL: this.state.list[index]
	      })
	    }
	  }
	}

	render() {
	  let display, text, text1, text2
	  const { moveLoaded, moveData } = this.state
	  if (moveLoaded) {
	    const a = moveData.name
	    if (a.includes('-')) {
	      const ar = a.split('-')
	      display = `${ar[0].charAt(0).toUpperCase()}${ar[0].slice(1)}-${ar[1].charAt(0).toUpperCase()}${ar[1].slice(1)}`
	    } else {
	      display = `${a.charAt(0).toUpperCase()}${a.slice(1)}`
	    }
	    text = moveData.flavor_text_entries[0].flavor_text
	    const index = text.indexOf('2')
	    text1 = text.slice(0, index)
	    text2 = text.slice(index)
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
					          <div className="text">{text1}</div>
					          <div className="text">{text2}</div>
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
	margin: 0 auto;
	width: 400px;
	border: 1px solid black;
	display: flex;
	background-color: gainsboro;
	.windowContainer {
		font-family: 'VT323', monospace;
		width: 85%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.window {
			width: 90%;
			display: flex;
			border: 1px solid black;
			border-radius: 0.3rem;
			background-color: lightgreen;
			padding: 1rem;
			margin: 0.3rem;
			.moveContainer,
			.statContainer {
				width: 50%;
				display: flex;
				flex-flow: column;
				align-items: center;
			}
			.moveContainer {
				.name {
					font-size: 1.3rem;
					border-bottom: 1px solid black;
				}
				.move {
					display: flex;
					justify-content: space-between;
					width: 80%;
				}
			}
			.statContainer {
				position: relative;
				.type {
					width: 50%;
					border: 1px solid black;
					border-radius: 1rem;
					text-align: center;
					margin-bottom: 0.4rem;
					padding: 0.3rem;
				}
				.textContainer {
					width: 139px;
					height: 18px;
					position: absolute;
					overflow-y: scroll;
					bottom: 0;
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
