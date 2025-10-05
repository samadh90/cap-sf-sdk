/**
 * Object utilities for SuccessFactors data processing
 * Handles recursive normalization and serialization of nested objects and arrays
 */

import { parseSapDate, toSapDate, isSapDateString } from './dateUtils'
import type { AnyObject } from '../types'

/**
 * Recursively normalize SuccessFactors response objects
 * - Removes __metadata properties
 * - Converts SAP date strings to Date objects
 * - Processes nested objects and arrays
 *
 * @param obj Object or array to normalize
 * @returns Normalized object with cleaned data
 */
export function normalizeObject(obj: AnyObject): AnyObject {
  if (Array.isArray(obj)) {
    return obj.map((item) => normalizeObject(item))
  }

  if (obj && typeof obj === 'object') {
    const result: AnyObject = {}
    for (const [key, value] of Object.entries(obj)) {
      // Skip SAP metadata properties
      if (key === '__metadata') continue

      if (typeof value === 'string' && isSapDateString(value)) {
        result[key] = parseSapDate(value)
      } else if (Array.isArray(value) || (value && typeof value === 'object')) {
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
 * Recursively serialize objects for SuccessFactors requests
 * - Converts Date objects to SAP date strings
 * - Processes nested objects and arrays
 * - Preserves all other data types
 *
 * @param obj Object or array to serialize
 * @returns Serialized object ready for SF API
 */
export function serializeObject(obj: AnyObject): AnyObject {
  if (Array.isArray(obj)) {
    return obj.map((item) => serializeObject(item))
  }

  if (obj && typeof obj === 'object') {
    const result: AnyObject = {}
    for (const [key, value] of Object.entries(obj)) {
      if (value instanceof Date) {
        result[key] = toSapDate(value)
      } else if (Array.isArray(value) || (value && typeof value === 'object')) {
        result[key] = serializeObject(value)
      } else {
        result[key] = value
      }
    }
    return result
  }

  return obj
}

/**
 * Extract data from SuccessFactors response wrapper
 * Handles both single objects (d) and collections (d.results)
 *
 * @param response Raw SF response with d/d.results wrapper
 * @returns Unwrapped data ready for normalization
 */
export function extractSFData(response: any): any {
  if (!response) return null

  // Handle "d.results" or "d"
  return response.d ? (response.d.results ? response.d.results : response.d) : response
}
