import React, { PropTypes } from 'react';

import ContainerStyles from '../styles/ContainerStyles';

const styles = ContainerStyles;
const SHOW_POPUP = 'show-popup';
const S = {
  BLOCK : {
    display : 'block'
  },
  NONE : {
    display : 'none'
  }
}

const Browser = ({ isShow, style, children }) => {
  const _styleOpen = isShow ? S.BLOCK : S.NONE
      , _classOpen = isShow ? SHOW_POPUP : null;
  return (
     <div
        className={_classOpen}
        style={Object.assign({}, styles.browserRootDiv, style, _styleOpen)}
      >
        {children}
     </div>
  );
}
Browser.propTypes = {
  isShow: PropTypes.bool,
  style: PropTypes.object
}

export default Browser
