//import PropTypes from "prop-types";
import { forwardRef } from 'react';

import InputText from '../zhn/InputText';
import crCaption from './fns/crCaption';

const S_ROOT = { padding: '6px 0 6px 6px' }
, S_CAPTION = {
  display: 'inline-block',
  color: '#1b75bb',
  textAlign: 'right',
  width: 100,
  paddingRight: 5,
  fontSize: 16,
  fontWeight: 'bold'
}
, S_INPUT_TEXT = {
  width: 220,
  boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
};

const RowInputText = forwardRef((props, ref) => {
  const {
    styleRoot, rootStyle,
    captionStyle, styleCaption,
    caption='Input',
    inputStyle, styleInput,
    ...rest
  } = props
  , _rootStyle = rootStyle
       || {...S_ROOT, ...styleRoot}
  , _captionStyle = captionStyle
       || {...S_CAPTION, ...styleCaption}
  , _inputStyle = inputStyle
       || {...S_INPUT_TEXT, ...styleInput}
  , _caption = crCaption(caption);
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
