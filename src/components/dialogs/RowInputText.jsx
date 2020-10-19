import { forwardRef } from 'react';
//import PropTypes from "prop-types";

import InputText from '../zhn/InputText'

const S = {
  ROOT: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 6
  },
  CAPTION: {
    display: 'inline-block',
    color: '#1b75bb',
    textAlign: 'right',
    width: 100,
    paddingRight: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  INPUT_TEXT : {
    width: 220,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
}

const COLLON = ':';

const RowInputText = forwardRef((props, ref) => {
  const {
    styleRoot, rootStyle,
    captionStyle, styleCaption,
    caption='Input',
    inputStyle, styleInput,
    ...rest
  } = props
  , _rootStyle = rootStyle
       || {...S.ROOT, ...styleRoot}
  , _captionStyle = captionStyle
       || {...S.CAPTION, ...styleCaption}
  , _inputStyle = inputStyle
       || {...S.INPUT_TEXT, ...styleInput}
  , _caption = caption.indexOf(COLLON) === -1
      ? caption + COLLON
      : caption;
  return (
    <div style={_rootStyle}>
      <label>
        <span style={_captionStyle}>
          {_caption}
        </span>
        <InputText
           ref={ref}
           style={_inputStyle}
           {...rest}
        />
      </label>
    </div>
  );
})

/*
RowInputText.propTypes= {
  styleRoot: PropTypes.object,
  styleCaption: PropTypes.object,
  styleInput: PropTypes.object,
  caption: PropTypes.string,
  initValue: PropTypes.string,
  onEnter: PropTypes.func
}
*/

export default RowInputText
