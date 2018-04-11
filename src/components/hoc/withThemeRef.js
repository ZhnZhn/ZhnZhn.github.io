import React from 'react'
import ThemeContext from './ThemeContext'

const withThemeRef = (Wrapper) => React.forwardRef((props, ref) =>
    (
      <ThemeContext.Consumer>
        { theme => (
           <Wrapper {...props} theme={theme} ref={ref} />
         )}
      </ThemeContext.Consumer>
    )
  )

export default withThemeRef
