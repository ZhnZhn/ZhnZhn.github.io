import React, { Component } from 'react';

import withThemeRef from '../hoc/withThemeRef'

const TH_ID = 'SCROLL_PANE'
const CL = 'with-scroll';

class ScrollPane extends Component {

  _refRootNode = node => this.rootNode = node

  render(){
    const {
            theme,
            style, className,
            children
          } = this.props
        , TS = theme.getStyle(TH_ID)
        , _cl = `${CL} ${TS.CL_SCROLL} ${className || ''}`;
    return (
      <div
        ref={this._refRootNode}
        className={_cl}
        style={style}
      >
         {children}
      </div>
    );
  }

  scrollTop(){
    this.rootNode.scrollTop = 0
  }
}

export default withThemeRef(ScrollPane)
