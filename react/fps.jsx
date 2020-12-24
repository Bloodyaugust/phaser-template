import React, { useContext } from 'react'
import { GameContext } from './game-interop'
import styles from './fps.css'

export default function FPS(props) {
  const { game, gameState: { delta } } = useContext(GameContext)
  const actualFPS = game ? game.loop.actualFps.toFixed(0) : 0

  return (
    <div className={styles.container}>
      <span>{(1000 / delta).toFixed(0)} ({actualFPS})</span>
    </div>
  )
}
