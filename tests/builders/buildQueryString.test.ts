import { buildQueryString } from '../../src/builders/buildQueryString'

describe('buildQueryString', () => {
  it('encodes keys (except $ ones) and preserves allowed OData punctuation', () => {
    const params = {
      $select: 'a,b/c d',
      filter: "name eq 'A B'",
      plain: 'x=y/z, t',
    } as Record<string, string>
    const qs = buildQueryString(params)
    // $ keys untouched
    expect(qs).toContain('$select=a,b/c d')
    // normal keys encoded
    expect(qs).toContain("filter=name eq 'A B'")
    expect(qs).toContain('plain=x=y/z, t')
  })

  it('skips undefined/null values', () => {
    const qs = buildQueryString({ a: '1', b: undefined as any, c: null as any })
    expect(qs).toBe('a=1')
  })
})
