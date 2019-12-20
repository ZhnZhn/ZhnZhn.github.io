import React, { Component } from 'react'

import withTheme from '../hoc/withTheme'

import SvgClose from '../zhn/SvgClose';

const TH_ID = 'ELEMENT';

const CL = "not-selected shadow-right";
const MAX_LENGTH = 45;

const S = {
  ROOT: {
    position: 'relative',
    backgroundColor: '#1b2836',
    height: 'auto',
    width: '100%',
    paddingTop: 6,
    paddingLeft: 10,
    paddingRight: 42,
    paddingBottom: 6,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    boxShadow: '0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15)'
  },
  CAPTION: {
    display: 'inline-block',
    width: 380,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'clip',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  OPEN: {
    color: '#a487d4',
  },
  CLOSE: {
    color: 'gray'
  },
  SVG_CLOSE: {
    position: 'absolute',
    right: 0,
    top: 4
  }
};

class ItemHeader extends Component {
   static defaultProps = {
     caption: ''
   }

  _hKeyPress = (evt) => {
    evt.preventDefault()
    const { which } = evt;
    if (which === 13 || which === 32 ){
      this.props.onClick()
    }
  }

  render(){
    const {
            theme,
            isOpen,
            rootStyle, captionStyle,
            caption, title,
            children,
            onClick, onClose
          } = this.props
        , TS = theme.getStyle(TH_ID)
        , _title = title || caption.length > MAX_LENGTH
              ? caption
              : void 0
        , _styleCaption = isOpen
            ? { ...S.CAPTION, ...captionStyle, ...S.OPEN }
            : { ...S.CAPTION, ...captionStyle, ...S.CLOSE };
    return (
      <div style={{
         ...S.ROOT, ...rootStyle,
         ...TS.ROOT
       }}>
        <span
           className={CL}
           title={_title}
           style={_styleCaption}
           onClick={onClick}
           tabIndex="0"
           role="button"
           onKeyPress={this._hKeyPress}
        >
           {caption}
        </span>
        {children}
        <SvgClose
           style={S.SVG_CLOSE}
           onClose={onClose}
         />
      </div>
    );
  }
}

export default withTheme(ItemHeader)
