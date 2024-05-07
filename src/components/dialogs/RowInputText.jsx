//import PropTypes from "prop-types";
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
  width: 220
};

const RowInputText = ({
  refEl,
  styleRoot,
  rootStyle,
  captionCn,
  captionStyle,
  styleCaption,
  caption='Input',
  inputStyle,
  styleInput,
  ...restProps
}) => {
  const _rootStyle = rootStyle
    || {...S_ROOT, ...styleRoot}
  , _captionStyle = captionStyle
    || {...S_CAPTION, ...styleCaption}
  , _inputStyle = inputStyle
    || {...S_INPUT_TEXT, ...styleInput}
  , _caption = crCaption(caption);
  return (
    <div style={_rootStyle}>
      <label>
        <span className={captionCn} style={_captionStyle}>
          {_caption}
        </span>
        <InputText
           ref={refEl}
           style={_inputStyle}
           {...restProps}
        />
      </label>
    </div>
  );
};

/*
RowInputText.propTypes= {
  refEl: PropTypes.ref,
  styleRoot: PropTypes.object,
  styleCaption: PropTypes.object,
  styleInput: PropTypes.object,
  caption: PropTypes.string,
  initValue: PropTypes.string,
  onEnter: PropTypes.func
}
*/

export default RowInputText
