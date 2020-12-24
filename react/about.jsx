import React, { useContext } from 'react'
import { GameContext } from './game-interop'
import { GameState } from '../constants/game-state'
import styles from './about.css'

export default function About(props) {
  const { mainScene } = useContext(GameContext)

  return (
    <div className={styles.container}>
      <section>
        <p>Made with <a href="https://phaser.io/">Phaser v3</a> and <a href="https://reactjs.org/">React</a></p>
        <p>by <a href="https://twitter.com/Bloodyaugust">Greyson Richey</a></p>
        <p>with art and sfx by <a href="https://kenney.nl">Kenny, Asset Jesus</a></p>
        <p>and music from <a href="https://chipmusic.org/Tsuwami/music/after-dark">Tsuwami</a></p>
        <p>left and right arrow keys to move, spacebar to shoot</p>
      </section>
      <button disabled={props.animating} onClick={() => { mainScene.data.set('view', GameState.VIEW_MAIN_MENU) }}>Main Menu</button>
    </div>
  )
}
