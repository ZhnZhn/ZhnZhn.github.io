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
      : crRowLabelStyle
  , [
    rowStyle,
    labelStyle
  ] = _crRowStyle(isShowLabels, captionStyle);

  return {
    rowStyle,
    labelStyle,
    caption: _caption,
    options: {
      width,
      ...rest,
      optionName: isShowLabels ? '' : _caption
    }
  };
};

export default crRowOptions
