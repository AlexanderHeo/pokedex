import React, { Component } from 'react'
import styled from 'styled-components'
import back from '../../server/public/images/1back.png'
import backShiny from '../../server/public/images/1backshiny.png'
import front from '../../server/public/images/1front.png'
import frontShiny from '../../server/public/images/1frontshiny.png'

class ImageComponent extends Component {
	state = {
	  front: front,
	  back: back,
	  shiny: false,
	  front_shiny: frontShiny,
	  back_shiny: backShiny,
	  female_form: false,
	  front_female: '',
	  back_female: '',
	  image: '',
	  src: front,
	  src_set: [front, back]
	}

	componentDidMount = () => {
	  const { sprites } = this.props.pokemon
	  if (sprites.front_female) {
	    this.setState({
	      female_form: true,
	      front_female: sprites.front_female,
	      back_female: sprites.back_female
	    })
	  }
	  this.setState({
	    front: sprites.front_default,
	    front_shiny: sprites.front_shiny,
	    back: sprites.back_default,
	    back_shiny: sprites.back_shiny,
	    image: sprites.other['official-artwork']
	  })
	}

	componentDidUpdate = (prevProps, prevState) => {
	  if (this.state.shiny !== prevState.shiny) {
	    if (this.state.shiny) {
	      const set = [this.state.front_shiny, this.state.back_shiny]
	      this.setState({
	        src_set: set,
	        src: this.state.front_shiny
				 })
	    } else {
	      const set = [this.state.front, this.state.back]
	      this.setState({
	        src_set: set,
	        src: this.state.front
				 })
	    }
	  }
	}

	handleClick = e => {
	  const name = e.target.name
	  if (name === 'turn') {
	    if (this.state.src === this.state.src_set[0]) this.setState({ src: this.state.src_set[1] })
	    if (this.state.src === this.state.src_set[1]) this.setState({ src: this.state.src_set[0] })
	  }
	  if (name === 'shiny') this.setState({ shiny: !this.state.shiny })
	}

	render() {
	  const { src } = this.state
	  return (
	    <Image>
	      <div className="frame">
	        <img src={src} />
	        <div className="turnButtonContainer">
	          <button className="turnButton" onClick={this.handleClick} name="turn">
	            <span className="iconify" data-icon="ic:round-change-circle" data-inline="false" />
	          </button>
	        </div>
	      </div>
	      <div className="imageButtons">

	        <div className="yellowButton" />

	        <div className="shinyButtonContainer">
	          <button className="shinyButton" onClick={this.handleClick} name="shiny">
							Shiny
	          </button>
	        </div>

	        <div className="grillContainer">
	          <div className="grillLine"/>
	          <div className="grillLine"/>
	          <div className="grillLine"/>
	          <div className="grillLine"/>
	        </div>
	      </div>
	      <div className="bottomCut"/>
	    </Image>
	  )
	}
}

export default ImageComponent

const Image = styled.div`
	margin: auto;
	background-color: gainsboro;
	width: 350px;
	height: 310px;
	display: flex;
	flex-flow: column;
	justify-content: flex-end;
	align-items: center;
	position: relative;
	border: 1px solid black;
	border-radius: 1rem;
	outline: none;
	.frame {
		background-color: white;
		width: 93%;
		height: 60%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		border: 1px solid black;
		border-radius: 0.35rem;
		overflow: hidden;
		img {
			width: 100%;
		}
		.turnButtonContainer {
			position:absolute;
			bottom: 0.5rem;
			right: 0.5rem;
		}
		.turnButton {
			display: flex;
			background-color: white;
			border: none;
			outline: none;
			padding: 0;
		}
		.iconify {
			font-size: 1.6rem;
			color: #ef0d24;
			pointer-events: none;
		}
	}
	.frame::before,
	.frame::after {
		width: 0.5rem;
		height: 0.5rem;
		position: absolute;
		top: -1.3rem;
		border-radius: 50%;
		content: '';
		background-color: black;
	}
	.frame::before {
		left: 44%;
	}
	.frame::after {
		right: 44%;
	}
	.imageButtons {
		width: 80%;
		height: 30%;
		display: flex;
		align-items: center;

		.yellowButton {
			width: 2.5rem;
			height: 2.5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			background-color: yellow;
			border: 5px solid #c3c319;
			border-radius: 50%;
			margin: auto;
		}
		.shinyButtonContainer {
			width: 5rem;
			height: 3rem;
			border: 1px solid black;
			border-radius: 25px;
			margin: 0 1rem 0 0;
		}
		.shinyButton {
			width: 100%;
			height: 100%;
			border-radius: 25px;
		}
		.grillContainer {
			width: 4rem;
			height: 2.7rem;
			.grillLine {
				width: 100%;
				height: 0.2rem;
				background-color: black;
				margin: calc((40px - 8px) / 5) 0;
			}
		}
	}
	.bottomCut {
		width: 80px;
		height: 80px;
		border-top: 1px solid black;
		border-right: 1px solid transparent;
		border-left: 1px solid transparent;
		border-bottom: 1px solid transparent;
		position: absolute;
		bottom: -41px;
		left: -1px;
		display: flex;
		background-color: #ef0d24;
		transform: skewY(45deg);
	}
`
