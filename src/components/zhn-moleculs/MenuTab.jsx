import React, { Component } from 'react';

import withTheme from '../hoc/withTheme'

const TH_ID = 'ELEMENT';

const CL = {
  SHOW: 'button-tab button-tab--show not-selected',
  NOT_SHOW: 'button-tab not-selected',
  ARROW: 'arrow-down'
};

class MenuTab extends Component {

  componentDidMount() {
     const { onReg } = this.props;
     if (typeof onReg === 'function'){
       onReg(this.btNode)
     }
  }

  _refBtNode = node => this.btNode = node

  render() {
    const {
            theme,
            isShow, caption, style,
            children,
            onClick
          } = this.props
        , TS = theme.getStyle(TH_ID)
        , _rootClass = isShow ? CL.SHOW : CL.NOT_SHOW;
    return (
      <div
        className={_rootClass}
        style={{ ...style, ...TS.BG }}
      >
         <div
           ref = {this._refBtNode}
           onClick={onClick}
         >
           <span>{caption}</span>
           <span className={CL.ARROW} />
         </div>
         {children}
      </div>
    );
  }
}

export default withTheme(MenuTab)
