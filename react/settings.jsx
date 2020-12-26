import React, { useContext } from 'react'
import { GameContext } from './game-interop'
import { GameState } from '../constants/game-state'
import styles from './settings.css'

export default function Settings(props) {
  const { game, mainScene, registryState } = useContext(GameContext)

  return (
    <div className={styles.container}>
      <button disabled={props.animating} onClick={() => { game.registry.set('sfxVolume', registryState.sfxVolume === 1 ? 0 : 1) }}>{registryState.sfxVolume === 1 ? 'Turn Off' : 'Turn on'} SFX</button>
      <button disabled={props.animating} onClick={() => { game.registry.set('musicVolume', registryState.musicVolume === 1 ? 0 : 1) }}>{registryState.musicVolume === 1 ? 'Turn Off' : 'Turn on'} Music</button>
      <button disabled={props.animating} onClick={() => { mainScene.data.set('view', GameState.VIEW_MAIN_MENU) }}>Main Menu</button>
    </div>
  )
}
