import { fireEvent } from '@testing-library/react';

const fireEventHelpers = {
  fireClick: el => fireEvent.click(el),
  fireChange: (input, value) => fireEvent.change(input, {target: { value }}),
  fireKeyDownEnter: input => fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 }),
  fireKeyDownDelete: input => fireEvent.keyDown(input, { key: 'Delete', keyCode: 46 })
};

export default fireEventHelpers
