/**
 * Serialize CAP/JS objects into SuccessFactors OData v2 compatible payloads.
 * - Converts Date objects → /Date(xyz)/
 * - Keeps nested expands intact
 * - Preserves all other data types and structures
 */

import { serializeObject } from '../utils/index'

/**
 * Serialize payload before sending to SuccessFactors
 * @param data JavaScript object or array to serialize
 * @returns SuccessFactors-compatible payload with proper date formatting
 *
 * @example
 * const payload = {
 *   name: 'John Doe',
 *   startDate: new Date('2024-01-01'),
 *   nested: { endDate: new Date('2024-12-31') }
 * }
 * const serialized = serializeSFRequest(payload)
 * // Result: {
 * //   name: 'John Doe',
 * //   startDate: '/Date(1704067200000)/',
 * //   nested: { endDate: '/Date(1735689600000)/' }
 * // }
 */
export function serializeSFRequest(data: any): any {
  if (!data) return null
  return serializeObject(data)
}
