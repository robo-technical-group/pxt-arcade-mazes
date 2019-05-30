/**
 * Extension for building mazes.
 * Algorithms taken from
 * Buck, Jamis. (2015). _Mazes for programmers: Code your own twisty little passages_
 *   Dallas, TX: Pragmatic Programmers
 */
/**
 * Enumerations
 */
enum MazeType {
    None,
    AldousBroder,
    BinaryTree,
    HuntAndKill,
    RecursiveBacktracker,
    Sidewinder,
    Wilson
}   // enum MazeType

/**
 * Constants
 */
const BASE_36: string[] = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b',
    'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
]
const BASE_36_OVERFLOW: string = '#'
const DEFAULT_COLOR_FONT: number = 3 // Pink
const DEFAULT_COLOR_IMAGE_BG: number = 15 // Black
const DEFAULT_COLOR_IMAGE_WALL: number = 1 // White
const DEFAULT_COLOR_MAP_BEGIN: number = 7 // Bright green
const DEFAULT_COLOR_MAP_END: number = 2 // Red
const DEFAULT_COLOR_MAP_PATH: number = 13 // Bone
const DEFAULT_COLOR_MAP_SOLUTION: number = 9 // Light blue
const DEFAULT_COLOR_MAP_WALL: number = 14 // Brown
const DEFAULT_MAZE_TYPE: MazeType = MazeType.Sidewinder
const DEFAULT_FONT: image.Font = image.font5

/**
 * Interfaces
 */
interface GridColors {
    imageBackground: number
    imageWall: number
    tilePath: number
    tileWall: number

    font?: number
    tileBegin?: number
    tileEnd?: number
    tileSolution?: number
}   // interface GridColors

interface GridPath {
    begin: Cell
    end: Cell
}   // GridPath

/**
 * Immutable class representing a maze cell
 */
//% blockNamespace="mazes"
class Cell {
    private _col: number
    private _east: Cell
    private _id: number
    private _links: Cell[]
    private _row: number
    private _north: Cell
    private _south: Cell
    private _west: Cell

    /**
     * Default constructor.
     * @param {number} row - Row number of cell.
     * @param {number} column - Column number of cell.
     */
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

    /**
     * Getters and setters
     */
    /**
     * @return {number} The cell's column
     */
    public get column(): number {
        return this._col
    }   // get column()

    /**
     * @return {Distances} Initialized Distances object for this cell.
     *                     @see Distances.
     */
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

    /**
     * @return {Cell} Cell to the east (right) of this cell; null if none.
     */
    //% callInDebugger
    public get east(): Cell {
        return this._east
    }   // get east()

    /**
     * @param {Cell} value - Cell to the east (right) of this cell; null if none.
     */
    public set east(value: Cell) {
        this._east = value
    }   // set east()

    /**
     * @return {number} Unique ID for this cell.
     */
    //% callInDebugger
    public get id(): number {
        return this._id
    }   // get id()

    /**
     * @return {Cell[]} Cells directly connected to this cell.
     */
    //% callInDebugger
    public get links(): Cell[] {
        return this._links
    }   // get links()

    /**
     * @return {Cell[]} Cells that touch this cell.
     */
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

    /**
     * @return {Cell} Cell to the north (above) of this cell; null if none.
     */
    //% callInDebugger
    public get north(): Cell {
        return this._north
    }   // get north()

    /**
     * @param {Cell} value - Cell to the north (above) of this cell; null if none.
     */
    public set north(value: Cell) {
        this._north = value
    }   // set north()

    /**
     * @return {number} The cell's row.
     */
    public get row(): number {
        return this._row
    }   // get row()

    /**
     * @return {Cell} Cell to the south (below) of this cell; null if none.
     */
    //% callInDebugger
    public get south(): Cell {
        return this._south
    }   // get south()

    /**
     * @param {Cell} value - Cell to the south (below) of this cell; null if none.
     */
    public set south(value: Cell) {
        this._south = value
    }   // set south()

    /**
     * @return {Cell} Cell to the west (left) of this cell; null if none.
     */
    //% callInDebugger
    public get west(): Cell {
        return this._west
    }   // get west()

    /**
     * @param {Cell} value - Cell to the west (left) of this cell; null if none.
     */
    public set west(value: Cell) {
        this._west = value
    }   // set west()

    /**
     * Public methods
     */
    /**
     * Clears the list of linked cells.
     */
    public clearLinks(): void {
        this._links = []
    }   // clearLinks()

    /**
     * @return {boolean} Whether the given cell is linked to this one.
     */
    public isLinked(cell: Cell): boolean {
        if (cell == null) {
            return false
        }   // if (! cell)
        return (this.findCellId(cell.id) > -1)
    }   // isLinked()

    /**
     * Link this cell to another.
     * @param {Cell} cell - Cell to link to this one.
     * @param {boolean} reciprocal - Whether to also link the given cell to this one.
     */
    public link(cell: Cell, reciprocal: boolean = true) {
        if (cell != null) {
            this._links.push(cell)
            if (reciprocal) {
                cell.link(this, false)
            }   // if (reciprocal)
        }   // if (cell)
    }   // link()

    /**
     * Remove the link between this cell and another.
     * @param {cell} cell - Cell to unlink from this one.
     * @param {boolean} reciprocal - Whether to also unlink the given cell from this one.
     */
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

    /**
     * Private functions
     */
    /**
     * Find a given cell in this cell's list of links.
     * @param {number} cellId - ID of cell to find.
     * @return {number} Index of cell in links array; -1 if not found.
     */
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

/**
 * List of distances between a given cell and others.
 */
//% blockNamespace="mazes"
class Distances {
    private _root: Cell
    private _cells: number[]

    /**
     * Default constructor
     * @param {Cell} root - Root cell from which distances are measured.
     */
    constructor(root: Cell) {
        this._root = root
        this._cells = []
        this._cells[root.id] = 0
    }   // constructor

    /**
     * Getters and setters
     */
    /**
     * @return {number[]} List of cells whose distances have been recorded,
     *                    indexed by cell ID.
     */
    //% callInDebugger
    public get cells(): number[] {
        return this._cells
    }   // get cells()

    /**
     * Public methods
     */
    /**
     * @param {Cell} cell - Cell to find.
     * @return {number} Distance from root to cell; -1 if not known.
     */
    public getDistance(cell: Cell): number {
        return this._cells[cell.id] == null
            ? -1
            : this._cells[cell.id]
    }   // getDistance()

    /**
     * Return a list of cells that form a path from the root to a given cell.
     * @param {Cell} goal - End cell of path.
     * @return{Distances} - Distances object with list of cells on path.
     */
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

    /**
     * @param {Cell} cell
     * @param {number} distance - Distance from root to cell.
     */
    public setDistance(cell: Cell, distance: number) {
        this._cells[cell.id] = distance
    }   // setDistance()
}   // class Distances

/**
 * Grid that forms the basis of a maze.
 */
//% blockNamespace="mazes"
class Grid {
    private _colors: GridColors
    private _cols: number
    private _distances: Distances
    private _font: image.Font
    private _grid: Cell[][]
    private _path: GridPath
    private _rows: number

    /**
     * Default constructor.
     * @param {number} rows - Number of rows in grid.
     * @param {number} columns - Number of columns in grid.
     */
    constructor(rows: number, columns: number) {
        this._colors = {
            font: DEFAULT_COLOR_FONT,
            imageBackground: DEFAULT_COLOR_IMAGE_BG,
            imageWall: DEFAULT_COLOR_IMAGE_WALL,
            tileBegin: DEFAULT_COLOR_MAP_BEGIN,
            tileEnd: DEFAULT_COLOR_MAP_END,
            tilePath: DEFAULT_COLOR_MAP_PATH,
            tileSolution: DEFAULT_COLOR_MAP_SOLUTION,
            tileWall: DEFAULT_COLOR_MAP_WALL
        }
        this._cols = columns
        this._font = DEFAULT_FONT
        this._path = {
            begin: this.getCell(0, 0),
            end: this.getCell(rows - 1, 0)
        }
        this._rows = rows
        this.initGrid()
        this.configure()
    }   // constructor()

    /**
     * Getters and setters
     */
    /**
     * @return {GridColors} The color settings for this object.
     */
    public get colors(): GridColors {
        return this._colors
    }   // get colors()

    /**
     * @param {GridColors} value - The color settings for this object.
     */
    public set colors(value: GridColors) {
        this._colors = value
    }   // set colors()
    /**
     * @return {number} Number of columns in grid.
     */
    //% blockId="mazes_Grid_columns_get"
    //% block="columns"
    //% blockCombine
    //% blockSetVariable=myMaze
    //% callInDebugger
    //% group="Mazes"
    public get columns(): number {
        return this._cols
    }   // get columns()

    /**
     * @return {Distances} The current Distances object.
     */
    //% callInDebugger
    public get distances(): Distances {
        return this._distances
    }   // get distances()

    /**
     * @param {Distances} value - The current Distances object for this grid.
     */
    public set distances(value: Distances) {
        this._distances = value
    }   // set distances()

    /**
     * @return {image.Font} Font used when printing distances in the image.
     */
    //% callInDebugger
    public get font(): image.Font {
        return this._font
    }   // get font()

    /**
     * @param {image.Font} value - Font used when printing distances in the image.
     */
    public set font(value: image.Font) {
        this._font = value
    }   // set font()

    /**
     * @return {Cell} Cell chosen at random from grid.
     */
    public get randomCell(): Cell {
        return this._grid[Math.randomRange(0, this._rows - 1)][Math.randomRange(0, this._cols - 1)]
    }   // get randomCell()

    /**
     * @return {number} Number of rows in grid.
     */
    //% blockId="mazes_Grid_rows_get"
    //% block="rows"
    //% blockCombine
    //% blockSetVariable=myMaze
    //% callInDebugger
    //% group="Mazes"
    public get rows(): number {
        return this._rows
    }   // get rows()

    /**
     * @return {number} Number of cells in grid.
     */
    //% callInDebugger
    public get size(): number {
        return this._rows * this._cols
    }   // get size()

    /**
     * @return {GridPath} Begin and end cells for solution.
     */
    public get solutionPath(): GridPath {
        return this._path
    }   // get solutionPath()

    /**
     * Public methods
     */
    /**
     * Create a maze in this grid.
     * @param {MazeType} method - Algorithm to use to build maze.
     */
    //% blockId="mazes_Grid_build"
    //% block="%myMaze|build maze || using the %method method"
    //% method.defl=MazeType.SideWinder
    //% expandableArgumentMode="toggle"
    //% group="Mazes"
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

    /**
     * Return an image of the maze in this grid.
     * @param {number} cellSize - Width and height in pixels of each cell in the grid.
     * @param {number} wallThickness - Thickness in pixels of the walls for the maze.
     * @return {Image} Image of the maze in this grid.
     */
    //% blockId="mazes_Grid_buildImage"
    //% block="%myMaze|create image || with cell size %cellSize and wall thickness %wallThickness"
    //% cellSize.defl=10 wallThickness.defl=10
    //% expandableArgumentMode="toggle"
    //% group="Images"
    public buildImage(cellSize: number = 10, wallThickness: number = 1): Image {
        return this.draw(cellSize, wallThickness, this._colors.imageBackground, this._colors.imageWall)
    }   // buildImage()

    /**
     * Return a tile map with the maze in this grid.
     * @param {number} pathWidth - Width in tiles of the path.
     * @return {Image} Tile map of this maze.
     */
    //% blockId="mazes_DistancesGrid_buildTileMap"
    //% block="%myMaze|create tile map || with path width %pathWidth tiles"
    //% pathWidth.defl=1
    //% expandableArgumentMode="toggle"
    //% group="Images"
    public buildTileMap(pathWidth: number = 1): Image {
        // Hide solution for now so that the distances are not printed in the image.
        let solution: Distances = this.distances
        this.distances = null
        let toReturn = this.draw(pathWidth + 1, 1, this._colors.tilePath, this._colors.tileWall)
        this.distances = solution

        if (this._colors.tileBegin == null) {
            this._colors.tileBegin = DEFAULT_COLOR_MAP_BEGIN
        }   // if (! beginColor)
        if (this._colors.tileEnd == null) {
            this._colors.tileEnd = DEFAULT_COLOR_MAP_END
        }   // if (! endColor)
        if (this._colors.tileSolution == null) {
            this._colors.tileSolution = DEFAULT_COLOR_MAP_SOLUTION
        }   // if (! solutionColor)
        if (this._path.begin == null) {
            this._path.begin = new Cell(0, 0)
        }   // if (! this._path.begin)
        if (this._path.end == null) {
            this._path.end = new Cell(this._rows - 1, 0)
        }   // if (! this._path.end)

        // Draw solution
        if (solution) {
            for (let row: number = 0; row < this._rows; row++) {
                for (let col: number = 0; col < this._cols; col++) {
                    let cell: Cell = this.getCell(row, col)
                    if (solution.getDistance(cell) > -1) {
                        toReturn.setPixel(col * (pathWidth + 1) + 1, row * (pathWidth + 1) + 1,
                            this._colors.tileSolution)
                    }   // if (solution.getDistance(cell) > -1)
                }   // for (col)
            }   // for (row)
            toReturn.setPixel(this._path.begin.column * (pathWidth + 1) + 1,
                this._path.begin.row * (pathWidth + 1) + 1, this._colors.tileBegin)
            toReturn.setPixel(this._path.end.column * (pathWidth + 1) + 1,
                this._path.end.row * (pathWidth + 1) + 1, this._colors.tileEnd)
        }   // if (solution)
        return toReturn
    }   // buildTileMap

    /**
     * @param {number} row - Row of requested cell.
     * @param {number} column - Column of requested cell.
     * @return {Cell} Cell from the grid.
     */
    public getCell(row: number, column: number): Cell {
        if (row >= 0 && row < this._rows && column >= 0 && column < this._cols) {
            return this._grid[row][column]
        } else {
            return null
        }   // if (row >= 0 ...)
    }   // getCell

    /**
     * Set the begin and end cells for the solution path.
     * @param {number} beginRow - Row of beginning cell for solution.
     * @param {number} beginColumn - Column of beginning cell for solution.
     * @param {number} endRow - Row of ending cell for solution.
     * @param {number} endColumn - Column of ending cell for solution.
     */
    //% blockId="mazes_DistancesGrid_setSolutionCells"
    //% block="%myMaze|set solution path to start at row %beginRow column %beginColumn and end at row %endRow column %endColumn"
    //% beginRow.defl=0 beginColumn.defl=0 endRow.defl=9 endColumn.defl=0
    //% group="Mazes"
    public setSolutionCells(beginRow: number = 0, beginColumn = 0, endRow: number = 9, endColumn: number = 0): void {
        this._path = {
            begin: this.getCell(beginRow, beginColumn),
            end: this.getCell(endRow, endColumn)
        }
    }   // setSolutionCells()

    /**
     * Find a solution for the maze. Set the beginning and ending cells with setSolutionCells().
     * @see setSolutionCells
     */
    //% blockId="mazes_DistancesGrid_solve"
    //% block="%myMaze|solve"
    //% group="Mazes"
    public solve(): void {
        this._distances = this._path.begin.distances.getPath(this._path.end)
    }   // solve()

    /**
     * Private methods  
     */
    /**
     * Build a maze using the Aldous-Broder algorithm.
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

    /**
     * Build a maze using the binary tree algorithm.
     */
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

    /**
     * Build a tree using the hunt-and-kill algorithm.
     */
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

    /**
     * Build a maze using the recursive backtracker algorithm.
     */
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

    /**
     * Build a maze using the sidewinder algorithm.
     */
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

    /**
     * Build a maze using Wilson's algorithm.
     */
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

    /**
     * Populate each cell in the grid with its neighbors.
     */
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

    /**
     * Draw an image of the maze.
     */
    private draw(cellSize: number, wallThickness: number, backColor: number, wallColor: number = 1, img: Image = null): Image {
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
                this.drawContents(toReturn, cell, x1, y1, cellSize)

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
    }   // draw()

    /**
     * Draw something in the cell when buliding images.
     * @param {Image} img - Canvas for drawing the maze.
     * @param {Cell} cell - Cell being drawn.
     * @param {number} x - Horizontal coordinate of upper-left corner of cell.
     * @param {number} y - Vertical coordinate of upper-left corner of cell.
     * @param {number} cellSize - Size of cell in pixels.
     */
    private drawContents(img: Image, cell: Cell, x: number, y: number, cellSize: number): void {
        if (this._distances && this._distances.getDistance(cell) > -1 && this._font) {
            let x2: number = x + cellSize
            let y2: number = y + cellSize
            let distance: number = this._distances.getDistance(cell)
            let char: string = distance >= BASE_36.length
                ? BASE_36_OVERFLOW
                : BASE_36[distance]
            img.print(char, x + Math.floor(cellSize / 2), y + Math.floor(cellSize / 2),
                this._colors.font, this._font)
        }   // if (this._distances ...)
    }   // drawContents()

    /**
     * Initialize the grid array.
     */
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

    /**
     * Remove all linked cells.
     */
    private resetLinks(): void {
        for (let row: number = 0; row < this._rows; row++) {
            for (let col: number = 0; col < this._cols; col++) {
                let cell: Cell = this.getCell(row, col)
                cell.clearLinks()
            }   // for (col)
        }   // for (row)
    }   // resetLinks()
}   // class Grid

//% weight=0 color=#b8860b icon="\uf00a" block="Mazes"
//% advanced=true
//% groups=['others', 'Mazes', 'Images']
namespace mazes {
    //% blockId="mazes_buildMaze"
    //% block="create maze || with %rows rows and %columns columns of type %mazeType"
    //% blockSetVariable=myMaze
    //% rows.defl=10 columns.defl=10 mazeType.defl=MazeType.SideWinder
    //% expandableArgumentMode="toggle"
    //% group="Mazes"
    export function buildMaze(rows: number = 10, columns: number = 10, mazeType?: MazeType): Grid {
        if (mazeType == null) {
            mazeType = DEFAULT_MAZE_TYPE
        }   // if (! mazeType)

        let toReturn: Grid = new Grid(rows, columns)
        if (mazeType !== MazeType.None) {
            toReturn.build(mazeType)
        }   // if (mazeType)
        return toReturn
    }   // buildMaze()
}   // namespace mazes