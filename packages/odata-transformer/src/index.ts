import { buildQueryString } from './builders/buildQueryString'
import { parseSelect } from './parsers/select'
import { parseFilter } from './parsers/filter'
import { parseOrderBy } from './parsers/orderby'
import { parseExpand } from './parsers/expand'
import type { CqnSelect, ODataOptions } from './types'
import { parseLimit } from './parsers/limit'

/**
 * Converts a CAP CQN SELECT object into an OData query string.
 *
 * Supported parameters:
 * - $select (from columns)
 * - $filter (from where)
 * - $orderby (from orderBy)
 * - $top / $skip (from limit)
 * - SuccessFactors dates: fromDate, toDate or asOfDate (exclusive)
 *
 * Rules:
 * - If `asOfDate` is provided, it is exclusive and `fromDate`/`toDate` are ignored.
 * - Otherwise, `fromDate` and/or `toDate` can be provided independently.
 *
 * @param select CAP CQN SELECT subset
 * @param opts Optional OData and SuccessFactors options
 * @returns Query string with parameters joined by '&'
 */
export function cqnToOData(select: CqnSelect, opts?: ODataOptions): string {
  const params: Record<string, string> = {}

  if (select.columns) {
    const selectStr = parseSelect(select.columns)
    if (selectStr) params['$select'] = selectStr

    // $expand from columns entries carrying expand definitions
    const hasExpand = select.columns.some((c: any) => c?.expand || c?.isExpand)
    if (hasExpand) {
      const expandStr = parseExpand(select.columns)
      if (expandStr) params['$expand'] = expandStr
    }
  }
  if (select.where) params['$filter'] = parseFilter(select.where)
  if (select.orderBy) params['$orderby'] = parseOrderBy(select.orderBy)
  const limitParams = parseLimit(select.limit as any)
  Object.assign(params, limitParams)
  params['$format'] = 'json'

  // SuccessFactors specific
  // asOfDate is exclusive: if present, don't include fromDate/toDate
  if (opts?.asOfDate) {
    params['asOfDate'] = opts.asOfDate
  } else if (opts?.fromDate || opts?.toDate) {
    if (opts.fromDate) params['fromDate'] = opts.fromDate
    if (opts.toDate) params['toDate'] = opts.toDate
  }

  return buildQueryString(params)
}

// Re-export commonly used types as part of the public API
export type { CqnSelect, ODataOptions } from './types'

/**
 * Alias aligned with cap-sf-sdk naming convention.
 * Provided for discoverability alongside cqnToOData.
 */
export const transformCqnToOData = cqnToOData

// --- IGNORE ---
