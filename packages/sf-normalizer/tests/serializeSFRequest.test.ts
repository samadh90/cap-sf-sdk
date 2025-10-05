import { serializeSFRequest } from '../src/serializers/serializeSFRequest'

describe('serializeSFRequest', () => {
  it('should convert Date objects into /Date(...) strings', () => {
    const input = {
      externalCode: '001',
      startDate: new Date(1715817600000),
      companyNav: { name: 'VUB' },
    }

    const result = serializeSFRequest(input)

    expect(result).toEqual({
      externalCode: '001',
      startDate: '/Date(1715817600000)/',
      companyNav: { name: 'VUB' },
    })
  })

  it('should work recursively in nested structures', () => {
    const input = {
      employee: {
        hireDate: new Date(1715817600000),
        positions: [{ startDate: new Date(1715904000000) }],
      },
    }

    const result = serializeSFRequest(input)
    expect(result.employee.hireDate).toBe('/Date(1715817600000)/')
    expect(result.employee.positions[0].startDate).toBe('/Date(1715904000000)/')
  })

  it('should return null on null input', () => {
    expect(serializeSFRequest(null)).toBeNull()
  })
})
