
import crRowStyle from './crRowStyle';

const MAX_LENGTH = 11;
const _crCaption = caption =>
  caption.length > MAX_LENGTH && caption.indexOf(' ') === -1
    ? caption.substring(0, MAX_LENGTH) + '.'
    : caption;

const crRowOptions = ({
  isShowLabels,
  captionStyle,
  caption='',
  width=250,
  ...rest
}, { isOc }={}) => {
  const _caption = _crCaption(caption);
  return {
    //rowStyle, labelStyle,
    ...crRowStyle({ isShowLabels, captionStyle }, isOc),
    caption: _caption,
    options: {
      width,
      ...rest,
      optionName: isShowLabels ? '' : _caption
    }
  };
};

export default crRowOptions
