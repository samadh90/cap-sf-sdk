import { parseLimit } from '../../src/parsers/limit'

describe('parseLimit', () => {
  it('returns empty when limit undefined', () => {
    expect(parseLimit(undefined as any)).toEqual({})
  })

  it('maps rows to $top', () => {
    expect(parseLimit({ rows: { val: 25 } } as any)).toEqual({ $top: '25' })
  })

  it('maps offset to $skip', () => {
    expect(parseLimit({ offset: { val: 5 } } as any)).toEqual({ $skip: '5' })
  })

  it('maps both rows and offset', () => {
    expect(parseLimit({ rows: { val: 10 }, offset: { val: 3 } } as any)).toEqual({
      $top: '10',
      $skip: '3',
    })
  })
})
