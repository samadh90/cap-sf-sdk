/**
 * Normalize SuccessFactors OData v2 responses into clean JavaScript objects.
 * Handles `.d.results`, `.d`, `/Date(...)` parsing, and nested expands.
 */

type AnyObject = Record<string, any>

/** Parse SAP-style /Date(123456789)/ strings into JS Dates */
function parseSapDate(value: string): Date | string {
  const match = /\/Date\((\d+)([+-]\d+)?\)\//.exec(value)
  if (match) {
    const timestamp = parseInt(match[1], 10)
    return new Date(timestamp)
  }
  return value
}

/** Recursively normalize any object or array */
function normalizeObject(obj: AnyObject): AnyObject {
  if (Array.isArray(obj)) {
    return obj.map((item) => normalizeObject(item))
  }

  if (obj && typeof obj === 'object') {
    const result: AnyObject = {}
    for (const [key, value] of Object.entries(obj)) {
      if (key === '__metadata') continue

      if (typeof value === 'string' && value.startsWith('/Date(')) {
        result[key] = parseSapDate(value)
      } else if (Array.isArray(value) || typeof value === 'object') {
        result[key] = normalizeObject(value)
      } else {
        result[key] = value
      }
    }
    return result
  }

  return obj
}

/**
 * Normalize the SuccessFactors response
 * @param response Raw SF OData v2 response (with `d` or `d.results`)
 */
export function normalizeSFResponse(response: any): any {
  if (!response) return null

  // Handle "d.results" or "d"
  const data = response.d ? (response.d.results ? response.d.results : response.d) : response

  return normalizeObject(data)
}
