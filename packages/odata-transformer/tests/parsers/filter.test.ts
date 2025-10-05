import { parseFilter } from '../../src/parsers/filter'

describe('parseFilter', () => {
  it('maps comparison operators and builds simple expression', () => {
    const where = [{ ref: ['status'] }, '=', { val: 'A' }]
    expect(parseFilter(where as any)).toBe("status eq 'A'")
  })

  it('supports logical connectors and nested refs', () => {
    const where = [
      { ref: ['status'] },
      '!=',
      { val: 'I' },
      'and',
      { ref: ['companyNav', 'code'] },
      '=',
      { val: 'Company' },
    ]
    expect(parseFilter(where as any)).toBe("status ne 'I' and companyNav/code eq 'Company'")
  })

  it('passes through unknown string tokens as-is', () => {
    const where = [{ ref: ['a'] }, 'like', { val: '%x%' }]
    expect(parseFilter(where as any)).toBe("a like '%x%'")
  })
})
