import addDialogPropsTo from '../addDialogPropsTo'

import menu from './_menuData'

const { items, result } = menu;

describe('addDialogPropsTo', ()=>{
  test('should currect transform menu items', ()=>{
     addDialogPropsTo(items)

     Object.keys(result).forEach(id => {
       expect(items[id]).toEqual(result[id])
     })
  })
})
