import HotKeysProvider from './hotkeys/HotKeysProvider';
import ThemeProvider from './styles/ThemeProvider';

import { CAT_CHANGE_THEME } from '../flux/actions/ComponentActions';
import { HAS_TOUCH_EVENTS } from './has';

const ENABLE_HOT_KEYS = !HAS_TOUCH_EVENTS;

const AppProvider = ({
  children
}) => (
  <HotKeysProvider is={ENABLE_HOT_KEYS}>
    <ThemeProvider actionChangeTheme={CAT_CHANGE_THEME}>
      {children}
    </ThemeProvider>
  </HotKeysProvider>
);

export default AppProvider
