import React, { Component } from 'react'
import styled from 'styled-components'

class InputModal extends Component {
	state = {
	  id: this.props.id
	}

	handleChange = e => {
	  this.setState({ id: e.target.value })
	}

	render() {
	  return <IM>
	    <div className="inputContainer">
	      <label htmlFor="num">No.</label>
	      <input className="inputIM" onChange={this.handleChange} value={this.state.id} type="text"/>
	    </div>
	    <div className="buttonContainer">
	      <button className="buttonIM" onClick={e => this.props.handleClick(e, this.state.id)} name='ok'>OK</button>
	    	<button className="buttonIM" onClick={this.props.handleClick} name='x'>X</button>
	    </div>
	  </IM>
	}
}

export default InputModal

const IM = styled.div`
	width: inherit;
	height: inherit;
	display: flex;
	flex-flow: column;
	justify-content: space-evenly;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	background-color: lightgreen;
	border-radius: inherit;
	box-shadow: inset 2px 2px 4px darkgreen, inset -2px -2px 4px limegreen;
	.inputIM {
		width: 30px;
		font-family: 'VT323', monospace;
		font-size: 1rem;
		text-align: center;
		border-radius: 0.2rem;
		background-color: darkgreen;
		padding: 0;
		color: lightgreen;
	}
	.buttonContainer {
		display: flex;
	}
	.buttonIM {
		width: 34px;
		height: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 25px;
		background-color: #ef0d24;
	}
`
