import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Profile() {
  const location = useLocation();
  console.log(location)
  const { x, y } = location.state || "No message received";
  return (
    <div>
      <div>Profile and the sentence is {x}</div>
      <div>The second sentence is {y}</div>

    </div>
  )
}
