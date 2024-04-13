import { SCALE_FACTOR } from './constants'
import { k } from './kaboomCtx'

// In Vite, everything in the public folder is accessible from anywhere so no need to ./public/spritesheet.png
k.loadSprite('spritesheet', './spritesheet.png', {
  sliceX: 39,
  sliceY: 31,
  anims: {
    'idle-down': 936,
    'walk-down': { from: 936, to: 939, loop: true, speed: 8 },
    'idle-side': 975,
    'walk-side': { from: 975, to: 978, loop: true, speed: 8 },
    'idle-up': 1014,
    'walk-up': { from: 1014, to: 1017, loop: true, speed: 8 }
  }
})

k.loadSprite('map', './map.png')

k.setBackground(k.Color.fromHex('#311047'))

k.scene('main', async () => {
  // We await the fetch call and then the json() method because it's also a Promise
  const mapData = await (await fetch('./map.json')).json()
  const layers = mapData.layers

  const map = k.make([k.sprite('map'), k.pos(0), k.scale(SCALE_FACTOR)])

  const player = k.make([
    k.sprite('spritesheet', { anim: 'idle-down' }),
    k.area({
      shape: new k.Rect(k.vec2(0, 3), 10, 10)
    }),
    k.body(),
    k.anchor('center'),
    k.pos(),
    k.scale(SCALE_FACTOR),
    {
      speed: 250,
      direction: 'down',
      isInDialog: false
    },
    'player'
  ])

  for (const layer of layers) {
    if (layer.name === 'boundaries') {
      for (const boundary of layer.objects) {
        map.add([
          k.area({
            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height)
          }),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name
        ])

        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            player.isInDialog = true
            //TODO
          })
        }
      }
    }
  }
})

// Default scene
k.go('main')
