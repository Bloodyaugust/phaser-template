import React, { useContext, useEffect, useState } from 'react'
import { GameContext } from './game-interop'
import About from './about'
import HUD from './hud'
import MainMenu from './main-menu'
import Settings from './settings'
import { GameState } from '../constants/game-state'
import styles from './view-controller.css'

const ANIMATION_TIMEOUT = 1000

export default function ViewController(props) {
  const [animating, setAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { gameState: { view } } = useContext(GameContext)

  const getAnimationClassName = (viewKey) => {
    if (!mounted) {
      return styles.inactive
    }

    if (animating) {
      return view === viewKey ? styles.enter : styles.exit
    }

    return view === viewKey ? styles.active : styles.inactive
  }

  useEffect(() => {
    setMounted(true)
    setAnimating(true)
  }, [])

  useEffect(() => {
    if (animating) {
      setTimeout(() => {
        setAnimating(false)
      }, ANIMATION_TIMEOUT)
    }
  }, [animating])

  useEffect(() => {
    setAnimating(true)
  }, [view])

  return (
    <div className={styles.container}>
      <div className={`${styles.hud} ${getAnimationClassName(GameState.VIEW_GAME_HUD)}`}>
        <HUD />
      </div>
      <div className={getAnimationClassName(GameState.VIEW_MAIN_MENU)}>
        <MainMenu animating={animating} />
      </div>
      <div className={getAnimationClassName(GameState.VIEW_ABOUT)}>
        <About animating={animating} />
      </div>
      <div className={getAnimationClassName(GameState.VIEW_SETTINGS)}>
        <Settings animating={animating} />
      </div>
    </div>
  )
}
