import {
  CL_SHOW_POPUP,
  S_BLOCK,
  S_NONE,
  crShowHide
} from '../styleFn';

describe('crShowHide', () => {
  const fn = crShowHide;

  test('should return style tuple showHide with className and style', () => {
    const CL_ITEM = 'item'
    expect(fn(true, CL_ITEM)).toEqual([
      `${CL_ITEM} ${CL_SHOW_POPUP}`,
      S_BLOCK
    ])
    expect(fn(false, CL_ITEM)).toEqual([
      CL_ITEM,
      S_NONE
    ])
  })

  test('should return correct style without className parameter', () => {
    expect(fn(true)).toEqual([
      CL_SHOW_POPUP,
      S_BLOCK
    ])
    expect(fn(false)).toEqual([
      void 0,
      S_NONE
    ])
  })

  test('should use withoutAnimation parameter', ()=>{
    const CL_ITEM = 'item'
    expect(fn(true, CL_ITEM, true)).toEqual([
      CL_ITEM,
      S_BLOCK
    ])
    expect(fn(false, CL_ITEM, true)).toEqual([
      CL_ITEM,
      S_NONE
    ])
  })

  test('should use animationClassName parameter', ()=>{
    const CL_ITEM = 'item'
    , CL_ANIMATION = 'some-animation';
    expect(fn(true, CL_ITEM, false, CL_ANIMATION)).toEqual([
      `${CL_ITEM} ${CL_ANIMATION}`,
      S_BLOCK
    ])
    expect(fn(false, CL_ITEM, false, CL_ANIMATION)).toEqual([
      CL_ITEM,
      S_NONE
    ])
  })
})
