
import crRow from './crRow'

const crRowOptions = ({
  isShowLabels,
  caption='',
  captionStyle,
  width=250,
  ...rest
}, { isOc }={}) => ({
  ...crRow({ isShowLabels, caption, captionStyle }, isOc),
  options: {
    width,
    ...rest,
    optionName: isShowLabels
      ? ''
      : caption.replace(':', '')
  }
});

export default crRowOptions
