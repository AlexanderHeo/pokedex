import React from 'react'

const StatsList = props => {
  const { name } = props.props.type
  return (
    <div className={`type ${props.props.type.name}`}>
      <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
    </div>
  )
}

export default StatsList
