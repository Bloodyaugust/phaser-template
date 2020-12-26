import React, { useContext } from 'react'
import { GameContext } from './game-interop'
import { GameState } from '../constants/game-state'
import styles from './main-menu.css'

export default function MainMenu(props) {
  const { mainScene } = useContext(GameContext)

  const onPlayButtonClicked = () => {
    mainScene.data.set('view', GameState.VIEW_GAME_HUD)
    mainScene.data.set('game', GameState.GAME_PLAYING)
  }

  return (
    <div className={styles.container}>
      <h1>Phaser Test</h1>
      <button disabled={props.animating} onClick={onPlayButtonClicked}>Play</button>
      <button disabled={props.animating} onClick={() => { mainScene.data.set('view', GameState.VIEW_ABOUT) }}>About</button>
      <button disabled={props.animating} onClick={() => { mainScene.data.set('view', GameState.VIEW_SETTINGS) }}>Settings</button>
    </div>
  )
}
