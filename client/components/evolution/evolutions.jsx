import React, { Component } from 'react'
import styled from 'styled-components'

const POKE_SPECIES_URL_ROOT = 'https://pokeapi.co/api/v2/pokemon/'

class Evolution extends Component {
	state = {
	  one: [],
	  oneLoaded: false,
	  two: [],
	  twoLoaded: false,
	  three: [],
	  threeLoaded: false
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
	        const res1 = await fetch(`${POKE_SPECIES_URL_ROOT}${data.id}`)
	        const data1 = await res1.json()
	        if (data1) {
	          this.setState({
	            one: data1,
	            oneLoaded: true
	      		})
		      }
	   	  }
	    }
	    if (evol.chain.evolves_to.length) {
	      const twoUrl = evol.chain.evolves_to[0].species.url
	      if (twoUrl) {
	        const res = await fetch(twoUrl)
	        const json = await res.json()
	        if (json) {
	          const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${json.id}`)
	          const data = await res1.json()
	          if (data) {
	            this.setState({
	              two: data,
	              twoLoaded: true
	            })
	          }
	        }
	      }
	    }
	    if (evol.chain.evolves_to[0].evolves_to.length) {
	      const threeUrl = evol.chain.evolves_to[0].evolves_to[0].species.url
	      if (threeUrl) {
	        const res = await fetch(threeUrl)
	        const json = await res.json()
	        if (json) {
	          const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${json.id}`)
	          const data = await res1.json()
	          if (data) {
	            this.setState({
	              three: data,
	              threeLoaded: true
	            })
	          }
	        }
	      }
	    }
	  } catch (err) {
	    console.error(err)
	  }
	}

	render() {
	  const { one, oneLoaded, two, twoLoaded, three, threeLoaded } = this.state
	  let name1, name2, name3, img1, img2, img3
	  if (oneLoaded) {
	  	name1 = `${one.name.charAt(0).toUpperCase()}${one.name.slice(1)}`
	  	img1 = one.sprites.front_default
	  }
	  if (twoLoaded) {
	    name2 = `${two.name.charAt(0).toUpperCase()}${two.name.slice(1)}`
	    img2 = two.sprites.front_default
	  }
	  if (threeLoaded) {
	    name3 = `${three.name.charAt(0).toUpperCase()}${three.name.slice(1)}`
	    img3 = three.sprites.front_default
	  }
	  return (
	    <Evo>
	      <div className='evoSection'>
	        <div className="evoFrame">
	          {
	            this.state.oneLoaded &&
							<>
							  <img className="sprite" src={img1} />
							  <span className="name">{name1}</span>
							</>
	          }
	        </div>
	      </div>
	      <div className='evoSection'>
	        <div className="evoFrame">
	          {
	            this.state.twoLoaded &&
							<>
	          		<img className="sprite" src={img2} />
							  <span className="name">{name2}</span>
							</>
	          }
	        </div>
	      </div>
	      <div className='evoSection'>
	        <div className="evoFrame">
	          {
	            this.state.threeLoaded &&
							<>
	          		<img className="sprite" src={img3} />
							  <span className="name">{name3}</span>
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
		}
	}
`
