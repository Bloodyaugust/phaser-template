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
}, 1000)

