import { useContext } from 'react'

import ThemeContext  from '../hoc/ThemeContext'

const useTheme = themeId => useContext(ThemeContext)
 .getStyle(themeId);

export default useTheme
