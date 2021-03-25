import React from 'react'
import styled from 'styled-components'

const Buttons = ({ name, id, handleDpad, ready }) => {
  name = `${name.charAt(0).toUpperCase()}${name.slice(1)}`
  return (
    <Container>
      <div className='button'></div>
      <div className="middleSection">
        <div className='lines'>
          <div className='line'></div>
          <div className='line'></div>
        </div>
        <div className='window'>
          <div className="pokename">{name}</div>
          <div className="pokenum">{id}</div>
        </div>
      </div>
      <div className='dpad'>
        <div className="sectionD">
          <button className="direction upD" onClick={handleDpad} name="up" disabled={!ready}><span className="iconify" data-icon="bi:caret-up" data-inline="false" transform="rotate(-45)"></span></button>
          <button className="direction rightD" onClick={handleDpad} name="right" disabled={!ready}><span className="iconify" data-icon="bi:caret-right" data-inline="false"></span></button>
        </div>
        <div className="sectionD">
          <button className="direction leftD" onClick={handleDpad} name="left" disabled={!ready}><span className="iconify" data-icon="bi:caret-left" data-inline="false"></span></button>
          <button className="direction downD" onClick={handleDpad} name="down" disabled={!ready}><span className="iconify" data-icon="bi:caret-down" data-inline="false"></span></button>
        </div>
      </div>
    </Container>
  )
}

export default Buttons

const Container = styled.div`
	width: 350px;
	height: 100px;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	position: relative;
	background-color: gainsboro;
	border: 1px solid black;
	border-radius: 0.4rem;
	z-index: 10;
	.button {
		width: 40px;
		height: 40px;
		background-color: #333;
		border: 1px solid black;
		border-radius: 50%;
	}
	.middleSection {
		width: 100px;
		height: 100%;
		display: flex;
		flex-flow: column;
		justify-content: space-evenly;
		align-items: center;
		flex-flow: column;
		.lines {
			width: 100%;
			display: flex;
			justify-content: space-between;
			.line {
				width: 40px;
				height: 5px;
				background-color: #333;
				border: 1px solid black;
				border-radius: 0.25rem;
			}
		}
		.window {
			width: 100px;
			height: 40px;
			display: flex;
			flex-flow: column;
			justify-content: center;
			align-items: center;
			background-color: lightgreen;
			border: 1px solid darkgreen;
			border-radius: 0.2rem;
			box-shadow: inset 2px 2px 4px darkgreen, inset -2px -2px 4px limegreen;
		}
	}
	.dpad {
		width: 80px;
		height: 80px;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		grid-template-columns: repeat(2, 1fr);
		transform: rotate(45deg);
		.sectionD {
			width: 100%;
			height: 50%;
			display: flex;
			justify-content: space-between;
			.direction {
				width: 48%;
				height: 94%;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				border: 1px solid black;
				background-color: transparent;
				box-shadow: 3px 1px 4px black;
				.iconify {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 2rem;
					transform: rotate(-45deg);
					pointer-events: none;
				}
			}
			.direction:hover {
				transform: scale(1.2);
				z-index: 10;
			}
			.direction:active {
				background-color: #ef0d24;
				color: white;
			}
			.upD {
				border-top-left-radius: 500%;
				border-top-right-radius: 100%;
				border-bottom-right-radius: 100%;
				border-bottom-left-radius: 100%;
				g {
					transform: rotate(-45deg) translate(-8px, 1px);
				}
			}
			.rightD {
				border-top-right-radius: 500%;
				border-top-left-radius: 100%;
				border-bottom-left-radius: 100%;
				border-bottom-right-radius: 100%;
				g {
					transform: rotate(-45deg) translate(-7px, 2px);
				}
			}
			.leftD {
				border-bottom-left-radius: 500%;
				border-bottom-right-radius: 100%;
				border-top-right-radius: 100%;
				border-top-left-radius: 100%;
				g {
					transform: rotate(-45deg) translate(-9px, 2px);
				}
			}
			.downD {
				border-bottom-right-radius: 500%;
				border-bottom-left-radius: 100%;
				border-top-left-radius: 100%;
				border-top-right-radius: 100%;
				g {
					transform: rotate(-45deg) translate(-7px, 6px);
				}
			}
		}
		.sectionD:first-of-type {
			align-items: flex-start;
		}
		.sectionD:last-of-type {
			align-items: flex-end;
		}
	}
	.dpad:hover {
		transform: scale(1.1) rotate(45deg);
		transition: 0.1s ease forwards;
	}
`
