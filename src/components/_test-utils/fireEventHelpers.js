import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const fireEventHelpers = {
  fireClick: el => fireEvent.click(el),
  fireChange: (input, value) => fireEvent.change(input, {target: { value }}),
  fireType: (input, value) => userEvent.type(input, value),
  fireKeyDownEnter: input => fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 }),
  fireKeyDownDelete: input => fireEvent.keyDown(input, { key: 'Delete', keyCode: 46 })
};

export default fireEventHelpers
