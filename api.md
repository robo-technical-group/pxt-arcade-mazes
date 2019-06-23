# MakeCode Arcade Mazes API

## Enumerations

- [`MazeType`](MazeType.md)

## Interfaces

- [`CellDistances`](CellDistances.md)
- [`GridColors`](GridColors.md)
- [`GridPath`](GridPath.md)

## `Cell` class

- [`constructor(number, number)`](Cell.constructor.md)
- **Properties**
  - [`column`](Cell.column.md)
  - [`distances`](Cell.distances.md)
  - [`east`](Cell.east.md)
  - [`id`](Cell.id.md)
  - [`links`](Cell.links.md)
  - [`neighbors`](Cell.neighbors.md)
  - [`north`](Cell.north.md)
  - [`row`](Cell.row.md)
  - [`south`](Cell.south.md)
  - [`west`](Cell.west.md)
- **Public methods**
  - [`clearLinks`](Cell.clearLinks.md)
  - [`isLinked`](Cell.isLinked.md)
  - [`link(Cell, boolean)`](Cell.link.md)
  - [`unlink(Cell, boolean)`](Cell.unlink.md)  

## `Distances` class

- [`constructor(Cell)`](Distances.constructor.md)
- **Properties**
  - [`cells`](Distances.cells.md)
- **Public methods**
  - [`getDistance(Cell)`](Distances.getDistance.md)
  - [`getPath(Cell)`](Distances.getPath.md)
  - [`setDistance(Cell, number)`](Distances.setDistance.md)

## `Grid` class

A grid forms the basis of a maze.

- [`constructor(number, number)`](Grid.constructor.md)
- **Properties**
  - [`colors`](Grid.colors.md)
  - [`columns`](Grid.columns.md)
  - [`distances`](Grid.distances.md)
  - [`font`](Grid.font.md)
  - [`randomCell`](Grid.randomCell.md)
  - [`rows`](Grid.rows.md)
  - [`size`](Grid.size.md)
  - [`solutionPath`](Grid.solutionPath.md)
- **Public methods**
  - [`build(MazeType)`](Grid.build.md)
  - [`buildImage(number, number, Image)`](Grid.buildImage.md)
  - [`buildTileMap(number, Image)`](Grid.buildTileMap.md)
  - [`getCell(row, number)`](Grid.getCell.md)
  - [`getCellById(number)`](Grid.getCellById.md)
  - [`setSolutionCells(number, number, number, number)`](Grid.setSolutionCells.md)
  - [`solve`](Grid.solve.md)

## `mazes` namespace

- [`buildMaze(number, number, mazeType)`](mazes.buildMaze.md)
 