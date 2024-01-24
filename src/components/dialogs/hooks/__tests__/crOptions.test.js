import crOptions from '../crOptions'

const CAPTION_OPTIONS = {
  items: [{ caption: 'Abc', value: 123}]
}
, C_OPTIONS = {
  items: [{ c: 'Abc', v: 123}]
}
, S_OPTIONS  = {
  items: [{ c: 'Abc', v: 123, s: 'Abc'}]
}
, IS_CV_OPTIONS = {
  isCv: true,
  items: [{ c: 'Abc', v: 'Abc' }]
}
, IS_CP_OPTIONS = {
  isCp: true,
  items:[
    {"c":"Title1 A B","v":"AAA"},
    {"c":"Title2 A B","v":"BBB", id: "bbb-token"}
  ]
}
, ITEMS = ["B1/Q1", "B2/Q2"]
, _crTypeOptions = (type) => ({
  type,
  items: ITEMS
})
, IS_T1_OPTIONS = _crTypeOptions('t1')
, IS_T2_OPTIONS = _crTypeOptions('t2')
, IS_T2L_OPTIONS = _crTypeOptions('t2l')
, IS_T3_OPTIONS = _crTypeOptions('t3')
, IS_NBQ_OPTIONS = {
  type: 'nbq',
  items:[{ n: 'Name1', b: 'b1', q:['q1', 'q2'] }]
};

describe('crOptions', () => {
  const fn = crOptions;
  test('should return propCaption undefined for item caption prop name', ()=>{
    expect(fn(CAPTION_OPTIONS, 'items').propCaption).toBe(void 0)
  })
  test('should return propCaption c for item c prop name', ()=>{
    expect(fn(C_OPTIONS, 'items').propCaption).toBe('c')
  })

  test('should add item s value to c', () => {
    expect(fn(S_OPTIONS, 'items').items[0].c).toBe('Abc (Abc)')
  })
  test('should return correct options for isCv case', ()=>{
    expect(fn(IS_CV_OPTIONS, 'items').items[0].c).toBe('Abc (Abc)')
  })
  test('should return correct options for isCp case', ()=>{
    expect(fn(IS_CP_OPTIONS, 'items').items).toEqual([
      {"c":"Title1 A B (AAA)","v":"aaa-title1-a-b"},
      {"c":"Title2 A B (BBB)","v":"bbb-token"}
    ])
  })
  test('should return correct options for type t1 format', ()=>{
    expect(fn(IS_T1_OPTIONS, 'items').items).toEqual([
      {"c":"B1/Q1", v: "B1-Q1"},
      {"c":"B2/Q2", v: "B2-Q2"}
    ])
  })

  test('should return correct options for type t2 format', ()=>{
    expect(fn(IS_T2_OPTIONS, 'items').items).toEqual([
      {"c":"B1/Q1", v: "B1Q1"},
      {"c":"B2/Q2", v: "B2Q2"}
    ])
  })
  test('should return correct options for type t2l format', ()=>{
    expect(fn(IS_T2L_OPTIONS, 'items').items).toEqual([
      {"c":"B1/Q1", v: "b1q1"},
      {"c":"B2/Q2", v: "b2q2"}
    ])
  })
  test('should return correct options for type t3 format', ()=>{
    expect(fn(IS_T3_OPTIONS, 'items').items).toEqual([
      {"c":"B1/Q1", v: "B1_Q1"},
      {"c":"B2/Q2", v: "B2_Q2"}
    ])
  })

  test('should return correct options for type nbq format', ()=>{
    expect(fn(IS_NBQ_OPTIONS, 'items').items).toEqual([
      {"c":"Name1 (b1/q1)", v: "b1/q1"},
      {"c":"Name1 (b1/q2)", v: "b1/q2"}
    ])
  })
})
