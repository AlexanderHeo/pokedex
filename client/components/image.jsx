import React, { Component } from 'react'
import styled from 'styled-components'
import Pokeball from '../../server/public/images/Poke_Ball.png'

class ImageComponent extends Component {
	state = {
	  front: Pokeball,
	  back: Pokeball,
	  shiny: '',
	  front_shiny: '',
	  back_shiny: '',
	  female_form: '',
	  front_female: '',
	  back_female: '',
	  image: '',
	  src: '',
	  srcSet: [Pokeball, Pokeball],
	  srcIndex: 0,
	  ready: false
	}

	componentDidMount = () => {
	  this.setUrls()
	}

	setUrls = () => {
	  const { sprites } = this.props
	  if (sprites) {
	    if (sprites.front_female) {
	      this.setState({
	        female_form: true,
	        front_female: sprites.front_female,
	        back_female: sprites.back_female
	      })
	    }
	    this.setState({
	      front: sprites.front_default,
	      front_shiny: sprites.front_shiny,
	      back: sprites.back_default,
	      back_shiny: sprites.back_shiny,
	      src: sprites.front_default,
	      srcSet: [sprites.front_default, sprites.back_default],
	      ready: true
	    })
	  }
	}

	componentDidUpdate = (prevProps, prevState) => {
	  if (this.state.shiny !== prevState.shiny) {
	    if (this.state.shiny) {
	      const set = [this.state.front_shiny, this.state.back_shiny]
	      this.setState({ srcSet: set })
	    } else {
	      const set = [this.state.front, this.state.back]
	      this.setState({ srcSet: set })
	    }
	  }
	  if (this.props.sprites !== prevProps.sprites) {
	    this.setUrls()
	  }
	}

	handleClick = e => {
	  const name = e.target.name
	  const { srcIndex, shiny } = this.state
	  if (name === 'turn') {
	    if (srcIndex) this.setState({ srcIndex: 0 })
	    else this.setState({ srcIndex: 1 })
	  }
	  if (name === 'shiny') this.setState({ shiny: !shiny })
	}

	render() {
	  const { ready, srcSet, srcIndex } = this.state
	  const { badge } = this.props
	  let src = Pokeball
	  let pokeClass = 'pokeball'
	  if (ready) {
	    src = srcSet[srcIndex]
	    pokeClass = ''
	  }
	  return (
	    <Image>
	      <div className={
	        this.state.shiny
	          ? 'frame shiny'
	          : 'frame'
	      }>
	        {
	          ready && <div className="specialBadgeContainer">
	            {
	              badge.isLegendary &&
								<>
								  <div className="badgeFrame name">
								    <div className="badgeName legendary">
								      <div className="nameSpan">
												Legendary
								      </div>
								    </div>
								  </div>
								  <div className="badgeFrame initial">
								    <div className="badgeInitial legendary">L</div>
								  </div>
								</>
	            }
	            {
	              badge.isMythical &&
								<>
								  <div className="badgeFrame name">
								    <div className="badgeName mythical">
								      <div className="nameSpan">
												Mythical
								      </div>
								    </div>
								  </div>
								  <div className="badgeFrame initial">
								    <div className="badgeInitial mythical">M</div>
								  </div>
								</>
	            }
	            {
	              badge.isBaby &&
								<>
								  <div className="badgeFrame name">
								    <div className="badgeName baby">
								      <div className="nameSpan">
												Baby
								      </div>
								    </div>
								  </div>
								  <div className="badgeFrame initial">
								    <div className="badgeInitial baby">B</div>
								  </div>
								</>
	            }
	          </div>
	        }
	        <img src={src} className={pokeClass} />
	        <div className="shinyButtonContainer">
	          <button className={
	            this.state.shiny
	              ? 'shinyButton shiny'
	              : 'shinyButton'
	          } onClick={this.handleClick} name="shiny">
							S
	          </button>
	        </div>
	        <div className="turnButtonContainer">
	          <button className="turnButton" onClick={this.handleClick} name="turn">
	            <span className="iconify" data-icon="ic:round-change-circle" data-inline="false" />
	          </button>
	        </div>
	      </div>
	      <div className="imageButtons">

	        <div className="yellowButton" />

	        {/* <div className="shinyButtonContainer">
	          <button className={
	            this.state.shiny
	              ? 'shinyButton shiny'
	              : 'shinyButton'} onClick={this.handleClick} name="shiny">
							Shiny
	          </button>
	        </div> */}

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
	width: 350px;
	height: 310px;
	display: flex;
	flex-flow: column;
	justify-content: flex-end;
	align-items: center;
	position: relative;

	background-color: gainsboro;
	border: 1px solid black;
	border-radius: 1rem;
	outline: none;
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
		overflow: hidden;
		.specialBadgeContainer {
			display: flex;
			flex-flow: column;
			justify-content: flex-start;
			align-items: flex-start;
			position: absolute;
			top: 0;
			left: 0;
			margin: 0.5rem;
			.badgeFrame {
				width: 30px;
				height: 30px;
				justify-content: center;
				align-items: center;
				border: 1px solid black;
				border-radius: 25px;
				.badgeName {
					width: 24px;
					height: 24px;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 1px solid black;
					border-radius: 25px;
					.nameSpan {
						margin: 0 0.5rem;
						overflow: hidden;
					}
				}
			}
			.name {
				display: flex;
				z-index: -1;
			}
			.initial {
				display: flex;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 20;
			}
			.badgeInitial {
				width: 24px;
				height: 24px;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1px solid black;
				border-radius: 25px;
			}
			.legendary {
				background-color: gold;
			}
			.mythical {
				background-color: silver;
			}
			.baby {
				background-color: dodgerblue;
			}
		}
		.specialBadgeContainer:hover {
			.initial {
				display: none;
			}
			.name {
				z-index: 1000;
				width: 80px;
				transition: width 0.2s ease;
				transition-delay: 0.1s;
			}
			.badgeName {
				width: 74px;
				transition: width 0.2s ease;
				transition-delay: 0.1s;
			}
		}
		img {
			width: 100%;
		}
		.pokeball {
			opacity: 0.4;
			transform: scale(0.5);
		}
		.shinyButtonContainer {
			position: absolute;
			right: 0.5rem;
			bottom: 55%;
			z-index: 2;
		}
		.turnButtonContainer {
			position:absolute;
			right: 0.5rem;
			bottom: 35%;
			z-index: 2;
		}
		.turnButton {
			display: flex;
			background-color: white;
			border-radius: 25px;
			outline: none;
			margin: 0;
			padding: 0;
			cursor: pointer;
		}
		.shinyButton {
			width: 30px;
			height: 30px;
			border-radius: 25px;
			margin-bottom: 0.3rem;
			cursor: pointer;
		}
		.turnButton:hover,
		.shinyButton:hover {
			transform: scale(1.4);
			transition: 0.3s ease;
		}
		.iconify {
			font-size: 1.6rem;
			color: #ef0d24;
			pointer-events: none;
		}
	}
	/* .frame::before,
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
	} */
	.frame:hover {
		overflow: initial;
		img {
			background: rgb(165,201,253);
			background: linear-gradient(30deg, rgba(165,201,253,1) 21%, rgba(189,215,238,1) 27%, rgba(165,201,253,1) 33%, rgba(165,201,253,1) 66%, rgba(189,215,238,1) 72%, rgba(165,201,253,1) 78%);
			border: 5px double black;
			border-radius: 44px;
			z-index: 1;
			transform: scale(1.15);
		}
		.shiny {
			background: rgb(222,222,222);
			background: linear-gradient(45deg, rgba(222,222,222,1) 21%, rgba(255,255,255,1) 27%, rgba(222,222,222,1) 33%, rgba(222,222,222,1) 66%, rgba(255,255,255,1) 72%, rgba(222,222,222,1) 78%);
		}
	}
	.frame:hover.shiny {
		img {
			background: rgb(222,222,222);
			background: linear-gradient(45deg, rgba(222,222,222,1) 21%, rgba(255,255,255,1) 27%, rgba(222,222,222,1) 33%, rgba(222,222,222,1) 66%, rgba(255,255,255,1) 72%, rgba(222,222,222,1) 78%);
		}
	}

	.imageButtons {
		width: 80%;
		height: 30%;
		display: flex;
		align-items: center;

		.yellowButton {
			width: 2.5rem;
			height: 2.5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			background-color: yellow;
			border: 5px solid #c3c319;
			border-radius: 50%;
			margin: auto;
		}
		.shinyButtonContainer {
			width: 5rem;
			height: 3rem;
			position: relative;
			border: 3px solid black;
			border-radius: 25px;
			margin: 0 1rem 0 0;
		}
		.shinyButton {
			width: 100%;
			height: 100%;
			background: rgb(192,192,192);
			background: linear-gradient(45deg, rgba(192,192,192,1) 54%, rgba(225,225,225,1) 64%, rgba(192,192,192,1) 73%);
			cursor: pointer;
			border-radius: 25px;
			outline: none;
		}
		.shinyButton:hover {
			transform: scale(1.2);
			transition-duration: 0.3s ease;
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
		left: -2px;
		display: flex;
		background-color: #ef0d24;
		transform: skewY(45deg);
	}
`
