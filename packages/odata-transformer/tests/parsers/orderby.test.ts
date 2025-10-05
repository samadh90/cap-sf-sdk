import { parseOrderBy } from '../../src/parsers/orderby'

describe('parseOrderBy', () => {
  it('formats single order by correctly', () => {
    const orderBy = [{ ref: ['startDate'], sort: 'DESC' }]
    expect(parseOrderBy(orderBy as any)).toBe('startDate desc')
  })

  it('joins multiple order by clauses with comma', () => {
    const orderBy = [
      { ref: ['userNav', 'id'], sort: 'ASC' },
      { ref: ['startDate'], sort: 'DESC' },
    ]
    expect(parseOrderBy(orderBy as any)).toBe('userNav/id asc,startDate desc')
  })
})
