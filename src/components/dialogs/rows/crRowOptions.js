
import crRowStyle from './crRowStyle';

const crRowOptions = ({
  isShowLabels,  
  captionStyle,
  caption='',
  width=250,
  ...rest
}, { isOc }={}) => ({
  //rowStyle, labelStyle,
  ...crRowStyle({ isShowLabels, captionStyle }, isOc),
  caption,
  options: {
    width,
    ...rest,
    optionName: isShowLabels ? '' : caption
  }
});

export default crRowOptions
