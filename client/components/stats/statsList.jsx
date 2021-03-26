import React from 'react'

const StatsList = props => {
  const { stat } = props
  const name = stat.stat.name
  let display
  if (name.includes('-')) {
    const ar = name.split('-')
    display = `${ar[0].charAt(0).toUpperCase()}${ar[0].slice(1)}-${ar[1].charAt(0).toUpperCase()}${ar[1].slice(1)}`
  } else {
    display = name.charAt(0).toUpperCase() + name.slice(1)
  }
  return (
    <div className="stats">
      <span className="ellipse"></span>
      <span className="statsName">{display}</span>
      <span className="statsStat">{stat.base_stat}</span>
    </div>
  )
}

export default StatsList
