//import PropTypes from "prop-types";
import InputText from '../zhn/InputText';
import crCaption from './fns/crCaption';

const S_ROOT = {
  padding: '6px 0 6px 6px'
}
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
}
, DF_CAPTION = 'Input';

const _crStyle = (
  style,
  dfStyle,
  overrideStyle
) => style || {...dfStyle, ...overrideStyle};

const RowInputText = ({
  refEl,
  styleRoot,
  rootStyle,
  captionCn,
  captionStyle,
  styleCaption,
  caption,
  inputStyle,
  styleInput,
  ...restInpuTextProps
}) => (
  <div style={_crStyle(rootStyle, S_ROOT, styleRoot)}>
    <label>
      <span
         className={captionCn}
         style={_crStyle(captionStyle, S_CAPTION, styleCaption)}
      >
        {crCaption(caption || DF_CAPTION)}
      </span>
      <InputText
         {...restInpuTextProps}
         refEl={refEl}
         style={_crStyle(inputStyle, S_INPUT_TEXT, styleInput)}
      />
    </label>
  </div>
);


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
