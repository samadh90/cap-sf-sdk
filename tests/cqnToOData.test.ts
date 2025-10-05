import { cqnToOData } from '../src/index'

describe('cqnToOData', () => {
  it('should transform a minimal CQN query into OData query string', () => {
    const cqn = {
      columns: [{ ref: ['externalCode'] }, { ref: ['startDate'] }],
      where: [
        { ref: ['status'] },
        '=',
        { val: 'A' },
        'and',
        { ref: ['companyNav', 'code'] },
        '=',
        { val: 'VUB' },
      ],
      limit: { rows: { val: 100 } },
      orderBy: [{ ref: ['startDate'], sort: 'desc' }],
    }

    const result = cqnToOData(cqn, {
      fromDate: '2024-01-01',
      toDate: '2024-12-31',
    })

    expect(result).toContain('$format=json')
    expect(result).toContain('$select=externalCode,startDate')
    expect(result).toContain("$filter=status eq 'A' and companyNav/code eq 'VUB'")
    expect(result).toContain('$orderby=startDate desc')
    expect(result).toContain('fromDate=2024-01-01')
    expect(result).toContain('toDate=2024-12-31')
  })

  it('prefers asOfDate over fromDate/toDate', () => {
    const cqn = { columns: [{ ref: ['id'] }] }
    const result = cqnToOData(cqn as any, {
      asOfDate: '2024-06-01',
      fromDate: '2024-01-01',
      toDate: '2024-12-31',
    })
    expect(result).toContain('asOfDate=2024-06-01')
    expect(result).not.toContain('fromDate=')
    expect(result).not.toContain('toDate=')
  })

  it('adds $top and $skip when limit is provided', () => {
    const cqn = { limit: { rows: { val: 10 }, offset: { val: 5 } } }
    const result = cqnToOData(cqn as any)
    expect(result).toContain('$top=10')
    expect(result).toContain('$skip=5')
  })

  it('always includes $format=json', () => {
    const result = cqnToOData({} as any)
    expect(result).toContain('$format=json')
  })
})
