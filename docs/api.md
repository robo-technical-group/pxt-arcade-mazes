# MakeCode Arcade Mazes API

## Enumerations

- [`MazeType`](MazeType.md)

## Interfaces

- [`MazeCellDistances`](CellDistances.md)
- [`MazeGridColors`](GridColors.md)
- [`MazeGridPath`](GridPath.md)

## `mazes.Cell` class

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
  - [`link(mazes.Cell, boolean)`](Cell.link.md)
  - [`unlink(mazes.Cell, boolean)`](Cell.unlink.md)  

## `mazes.Distances` class

- [`constructor(mazes.Cell)`](Distances.constructor.md)
- **Properties**
  - [`cells`](Distances.cells.md)
- **Public methods**
  - [`getDistance(mazes.Cell)`](Distances.getDistance.md)
  - [`getPath(mazes.Cell)`](Distances.getPath.md)
  - [`setDistance(mazes.Cell, number)`](Distances.setDistance.md)

## `mazes.Grid` class

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

## Helper functions

- [`mazes.buildMaze(number, number, MazeType)`](buildMaze.md)
 