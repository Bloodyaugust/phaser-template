import React, { useContext } from 'react'
import { GameContext } from './game-interop'
import styles from './score.css'

export default function Score(props) {
  const { gameState: { highScore, score } } = useContext(GameContext)

  return (
    <div className={styles.container}>
      <span>Score: {score}{score >= highScore ? ' High Score!' : ''}</span>
    </div>
  )
}
