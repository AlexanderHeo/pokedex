import React from 'react'
import styled from 'styled-components'

const BlueButtons = () => (
  <Buttons>
    <div className='button'/>
    <div className='button'/>
    <div className='button'/>
    <div className='button'/>
    <div className='button'/>
    <div className='button'/>
    <div className='button'/>
    <div className='button'/>
    <div className='button'/>
    <div className='button'/>
  </Buttons>
)

export default BlueButtons

const Buttons = styled.div`
	margin: 1rem auto;
	width: 400px;
	height: 100px;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	background-color: darkblue;
	.button {
		border: 1px solid darkblue;
		background-color: dodgerblue;
	}
`
