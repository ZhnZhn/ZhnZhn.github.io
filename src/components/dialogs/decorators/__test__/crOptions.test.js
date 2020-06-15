import crOptions from '../crOptions'

const CAPTION_OPTIONS = {
  items: [{ caption: 'Abc', value: 123}]
}, C_OPTIONS = {
  items: [{ c: 'Abc', v: 123}]
}, S_OPTIONS  = {
  items: [{ c: 'Abc', v: 123, s: 'Abc'}]
}, IS_CV_OPTIONS = {
  isCv: true,
  items: [{ c: 'Abc', v: 'Abc' }]
}


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
})
