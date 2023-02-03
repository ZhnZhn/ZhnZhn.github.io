import { createRef } from 'react';
import {
  render,
  screen,
  act,
  waitFor,
  fireEvent
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import wrapByUiThemeProvider from './wrapByUiThemeProvider';

const utils = {
  createRef,
  render,
  screen,
  act,
  waitFor,
  wrapByUiThemeProvider,

  fireClick: el => fireEvent.click(el),
  fireKeyDownEnter: el => fireEvent.keyDown(el, { key: 'Enter', keyCode: 13 }),

  KEY_DELETE: '{Delete}',
  KEY_ENTER: '{Enter}',
  setupUserEvent: (jsx) => ({
    user: userEvent.setup(),
    ...render(jsx)
  }),
  getFnParameter: (
    onFn,
    indexOfCalls=0,
    indexOfParameters=0
  ) => onFn
    .mock
    .calls[indexOfCalls][indexOfParameters]
};

export default utils
