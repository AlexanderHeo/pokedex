import React, { Component } from 'react'
import styled from 'styled-components'

class ImageComponent extends Component {
	state = {
	  front: '',
	  back: '',
	  shiny: '',
	  front_shiny: '',
	  back_shiny: '',
	  female_form: '',
	  front_female: '',
	  back_female: '',
	  image: '',
	  src: '',
	  srcSet: ['', '']
	}

	componentDidMount = () => {
	  const { sprites } = this.props
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
	    src: sprites.front_default,
	    srcSet: [sprites.front_default, sprites.back_default],
	    image: sprites.other['official-artwork']
	  })
	}

	componentDidUpdate = (prevProps, prevState) => {
	  if (this.state.shiny !== prevState.shiny) {
	    if (this.state.shiny) {
	      const set = [this.state.front_shiny, this.state.back_shiny]
	      this.setState({
	        srcSet: set,
	        src: this.state.front_shiny
				 })
	    } else {
	      const set = [this.state.front, this.state.back]
	      this.setState({
	        srcSet: set,
	        src: this.state.front
				 })
	    }
	  }
	}

	handleClick = e => {
	  const name = e.target.name
	  const { src, srcSet, shiny } = this.state
	  if (name === 'turn') {
	    if (src === srcSet[0]) this.setState({ src: srcSet[1] })
	    if (src === srcSet[1]) this.setState({ src: srcSet[0] })
	  }
	  if (name === 'shiny') this.setState({ shiny: !shiny })
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
	          <button className={
	            this.state.shiny
	              ? 'shinyButton shiny'
	              : 'shinyButton'} onClick={this.handleClick} name="shiny">
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
	width: 350px;
	height: 310px;
	display: flex;
	flex-flow: column;
	justify-content: flex-end;
	align-items: center;
	position: relative;

	background-color: gainsboro;
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
			cursor: pointer;
		}
		.turnButton:hover {
			transform: scale(1.4);
			transition: 0.3s ease;
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
	/* .frame:hover {
		overflow: initial;
		img {
			background-color: white;
			border-radius: 1rem;
			z-index: 10000;
			transform: scale(1.17);
			border: 2px solid darkred;
		}
	} */
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
			border: 3px solid black;
			border-radius: 25px;
			margin: 0 1rem 0 0;
		}
		.shinyButton {
			width: 100%;
			height: 100%;
			background: rgb(192,192,192);
			background: linear-gradient(45deg, rgba(192,192,192,1) 54%, rgba(225,225,225,1) 64%, rgba(192,192,192,1) 73%);
			cursor: pointer;
			border-radius: 25px;
			outline: none;
		}
		.shinyButton:hover {
			transform: scale(1.2);
			transition-duration: 0.3s ease;
		}
		.shiny {
			background: rgb(255,215,0);
			background: linear-gradient(45deg, rgba(255,215,0,1) 54%, rgba(255,255,255,1) 64%, rgba(255,215,0,1) 73%);
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
		left: -2px;
		display: flex;
		background-color: #ef0d24;
		transform: skewY(45deg);
	}
`
