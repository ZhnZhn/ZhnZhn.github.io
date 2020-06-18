
import crRow from './crRow'

const crRowOptions = ({
  isShowLabels,
  caption='',
  captionStyle,
  ...rest
}, { isOc }={}) => ({
  ...crRow({ isShowLabels, caption, captionStyle }, isOc),
  options: {
    width: "250",
    ...rest,
    optionName: isShowLabels
      ? ''
      : caption.replace(':', '')
  }
});

export default crRowOptions
