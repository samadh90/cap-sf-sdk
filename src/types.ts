/**
 * Options controlling OData query generation. SuccessFactors date parameters are supported.
 * Note: `asOfDate` is exclusive. If present, `fromDate` and `toDate` are ignored.
 */
export interface ODataOptions {
  /** Include records effective from this date (YYYY-MM-DD). */
  fromDate?: string
  /** Include records effective up to this date (YYYY-MM-DD). */
  toDate?: string
  /** Snapshot as of this exact date (YYYY-MM-DD). Exclusive with fromDate/toDate. */
  asOfDate?: string
}

/** CAP CQN SELECT subset used by this transformer */
export interface CqnSelect {
  /** Array of column descriptors, each with a `ref` path like ['entity','field'] */
  columns?: any[]
  /** Where clause tokens following CAP CQN tokenization */
  where?: any[]
  /** Limit options mapping to $top/$skip */
  limit?: { rows?: { val: number }; offset?: { val: number } }
  /** Order by descriptors mapping to $orderby */
  orderBy?: any[]
  /** From clause minimal structure */
  from?: { ref?: string[] }
}
