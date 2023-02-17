import ThemeProvider from './styles/ThemeProvider';
import { CAT_CHANGE_THEME } from '../flux/actions/ComponentActions';

const AppProvider = ({
  children
}) => (
  <ThemeProvider actionChangeTheme={CAT_CHANGE_THEME}>
    {children}
  </ThemeProvider>
);

export default AppProvider
