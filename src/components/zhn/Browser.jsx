import React, { Component } from 'react';
//import PropTypes from "prop-types";

import withTheme from '../hoc/withTheme'

const TH_ID = 'BROWSER';

const CL = {
  BROWSER: 'browser-container',
  SHOW: 'show-popup'
};
const S = {
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};

class Browser extends Component {
  /*
  static propTypes = {
    theme: PropTypes.object
    isShow: PropTypes.bool,
    style: PropTypes.object
  }
  */
  render(){
    const {
           theme,
           isShow, style,
           children
          } = this.props
        , TS = theme.getStyle(TH_ID)
        , _styleOpen = isShow ? S.BLOCK : S.NONE
        , _clOpen = isShow ? CL.SHOW : ''
        , _clRoot = `${CL.BROWSER} ${_clOpen}`;
    return (
      <div
         className={_clRoot}
         style={{
           ...style, ..._styleOpen,
           ...TS.ROOT
         }}
       >
         {children}
      </div>
    );
  }
}

export default withTheme(Browser)
