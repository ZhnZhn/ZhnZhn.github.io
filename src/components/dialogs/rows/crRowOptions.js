import {
  crRowOcSelectStyle,
  crRowLabelStyle
} from '../../styles/DialogStyles';

const MAX_LENGTH = 11;
const _crCaption = (
  caption
) => caption.length > MAX_LENGTH && caption.indexOf(' ') === -1
  ? caption.slice(0, MAX_LENGTH) + '.'
  : caption;

// [rowStyle, labelStyle, caption, options]
const crRowOptions = ({
  isShowLabels,
  captionStyle,
  caption='',
  width=250,
  ...rest
}, { isOc }={}) => {
  const _caption = _crCaption(caption)
  , _crRowStyle = isOc
      ? crRowOcSelectStyle
      : crRowLabelStyle;

  return [
    ..._crRowStyle(isShowLabels, captionStyle),
    _caption,
    {
      width,
      ...rest,
      optionName: isShowLabels ? '' : _caption
    }
  ];
};

export default crRowOptions
