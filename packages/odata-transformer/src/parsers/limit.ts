/**
 * Parse CAP-like limit into OData $top/$skip params.
 * Accepts objects like: { rows?: { val: number }, offset?: { val: number } }
 * Returns a plain record with $top and/or $skip when present.
 */
export function parseLimit(
  limit: { rows?: { val: number }; offset?: { val: number } } | undefined
): Record<string, string> {
  const result: Record<string, string> = {}
  if (!limit) return result
  if (limit.rows && typeof limit.rows.val === 'number') result['$top'] = String(limit.rows.val)
  if (limit.offset && typeof limit.offset.val === 'number')
    result['$skip'] = String(limit.offset.val)
  return result
}
