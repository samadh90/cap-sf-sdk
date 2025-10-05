const OPERATOR_MAP: Record<string, string> = {
  '=': 'eq',
  '!=': 'ne',
  '<>': 'ne',
  '>': 'gt',
  '<': 'lt',
  '>=': 'ge',
  '<=': 'le',
}

export function parseFilter(where: any[]): string {
  return where
    .map((token) => {
      if (token.ref) return token.ref.join('/')
      if (token.val !== undefined) return `'${token.val}'`
      if (typeof token === 'string') {
        const op = OPERATOR_MAP[token]
        return op ? op : token
      }
      return ''
    })
    .join(' ')
}
