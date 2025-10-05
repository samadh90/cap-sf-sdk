export function parseSelect(columns: any[]): string {
  return (
    columns
      // exclude expand-only entries from $select
      .filter((col) => col.ref && !col.expand)
      .map((col) => col.ref.join('/'))
      .join(',')
  )
}
