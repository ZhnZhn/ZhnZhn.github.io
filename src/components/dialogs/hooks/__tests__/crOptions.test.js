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
, VC_OPTIONS = {
  type: "vc",
  "items": [
    "Item1",
    {"c": "Item2", "v": "Item2a" }
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
}
, IS_FILTER_OPTIONS = {
  filters: {
    a: ["A"],
    b: ["B"]
  },
  items: [
    {c: "C1", v: "V1", not: "a"},
    {c: "C2", v: "V2", not: "b"},
    {c: "C3", v: "V3", not: "c"},
    {c: "C4", v: "V4"},
    {c: "C5", v: "V5", not:["A","B"]},
    {c: "C6", v: "V6", not: "a", nots: ["C"]},
  ]
}
, _getItems = tuple => tuple[0]
, _getPropCaption = tuple => tuple[1];

describe('crOptions', () => {
  const fn = crOptions;
  test('should return propCaption undefined for item caption prop name', ()=>{
    expect(_getPropCaption(fn(CAPTION_OPTIONS))).toBe(void 0)
  })
  test('should return propCaption c for item c prop name', ()=>{
    expect(_getPropCaption(fn(C_OPTIONS))).toBe('c')
  })

  test('should add item s value to c', () => {
    expect(_getItems(fn(S_OPTIONS))[0].c).toBe('Abc (Abc)')
  })
  test('should return correct options for isCv case', ()=>{
    expect(_getItems(fn(IS_CV_OPTIONS))[0].c).toBe('Abc (Abc)')
  })
  test('should return correct options for isCp case', ()=>{
    expect(_getItems(fn(IS_CP_OPTIONS))).toEqual([
      {"c":"Title1 A B (AAA)","v":"aaa-title1-a-b"},
      {"c":"Title2 A B (BBB)","v":"bbb-token"}
    ])
  })

  test('should return correct options for type vc format', ()=>{
    expect(_getItems(fn(VC_OPTIONS))).toEqual([
      {"c":"Item1","v":"Item1"},
      {"c":"Item2","v":"Item2a"}
    ])
  })

  test('should return correct options for type t1 format', ()=>{
    expect(_getItems(fn(IS_T1_OPTIONS))).toEqual([
      {"c":"B1/Q1", v: "B1-Q1"},
      {"c":"B2/Q2", v: "B2-Q2"}
    ])
  })

  test('should return correct options for type t2 format', ()=>{
    expect(_getItems(fn(IS_T2_OPTIONS))).toEqual([
      {"c":"B1/Q1", v: "B1Q1"},
      {"c":"B2/Q2", v: "B2Q2"}
    ])
  })
  test('should return correct options for type t2l format', ()=>{
    expect(_getItems(fn(IS_T2L_OPTIONS))).toEqual([
      {"c":"B1/Q1", v: "b1q1"},
      {"c":"B2/Q2", v: "b2q2"}
    ])
  })
  test('should return correct options for type t3 format', ()=>{
    expect(_getItems(fn(IS_T3_OPTIONS))).toEqual([
      {"c":"B1/Q1", v: "B1_Q1"},
      {"c":"B2/Q2", v: "B2_Q2"}
    ])
  })

  test('should return correct options for type nbq format', ()=>{
    expect(_getItems(fn(IS_NBQ_OPTIONS))).toEqual([
      {"c":"Name1 (b1/q1)", v: "b1/q1"},
      {"c":"Name1 (b1/q2)", v: "b1/q2"}
    ])
  })

  test('should return correct options for with filters case', ()=>{
    expect(_getItems(fn(IS_FILTER_OPTIONS))).toEqual([
        {c: "C1", v: "V1", not: ["A"]},
        {c: "C2", v: "V2", not: ["B"]},
        {c: "C3", v: "V3"},
        {c: "C4", v: "V4"},
        {c: "C5", v: "V5", not:["A","B"]},
        {c: "C6", v: "V6", not:["A","C"]}
    ])
  })
})
