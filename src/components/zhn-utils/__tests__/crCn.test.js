import crCn from '../crCn'

describe('crCn', ()=>{
  test('should create className for two arguments', ()=>{
    expect(crCn(void 0, void 0)).toBe(undefined)
    expect(crCn('a', void 0)).toBe('a')
    expect(crCn(void 0, 'b')).toBe('b')
    expect(crCn('a', 'b')).toBe('a b')

    expect(crCn([true, 'a'], 'b')).toBe('a b')
    expect(crCn([false, 'a'], 'b')).toBe('b')
    expect(crCn([true, 'a'], void 0)).toBe('a')
    expect(crCn([false, 'a'], void 0)).toBe(undefined)

    expect(crCn('a', [true, 'b'])).toBe('a b')
    expect(crCn('a', [false, 'b'])).toBe('a')
    expect(crCn(void 0, [true, 'b'])).toBe('b')
    expect(crCn(void 0, [false, 'b'])).toBe(undefined)

    expect(crCn([true, 'a'], [true, 'b'])).toBe('a b')
    expect(crCn([false, 'a'], [true, 'b'])).toBe('b')
    expect(crCn([false, 'a'], [false, 'b'])).toBe(undefined)
    expect(crCn([true, 'a'], [false, 'b'])).toBe('a')

    expect(crCn([true, void 0], [true, void 0])).toBe(undefined)
    expect(crCn([true, 'a'], [true, void 0])).toBe('a')
    expect(crCn([false, 'a'], [true, void 0])).toBe(undefined)
    expect(crCn([true, void 0], [true, 'b'])).toBe('b')
    expect(crCn([true, void 0], [false, 'b'])).toBe(undefined)
  })
})
