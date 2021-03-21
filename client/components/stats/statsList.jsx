import React from 'react'

const StatsList = props => {
  const { stat } = props
  return (
    <div className="stats">
      <span className="ellipse">............................</span>
      <span className="statsName">{stat.stat.name}</span>
      <span className="statsStat">{stat.base_stat}</span>
    </div>
  )
}

export default StatsList
