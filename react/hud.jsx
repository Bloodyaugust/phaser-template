import React from 'react'
import FPS from './fps'
import Score from './score'
import styles from './hud.css'

export default function HUD(props) {
  return (
    <div className={styles.container}>
      <Score />
      <FPS />
    </div>
  )
}
