/**
 * Shared types for SuccessFactors normalizer
 */

/**
 * Generic object type for flexible data structures
 */
export type AnyObject = Record<string, any>

/**
 * SuccessFactors OData v2 response wrapper structure
 */
export interface SFResponse<T = any> {
  d:
    | {
        results?: T[]
      }
    | T
}

/**
 * SuccessFactors single entity response
 */
export interface SFEntityResponse<T = any> {
  d: T
}

/**
 * SuccessFactors collection response
 */
export interface SFCollectionResponse<T = any> {
  d: {
    results: T[]
  }
}
