import React, { Component } from 'react';

import C from '../styles/Color'

import isKeyEnter from './isKeyEnter'

const CL = {
  ROOT: 'zhn-oc',
  SHOW_POPUP: 'show-popup',
  NOT_SELECTED: 'not-selected'
};

const DF = {
  //OPEN_COLOR: C.YELLOW,
  OPEN_COLOR: C.TITLE,
  CLOSE_COLOR: C.BLANK
};

const S = {
  ROOT_DIV: {
    lineHeight: 2
  },
  ROOT_SVG: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    marginLeft: '8px'
  },
  CAPTION: {
    //color: C.SIREN,
    color: C.TITLE,
    paddingLeft: '4px',
    verticalAlign: 'top',
    //color: 'rgba(164, 135, 212, 1)',
    fontFamily: 'Roboto, Arial Unicode MS, Arial, sans-serif',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer'
  },

  INLINE_BLOCK: {
    display: 'inline-block'
  },
  BLOCK: {
    display: 'block'
  },
  NONE: {
    display: 'none'
  }
};

const PATH_OPEN = "M 2,14 L 14,14 14,2 2,14";
const PATH_CLOSE = "M 2,2 L 14,8 2,14 2,2";

class OpenClose extends Component {
   static defaultProps = {
     openColor: DF.OPEN_COLOR,
     closeColor: DF.CLOSE_COLOR
   }
   constructor(props){
     super();
     const { isClose } = props;
     this.state = {
       isOpen: isClose ? false : true
     }
   }

  _handleClick = () => {
    this.setState(prev => ({ isOpen: !prev.isOpen }));
  }

  _handleKeyDown = (event) => {
    if (isKeyEnter(event)){
      this._handleClick()
    }
  }

  render(){
    const {
            rootStyle,
            caption, captionStyle,
            openColor, closeColor,
            CompAfter, childStyle, children
          } = this.props
        , { isOpen } = this.state;
    let _pathV, _fillV,
       _rootChildStyle, _rootChildCl;
    if (isOpen){
      _pathV = PATH_OPEN
      _fillV = openColor
      _rootChildStyle = S.BLOCK
      _rootChildCl = CL.SHOW_POPUP
    } else {
      _pathV = PATH_CLOSE
      _fillV = closeColor
      _rootChildStyle = S.NONE
      _rootChildCl = null;
    }

    return (
      <div style={{...S.ROOT_DIV, ...rootStyle}}>
        <div className={CL.NOT_SELECTED}>
          <div
            className={CL.ROOT}
            onClick={this._handleClick}
            tabIndex="0"
            role="menuitem"
            onKeyDown={this._handleKeyDown}
          >
            <div style={S.ROOT_SVG}>
               <svg
                  viewBox="0 0 16 16" width="100%" height="100%"
                  preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
                  style={S.INLINE_BLOCK}
                >
                 <path
                    d={_pathV}
                    fill={_fillV}
                    strokeWidth="1"
                    stroke={openColor}
                 />
               </svg>
           </div>
           <span style={{...S.CAPTION, ...captionStyle}} >
              {caption}
           </span>
         </div>
         {CompAfter}
      </div>
      <div
        className={_rootChildCl}
        style={{ ...childStyle, ..._rootChildStyle}}
      >
        {children}
      </div>
     </div>
    );
   }
}

export default OpenClose
