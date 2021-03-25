import React, { Component } from 'react'
import styled from 'styled-components'
import Pokeball from '../../../server/public/images/Poke_Ball.png'

class Evolution extends Component {

  render() {
    const { setOne, setOneReady, setTwo, setTwoReady, setThree, setThreeReady, current } = this.props
    let img1 = Pokeball
    let img2 = Pokeball
    let img3 = Pokeball
    let name1 = '----'
    let name2 = '----'
    let name3 = '----'
    let multi2 = false
    let multi3 = false
    let frame1 = 'evoFrame'
    let frame2 = 'evoFrame'
    let frame3 = 'evoFrame'
    if (setOneReady) {
      img1 = setOne[0].sprite
      name1 = setOne[0].name
    }
    if (setTwoReady) {
      img2 = setTwo.data[0].sprites.front_default
      name2 = setTwo.data[0].name
      if (setTwo.data.length > 1) {
        multi2 = true
      }
    }
    if (setThreeReady) {
      img3 = setThree.data[0].sprites.front_default
      name3 = setThree.data[0].name
      if (setThree.data.length > 1) {
        multi3 = true
      }
    }
    if (name1 === current) frame1 = 'evoFrame highlight'
    if (name2 === current) frame2 = 'evoFrame highlight'
    if (name3 === current) frame3 = 'evoFrame highlight'
	  return (
	    <Evo>
	      <div className='evoSection'>
	        <div className={frame1}>
	          {
	            setOne
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
	            setTwoReady
	              ? <>
	                {
	                  multi2 &&
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
	            setThreeReady
	              ? <>
	                {
	                  multi3 &&
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
