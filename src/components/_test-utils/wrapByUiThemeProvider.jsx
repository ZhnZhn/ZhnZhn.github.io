/**
 * @jest-environment jsdom
 */
"use strict";
import initialTheme from '../styles/uiTheme';
import ThemeContext from '../hoc/ThemeContext';

const wrapByUiThemeProvider = ui => (
  <ThemeContext.Provider value={initialTheme}>
    {ui}
  </ThemeContext.Provider>
);

export default wrapByUiThemeProvider
