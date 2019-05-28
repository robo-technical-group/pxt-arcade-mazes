/**
 * Extension for building mazes.
 * Algorithms taken from
 * Buck, Jamis. (2015). _Mazes for programmers: Code your own twisty little passages_
 *   Dallas, TX: Pragmatic Programmers
 */
enum GridType {
    Empty,
    Distances
}   // GridType

enum MazeType {
    AldousBroder,
    BinaryTree,
    HuntAndKill,
    RecursiveBacktracker,
    Sidewinder,
    Wilson
}   // enum MazeType

const BASE_36: string[] = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b',
    'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
]
const BASE_36_OVERFLOW: string = '#'
const DEFAULT_MAP_COLOR_BEGIN: number = 7 // Bright green
const DEFAULT_MAP_COLOR_END: number = 2 // Red
const DEFAULT_MAP_COLOR_PATH: number = 13 // Bone
const DEFAULT_MAP_COLOR_SOLUTION: number = 9 // Light blue
const DEFAULT_MAP_COLOR_WALL: number = 14 // Brown
const DEFAULT_MAZE_TYPE: MazeType = MazeType.Sidewinder
const DEFAULT_FONT: image.Font = image.font5

/**
 * Immutable class representing a maze cell
 */
//% namespace="mazes"
class Cell {
    private _col: number
    private _east: Cell
    private _id: number
    private _links: Cell[]
    private _row: number
    private _north: Cell
    private _south: Cell
    private _west: Cell

    constructor(row: number, column: number) {
        this._id = row * 1000 + column
        this._row = row
        this._col = column
        this._north = null
        this._south = null
        this._east = null
        this._west = null
        this._links = []
    }   // constructor()

    public get distances(): Distances {
        let toReturn: Distances = new Distances(this)
        let frontier: Cell[] = [this]
        let rounds: number = 0
        let frontierLength: number
        let thisId: number = this.id

        while (frontier.length > 0) {
            let newFrontier: Cell[] = []

            for (let cell of frontier) {
                for (let linked of cell.links) {
                    if (toReturn.getDistance(linked) === -1) {
                        let d: number = toReturn.getDistance(cell) + 1
                        toReturn.setDistance(linked, d)
                        newFrontier.push(linked)
                    }   // if (! toReturn.getDistance(linked))
                }   // for (linked)
            }   // for (cell)

            frontier = newFrontier.slice(0)
            frontierLength = frontier.length
            rounds++
        }   // while (frontier.length)
        return toReturn
    }   // get distances()

    public get east(): Cell {
        return this._east
    }   // get east()

    public set east(value: Cell) {
        this._east = value
    }   // set east()

    public get id(): number {
        return this._id
    }   // get id()

    public get links(): Cell[] {
        return this._links
    }   // get links()

    public get neighbors(): Cell[] {
        let toReturn: Cell[] = []
        if (this._north != null) {
            toReturn.push(this._north)
        }   // if (this._north)
        if (this._south != null) {
            toReturn.push(this._south)
        }   // if (this._south)
        if (this._east != null) {
            toReturn.push(this._east)
        }   // if (this._east)
        if (this._west != null) {
            toReturn.push(this._west)
        }   // if (this._west)
        return toReturn
    }   // get neighbors()

    public get north(): Cell {
        return this._north
    }   // get north()

    public set north(value: Cell) {
        this._north = value
    }   // set north()

    public get south(): Cell {
        return this._south
    }   // get south()

    public set south(value: Cell) {
        this._south = value
    }   // set south()

    public get west(): Cell {
        return this._west
    }   // get west()

    public set west(value: Cell) {
        this._west = value
    }   // set west()

    public clearLinks(): void {
        this._links = []
    }   // clearLinks()

    public isLinked(cell: Cell): boolean {
        if (cell == null) {
            return false
        }   // if (! cell)
        return (this.findCellId(cell.id) > -1)
    }   // isLinked()

    public link(cell: Cell, reciprocal: boolean = true) {
        if (cell != null) {
            this._links.push(cell)
            if (reciprocal) {
                cell.link(this, false)
            }   // if (reciprocal)
        }   // if (cell)
    }   // link()

    public unlink(cell: Cell, reciprocal: boolean = true) {
        if (cell != null) {
            let index: number = this.findCellId(cell.id)
            if (index > -1) {
                this._links.removeAt(index)
            }   // if (index > -1)
            if (reciprocal) {
                cell.unlink(this, false)
            }   // if (reciprocal)
        }   // if (cell)
    }   // unlink

    private findCellId(cellId: number): number {
        let toReturn: number = -1
        for (let index: number = 0; index < this._links.length; index++) {
            if (this._links[index].id === cellId) {
                toReturn = index
                break
            }   // if (this._links[index].id === cellId)
        }   // for (index)
        return toReturn
    }   // findCellId()
}   // class Cell

class Distances {
    private _root: Cell
    private _cells: number[]

    constructor(root: Cell) {
        this._root = root
        this._cells = []
        this._cells[root.id] = 0
    }   // constructor

    /**
     * Getters and setters
     */
    public get cells(): number[] {
        return this._cells
    }   // get cells()

    /**
     * Public methods
     */

    public getDistance(cell: Cell): number {
        return this._cells[cell.id] == null
            ? -1
            : this._cells[cell.id]
    }   // getDistance()

    public getPath(goal: Cell): Distances {
        let current: Cell = goal
        let toReturn: Distances = new Distances(this._root)
        toReturn.setDistance(current, this.getDistance(current))

        while (current.id !== this._root.id) {
            for (let neighbor of current.links) {
                if (this.getDistance(neighbor) < this.getDistance(current)) {
                    toReturn.setDistance(neighbor, this.getDistance(neighbor))
                    current = neighbor
                    break
                }   // if (this.getDistance(neightbor) < this.getDistance(current))
            }   // for (neighbor)
        }   // while (current.id !== this._root.id)
        return toReturn
    }   // getPath()

    public setDistance(cell: Cell, distance: number) {
        this._cells[cell.id] = distance
    }   // setDistance()
}   // class Distances

//* namespace="mazes"
class Grid {
    protected _cols: number
    protected _grid: Cell[][]
    protected _rows: number

    constructor(rows: number, columns: number) {
        this._cols = columns
        this._rows = rows
        this.initGrid()
        this.configure()
    }   // constructor()

    /**
     * Public methods
     */

    public get columns(): number {
        return this._cols
    }   // get columns()

    public get randomCell(): Cell {
        return this._grid[Math.randomRange(0, this._rows - 1)][Math.randomRange(0, this._cols - 1)]
    }   // get randomCell()

    public get rows(): number {
        return this._rows
    }   // get rows()

    public get size(): number {
        return this._rows * this._cols
    }   // get size()

    public build(method?: MazeType): void {
        this.resetLinks()
        if (method == null) {
            method = DEFAULT_MAZE_TYPE
        }   // if (! method)

        switch (method) {
            case MazeType.AldousBroder:
                this.buildAldousBroder()
                break

            case MazeType.BinaryTree:
                this.buildBinaryTree()
                break

            case MazeType.HuntAndKill:
                this.buildHuntAndKill()
                break

            case MazeType.RecursiveBacktracker:
                this.buildRecursiveBacktracker()
                break

            case MazeType.Sidewinder:
                this.buildSideWinder()
                break

            case MazeType.Wilson:
                this.buildWilson()
                break
        }   // switch (method)
    }   // build()

    public buildImage(cellSize: number = 10, wallThickness: number = 1, backColor: number = 0, wallColor: number = 1, img: Image = null): Image {
        let toReturn: Image = img
            ? img
            : image.create(this._cols * cellSize + wallThickness, this._rows * cellSize + wallThickness)
        toReturn.fill(backColor)
        for (let row: number = 0; row < this._rows; row++) {
            for (let col: number = 0; col < this._cols; col++) {
                let cell: Cell = this.getCell(row, col)
                let x1: number = col * cellSize
                let y1: number = row * cellSize
                let x2: number = (col + 1) * cellSize
                let y2: number = (row + 1) * cellSize
                this.drawContents(toReturn, cell, x1, y1, x2, y2, cellSize)

                // Draw north wall for cells in the top row
                if (cell.north == null) {
                    toReturn.drawLine(x1, y1, x2, y1, wallColor)
                }   // if (cell.north)
                // Draw west wall for cells in the left column
                if (cell.west == null) {
                    toReturn.drawLine(x1, y1, x1, y2, wallColor)
                }   // if (cell.west)

                // Draw the east wall if not linked
                if (!cell.isLinked(cell.east)) {
                    toReturn.drawLine(x2, y1, x2, y2, wallColor)
                }   // if (! cell.isLinked(cell.east))
                // Draw the south wall if not linked
                if (!cell.isLinked(cell.south)) {
                    toReturn.drawLine(x1, y2, x2, y2, wallColor)
                }   // if (! cell.isLinked(cell.south))
            }   // for (col)
        }   // for (row)
        return toReturn
    }   // buildImage()

    public buildTileMap(pathWidth: number = 1, pathColor?: number, wallColor?: number): Image {
        if (pathColor == null) {
            pathColor = DEFAULT_MAP_COLOR_PATH
        }   // if (! pathColor)

        if (wallColor == null) {
            wallColor = DEFAULT_MAP_COLOR_WALL
        }   // if (! wallColor)

        return this.buildImage(pathWidth + 1, 1, pathColor, wallColor)
    }   // buildTileMap

    public getCell(row: number, column: number): Cell {
        if (row >= 0 && row < this._rows && column >= 0 && column < this._cols) {
            return this._grid[row][column]
        } else {
            return null
        }   // if (row >= 0 ...)
    }   // getCell

    /**
     * Protected methods
     */

    protected drawContents(img: Image, cell: Cell, x1: number, y1: number, x2: number, y2: number, cellSize: number): void {

    }   // drawContents()

    /**
     * Private methods  
     */
    private buildAldousBroder(): void {
        let cell: Cell = this.randomCell
        let unvisited: number = this._rows * this._cols - 1
        let passes: number = 1

        while (unvisited > 0) {
            let neighbor: Cell = Math.pickRandom(cell.neighbors)
            if (neighbor.links.length === 0) {
                cell.link(neighbor)
                unvisited -= 1
            }   // if (! neighbor.links)

            cell = neighbor
            passes++
        }   // while (unvisited)
        // game.splash('Passes: ' + passes)
    }   // buildAldousBroder()

    private buildBinaryTree(): void {
        for (let row: number = 0; row < this._rows; row++) {
            for (let col: number = 0; col < this._cols; col++) {
                let cell: Cell = this.getCell(row, col)
                let neighbors: Cell[] = []
                if (cell.north != null) {
                    neighbors.push(cell.north)
                }   // if (cell.north)
                if (cell.east != null) {
                    neighbors.push(cell.east)
                }   // if (cell.east)

                let randomNeighbor: Cell = Math.pickRandom(neighbors)
                if (randomNeighbor != null) {
                    cell.link(randomNeighbor)
                }   // if (randomNeighbor)
            }   // for (col)
        }   // for (row)
    }   // buildBinaryTree()

    private buildHuntAndKill(): void {
        let current: Cell = this.randomCell
        let passes: number = 1

        while (current) {
            let unvisitedNeighbors: Cell[] = []
            for (let cell of current.neighbors) {
                if (cell.links.length === 0) {
                    unvisitedNeighbors.push(cell)
                }   // if (! cell.links)
            }   // for (cell)

            if (unvisitedNeighbors.length > 0) {
                let neighbor: Cell = Math.pickRandom(unvisitedNeighbors)
                current.link(neighbor)
                current = neighbor
            } else {
                current = null

                let getOut: boolean = false
                for (let row of this._grid) {
                    for (let cell of row) {
                        let visitedNeighbors: Cell[] = []
                        for (let n of cell.neighbors) {
                            if (n.links.length > 0) {
                                visitedNeighbors.push(n)
                            }   // if (n.links)
                        }   // for (n)
                        if (cell.links.length === 0 && visitedNeighbors.length > 0) {
                            current = cell
                            let neighbor: Cell = Math.pickRandom(visitedNeighbors)
                            current.link(neighbor)
                            getOut = true
                        }   // if (! cell.links && visitedNeighbors)
                        if (getOut) {
                            break
                        }   // if (getOut)
                    }   // for (cell)
                    if (getOut) {
                        break
                    }   // if (getOut)
                }   // for (row)
            }   // if (unvisitedNeighbors)
            passes++
        }   // while (current)
        // game.splash('Passes: ' + passes)
    }   // buildHuntAndKill()

    private buildRecursiveBacktracker(): void {
        let start: Cell = this.randomCell
        let stack: Cell[] = [start]
        let passes: number = 1

        while (stack.length > 0) {
            let current: Cell = stack[stack.length - 1]
            let neighbors: Cell[] = []
            for (let n of current.neighbors) {
                if (n.links.length === 0) {
                    neighbors.push(n)
                }   // if (! n.links)
            }   // for (n)

            if (neighbors.length === 0) {
                stack.pop()
            } else {
                let neighbor: Cell = Math.pickRandom(neighbors)
                current.link(neighbor)
                stack.push(neighbor)
            }   // if (! neighbors)

            passes++
        }   // while (stack)
        // game.splash('Passes: ' + passes)
    }   // buildRecursiveBacktracker

    private buildSideWinder(): void {
        for (let row: number = 0; row < this._rows; row++) {
            let run: Cell[] = []
            for (let col: number = 0; col < this._cols; col++) {
                let cell: Cell = this.getCell(row, col)
                run.push(cell)

                let atEasternBoundary: boolean = (cell.east == null)
                let atNorthernBoundary: boolean = (cell.north == null)

                let shouldCloseOut = (
                    atEasternBoundary ||
                    (!atNorthernBoundary && Math.percentChance(50))
                )

                if (shouldCloseOut) {
                    let member: Cell = Math.pickRandom(run)
                    if (member.north != null) {
                        member.link(member.north)
                    }   // if (member.north)
                    run = []
                } else {
                    cell.link(cell.east)
                }   // if (shouldCloseOut)
            }   // for (col)
        }   // for (row)
    }   // buildSideWinder()

    private buildWilson(): void {
        let unvisited: number[] = []
        for (let row of this._grid) {
            for (let cell of row) {
                unvisited.push(cell.id)
            }   // for (cell)
        }   // for (row)

        let first: number = Math.pickRandom(unvisited)
        unvisited.removeElement(first)

        let passes: number = 1
        while (unvisited.length > 0) {
            let cellId: number = Math.pickRandom(unvisited)
            let path: number[] = [cellId]

            while (unvisited.indexOf(cellId) > -1) {
                let cell: Cell = this.getCell(Math.floor(cellId / 1000), cellId % 1000)
                cell = Math.pickRandom(cell.neighbors)
                let position: number = path.indexOf(cell.id)
                if (position > -1) {
                    path = path.slice(0, position + 1)
                } else {
                    path.push(cell.id)
                }   // if (position)
                cellId = cell.id
            }   // while (unvisited.indexOf(cellId))

            for (let index: number = 0; index < path.length - 1; index++) {
                cellId = path[index]
                let cell: Cell = this.getCell(Math.floor(cellId / 1000), cellId % 1000)
                let nextCellId: number = path[index + 1]
                let nextCell: Cell = this.getCell(Math.floor(nextCellId / 1000), nextCellId % 1000)
                cell.link(nextCell)
                unvisited.removeElement(cellId)
            }   // for (index)
            passes++
        }   // while (unvisited)
        // game.splash('Passes: ' + passes)
    }   // buildWilson()

    private configure(): void {
        for (let row: number = 0; row < this._rows; row++) {
            for (let col: number = 0; col < this._cols; col++) {
                let cell: Cell = this.getCell(row, col)
                cell.north = this.getCell(row - 1, col)
                cell.south = this.getCell(row + 1, col)
                cell.west = this.getCell(row, col - 1)
                cell.east = this.getCell(row, col + 1)
            }   // for (col)
        }   // for (row)
    }   // configure()

    private initGrid(): void {
        this._grid = []
        for (let row: number = 0; row < this._rows; row++) {
            let gridRow: Cell[] = []
            for (let col: number = 0; col < this._cols; col++) {
                gridRow.push(new Cell(row, col))
            }   // for (col)
            this._grid.push(gridRow)
        }   // for (row)
    }   // initGrid

    private resetLinks(): void {
        for (let row: number = 0; row < this._rows; row++) {
            for (let col: number = 0; col < this._cols; col++) {
                let cell: Cell = this.getCell(row, col)
                cell.clearLinks()
            }   // for (col)
        }   // for (row)
    }   // resetLinks()
}   // class Grid

class DistanceGrid extends Grid {
    private _color: number
    private _distances: Distances
    private _font: image.Font

    constructor(rows: number, columns: number) {
        super(rows, columns)
        this._font = DEFAULT_FONT
    }   // constructor()

    /**
     * Getters and setters
     */
    public get distances(): Distances {
        return this._distances
    }   // get distances()

    public set distances(value: Distances) {
        this._distances = value
    }   // set distances()

    public get font(): image.Font {
        return this._font
    }   // get font()

    public set font(value: image.Font) {
        this._font = value
    }   // set font()

    public get textColor(): number {
        return this._color
    }   // get textColor()

    public set textColor(value: number) {
        this._color = value
    }   // set textColor()

    public buildTileMapWithSolution(pathWidth: number = 1,
        beginRow?: number, beginColumn?: number, endRow?: number, endColumn?: number,
        pathColor?: number, wallColor?: number, solutionColor?: number,
        beginColor?: number, endColor?: number): Image {
        this.distances = null
        let toReturn = super.buildTileMap(pathWidth, pathColor, wallColor)

        if (solutionColor == null) {
            solutionColor = DEFAULT_MAP_COLOR_SOLUTION
        }   // if (! solutionColor)

        if (beginColor == null) {
            beginColor = DEFAULT_MAP_COLOR_BEGIN
        }   // if (! beginColor)

        if (endColor == null) {
            endColor = DEFAULT_MAP_COLOR_END
        }   // if (! endColor)

        // Default beginning cell is (0, 0)
        if (beginColumn == null) {
            beginColumn = 0
        }   // if (! beginCol)

        if (beginRow == null) {
            beginRow = 0
        }   // if (! beginRow)

        // Default end cell is bottom-left
        if (endColumn == null) {
            endColumn = 0
        }   // if (! endColumn)
        if (endRow == null) {
            endRow = this._rows - 1
        }   // if (! endRow)

        // Draw solution
        // maze.distances = maze.getCell(0, 0).distances.getPath(maze.getCell(GRID_SIZE - 1, 0))
        let solution: Distances = this.getCell(beginRow, beginColumn).distances.getPath(
            this.getCell(endRow, endColumn))
        for (let row: number = 0; row < this._rows; row++) {
            for (let col: number = 0; col < this._cols; col++) {
                let cell: Cell = this.getCell(row, col)
                if (solution.getDistance(cell) > -1) {
                    toReturn.setPixel(col * (pathWidth + 1) + 1, row * (pathWidth + 1) + 1, solutionColor)
                }   // if (solution.getDistance(cell) > -1)
            }   // for (col)
        }   // for (row)
        toReturn.setPixel(beginColumn * (pathWidth + 1) + 1, beginRow * (pathWidth + 1) + 1, beginColor)
        toReturn.setPixel(endColumn * (pathWidth + 1) + 1, endRow * (pathWidth + 1) + 1, endColor)
        return toReturn
    }   // buildTileMapWithSolution

    /**
     * Protected methods
     */
    /**
     * Overrides Grid.drawContents()
     */
    protected drawContents(img: Image, cell: Cell, x1: number, y1: number, x2: number, y2: number, cellSize: number): void {
        if (this._distances && this._distances.getDistance(cell) > -1 && this._font) {
            let distance: number = this._distances.getDistance(cell)
            let char: string = distance >= BASE_36.length
                ? BASE_36_OVERFLOW
                : BASE_36[distance]
            img.print(char, x1 + Math.round(cellSize / 2), y1 + Math.round(cellSize / 2),
                this._color, this._font)
        } else {
            super.drawContents(img, cell, x1, y1, x2, y2, cellSize)
        }   // if (this._distances ...)
    }   // drawContents()
}   // class DistanceGrid

namespace mazes {
    function buildBinaryTreeMaze(rows: number = 10, columns: number = 10): Grid {
        let toReturn: Grid = new Grid(rows, columns)
        toReturn.build(MazeType.BinaryTree)
        return toReturn
    }   // buildBinaryTreeMaze()

    function buildSidewinderMaze(rows: number = 10, columns: number = 10): Grid {
        let toReturn: Grid = new Grid(rows, columns)
        toReturn.build(MazeType.Sidewinder)
        return toReturn
    }   // buildSidewinderMaze()

    export function buildMaze(rows: number = 10, columns: number = 10, mazeType?: MazeType, gridType?: GridType): Grid {
        if (!mazeType) {
            mazeType = DEFAULT_MAZE_TYPE
        }   // if (! mazeType)

        if (!gridType) {
            gridType = GridType.Empty
        }   // if (!gridType)

        let toReturn: Grid
        switch (mazeType) {
            case MazeType.BinaryTree:
                toReturn = buildBinaryTreeMaze(rows, columns)
                break

            case MazeType.Sidewinder:
                toReturn = buildSidewinderMaze(rows, columns)
                break
        }   // switch (mazeType)

        switch (gridType) {
            case GridType.Distances:
                return <DistanceGrid>toReturn
                break
        }   // switch gridType

        return toReturn
    }   // buildMaze()
}   // namespace mazes