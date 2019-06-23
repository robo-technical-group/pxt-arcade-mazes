# Grid.buildImage method

Create an image representing the maze in this grid.

```typescript
Grid.buildImage(cellSize: number = 10, wallThickness: number = 1,
  img: Image = null): Image
```

## Parameters

- `cellSize: number` Number of pixels to use for both the width and the height of a cell. Default is 10 pixels.
- `wallThickness: number` Number of pixels to use when drawing a wall. Default is 1 pixel.
- `img: Image` Image to use as the drawing canvas (instead of creating a new one). Default is `null`, which will create a new image of an appropriate size.