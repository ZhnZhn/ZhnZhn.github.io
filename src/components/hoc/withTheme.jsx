import React from 'react'
import ThemeContext from './ThemeContext'

const withTheme = Wrapper => props => (
  <ThemeContext.Consumer>
    { theme => <Wrapper {...props} theme={theme} /> }
  </ThemeContext.Consumer>
);

export default withTheme
