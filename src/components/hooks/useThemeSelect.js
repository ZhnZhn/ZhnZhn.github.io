import {
  useContext,
  useCallback
} from '../uiApi';

import ThemeContext  from '../hoc/ThemeContext';

const useThemeSelect = (onChangeTheme) => {
  const theme = useContext(ThemeContext);
  return useCallback(item => {
     const _themeName = (item || {}).value;
     if (_themeName && theme.getThemeName() !== _themeName) {
       theme.setThemeName(_themeName)
       onChangeTheme(_themeName)
     }
  }, [theme, onChangeTheme]);
};

export default useThemeSelect
