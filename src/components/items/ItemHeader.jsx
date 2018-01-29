import React, { Component } from 'react'

import SvgClose from '../zhn/SvgClose';

const CL = "not-selected";
const MAX_LENGTH = 45;

const S = {
  ROOT: {
    backgroundColor: '#1b2836',
    paddingTop: '4px',
    paddingLeft: '10px',
    lineHeight: 1.8,
    height: '32px',
    width : '100%',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px'
  },
  CAPTION: {
    display : 'inline-block',
    cursor: 'pointer',
    width: '410px',
    fontWeight : 'bold',
    whiteSpace: 'nowrap',
    textOverflow : 'ellipsis',
    overflow : 'hidden'
  },
  OPEN: {
    color: 'rgba(164, 135, 212, 1)',
  },
  CLOSE: {
    color : 'gray'
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
        , _title = title ||
                   caption.length > MAX_LENGTH
                      ? caption
                      : undefined
        , _styleCaption = isOpen
            ? { ...S.CAPTION, ...captionStyle, ...S.OPEN }
            : { ...S.CAPTION, ...captionStyle, ...S.CLOSE }
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
        <SvgClose onClose={onClose} />
      </div>
    );
  }
}

export default ItemHeader
