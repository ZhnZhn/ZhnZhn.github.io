import React, { Component } from 'react'

import SvgClose from '../zhn/SvgClose';

const CL = "not-selected shadow-right";
const MAX_LENGTH = 45;

const S = {
  ROOT: {
    backgroundColor: '#1b2836',
    paddingTop: '6px',
    paddingLeft: '10px',
    paddingRight: '42px',
    paddingBottom: '6px',
    height: 'auto',
    width: '100%',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',
    position: 'relative'
  },
  CAPTION: {
    display: 'inline-block',
    cursor: 'pointer',
    width: '340px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textOverflow: 'clip',
    overflow: 'inherit'
  },
  OPEN: {
    color: 'rgba(164, 135, 212, 1)',
  },
  CLOSE: {
    color : 'gray'
  },
  SVG_CLOSE: {
    position: 'absolute',
    right: 0,
    top: '4px'
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
            isOpen,
            rootStyle, captionStyle,
            caption, title,
            children,
            onClick, onClose
          } = this.props
        , _title = title || caption.length > MAX_LENGTH
              ? caption
              : undefined
        , _styleCaption = isOpen
            ? { ...S.CAPTION, ...captionStyle, ...S.OPEN }
            : { ...S.CAPTION, ...captionStyle, ...S.CLOSE };
    return (
      <div style={{ ...S.ROOT, ...rootStyle}}>
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

export default ItemHeader
