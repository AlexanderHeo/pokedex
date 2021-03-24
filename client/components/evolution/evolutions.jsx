import React, { Component } from 'react'
import styled from 'styled-components'
import Pokeball from '../../../server/public/images/Poke_Ball.png'

class Evolution extends Component {
	state = {
	  one: {},
	  two: {},
	  three: {},
	  twoMulti: false,
	  threeMulti: false,
	  twoReady: false,
	  threeReady: false,
	  twoIndex: 0,
	  threeIndex: 0
	}

	componentDidMount = () => {
	  this.doTheThing()
	}

	componentDidUpdate = prevProps => {
	  if (prevProps !== this.props) {
	    this.doTheThing()
	  }
	}

	doTheThing = () => {
	  const { evo } = this.props
	  const { setOne, setTwo, setThree } = evo

	  const one = { ...setOne[0] }
	  const two = { ...setTwo[0] }
	  const three = { ...setThree[0] }

	  let twoReady, threeReady
	  if (setTwo[0]) twoReady = true
	  if (setThree[0]) threeReady = true

	  this.setState({
	    one: one,
	    two: two,
	    three: three,
	    twoReady: twoReady,
	    threeReady: threeReady,
	    twoMulti: setTwo.length > 1,
	    threeMulti: setThree.length > 1,
	    twoIndex: 0,
	    threeIndex: 0
	  })
	}

	handleClick = e => {
	  const name = e.target.name
	  const { twoIndex, threeIndex } = this.state
	  const { evo } = this.props
	  const { setTwo, setThree } = evo

	  if (name === 'leftArrow2') {
	    if (twoIndex === 0) this.setState({ twoIndex: setTwo.length - 1 })
	    else this.setState({ twoIndex: twoIndex - 1 })
	  }
	  if (name === 'rightArrow2') {
	    if (twoIndex === setTwo.length - 1) this.setState({ twoIndex: 0 })
	    else this.setState({ twoIndex: twoIndex + 1 })
	  }
	  if (name === 'leftArrow3') {
	    if (threeIndex === 0) this.setState({ threeIndex: setThree.length - 1 })
	    else this.setState({ threeIndex: threeIndex - 1 })
	  }
	  if (name === 'rightArrow3') {
	    if (threeIndex === setThree.length - 1) this.setState({ threeIndex: 0 })
	    else this.setState({ threeIndex: threeIndex + 1 })
	  }
	}

	render() {
	  const { evo } = this.props
	  const { current, setOne, setTwo, setThree } = evo
	  const { twoMulti, threeMulti, twoReady, threeReady, twoIndex, threeIndex } = this.state
	  let name2, name3, img2, img3
	  const name1 = setOne[0].name
	  const img1 = setOne[0].sprite
	  if (setTwo.length) {
	    name2 = setTwo[twoIndex].name
	    img2 = setTwo[twoIndex].sprite
	  }
	  if (setThree.length) {
	    name3 = setThree[threeIndex].name
	    img3 = setThree[threeIndex].sprite
	  }
	  let frame1 = 'evoFrame'
	  let frame2 = 'evoFrame'
	  let frame3 = 'evoFrame'
	  if (current === name1) frame1 = 'evoFrame highlight'
	  if (current === name2) frame2 = 'evoFrame highlight'
	  if (current === name3) frame3 = 'evoFrame highlight'

	  return (
	    <Evo>
	      <div className='evoSection'>
	        <div className={frame1}>
	          {
	            setOne.length
	              ? <>
	                <img className="sprite" src={img1} />
	                <span className="name">{name1}</span>
	              </>
	              : <>
	                <img className="sprite" src={Pokeball} />
	                <div className="pokeball" />
	                <div className="nodata">No Data</div>
	              </>
	          }
	        </div>
	      </div>
	      <div className='evoSection'>
	        <div className={frame2}>
	          {
	            twoReady
	              ? <>
	                {
	                  twoMulti &&
  									<div className="multi twoMulti">
  									  <button className="arrow leftArrow"onClick={this.handleClick} name="leftArrow2"><span className="iconify" data-icon="ant-design:caret-left-filled" data-inline="false"></span></button>
  									  <button className="arrow rightArrow"onClick={this.handleClick} name="rightArrow2"><span className="iconify" data-icon="ant-design:caret-right-filled" data-inline="false"></span></button>
  									</div>
	                }
	                <img className="sprite" src={img2} />
	                <span className="name">{name2}</span>
	              </>
	              : <>
	                <img className="sprite" src={Pokeball} />
	                <div className="pokeball" />
	                <div className="nodata">No Data</div>
	              </>
	          }
	        </div>
	      </div>
	      <div className='evoSection'>
	        <div className={frame3} onClick={this.props.handleEvoClick}>
	          {
	            threeReady
	              ? <>
	                {
	                  threeMulti &&
  									<div className="multi threeMulti">
  									  <button className="arrow leftArrow" onClick={this.handleClick} name="leftArrow3"><span className="iconify" data-icon="ant-design:caret-left-filled" data-inline="false"></span></button>
  									  <button className="arrow rightArrow" onClick={this.handleClick} name="rightArrow3"><span className="iconify" data-icon="ant-design:caret-right-filled" data-inline="false"></span></button>
  									</div>
	                }
	                <img className="sprite" src={img3} />
	                <span className="name">{name3}</span>
	              </>
	              : <>
	                <img className="sprite" src={Pokeball} />
	                <div className="pokeball" />
	                <div className="nodata">No Data</div>
	              </>
	          }
	        </div>
	      </div>
	    </Evo>
	  )
	}
}

export default Evolution

const Evo = styled.div`
	width: 400px;
	height: 152px;
	display: flex;
	border: 1px solid black;
	border-radius: 0.3rem;
	background-color: gainsboro;
	margin: 1rem auto;
	.evoSection {
		width: calc(100% / 3);
		height: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
		.evoFrame {
			width: 90%;
			height: 139px;
			position: relative;
			display: flex;
			flex-flow: column;
			justify-content: center;
			align-items: center;
			font-size: 0.8rem;
			margin: 0.3rem 0;
			border: 1px solid black;
			border-radius: 0.3rem;
			background-color: lightgreen;
			.sprite {
				width: 120px;
				height: 120px;
			}
			.pokeball {
				position: absolute;
				height: 100%;
				width: 100%;
				background-color: rgba(0, 0, 0, 0.4);
			}
			.nodata {
				color: darkgreen;
			}
			.multi {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				position: absolute;
				.arrow {
					border: none;
					outline: none;
					border: 1px solid transparent;
					background-color: transparent;
					transition: transform 0.3s ease;
					.iconify {
						pointer-events: none;
					}
				}
				.arrow:hover {
					transform: scale(2)
				}
				.arrow:active svg {
					color: #ef0d24;
					border: 1px solid black;
					outline: none;
				}
			}
		}
		.highlight {
			box-shadow: inset 10px 10px 30px gold, inset -10px -10px 30px gold;
		}
	}
`
