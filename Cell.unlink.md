# Cell.unlink method

Remove the link between another Cell and this one.

```typescript
Cell.unlink(cell: Cell, reciprocal: boolean = true): void
```

## Parameters

- `cell: Cell` Cell to unlink.
- `reciprocal: boolean` Whether to also unlink this cell from the one passed as a parameter. Default is `true`.