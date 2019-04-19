
import useRow from './useRow'

const useRowOptions = ({
  isShowLabels,
  caption='',
  captionStyle,
  ...rest
}, { isOc }={}) => ({
  ...useRow({ isShowLabels, caption, captionStyle }, isOc),
  options: {
    width: "250",
    ...rest,
    optionName: isShowLabels
      ? ''
      : caption.replace(':', '')
  }
});

export default useRowOptions
