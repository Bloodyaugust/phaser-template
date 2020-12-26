import React, { useEffect, useState } from 'react'

const GameContext = React.createContext()

export default function GameInterop(props) {
  const [gameState, setGameState] = useState({
    delta: 0,
    score: 0
  })
  const [registryState, setRegistryState] = useState({
    sfxVolume: 1,
    musicVolume: 1
  })
  const [game, setGame] = useState()
  const [mainScene, setMainScene] = useState()

  useEffect(() => {
    window.addEventListener('gameMounted', onGameMounted)
    window.addEventListener('gameStateChanged', onGameStateChanged)
    window.addEventListener('mainSceneCreated', onMainSceneCreated)
    window.addEventListener('registryStateChanged', onRegistryStateChanged)
    

    return () => {
      window.removeEventListener('gameMounted', onGameMounted)
      window.removeEventListener('gameStateChanged', onGameStateChanged)
      window.removeEventListener('mainSceneCreated', onMainSceneCreated)
    }
  }, [])

  const onGameMounted = (event) => {
    setGame(() => event.detail.game)

    setGameState((state) => {
      return {
        ...state,
        ...event.detail.game.registry.values
      }
    })
  }

  const onGameStateChanged = (event) => {
    setGameState((state) => {
      return {
        ...state,
        ...event.detail
      }
    })
  }

  const onRegistryStateChanged = (event) => {
    setRegistryState((state) => {
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
      mainScene,
      registryState
    }}>
      {props.children}
    </GameContext.Provider>
  )
}

export {GameContext}
