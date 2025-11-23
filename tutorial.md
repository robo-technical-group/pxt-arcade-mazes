# Mazes in MakeCode

## Random mazes @showdialog

Let's create a game based on a maze!
You don't even have to design the maze --
The computer will create it for you!

Besides learning the basics of the ``||mazes(noclick):Mazes||`` extension,
you'll also learn how to use the ``||minimap(noclick):Minimap||``
and ``||blockSettings(noclick):Settings||``
extensions.

Buck, Jamis. (2015). _Mazes for programmers: Code your own twisty little passages_
Dallas, TX: Pragmatic Programmers

## We need a scene!

First, we need to decide which tiles will be used in our project.

The simplest way to do this is to create a temporary tilemap
with all of our tiles.

For this project, you need at least four different tiles:

-   A tile for the beginning of the maze.
-   A tile for the end of the maze.
-   A tile to represent the paths in the maze.
-   A tile for the walls of the maze.

Create a tilemap with these four tiles in it.

1.  Into your empty   
``||loops(noclick):on start||``
container, drop a   
``||scene:set tilemap to tilemap [ ]||``   
block.
1.  Select the empty tilemap to open the tilemap editor.
1.  Create at least one tile
of each of the four required tile types.

Wait for the simulator to restart.
You should see your temporary tilemap appear as the scene for your project.

~hint Do I have to do this?
No! Tiles are just images. If you have the images for your tileset,
then you do not need to create this temporary tilemap.

Telling Arcade about your tiles, though, makes it easier to work with
blocks that are expecting tiles.
hint~

```blocks
tiles.setCurrentTilemap(tilemap`level`)
```

## We need a hero!

Now, let's create a hero for our project.

1.  To the **bottom** of your   
``||loops(noclick):on start||``   
container, drop a   
``||variables(sprites):set mySprite to||``
``||sprites:sprite [ ] of kind Player||``   
block.
1.  Change the variable to something meaningful.
(Perhaps `heroSprite`?)
1.  Select or create an image for your hero character.
1.  From the ``||scene:Scene||`` drawer,
drop a   
``||scene:place||``
``||variables(scene):mySprite||``
``||scene:on top of random [ ]||``   
block.
1.  Select the correct variable name.
1.  Select the tile that represents the beginning of your map.

Wait for the simulator to restart.
You should see your hero atop the correct tile.

```blocks
tiles.setCurrentTilemap(tilemap`level`)
// @highlight
let heroSprite = sprites.create(sprites.duck.duck3, SpriteKind.Player)
// @highlight
tiles.placeOnRandomTile(heroSprite, sprites.dungeon.floorDarkDiamond)
```

## Control your hero!

Now, let's add the ability to move the hero around the tilemap.

1.  To the **bottom** of your   
``||loops(noclick):on start||``   
container, drop a   
``||controller:move||``
``||variables(controller):mySprite||``
``||controller:with buttons||``   
block.
1.  Select the correct variable.
1.  Add a   
``||scene:camera follow sprite||``
``||variables(scene):mySprite||``   
block to the **bottom** of your   
``||loops(noclick):on start||``   
container.
1.  Select the correct variable.

Wait for the simulator to restart.

You should be able to move your hero character with the d-pad,
and the camera should follow your character around the world.

```blocks
tiles.setCurrentTilemap(tilemap`level`)
let heroSprite = sprites.create(sprites.duck.duck3, SpriteKind.Player)
tiles.placeOnRandomTile(heroSprite, sprites.dungeon.floorDarkDiamond)
// @highlight
controller.moveSprite(heroSprite)
// @highlight
scene.cameraFollowSprite(heroSprite)
```

## Let's make a maze!

Now, let's create a random world for your character!

1.  Open the **Advanced** section of the toolbox.
1.  Locate the ``||mazes:Mazes||`` drawer.
1.  From the **Tilemaps** section, add a   
``||variables(mazes):set mazeTileMap to||``
``||mazes:create maze tilemap with path tile as [ ] and wall tile as [ ]||``   
block to the **bottom** of your   
``||loops(noclick):on start||``   
container.
1.  In your new block, set the **first** tile to the
**path tile** for your world.
1.  Set the **second** tile to the **wall tile** for your world.

This creates a tilemap with a random maze and stores it in a variable.
Now, let's apply this new tilemap to your project.

1.  From the ``||scene:Scene||`` drawer,
add a   
``||scene:set tilemap to tilemap [ ]||``   
block to the **bottom** of your   
``||loops(noclick):on start||``   
container.
1.  In this new block,
**replace** the blank tilemap
with a   
``||variables:mazeTileMap||``   
block from the   
``||variables:Variables||``   
drawer.

Wait for the simulator to restart.

Your hero character should be placed in a new world with a random maze!

```blocks
tiles.setCurrentTilemap(tilemap`level`)
let heroSprite = sprites.create(sprites.duck.duck3, SpriteKind.Player)
tiles.placeOnRandomTile(heroSprite, sprites.dungeon.floorDarkDiamond)
controller.moveSprite(heroSprite)
scene.cameraFollowSprite(heroSprite)
// @highlight
let mazeTileMap = mazes.buildMazeTilemap(
sprites.dungeon.floorDark1,
sprites.builtin.forestTiles2
)
// @highlight
tiles.setCurrentTilemap(mazeTileMap)
```

## We're stuck in a wall!

Your character might start in a wall.
We're missing the beginning tile in our map.

Let's add that now!

1.  In the block that creates your maze,
select the expand **(+)** button.
1.  You should now see a new parameter:   
``||mazes(noclick):begin tile as [ ]||``
1.  Set this new tile to the **beginning tile**
for your world.
1.  Move the existing   
``||scene(noclick):place||``
``||variables(noclick):mySprite||``
``||scene(noclick):on top of random [ ]||``   
block to the **bottom** of your   
``||loops(noclick):on start||``   
container.

Wait for the simulator to restart.

Now, your hero should begin on the correct tile in your map!

~hint How do I move a single block?
To move a single block from the middle of a set of blocks,
hover over the block. Before selecting it, hold "Control"
on your keyboard. (Mac user may need to use the "Command"
button instead.)

Once you've selected and started moving the block,
you can release the key on your keyboard.
hint~

```blocks
tiles.setCurrentTilemap(tilemap`level`)
let heroSprite = sprites.create(sprites.duck.duck3, SpriteKind.Player)
controller.moveSprite(heroSprite)
scene.cameraFollowSprite(heroSprite)
// @highlight
let mazeTileMap = mazes.buildMazeTilemap(
sprites.dungeon.floorDark1,
sprites.builtin.forestTiles2,
sprites.dungeon.floorDarkDiamond
)
tiles.setCurrentTilemap(mazeTileMap)
// @highlight
tiles.placeOnRandomTile(heroSprite, sprites.dungeon.floorDarkDiamond)
```

## Where's the end?

Now, we need to add a target for our hero to reach.

1.  In the block that creates your maze,
select the expand **(+)** button.
1.  You should now see a new parameter:   
``||mazes(noclick):end tile as [ ]||``
1.  Set this new tile to the **ending tile**
for your world.

The player should win when reaching this tile.

1.  From the
``||scene:Scene||``
drawer, drop an   
``||scene:on||``
``||variables(scene):sprite||``
``||scene:of kind||``
``||sprites(scene):player||``
``||scene:overlaps [ ] at||``
``||variables(scene):location||``   
container onto your workspace.
1.  In the header of this new container,
set the tile to your **ending tile**.
1.  In this new container, drop a   
``||game:game over WIN||``   
block from the
``||game:Game||``
drawer.

Wait for the simulator to restart.

Now, at the end of your maze, you should see your ending tile.
When your hero character touches that tile,
you should win the game.

```blocks
// @highlight
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleBlueCrystal, function (sprite, location) {
    game.gameOver(true)
})
tiles.setCurrentTilemap(tilemap`level`)
let heroSprite = sprites.create(sprites.duck.duck3, SpriteKind.Player)
controller.moveSprite(heroSprite)
scene.cameraFollowSprite(heroSprite)
// @highlight
let mazeTileMap = mazes.buildMazeTilemap(
sprites.dungeon.floorDark1,
sprites.builtin.forestTiles2,
sprites.dungeon.floorDarkDiamond,
sprites.dungeon.collectibleBlueCrystal
)
tiles.setCurrentTilemap(mazeTileMap)
tiles.placeOnRandomTile(heroSprite, sprites.dungeon.floorDarkDiamond)
```

## Where are we?

It's tough to navigate the map when you can only see part of it.

Let's help the player with a mini-map of the maze.
We'll use the **Minimap** extension for this.

1.  From the ``||minimap:Minimap||`` drawer,
drag a   
``||variables(minimap):set myMinimap to||``
``||minimap:minimap (+)||``   
block to the **bottom** of your   
``||loops(noclick):on start||``   
container.
1.  Select the **expand (+)** icon to show all of the
parameters for creating a mini-map.
1.  Set the parameters to create and **Eighth** scale
mini-map with a **2-pixel** border of an
appropriate color.

This creates the mini-map,
but we need a sprite in order to display it.

1.  Drop a   
``||variables(sprites):set mySprite to||``
``||sprites:sprite [ ] of kind Player||``   
block to the **bottom** of your   
``||loops(noclick):on start||``   
container.
1.  Change the variable name to something appropriate.
(Perhaps `mapSprite`?)
1.  Select an unused sprite type for this sprite.
You also can create a custom type, like `Map`.
1.  From the ``||minimap:Minimap||`` drawer,
drop a   
``||minimap:minimap (+) image||``   
block in place of the blank sprite image.
1.  In place of the   
``||minimap(noclick):minimap (+)||``   
place holder, drop a   
``||variables:myMinimap||``   
block from the ``||variables:Variables||`` drawer.


Let's add a couple of other blocks for this sprite.

1.  Drop a
``||sprites:set||``
``||variables(sprites):mySprite||``
``||sprites:auto destroy OFF||``   
block to the **bottom** of your   
``||loops(noclick):on start||``   
container.
1.  Change the variable to your mini-map sprite variable.
1.  Change the flag to `ghost`.
1.  Change the switch to **ON**.
1.  Drop another
``||sprites:set||``
``||variables(sprites):mySprite||``
``||sprites:auto destroy OFF||``   
block to the **bottom** of your   
``||loops(noclick):on start||``   
container.
1.  Change the variable to your mini-map sprite variable.
1.  Change the flag to `invisible`.
1.  Leave the switch **OFF**. We'll use this block later.

Wait for the simulator to restart.

You should see a miniature version of your maze in the middle of the screen!

Move your character around the maze.
Notice what happens to the mini-map.

```blocks
namespace SpriteKind {
    export const Map = SpriteKind.create()
}
tiles.setCurrentTilemap(tilemap`level`)
let heroSprite = sprites.create(sprites.duck.duck3, SpriteKind.Player)
controller.moveSprite(heroSprite)
scene.cameraFollowSprite(heroSprite)
let mazeTileMap = mazes.buildMazeTilemap(
sprites.dungeon.floorDark1,
sprites.builtin.forestTiles2,
sprites.dungeon.floorDarkDiamond,
sprites.dungeon.collectibleBlueCrystal
)
tiles.setCurrentTilemap(mazeTileMap)
tiles.placeOnRandomTile(heroSprite, sprites.dungeon.floorDarkDiamond)
// @highlight
let myMinimap = minimap.minimap(MinimapScale.Eighth, 2, 15)
// @highlight
let mapSprite = sprites.create(minimap.getImage(myMinimap), SpriteKind.Map)
// @highlight
mapSprite.setFlag(SpriteFlag.Ghost, true)
// @highlight
mapSprite.setFlag(SpriteFlag.Invisible, false)
```

## You're in the way!

Your mini-map gives a helpful hint to your player, but it's in the way.

Let's give the player the ability to show and hide the mini-map
by pressing the **B** button.

First, let's create a variable that remembers
whether the map sprite is visible.

1.  Open the ``||variables:Variables||`` drawer of the toolbox.
1.  Select **Make a Variable...**.
1.  Create a variable called **isMapInvisible**.
1.  Drop a   
``||variables:set isMapInvisible to (0)||``   
block to the **bottom** of your   
``||loops(noclick):on start||``   
container.
1.  From the ``||logic:Logic||`` drawer,
drop a   
``||logic:false||``   
block into your new   
``||variables(noclick):set isMapInvisible to (0)||``   
block to set its value to **false**.

Now, let's act accordingly when the player presses the **B** button.

1.  From the ``||controller:Controller||`` drawer,
drop a   
``||controller:on A button pressed||``   
block onto your workspace.
1.  Change the container's header to respond to the **B** button instead.
1.  Add a block to this container that states:   
``||variables:set isMapInvisible to||``
``||logic:not||``
``||variables:isMapInvisible||``
1.  Then, add another block that states:   
``||sprites:set||``
``||variables:mapSprite||``
``||sprites:invisible||``
``||variables:isMapInvisible||``   
   Be sure to use the variable name for your map sprite.

Wait for the simulator to restart.

Now, you should be able to show and hide the mini-map
by pressing the **B** button!

```blocks
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    isMapInvisible = !(isMapInvisible)
    mapSprite.setFlag(SpriteFlag.Invisible, isMapInvisible)
})

// @hide
let mapSprite = sprites.create(img`.`, SpriteKind.Player)
let isMapInvisible = false
isMapInvisible = false
```

## Move out of the way!

The mini-map is helpful, but it's still in the middle of the screen.
Let's put it in a corner instead.

You may have noticed that the map stays in place in the world. Let's fix that, too.

1.  From the ``||game:Game||`` drawer,
drop an   
``||game:on game update||``   
container onto your workspace.
1.  To your new container, add an   
``||logic:if true then||``   
container.
1.  In place of `true`, drop a   
``||logic:not||``   
block.
1.  In the empty placeholder of the `not` block,
drop a   
``||variables:isMapInvisible||``   
block.
1.  Within the ``||logic(noclick):if||`` branch,
use blocks from the ``||sprites:Sprites||`` and
``||scene:Scene||`` drawers to add the following
block:   
``||sprites:set||``
``||variables:mapSprite||``
``||sprites:right to||``
``||scene:camera right||``
1.  Also within the ``||logic(noclick):if||`` branch,
add the following block:   
``||sprites:set||``
``||variables:mapSprite||``
``||sprites:bottom to||``
``||scene:camera bottom||``

Be sure to use the variable that represents your map sprite.

~hint Which block?
The block that you need is in the "Sprites" drawer.
It's the "set mySprite x to 0" block.
Change "x" to "right" or "bottom" as needed.
hint~

Wait for the simulator to restart.

The map sprite now stays in the bottom right corner when visible.

Feel free to move the sprite to a different corner of the screen if you wish.

```blocks
game.onUpdate(function () {
    // @hide
    let mapSprite = sprites.create(img`.`, SpriteKind.Player)
    let isMapVisible = false

    if (isMapVisible) {
        mapSprite.right = scene.cameraProperty(CameraProperty.Right)
        mapSprite.bottom = scene.cameraProperty(CameraProperty.Bottom)
    }
})
```

## But ... where am I?

The mini-map is nice, but our hero does not appear in the map!

To fix this, we need to update the map every once in a while.

1.  From the ``||game:Game||`` drawer,
drop a   
``||game:on update every 500 ms||``   
container onto your workspace.
1.  Inside of this new container, drop a   
``||logic:if true then||``   
container from the ``||logic:Logic||`` drawer.
1.  In place of `true`, drop a   
``||logic:not||``   
block.
1.  In the empty placeholder of the `not` block,
drop a   
``||variables:isMapInvisible||``   
block.
1.  Duplicate the block in your   
``||loops(noclick):on start||``   
container that creates the mini-map.
1.  Drop the duplicate block within the
``||logic(noclick):if||``
container that you just created.

Now, we need to add your hero sprite to the mini-map.

1.  Still within the ``||logic(noclick):if||`` container,
drop a   
``||minimap:draw||``
``||variables(minimap):mySprite||``
``||minimap:on||``
``||variables(minimap):myMinimap||``
``||minimap:(+)||``   
block from the ``||minimap:Minimap||`` drawer.
1.  Select the variable for your hero sprite.
1.  Select **expand (+)** to see all of the parameters for this block.
1.  The hero sprite will be too small to see,
so change the scale to **Double** for your hero sprite.

Now, we need to update the mini-map sprite.

1.  Still within the ``||logic(noclick):if||`` container,
drop a   
``||sprites:set||``
``||variables(sprites):mySprite||``
``||sprites:image to [ ]||``   
block to the **bottom** of the ``||logic(noclick):if||``
container.
1.  Change the variable to your mini-map sprite.
1.  Replace the empty image block with a   
``||minimap:minimap (+) image||``   
block from the ``||minimap:Minimap||`` drawer.
1.  In place of the   
``||minimap(noclick):minimap (+)||``   
place holder, drop a   
``||variables:myMinimap||``   
block from the ``||variables:Variables||`` drawer.

Wait for the simulator to restart.

Now, twice a second, the mini-map will update with your
hero character's location!

Feel free to update the mini-map more frequently.
Updating the mini-map affects performance,
so it is recommended to update a mini-map
every 100ms at the most.

```blocks
game.onUpdateInterval(500, function () {
    // @hide
    let mapSprite = sprites.create(img`.`, SpriteKind.Player)
    // @hide
    let myMinimap = minimap.minimap()
    // @hide
    let heroSprite = sprites.create(sprites.duck.duck3, SpriteKind.Player)
    let isMapInvisible = false

    if (!isMapInvisible) {
        myMinimap = minimap.minimap(MinimapScale.Eighth, 2, 15)
        minimap.includeSprite(myMinimap, heroSprite, MinimapSpriteScale.Double)
        mapSprite.setImage(minimap.getImage(myMinimap))
    }
})
```

## Instructions?

Now, let's include instructions for our game.

We don't want to **always** show the instructions, though, so let's remember
whether this is the first time our project has run. If it's the first time,
then we will show the instructions. Afterward, we'll prompt the player
whether they want to see the instructions.

We'll use the **Settings** extension for this.

First, let's build a function that shows our game's instructions.

1.  From the **Advanced** section of the toolbar,
open the ``||functions:Functions||`` drawer.
1.  Select the **Make a Function...** button.
1.  Create a function called `showInstructions`.
1.  For now, in the ``||functions(noclick):showInstructions||``
function, drop a   
``||game:splash ""||``   
block from the ``||game:Game||`` drawer.

You will add proper instructions later.

Now, let's see if this is the player's first run.

1.  From the ``||logic:Logic||`` drawer,
add an   
``||logic:if true then ... else||``   
block to the **top** of your   
``||loops(noclick):on start||``   
container.
1.  Open the hint (the light bulb) at the bottom of this step.
1.  Build out the ``||logic(noclick):if then else||`` container
using blocks from the
``||logic:Logic||``,
``||blockSettings:Settings||``,
``||game:Game||``, and
``||functions:Functions||`` drawers.

Be careful with your spelling of the **`run once`** string.
It must be spelled exactly the same way each time.

**Note**: In this tutorial, we say that the drawer's name is
``||blockSettings:Settings||``. It is possible that the drawer
will be named ``||blockSettings:BetterSettings||``, too.

```blocks
function showInstructions () {
    game.splash("Welcome!")
}

if (blockSettings.exists("run once") && blockSettings.readNumber("run once") == 1) {
    if (game.ask("Would you like", "instructions?")) {
        showInstructions()
    }
} else {
    showInstructions()
    blockSettings.writeNumber("run once", 1)
}
```

## Hurry up!

Let's add a timer that the player needs to beat to win the game.

1.  From the ``||info:Info||`` drawer, add a   
``||info:start countdown 10 (s)||``   
block to the **bottom** of your   
``||loops(noclick):on start||``   
container.
1.  Set the countdown timer to **30** seconds (or something else appropriate).
1.  Also from the ``||info:Info||`` drawer, add an   
``||info:on countdown end||``   
container to your workspace.
1.  From the ``||game:Game||`` drawer, add a   
``||game:game over WIN||``   
block to your new container.
1.  Change **WIN** to **LOSE**.

Let's also give the player a score when they win.

1.  Find the existing   
``||scene:on||``
``||variables(scene):sprite||``
``||scene:of kind||``
``||sprites(scene):player||``
``||scene:overlaps [ ] at||``
``||variables(scene):location||``   
container on your workspace.
1.  At the **top** of this container, drop a   
``||info:set score to 0||``   
block from the ``||info:Info||`` drawer.
1.  In place of the **0** value, drop a   
``||math:round 0||``   
block from the ``||math:Math||`` drawer.
1.  In place of the new **0** value, drop a   
``||info:countdown||``   
block from the ``||info:Info||`` drawer.

When the player wins the game, their score will be the
amount of time remaining, rounded to the nearest second.

```blocks
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleBlueCrystal, function (sprite, location) {
    info.setScore(Math.round(info.countdown()))
    game.gameOver(true)
})
```

## Congratulations! @showdialog

You've completed the tutorial! Now, enhance your project!

*   Write proper instructions for the game.
Include lore about your setting!
*   Explore additional settings for the maze tile map.
*   When the player runs low on time, add trinkets to
the solution path for the player to follow.
(You'll need a new tile for this.)
*   Add new levels when the player completes the maze.
*   Make the new levels more difficult by increasing
the size of the maze.

Have fun!

```package
mazes=github:robo-technical-group/pxt-arcade-mazes
minimap=github:microsoft/arcade-minimap#v0.6.1
blockSettings=github:microsoft/pxt-settings-blocks#v1.0.0
```

```jres
{
    "transparency16": {
        "data": "hwQQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==",
        "mimeType": "image/x-mkcd-f4",
        "tilemapTile": true
    },
    "level": {
        "id": "level",
        "mimeType": "application/mkcd-tilemap",
        "data": "MTAxMDAwMTAwMDAxMDIwMzA0MDUwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMA==",
        "tileset": [
            "myTiles.transparency16",
            "sprites.builtin.forestTiles2",
            "sprites.dungeon.collectibleBlueCrystal",
            "sprites.dungeon.floorLight1",
            "sprites.dungeon.floorLightMoss",
            "sprites.dungeon.floorDarkDiamond"
        ],
        "displayName": "level"
    },
    "*": {
        "mimeType": "image/x-mkcd-f4",
        "dataEncoding": "base64",
        "namespace": "myTiles"
    }
}
```

```ghost
namespace SpriteKind {
    export const Map = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    mapSprite.setFlag(SpriteFlag.Invisible, isMapVisible)
    isMapVisible = !(isMapVisible)
})
info.onCountdownEnd(function () {
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleBlueCrystal, function (sprite, location) {
    info.setScore(Math.round(info.countdown()))
    game.gameOver(true)
})
function showInstructions () {
    game.splash("Welcome!")
    game.splash("You are a duck seeking", "the magic blue orb.")
    game.splash("You have " + TIME_LIMIT + " seconds", "to find it!")
    game.splash("Move with the d-pad.", "B controls mini map.")
    game.splash("Good luck!", "Press A to start!")
}
let mapSprite: Sprite = null
let isMapVisible = false
let TIME_LIMIT = 0
TIME_LIMIT = 30
scene.setBackgroundColor(11)
if (blockSettings.exists("runonce") && blockSettings.readNumber("runonce") == 1) {
    if (game.ask("Would you like", "instructions?")) {
        showInstructions()
    }
} else {
    showInstructions()
    blockSettings.writeNumber("runonce", 1)
}
tiles.setCurrentTilemap(tilemap`level`)
let mazeTileMap = mazes.buildMazeTilemap(
sprites.dungeon.floorDark1,
sprites.builtin.forestTiles2,
sprites.dungeon.floorDarkDiamond,
sprites.dungeon.collectibleBlueCrystal,
sprites.dungeon.floorDark0,
2
)
tiles.setCurrentTilemap(mazeTileMap)
isMapVisible = false
let myMinimap = minimap.minimap()
mapSprite = sprites.create(img`.`, SpriteKind.Map)
mapSprite.setFlag(SpriteFlag.Invisible, true)
mapSprite.setFlag(SpriteFlag.Ghost, true)
let heroSprite = sprites.create(sprites.duck.duck3, SpriteKind.Player)
controller.moveSprite(heroSprite)
scene.cameraFollowSprite(heroSprite)
tiles.placeOnRandomTile(heroSprite, sprites.dungeon.floorDarkDiamond)
info.startCountdown(TIME_LIMIT)
game.onUpdate(function () {
    if (isMapVisible) {
        mapSprite.right = scene.cameraProperty(CameraProperty.Right)
        mapSprite.bottom = scene.cameraProperty(CameraProperty.Bottom)
    }
})
game.onUpdateInterval(500, function () {
    if (isMapVisible) {
        myMinimap = minimap.minimap(MinimapScale.Eighth, 2, 15)
        minimap.includeSprite(myMinimap, heroSprite, MinimapSpriteScale.Double)
        mapSprite.setImage(minimap.getImage(myMinimap))
    }
})
```
