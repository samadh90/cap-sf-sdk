/**
 * Parse expand definitions from CQN-like columns into an OData $expand string.
 *
 * Supported forms (examples):
 * - { ref: ['nav'], expand: ['field1', 'field2'] }
 * - { ref: ['nav'], expand: [{ ref: ['deep'], expand: ['x'] }, 'y'] }
 * - { ref: ['nav'] }  // treated as simple expand of navigation property
 */
export function parseExpand(columns: any[]): string {
  const entries: string[] = []

  const toPath = (ref: any) => (Array.isArray(ref) ? ref.join('/') : String(ref))

  const renderExpand = (col: any): string | undefined => {
    if (!col || !col.ref) return undefined
    const path = toPath(col.ref)
    // no expand payload => simple expand of nav property
    if (!col.expand) return path

    // expand can be array of strings or nested objects
    const selects: string[] = []
    const nestedExpands: string[] = []

    for (const item of col.expand as any[]) {
      if (!item) continue
      if (typeof item === 'string') {
        // treat string as a field to select within this nav
        selects.push(item)
      } else if (item.ref && !item.expand) {
        // nested navigation selected as a field
        selects.push(toPath(item.ref))
      } else if (item.ref && item.expand) {
        // deeper expand
        const nested = renderExpand(item)
        if (nested) nestedExpands.push(nested)
      }
    }

    const params: string[] = []
    if (selects.length) params.push(`$select=${selects.join(',')}`)
    if (nestedExpands.length) params.push(`$expand=${nestedExpands.join(',')}`)

    return params.length ? `${path}(${params.join(';')})` : path
  }

  for (const col of columns) {
    if (col?.ref && (col.expand || col.isExpand)) {
      const rendered = renderExpand(col)
      if (rendered) entries.push(rendered)
    }
  }

  return entries.join(',')
}
