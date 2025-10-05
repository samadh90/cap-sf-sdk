import { parseSelect } from '../../src/parsers/select'

describe('parseSelect', () => {
  it('joins simple refs by comma', () => {
    const columns = [{ ref: ['externalCode'] }, { ref: ['startDate'] }]
    expect(parseSelect(columns)).toBe('externalCode,startDate')
  })

  it('supports nested refs with / and filters out non-ref entries', () => {
    const columns = [
      { ref: ['userNav', 'id'] },
      { foo: 'bar' },
      { ref: ['jobInfoNav', 'startDate'] },
    ] as any[]
    expect(parseSelect(columns)).toBe('userNav/id,jobInfoNav/startDate')
  })

  it('returns empty string for empty list', () => {
    expect(parseSelect([] as any[])).toBe('')
  })
})
