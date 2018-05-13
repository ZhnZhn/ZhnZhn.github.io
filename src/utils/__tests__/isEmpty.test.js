import isEmpty from '../isEmpty'

describe('isEmpty', ()=>{
  test('for {} should return true', ()=>{
    expect(isEmpty({})).toBe(true)
  })
  test('for obj with prop should return false', ()=>{
    expect(isEmpty({a: 'a'})).toBe(false)
  })

  test('for null should return true', ()=>{
    expect(isEmpty(null)).toBe(true)
  })
  test('for undefined should return true', ()=>{
    expect(isEmpty()).toBe(true)
  })
})
