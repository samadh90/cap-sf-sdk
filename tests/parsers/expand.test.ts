import { parseExpand } from '../../src/parsers/expand'

describe('parseExpand', () => {
  it('expands simple navigation properties', () => {
    const cols = [{ ref: ['companyNav'], expand: ['code', 'name'] }]
    expect(parseExpand(cols as any)).toBe('companyNav($select=code,name)')
  })

  it('supports nested expand navigation', () => {
    const cols = [
      {
        ref: ['userNav'],
        expand: ['id', { ref: ['jobInfoNav'], expand: ['startDate'] }],
      },
    ]
    expect(parseExpand(cols as any)).toBe(
      'userNav($select=id;$expand=jobInfoNav($select=startDate))'
    )
  })

  it('treats { ref: [nav] } with isExpand as simple expand', () => {
    const cols = [{ ref: ['managerNav'], isExpand: true }]
    expect(parseExpand(cols as any)).toBe('managerNav')
  })
})
