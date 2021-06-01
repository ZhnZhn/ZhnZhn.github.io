import { createRef } from 'react'
import { render, screen, act } from '@testing-library/react';

import wrapByUiThemeProvider from './wrapByUiThemeProvider';
import fireEventHelpers from './fireEventHelpers'

const utils = {
  createRef,
  render, screen, act,
  wrapByUiThemeProvider,
  ...fireEventHelpers
};

export default utils
