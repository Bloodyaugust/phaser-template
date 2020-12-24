import React from 'react'
import GameInterop from './game-interop'
import ViewController from './view-controller'

export default function App() {
  return (
    <GameInterop>
      <ViewController />
    </GameInterop>
  )
}
