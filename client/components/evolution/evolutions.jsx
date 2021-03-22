import React, { Component } from 'react'
import styled from 'styled-components'
import Pokeball from '../../../server/public/images/Poke_Ball.png'

const POKEAPI_URL_ROOT = 'https://pokeapi.co/api/v2/pokemon/'

class Evolution extends Component {
	state = {
	  one: [],
	  oneLoaded: false,
	  two: [],
	  twoLoaded: false,
	  twoIndex: 0,
	  twoMulti: false,
	  three: [],
	  threeLoaded: false,
	  threeIndex: 0,
	  threeMulti: false
	}

	componentDidMount = async () => {
	  const { evo } = this.props
	  try {
	    const res = await fetch(evo)
	    const evol = await res.json()
	    const oneUrl = evol.chain.species.url
	    if (oneUrl) {
	      const res = await fetch(oneUrl)
	      const data = await res.json()
	      if (data) {
	        const res1 = await fetch(`${POKEAPI_URL_ROOT}${data.id}`)
	        const data1 = await res1.json()
	        if (data1) {
	          const updated = this.state.one.concat(data1)
	          this.setState({
	            one: updated,
	            oneLoaded: true
	      		})
		      }
	   	  }
	    }
	    if (evol.chain.evolves_to[0]) {
	      const twoSet = []
	      evol.chain.evolves_to.map(async x => {
	        const url = x.species.url
	        const res = await fetch(url)
	        const json = await res.json()
	        if (json) {
	          const res1 = await fetch(`${POKEAPI_URL_ROOT}${json.id}`)
	          const data = await res1.json()
	          if (data) twoSet.push(data)
	        }
	        const multi = twoSet.length > 1
	        this.setState({
	          two: twoSet,
	          twoLoaded: true,
	          twoMulti: multi
	        })
	      })
	      if (evol.chain.evolves_to[0].evolves_to[0]) {
	        const threeSet = []
	        evol.chain.evolves_to[0].evolves_to.map(async x => {
	          const url = x.species.url
	          const res = await fetch(url)
	          const json = await res.json()
	          if (json) {
	            const res1 = await fetch(`${POKEAPI_URL_ROOT}${json.id}`)
	            const data = await res1.json()
	            if (data) threeSet.push(data)
	          }
	          const multi = threeSet.length > 1
	          this.setState({
	            three: threeSet,
	            threeLoaded: true,
	            threeMulti: multi
	          })
	        })

	        const threeUrl = evol.chain.evolves_to[0].evolves_to[0].species.url
	        if (threeUrl) {
	          const res = await fetch(threeUrl)
	          const json = await res.json()
	          if (json) {
	            const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${json.id}`)
	            const data = await res1.json()
	            if (data) {
	              const updated = [...this.state.three]
	              updated.push(data)
	              this.setState({
	                three: updated,
	                threeLoaded: true
	              })
	            }
	          }
	        }
	      }
	    }
	  } catch (err) {
	    console.error(err)
	  }
	}

	handleClick = e => {
	  const name = e.target.name
	  let { two, three, twoIndex, threeIndex } = this.state
	  if (name.includes('2')) {
	    if (name === 'leftArrow2') {
	      if (twoIndex === 0) twoIndex = two.length - 1
	      else twoIndex -= 1
	    }
	    if (name === 'rightArrow2') {
	      if (twoIndex === two.length - 1) twoIndex = 0
	      else twoIndex += 1
	    }
	    this.setState({ twoIndex: twoIndex })
	  }
	  if (name.includes('3')) {
	    if (name === 'leftArrow3') {
	      if (threeIndex === 0) threeIndex = three.length - 1
	      else threeIndex -= 1
	    }
	    if (name === 'rightArrow2') {
	      if (threeIndex === three.length - 1) threeIndex = 0
	      else threeIndex += 1
	    }
	    this.setState({ threeIndex: threeIndex })
	  }
	}

	render() {
	  const { one, oneLoaded, two, twoLoaded, twoIndex, three, threeLoaded, threeIndex } = this.state
	  let name1, name2, name3, img1, img2, img3
	  if (oneLoaded) {
	  	name1 = `${one[0].name.charAt(0).toUpperCase()}${one[0].name.slice(1)}`
	  	img1 = one[0].sprites.front_default
	  }
	  if (twoLoaded) {
	    name2 = `${two[twoIndex].name.charAt(0).toUpperCase()}${two[twoIndex].name.slice(1)}`
	    img2 = two[twoIndex].sprites.front_default
	  }
	  if (threeLoaded) {
	    name3 = `${three[threeIndex].name.charAt(0).toUpperCase()}${three[threeIndex].name.slice(1)}`
	    img3 = three[threeIndex].sprites.front_default
	  }
	  return (
	    <Evo>
	      <div className='evoSection'>
	        <div className="evoFrame">
	          {
	            this.state.oneLoaded
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
	        <div className="evoFrame">
	          {
	            this.state.twoLoaded
	              ? <>
	                {
	                  this.state.twoMulti &&
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
	        <div className="evoFrame">
	          {
	            this.state.threeLoaded
	              ? <>
	                {
	                  this.state.threeMulti &&
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
	}
`
