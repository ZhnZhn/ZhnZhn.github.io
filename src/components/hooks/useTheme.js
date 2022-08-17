import { useContext } from '../uiApi';

import ThemeContext  from '../hoc/ThemeContext';

const useTheme = themeId => useContext(ThemeContext)
 .getStyle(themeId);

export default useTheme
