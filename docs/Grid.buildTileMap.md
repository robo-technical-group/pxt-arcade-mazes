# Grid.buildTileMap method

Create a color-based tile map representing the maze in this grid.

```typescript
Grid.buildTileMap(pathWidth: number = 1, img: Image = null): Image
```

## Parameters

- `pathWidth: number` Width in tiles of the maze's paths. Default is 1 tile.
- `img: Image` Image to use as the drawing canvas (instead of creating a new one). Default is `null`, which will create a new image of an appropriate size.