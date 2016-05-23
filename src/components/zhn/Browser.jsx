import React from 'react';

import ContainerStyles from '../styles/ContainerStyles';

const styles = ContainerStyles;

const Browser = React.createClass({
  render(){
    const {isShow, style, children} = this.props
        , _styleOpen = isShow ? {display: 'block'} : {display: 'none'}
        , _classOpen = isShow ? "show-popup" : null;
    return (
       <div
          className={_classOpen}
          style={Object.assign({}, styles.browserRootDiv, style, _styleOpen)}
        >
          {children}
       </div>
    )
  }
});

export default Browser
