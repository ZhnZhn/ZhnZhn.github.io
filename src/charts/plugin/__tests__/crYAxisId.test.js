import crYAxisId from '../crYAxisId'

const _testResult = (r, expectedArr) => {
  expect(r).toEqual(expectedArr)
};

const _testResultId = r => {
  expect(r[0]).toBe(true)
  expect(r[1].length).toBe(15)
}

describe('crYAxisId', () => {
  const chart = {
    yAxis: [
      {userOptions: {}},
      {userOptions: { id: 'Y1'}},
      {userOptions: { id: 'Y2'}}
    ]
  }
  , fn = crYAxisId;


  test('should return [bool, name] for yIndex=void 0 && not empty name', ()=>{
    const r1 = fn(chart, void 0, 'name1');
    _testResult(r1, [true, 'name1'])

    const r2 = fn(chart, void 0, 'Y1')
    _testResult(r2, [false, 'Y1'])

    const r3 = fn(chart, void 0, 'Y3')
    _testResult(r3, [true, 'Y3'])
  })

  test('should return [true, id] for yIndex=void 0 && empty name', ()=>{
    const r1 = fn(chart, void 0);
    _testResultId(r1)

    const r2 = fn(chart, void 0, '');
    _testResultId(r2)

    const r3 = fn(chart, void 0, null);
    _testResultId(r3)

    expect(r1[1]).not.toBe(r2[1])
    expect(r2[1]).not.toBe(r3[1])
  })

  test('should return [false, void] 0 for yIndex=0', ()=>{
    const r1 = fn(chart, 0)
    _testResult(r1, [false, void 0])
  })

  test('should return [false, yAxisId] for yIndex number', ()=>{
    const r1 = fn(chart, 1)
    _testResult(r1, [false, 'Y1'])

    const r2 = fn(chart, 2)
    _testResult(r2, [false, 'Y2'])
  })

  test('should return [true, id] for yIndex number without yAxis', ()=>{
    const r1 = fn(chart, 3)
    _testResultId(r1)

    const r2 = fn(chart, 4)
    _testResultId(r2)

    expect(r1[1]).not.toBe(r2[1])
  })

  test('should return [true, id] for yIndex = !number && !void 0', ()=>{
    const r1 = fn(chart, '0');
    _testResultId(r1)

    const r2 = fn(chart, null);
    _testResultId(r2)

    const r3 = fn(chart, true);
    _testResultId(r3)

    expect(r1[1]).not.toBe(r2[1])
    expect(r2[1]).not.toBe(r3[1])
  })

  test('should return [true, id] for empty chart', ()=>{
    const r1 = fn({}, 1);
    _testResultId(r1)
  })

})
