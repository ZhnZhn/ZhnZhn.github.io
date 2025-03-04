import addDialogPropsTo from '../addDialogPropsTo'

import {
  items,
  result,

  items_idTuple,
  df_idTuple,
  result_idTuple,

  items_dfAddProps,
  df_dfAddProps,
  result_dfAddProps
} from './_menuData'

const _checkItems = (items, result) => {
  Object.keys(result).forEach(id => {
    expect(items[id]).toEqual(result[id])
  })
}

describe('addDialogPropsTo', ()=>{
  const fn = addDialogPropsTo;
  test('should correct transform menu items', ()=>{
     fn(items)
     _checkItems(items, result)
  })
  test('should correct transform idTuple menu items case', ()=>{
     fn(items_idTuple, df_idTuple)
     _checkItems(items_idTuple, result_idTuple)
  })
  test('should correct transform dfAddProps menu items case', ()=>{
    fn(items_dfAddProps, df_dfAddProps)
    _checkItems(items_dfAddProps, result_dfAddProps)
  })
})
