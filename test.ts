/**
 * Enums
 */
enum GameMode {
    Main,
    MazeSprite,
    NotReady
}   // GameModes

/**
 * Constants
 */
const ALGORITHM_NAMES: string[] = [
    'None',
    'Aldous-Broder',
    'Binary tree',
    'Hunt and kill',
    'Recursive backtracker',
    'Sidewinder',
    'Wilson'
]

const GRID_HEIGHT: number = 14
const GRID_WIDTH: number = 18
const PATH_WIDTH: number = 2 // width of maze path in number of tiles
const START_METHOD: MazeType = MazeType.RecursiveBacktracker

/**
 * Global variables
 */
let currAlgo: MazeType = START_METHOD
let gameMode: GameMode = GameMode.NotReady
let maze: mazes.Grid = null
let mazeImage: Image = null
let mazeSprite: Sprite = null
let player: Sprite = null
let mazeBuilt: boolean = false
let mazeSpriteBuilt: boolean = false
let tileMap: tiles.TileMapData = null

/**
 * Event handlers
 */
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameMode !== GameMode.NotReady) {
        maze.build(currAlgo)
        maze.solve()
        tileMap = maze.buildTileMap(
            sprites.dungeon.floorLight0,
            sprites.builtin.forestTiles0,
            2,
            sprites.dungeon.floorDarkDiamond,
            sprites.dungeon.collectibleInsignia,
            sprites.dungeon.collectibleRedCrystal
        )
        mazeSpriteBuilt = false
        mazeBuilt = true
        switch (gameMode) {
            case GameMode.Main:
                showMainScreen()
                break

            case GameMode.MazeSprite:
                showMazeSprite()
                break
        }   // switch (gameMode)
    }   // if (gameMode !== GameMode.NotReady)
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    switch (gameMode) {
        case GameMode.Main:
            showMazeSprite()
            break

        case GameMode.MazeSprite:
            showMainScreen()
            break
    }   // switch (gameMode)
})

/**
 * Functions
 */
function showMainScreen(): void {
    gameMode = GameMode.NotReady
    mazeSprite.setPosition(0 - mazeSprite.width, 0 - mazeSprite.height)
    tiles.setCurrentTilemap(tileMap)
    if (mazeBuilt) {
        tiles.placeOnRandomTile(player, sprites.dungeon.floorDarkDiamond)
    } else {
        tiles.placeOnTile(player, tiles.getTileLocation(1, 1))
    }
    scene.cameraFollowSprite(player)
    controller.moveSprite(player)
    player.say(ALGORITHM_NAMES[currAlgo])
    gameMode = GameMode.Main
}   // showMainScreen()

function showMazeSprite(): void {
    gameMode = GameMode.NotReady
    scene.cameraFollowSprite(null)
    player.setPosition(0 - player.width, 0 - player.height)
    controller.moveSprite(null)
    tiles.setCurrentTilemap(null)
    scene.centerCameraAt(screen.width / 2, screen.height / 2)
    if (!mazeSpriteBuilt) {
        mazeImage = maze.buildImage(8, 1, mazeImage)
        mazeSprite.setImage(mazeImage)
        mazeSpriteBuilt = true
    }   // if (! mazeSpriteBuilt)
    mazeSprite.setPosition(screen.width / 2, screen.height / 2)
    gameMode = GameMode.MazeSprite
}   // showMazeSprite()

/**
 * Main
 */
maze = new mazes.Grid(GRID_HEIGHT, GRID_WIDTH)
maze.setSolutionCells(0, 0, GRID_HEIGHT - 1, GRID_WIDTH - 1)
mazeImage = img`.`
mazeSprite = sprites.create(mazeImage)
player = sprites.create(sprites.duck.duck1, 0)
tileMap = maze.buildTileMap(
    sprites.dungeon.floorLight0,
    sprites.builtin.forestTiles0,
    2,
    sprites.dungeon.floorDarkDiamond,
    sprites.dungeon.collectibleInsignia,
    sprites.dungeon.collectibleRedCrystal
)
showMainScreen()
// showMazeSprite()