# Cell.link method

Link another Cell to this one.

```typescript
Cell.link(cell: mazes.Cell, reciprocal: boolean = true): void
```

## Parameters

- `cell: Cell` Cell to link.
- `reciprocal: boolean` Whether to also link this cell to the one passed as a parameter. Default is `true`.