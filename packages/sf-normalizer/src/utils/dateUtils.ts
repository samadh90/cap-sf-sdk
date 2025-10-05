/**
 * Date utilities for SuccessFactors OData v2 integration
 * Handles conversion between JavaScript Date objects and SAP's /Date(timestamp)/ format
 */

/**
 * Parse SAP-style /Date(123456789)/ strings into JavaScript Date objects
 * @param value String that might contain SAP date format
 * @returns Date object if valid SAP date format, otherwise original string
 *
 * @example
 * parseSapDate('/Date(1234567890000)/') // returns new Date(1234567890000)
 * parseSapDate('regular string') // returns 'regular string'
 */
export function parseSapDate(value: string): Date | string {
  const match = /\/Date\((\d+)([+-]\d+)?\)\//.exec(value)
  if (match) {
    const timestamp = parseInt(match[1], 10)
    return new Date(timestamp)
  }
  return value
}

/**
 * Format JavaScript Date objects into SAP's /Date(timestamp)/ format
 * @param value Date object to convert
 * @returns SAP-formatted date string
 *
 * @example
 * toSapDate(new Date('2024-01-01')) // returns '/Date(1704067200000)/'
 */
export function toSapDate(value: Date): string {
  const timestamp = value.getTime()
  return `/Date(${timestamp})/`
}

/**
 * Check if a string value looks like a SAP date format
 * @param value String to check
 * @returns true if the string matches SAP date pattern
 *
 * @example
 * isSapDateString('/Date(1234567890000)/') // returns true
 * isSapDateString('2024-01-01') // returns false
 */
export function isSapDateString(value: string): boolean {
  return typeof value === 'string' && value.startsWith('/Date(') && value.endsWith(')/')
}
