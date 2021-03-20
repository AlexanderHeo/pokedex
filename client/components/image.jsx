import React, { Component } from 'react'
import styled from 'styled-components'

class ImageComponent extends Component {
	handleClick = () => {
	  // do the thing
	}

	render() {
	  return (
	    <Image>
	      <div className="frame">
	        <img src={this.props.pokemon.sprites.front_default} />
	        <div className="turnButtonContainer"><button className="turnButton" onClick={this.handleClick}><span className="iconify" data-icon="ic:round-change-circle" data-inline="false"></span></button></div>
	      </div>
	      <div className="imageButtons">
	        <div className="yellowButton" />
	        <div className="shinyButton"><button className="button" name="shiny" onClick={this.handleClick}>Shiny</button></div>
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
			width: 2.7rem;
			height: 2.7rem;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			background-color: #444;
			border: 1px solid black;
			border-radius: 50%;
			margin: auto;
		}
		.shinyButton {
			width: 5rem;
			height: 3rem;
			border: 1px solid black;
			border-radius: 25px;
			margin: 0 1rem 0 0;
			.button {
				width: 100%;
				height: 100%;
				border-radius: 25px;
			}
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
