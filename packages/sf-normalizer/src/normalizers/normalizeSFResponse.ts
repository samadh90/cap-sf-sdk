/**
 * Normalize SuccessFactors OData v2 responses into clean JavaScript objects.
 * Handles `.d.results`, `.d`, `/Date(...)` parsing, and nested expands.
 */

import { normalizeObject, extractSFData } from '../utils/index'

/**
 * Normalize the SuccessFactors response
 * @param response Raw SF OData v2 response (with `d` or `d.results`)
 * @returns Normalized JavaScript object with cleaned data and parsed dates
 *
 * @example
 * // Single entity response
 * const response = { d: { id: '123', date: '/Date(1704067200000)/', __metadata: {...} } }
 * const normalized = normalizeSFResponse(response)
 * // Result: { id: '123', date: Date object }
 *
 * @example
 * // Collection response
 * const response = { d: { results: [{ id: '1' }, { id: '2' }] } }
 * const normalized = normalizeSFResponse(response)
 * // Result: [{ id: '1' }, { id: '2' }]
 */
export function normalizeSFResponse(response: any): any {
  if (!response) return null

  const data = extractSFData(response)
  return normalizeObject(data)
}
