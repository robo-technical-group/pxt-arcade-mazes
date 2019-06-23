# Distances.getDistance method

Get the distances between the root cell and the given cell.

```typescript
Distances.getDistance(cell: Cell): number
```

## Properties

- `cell: Cell` Cell of interest.

## Return value

A `number` representing the distance between the root cell and the cell passed as a parameter. If the distance has not yet been calculated or does not exist, then the returned value is `-1`.