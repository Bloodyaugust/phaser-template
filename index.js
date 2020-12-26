import 'core-js/stable'
import 'regenerator-runtime/runtime'
import ReactDOM from 'react-dom'
import Phaser, { Game } from 'phaser'
import { MainScene } from './scenes/main'
import { MusicScene } from './scenes/music'
import App from './react/app'

ReactDOM.render(App(), document.getElementById('react-root'))

const gameConfig = {
  type: Phaser.WEBGL,
  canvas: document.getElementById('game-canvas'),
  width: 800,
  height: 600,
  scene: [MainScene, MusicScene],
  physics: {
    default: 'arcade',
    // arcade: {
    //   debug: true
    // }
  }
}

const game = new Game(gameConfig)
window.game = game

game.scene.start('MusicScene')

setTimeout(() => {
  window.dispatchEvent(new CustomEvent('gameMounted', {
    detail: {
      game
    }
  }))

  game.registry.events.on('changedata', (parent, key, value, previousValue) => {
    window.dispatchEvent(new CustomEvent('registryStateChanged', {
      detail: {...game.registry.values}
    }))

    switch (key) {
      case 'sfxVolume':
      case 'musicVolume':
        localStorage.setItem(key, value)
        break
    }
  }, game)

  game.registry.events.on('setdata', (parent, key, value) => {
    window.dispatchEvent(new CustomEvent('registryStateChanged', {
      detail: {...game.registry.values}
    }))
  }, game)

  game.registry.set('sfxVolume', localStorage.getItem('sfxVolume') === null ? 1 : parseInt(localStorage.getItem('sfxVolume'), 10))
  game.registry.set('musicVolume', localStorage.getItem('musicVolume') === null ? 1 : parseInt(localStorage.getItem('musicVolume'), 10))
}, 1000)
