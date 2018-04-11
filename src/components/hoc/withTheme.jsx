import React, { Component } from 'react'
import ThemeContext from './ThemeContext'

const withTheme = (Wrapper) => class extends Component {
  render(){
    return (
      <ThemeContext.Consumer>
        { theme => <Wrapper {...this.props} theme={theme} />}
      </ThemeContext.Consumer>
    );
  }
}

export default withTheme
