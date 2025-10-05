export function parseSelect(columns: any[]): string {
  return columns
    .filter((col) => col.ref)
    .map((col) => col.ref.join('/'))
    .join(',')
}
