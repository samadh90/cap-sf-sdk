export function parseOrderBy(orderBy: any[]): string {
  return orderBy.map((item) => `${item.ref.join('/')} ${item.sort.toLowerCase()}`).join(',')
}
