import { forwardRef } from '../uiApi';
import ThemeContext from './ThemeContext';

const withThemeRef = (Wrapper) => forwardRef((props, ref) => (
  <ThemeContext.Consumer>
    { theme => <Wrapper {...props} theme={theme} ref={ref} /> }
  </ThemeContext.Consumer>
));

export default withThemeRef
