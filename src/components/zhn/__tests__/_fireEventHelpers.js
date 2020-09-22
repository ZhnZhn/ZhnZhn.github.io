import { fireEvent } from '@testing-library/react'

describe('_fireEventHelpers', ()=> {
  test('', () => expect('').toBe(''))
})

const fireEventHelpers = {
  fireChange: (input, value) => fireEvent.change(input, {target: { value }}),
  fireKeyDownEnter: input => fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 }),
  fireKeyDownDelete: input => fireEvent.keyDown(input, { key: 'Delete', keyCode: 46 })
}

export default fireEventHelpers
