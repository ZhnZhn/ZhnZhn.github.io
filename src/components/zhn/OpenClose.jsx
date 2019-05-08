import React, { Component } from 'react';
//import PropTypes from 'prop-types'

import C from '../styles/Color'

import isKeyEnter from './isKeyEnter'

const CL = {
  ROOT: 'zhn-oc',
  SHOW_POPUP: 'show-popup',
  NOT_SELECTED: 'not-selected'
};

const DF = {
  OPEN_COLOR: C.TITLE,
  CLOSE_COLOR: C.BLANK
};

const S = {
  ROOT_DIV: {
    lineHeight: 2
  },
  ROOT_SVG: {
    display: 'inline-block',
    width: 16,
    height: 16,
    marginLeft: 8
  },
  CAPTION: {
    color: C.TITLE,
    paddingLeft: 4,
    verticalAlign: 'top',
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

const _crConf = ({ isOpen, openColor, closeColor }) => isOpen
  ? {
      _pathV: PATH_OPEN,
      _fillV: openColor,
      _rootChildStyle: S.BLOCK,
      _rootChildCl: CL.SHOW_POPUP
    }
  : {
      _pathV: PATH_CLOSE,
      _fillV: closeColor,
      _rootChildStyle: S.NONE,
      _rootChildCl: null
    };

class OpenClose extends Component {
   /*
   static propTypes = {
     isClose: PropTypes.bool,

     rootStyle: PropTypes.object,
     ocStyle: PropTypes.object,
     caption: PropTypes.string,
     captionStyle: PropTypes.object,
     openColor: PropTypes.string,
     closeColor: PropTypes.string,
     CompAfter: PropTypes.node,
     childStyle: PropTypes.object
   }
   */

   static defaultProps = {
     openColor: DF.OPEN_COLOR,
     closeColor: DF.CLOSE_COLOR
   }
   constructor(props){
     super(props);
     const { isClose } = props;
     this.state = {
       isOpen: isClose ? false : true
     }
   }

  _hClick = () => {
    this.setState(prev => ({
      isOpen: !prev.isOpen
    }));
  }

  _hKeyDown = (event) => {
    if (isKeyEnter(event)){
      this._hClick()
    }
  }

  render(){
    const {
        rootStyle, ocStyle,
        caption, captionStyle,
        openColor, closeColor,
        CompAfter, childStyle, children
      } = this.props
    , { isOpen } = this.state
    , {
       _pathV, _fillV,
       _rootChildStyle, _rootChildCl
     } = _crConf({ isOpen, openColor, closeColor });

    return (
      <div style={{...S.ROOT_DIV, ...rootStyle}}>
        <div className={CL.NOT_SELECTED}>
          <div
            role="menuitem"
            tabIndex="0"
            className={CL.ROOT}
            style={ocStyle}
            onClick={this._hClick}
            onKeyDown={this._hKeyDown}
          >
            <div style={S.ROOT_SVG}>
               <svg
                  viewBox="0 0 16 16" width="100%" height="100%"
                  preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
                  style={S.INLINE_BLOCK}
                >
                 <path
                    fill={_fillV}
                    strokeWidth="1"
                    stroke={openColor}
                    d={_pathV}
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
