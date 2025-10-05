import { buildQueryString } from './builders/buildQueryString'
import { parseSelect } from './parsers/select'
import { parseFilter } from './parsers/filter'
import { parseOrderBy } from './parsers/orderby'
import type { CqnSelect, ODataOptions } from './types'

/**
 * Converts a CAP CQN SELECT object into an OData query string.
 * Supports standard OData params ($select, $filter, $orderby, $top)
 * and SuccessFactors-specific params (fromDate, toDate, asOfDate).
 */
export function cqnToOData(select: CqnSelect, opts?: ODataOptions): string {
  const params: Record<string, string> = {}

  if (select.columns) params['$select'] = parseSelect(select.columns)
  if (select.where) params['$filter'] = parseFilter(select.where)
  if (select.orderBy) params['$orderby'] = parseOrderBy(select.orderBy)
  if (select.limit?.rows) params['$top'] = String(select.limit.rows.val)
  if (select.limit?.offset) params['$skip'] = String(select.limit.offset.val)
  params['$format'] = 'json'

  // SuccessFactors specific
  if (opts?.asOfDate) params['asOfDate'] = opts.asOfDate
  else if (opts?.fromDate && opts?.toDate) {
    params['fromDate'] = opts.fromDate
    params['toDate'] = opts.toDate
  }

  return buildQueryString(params)
}
