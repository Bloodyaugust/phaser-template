import React, { useEffect, useState } from 'react'

const GameContext = React.createContext()

export default function GameInterop(props) {
  const [gameState, setGameState] = useState({
    delta: 0,
    score: 0
  })
  const [game, setGame] = useState()
  const [mainScene, setMainScene] = useState()

  useEffect(() => {
    window.addEventListener('gameMounted', onGameMounted)
    window.addEventListener('gameStateChanged', onGameStateChanged)
    window.addEventListener('mainSceneCreated', onMainSceneCreated)
    

    return () => {
      window.removeEventListener('gameMounted', onGameMounted)
      window.removeEventListener('gameStateChanged', onGameStateChanged)
      window.removeEventListener('mainSceneCreated', onMainSceneCreated)
    }
  }, [])

  const onGameMounted = (event) => {
    setGame(() => event.detail.game)
  }

  const onGameStateChanged = (event) => {
    setGameState((state) => {
      return {
        ...state,
        ...event.detail
      }
    })
  }

  const onMainSceneCreated = (event) => {
    setMainScene(() => event.detail.scene)
  }

  return (
    <GameContext.Provider value={{
      game,
      gameState,
      mainScene
    }}>
      {props.children}
    </GameContext.Provider>
  )
}

export {GameContext}
