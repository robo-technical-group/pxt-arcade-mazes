enum GameMode {
    Main,
    MazeSprite,
    NotReady
}   // GameModes

const ALGORITHM_NAMES: string[] = [
    'Aldous-Broder',
    'Binary tree',
    'Hunt and kill',
    'Recursive backtracker',
    'Sidewinder',
    'Wilson'
]
const GRID_SIZE: number = 10
const PATH_WIDTH: number = 2 // width of maze path in number of tiles
const START_METHOD: MazeType = MazeType.RecursiveBacktracker

let currAlgo: MazeType = START_METHOD
let gameMode: GameMode = GameMode.NotReady
let maze: mazes.Grid = new mazes.Grid(GRID_SIZE, GRID_SIZE)
maze.setSolutionCells(0, 0, GRID_SIZE - 1, GRID_SIZE - 1)
let mazeImage: Image = img`.`
let mazeSprite: Sprite = sprites.create(mazeImage)
let player: Sprite = sprites.create(sprites.duck.duck1, 0)
let mazeBuilt: boolean = false
let mazeSpriteBuilt: boolean = false
/*
scene.setTile(mazes.DEFAULT_COLOR_MAP_PATH, img`
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
    d d d d d d d d d d d d d d d d
`, false)
scene.setTile(mazes.DEFAULT_COLOR_MAP_WALL, img`
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
    e e e e e e e e e e e e e e e e
`, true)
scene.setTile(mazes.DEFAULT_COLOR_MAP_SOLUTION, img`
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9
`, false)
scene.setTile(mazes.DEFAULT_COLOR_MAP_BEGIN, img`
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
    7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
`, false)
scene.setTile(mazes.DEFAULT_COLOR_MAP_END, img`
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
`, false)
showMainScreen()
*/
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (gameMode !== GameMode.NotReady) {
        maze.build(currAlgo)
        maze.solve()
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

function showMainScreen(): void {
    gameMode = GameMode.NotReady
    mazeSprite.setPosition(0 - mazeSprite.width, 0 - mazeSprite.height)
    /*
    scene.setTileMap(maze.buildTileMap(PATH_WIDTH))
    if (mazeBuilt) {
        scene.getTilesByType(mazes.DEFAULT_COLOR_MAP_BEGIN)[0].place(player)
    } else {
        scene.getTile(1, 1).place(player)
    }   // if (mazeBuilt)
    */
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
    // scene.setTileMap(null)
    scene.centerCameraAt(screen.width / 2, screen.height / 2)
    if (!mazeSpriteBuilt) {
        mazeImage = maze.buildImage(10, 1, mazeImage)
        mazeSprite.setImage(mazeImage)
        mazeSpriteBuilt = true
    }   // if (! mazeSpriteBuilt)
    mazeSprite.setPosition(screen.width / 2, screen.height / 2)
    gameMode = GameMode.MazeSprite
}   // showMazeSprite()