# buildMaze function

Create a maze of a specified size using the given algorithm.

```typescript
mazes.buildMaze(rows: number = 10, columns: number = 10, mazeType?: MazeType): Grid
```

## Parameters

- `rows: number` Number of rows in the grid. Default is 10.
- `columns: number` Number of columns in the grid. Default is 10.
- `mazeType: MazeType` A value from the [`MazeType`](MazeType.md) enumeration for the algorithm to use when building the maze. Default is to use the sidewinder algorithm.

## Return value

A `Grid` object that contains the maze.
