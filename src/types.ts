export interface ODataOptions {
  fromDate?: string
  toDate?: string
  asOfDate?: string
}

export interface CqnSelect {
  columns?: any[]
  where?: any[]
  limit?: { rows?: { val: number }; offset?: { val: number } }
  orderBy?: any[]
  from?: { ref?: string[] }
}
