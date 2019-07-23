// Standard palette
enum Color {
    Transparent, // 0
    White, // 1 = RGB(255, 255, 255)
    Red, // 2 = RGB(255, 33, 33)
    Pink, // 3 = RGB(255, 147, 196)
    Orange, // 4 = RGB(255, 129, 53)
    Yellow, // 5 = RGB(255, 246, 9)
    Aqua, // 6 = RGB(36, 156, 163)
    BrightGreen, // 7 = RGB(120, 220, 82)
    Blue, // 8 = RGB(0, 63, 173)
    LightBlue, // 9 = RGB(135, 242, 255)
    Purple, // 10 = RGB(142, 46, 196)
    RoseBouquet, // 11 = RGB(164, 131, 159)
    Wine, // 12 = RGB(92, 64, 108)
    Bone, // 13 = RGB(229, 205, 196)
    Brown, // 14 = RGB(145, 70, 61)
    Black // 15 = RGB(0, 0, 0)
}   // enum Color

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
let maze: Grid = new Grid(GRID_SIZE, GRID_SIZE)
maze.setSolutionCells(0, 0, GRID_SIZE - 1, GRID_SIZE - 1)
let mazeImage: Image = img`.`
let mazeSprite: Sprite = sprites.create(mazeImage)
let player: Sprite = sprites.create(sprites.duck.duck1, 0)
let mazeBuilt: boolean = false
let mazeSpriteBuilt: boolean = false
scene.setTile(DEFAULT_COLOR_MAP_PATH, img`
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
scene.setTile(DEFAULT_COLOR_MAP_WALL, img`
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
scene.setTile(DEFAULT_COLOR_MAP_SOLUTION, img`
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
scene.setTile(DEFAULT_COLOR_MAP_BEGIN, img`
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
scene.setTile(DEFAULT_COLOR_MAP_END, img`
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
    scene.setTileMap(maze.buildTileMap(PATH_WIDTH))
    if (mazeBuilt) {
        scene.getTilesByType(DEFAULT_COLOR_MAP_BEGIN)[0].place(player)
    } else {
        scene.getTile(1, 1).place(player)
    }   // if (mazeBuilt)
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
    scene.setTileMap(null)
    scene.centerCameraAt(screen.width / 2, screen.height / 2)
    if (!mazeSpriteBuilt) {
        mazeImage = maze.buildImage(10, 1, mazeImage)
        mazeSprite.setImage(mazeImage)
        mazeSpriteBuilt = true
    }   // if (! mazeSpriteBuilt)
    mazeSprite.setPosition(screen.width / 2, screen.height / 2)
    gameMode = GameMode.MazeSprite
}   // showMazeSprite()