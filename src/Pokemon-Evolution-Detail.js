import React from 'react';

const PokemonEvolutionDetail = (props) => {
  console.log('PROPS in Evo-Detail:', props)
  // console.log('props:', props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1));
  // console.log(props.className.charAt(0).toUpperCase() + props.className.slice(1))
  // return <h1>working on it...</h1>
  return (
  <div className={props.className}>
    <h3>{props.className.charAt(0).toUpperCase() + props.className.slice(1)} Form: {props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)}</h3>
    <div>{props.pokemon.weight} grams</div>
    <div>{props.pokemon.height} decimeters</div>
    <img src={props.pokemon.sprites.front_default} alt={props.pokemon.name} />
  </div>
  )
};

export default PokemonEvolutionDetail;
