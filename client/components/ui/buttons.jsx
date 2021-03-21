import React from 'react'
import styled from 'styled-components'

const Buttons = () => (
  <Container>
    <div className='button'></div>
    <div className="middleSection">
      <div className='lines'>
      	<div className='line'></div>
      	<div className='line'></div>
      </div>
      <div className='square'></div>
    </div>
    <div className='dpad'></div>
  </Container>
)

export default Buttons

const Container = styled.div`
	width: 350px;
	height: 100px;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	position: relative;
	margin: 1rem auto;
	background-color: gainsboro;
	border: 1px solid black;
	border-radius: 0.4rem;
	z-index: 10;
	.button {
		width: 40px;
		height: 40px;
		background-color: #ef0d24;
		border: 1px solid #5c0101;
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
				background-color: #ef0d24;
				border: 1px solid #5c0101;
				border-radius: 0.25rem;
			}
		}
		.square {
			width: 100px;
			height: 40px;
			background-color: #ef0d24;
			border: 1px solid #5c0101;
			border-radius: 0.2rem;
		}
	}
	.dpad {
		width: 80px;
		height: 80px;
		background-color: #ef0d24;
		border: 1px solid #5c0101;
		border-radius: 50%;
	}
`
