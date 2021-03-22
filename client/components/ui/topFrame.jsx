import React from 'react'
import styled from 'styled-components'

const TopFrame = () => (
  <Frame>
    <div className="lenseFrame">
      <div className="lense" />
    </div>
    <div className="buttonContainer">
      <div className="buttonFrame">
        <div className="button blue"></div>
      </div>
      <div className="buttonFrame">
        <div className="button yellow"></div>
      </div>
      <div className="buttonFrame">
        <div className="button green"></div>
      </div>
    </div>
    <div className="cut" />
    <div className="cutFrame" />
  </Frame>
)

export default TopFrame

const Frame = styled.div`
	width: 100%;
	height: 120px;
	display: flex;
	align-items: flex-start;
	position: relative;
	border-bottom: 10px solid black;
	.lenseFrame {
		width: 90px;
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		border: 1px solid black;
		border-radius: 50%;
		margin: auto 1.2rem auto 3rem;
		.lense {
			width: 74px;
			height: 74px;
			background-color: dodgerblue;
			border: 1px solid black;
			border-radius: 50%;
		}
	}
	.buttonContainer {
		display: flex;
		margin: 1rem 0;
		.buttonFrame {
			width: 24px;
			height: 24px;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: white;
			border: 1px solid black;
			border-radius: 50%;
			margin: 0 0.2rem;
		}
		.button {
			width: 20px;
			height: 20px;
			border: 1px solid black;
			border-radius: 50%;
		}
		.blue {
			background-color: blue;
		}
		.green {
			background-color: green;
		}
		.yellow {
			background-color: yellow;
		}
	}
	.cut {
		width: 230px;
		height: 60px;
		position: absolute;
		bottom: -10px;
		right: -40px;
		background-color: #ef0d24;
		border-left: 15px solid black;
		border-top: 10px solid black;
		transform: skew(-45deg, 0);
	}
	.cutFrame {
		width: 80px;
		height: 80px;
		position: absolute;
		bottom: -15px;
		right: -82px;
		background-color: #ef0d24;
		border-left: 1px solid black;
	}
`
