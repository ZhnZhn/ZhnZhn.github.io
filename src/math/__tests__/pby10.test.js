import pby10 from '../pby10'

describe('pby10',()=>{
  test('should multiple categories values by power of 10', ()=>{
    const [result0, byNumber0] = pby10([{y: 1.23},{y: 2.34}], 0);
    expect(result0).toEqual([{y: 1.23}, {y: 2.34}])
    expect(byNumber0).toBe(1)

    const [result_0, byNumber_0] = pby10([{y: 1.23},{y: 2.34}], -0);
    expect(result_0).toEqual([{y: 1.23}, {y: 2.34}])
    expect(byNumber_0).toBe(1)

    const [result1, byNumber1] = pby10([{y: 1.23},{y: 2.34}], 1);
    expect(result1).toEqual([{y: 12.3}, {y: 23.4}])
    expect(byNumber1).toBe(10)

    const [result2, byNumber2] = pby10([{y: 1.23},{y: 2.34}], 2);
    expect(result2).toEqual([{y: 123}, {y: 234}])
    expect(byNumber2).toBe(100)

    const [result3, byNumber3] = pby10([{y: 1.23},{y: 2.34}], 3);
    expect(result3).toEqual([{y: 1230}, {y: 2340}])
    expect(byNumber3).toBe(1000)

    const [result_3, byNumber_3] = pby10([{y: 123},{y: 234}], -3);
    expect(result_3).toEqual([{y: 0.123}, {y: 0.234}])
    expect(byNumber_3).toBe(0.001)              
  })
})
