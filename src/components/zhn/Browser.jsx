import React from 'react';

import ContainerStyles from '../styles/ContainerStyles';

const styles = ContainerStyles;

const Browser = React.createClass({
  render(){
    const {isShow, children} = this.props
        , styleOpen = isShow ? {display: 'block'} : {display: 'none'}
        , classOpen = isShow ? "show-popup" : null;
    return (
       <div className={classOpen} style={Object.assign({}, styles.browserRootDiv, styleOpen)}>
          {children}
       </div>
    )
  }
});

export default Browser
