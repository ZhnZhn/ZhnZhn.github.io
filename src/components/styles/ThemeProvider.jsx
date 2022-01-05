import { useState } from 'react';
import useListen from '../hooks/useListen';

import ThemeContext from '../hoc/ThemeContext';
import initialTheme from './uiTheme';

const ThemeProvider = ({
  store,
  actionChangeTheme,
  children
}) => {
  const [theme, setTheme] = useState(initialTheme);

  useListen(store, (actionType, themeName) => {
    if (actionType === actionChangeTheme) {
      theme.setThemeName(themeName)
      setTheme({...theme})
    }
  })

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider
