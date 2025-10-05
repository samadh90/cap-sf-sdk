import { normalizeSFResponse } from '../src/normalizeSFResponse'

describe('normalizeSFResponse', () => {
  it('should flatten d.results and remove __metadata', () => {
    const raw = {
      d: {
        results: [
          {
            __metadata: { uri: 'x' },
            externalCode: '001',
            startDate: '/Date(1715817600000)/',
            companyNav: { __metadata: {}, name: 'VUB' },
          },
        ],
      },
    }

    const result = normalizeSFResponse(raw)
    expect(result).toEqual([
      { externalCode: '001', startDate: new Date(1715817600000), companyNav: { name: 'VUB' } },
    ])
  })

  it('should parse a single d object', () => {
    const raw = { d: { externalCode: '002', startDate: '/Date(1715817600000)/' } }
    const result = normalizeSFResponse(raw)
    expect(result).toEqual({ externalCode: '002', startDate: new Date(1715817600000) })
  })

  it('should return null on null input', () => {
    expect(normalizeSFResponse(null)).toBeNull()
  })
})
