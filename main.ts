enum ActionKind {
    Walking,
    Idle,
    Jumping,
    caminar,
    caminarizq,
    caminarder,
    caminaratras
}
namespace SpriteKind {
    export const Sheika = SpriteKind.create()
    export const ene = SpriteKind.create()
    export const ene3 = SpriteKind.create()
    export const ene4 = SpriteKind.create()
    export const ene5 = SpriteKind.create()
}
namespace StatusBarKind {
    export const Puntaje = StatusBarKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Sheika, function (sprite, otherSprite) {
    if (info.score() >= 5) {
        music.playMelody("B D E G G B A C5 ", 200)
        game.over(true, effects.clouds)
        sheika.destroy()
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Blink,
    assets.animation`myAnim2`,
    160,
    true
    )
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Blink,
    assets.animation`myAnim4`,
    200,
    true
    )
})
info.onCountdownEnd(function () {
    game.over(false, effects.dissolve)
    music.stopAllSounds()
    music.sonar.loop()
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Blink,
    assets.animation`myAnim0`,
    200,
    true
    )
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    Blink,
    assets.animation`myAnim3`,
    200,
    true
    )
})
info.onLifeZero(function () {
    game.showLongText("Suerte para la próxima", DialogLayout.Full)
    game.over(false, effects.dissolve)
    music.stopAllSounds()
    music.sonar.loop()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy, effects.fire, 200)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(3, 500)
    music.zapped.play()
    info.changeLifeBy(-1)
    Enemigo.destroy(effects.rings, 200)
})
let caminando = false
let Enemigo: Sprite = null
let sheika: Sprite = null
let Blink: Sprite = null
music.spooky.loop()
Blink = sprites.create(assets.image`blink frente`, SpriteKind.Player)
scene.cameraFollowSprite(Blink)
scene.setBackgroundColor(7)
controller.moveSprite(Blink)
let Moneda = sprites.create(img`
    . . . . 5 5 5 4 4 4 5 . . . . 
    . . 4 5 5 5 5 5 5 5 5 5 5 . . 
    . 5 5 5 5 5 1 1 1 1 5 5 5 4 . 
    . 5 5 5 1 5 5 5 5 5 5 5 5 5 . 
    4 5 5 1 c 5 5 5 5 5 c 5 4 5 4 
    4 5 5 1 c c 5 5 5 5 c 5 4 5 4 
    4 5 5 5 c 5 c 5 5 5 c 5 4 5 4 
    5 5 5 5 c 5 5 c 5 5 c 5 4 5 4 
    5 5 5 5 c 5 5 5 c 5 c 5 4 5 4 
    5 5 5 5 c 5 5 5 5 c c 5 5 5 4 
    5 5 5 5 c 5 5 5 5 5 c 4 5 5 5 
    . 5 5 5 5 5 5 5 5 5 5 5 5 4 . 
    . 4 5 5 5 5 4 4 4 4 4 5 5 5 . 
    . . 4 5 5 5 5 5 5 5 5 5 4 . . 
    . . . . 4 5 4 4 4 4 4 . . . . 
    `, SpriteKind.Food)
tiles.setCurrentTilemap(tilemap`nivel1`)
tiles.placeOnRandomTile(Blink, sprites.dungeon.collectibleBlueCrystal)
sheika = sprites.create(assets.image`sheika`, SpriteKind.Sheika)
tiles.placeOnRandomTile(sheika, sprites.dungeon.stairLadder)
info.setScore(0)
info.setLife(3)
game.showLongText("Recolecta las 10 monedas que aparecerán aleatoriamente para poder recoger la Sheika Slate y poder ganar", DialogLayout.Full)
game.showLongText("¡MUY IMPORTANTE! No mueras...", DialogLayout.Full)
game.showLongText("Presiona X y Z para atacar", DialogLayout.Full)
tiles.placeOnRandomTile(Moneda, sprites.castle.tileGrass1)
let projectile = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . c . . . . 
    . . . . . . . . . . c e c . . . 
    . . . 1 1 1 1 1 1 1 b e c c c . 
    . 1 1 d d d d 1 b b b e c c e e 
    1 b b b b b b b b b b e c e e e 
    . b b b 1 1 1 1 1 b b e c e e e 
    . . . b b b b b b b b e e e e . 
    . . . . . . . . . . e e c . . . 
    . . . . . . . . . . . e . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Projectile)
info.startCountdown(120)
game.onUpdate(function () {
    caminando = controller.left.isPressed() || (controller.up.isPressed() || (controller.right.isPressed() || controller.down.isPressed()))
})
game.onUpdate(function () {
    scaling.scaleByPercent(projectile, -60, ScaleDirection.Uniformly, ScaleAnchor.Middle)
    if (controller.B.isPressed()) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . c . . . . . . . . . . . 
            . . . c e c . . . . . . . . . . 
            . c c c e b 1 1 1 1 1 1 1 . . . 
            e e c c e b b b 1 d d d d 1 1 . 
            e e e c e b b b b b b b b b b 1 
            e e e c e b b 1 1 1 1 1 b b b . 
            . e e e e b b b b b b b b . . . 
            . . . c e e . . . . . . . . . . 
            . . . . e . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, Blink, 87, 0)
    }
    if (controller.A.isPressed()) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . c . . . . 
            . . . . . . . . . . c e c . . . 
            . . . 1 1 1 1 1 1 1 b e c c c . 
            . 1 1 d d d d 1 b b b e c c e e 
            1 b b b b b b b b b b e c e e e 
            . b b b 1 1 1 1 1 b b e c e e e 
            . . . b b b b b b b b e e e e . 
            . . . . . . . . . . e e c . . . 
            . . . . . . . . . . . e . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, Blink, -87, 0)
    }
})
game.onUpdate(function () {
    for (let index = 0; index < 10; index++) {
        if (Blink.overlapsWith(Moneda)) {
            music.magicWand.play()
            scene.cameraShake(1, 100)
            tiles.placeOnRandomTile(Moneda, sprites.castle.tileGrass1)
            info.changeScoreBy(1)
            if (info.life() <= 2) {
                info.changeLifeBy(1)
            }
        }
    }
})
game.onUpdate(function () {
    if (!(caminando)) {
        animation.runImageAnimation(
        Blink,
        assets.animation`myAnim`,
        600,
        true
        )
    }
})
game.onUpdate(function () {
    if (info.life() == 1) {
        music.stopAllSounds()
        music.playMelody("F D E F E F D G ", 300)
    }
})
forever(function () {
    music.playMelody("E F G F G B A G ", 230)
})
game.onUpdateInterval(10000, function () {
    Enemigo = sprites.create(img`
        . . . . 2 2 e 2 e . . . . . . . 
        . 2 2 2 e 2 2 2 2 e . . . . . . 
        . . e 2 2 2 e 2 2 2 e . . . . . 
        . 2 2 6 2 2 6 2 2 2 2 2 2 2 2 2 
        . 3 3 3 2 2 6 2 2 c d d d d 2 2 
        3 3 3 3 3 3 2 2 2 c b d c 2 2 . 
        c b 3 c 3 3 2 2 2 c b d c 2 . . 
        c b b c 3 b 2 2 2 e e 2 2 2 . . 
        b b b b b b e 2 2 2 e e . . . . 
        . . e e e e e 2 2 2 2 e . . . . 
        . . . . e e e e e 2 2 2 2 2 . . 
        . . . 2 2 2 e e 2 2 e 2 2 e . . 
        . . . 2 2 2 e 2 2 2 2 e 2 e . . 
        . . . e 3 b e 3 e 2 2 2 2 e . . 
        . . . e 3 3 3 3 3 3 b e 2 c . . 
        . . . . e e 2 2 e e e c c c . . 
        `, SpriteKind.Enemy)
    Enemigo.follow(Blink, 70)
    animation.runImageAnimation(
    Enemigo,
    assets.animation`myAnim6`,
    200,
    true
    )
    tiles.placeOnRandomTile(Enemigo, sprites.dungeon.collectibleRedCrystal)
})
